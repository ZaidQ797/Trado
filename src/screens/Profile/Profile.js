import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import styles from './styles';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import uuid from 'react-native-uuid';
// import {uploadPic} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import theme from '../../theme';
import {Loader} from '../../utils/Loading';
import firebaseService from '../../service/firebase';
import {default_user} from '../../assets';
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userImg: null,
      loading: false,
      username: '',
      email: '',
    };
  }
  componentDidMount() {
    try {
      this.toggleLoading();
      const userId = firebaseService.auth().currentUser.uid;
      const ref = firebaseService
        .database()
        .ref('/Users')
        .child(userId);
      ref
        .once('value')
        .then(snapshot => {
          this.setState(
            {
              user: snapshot.val(),
              username: snapshot.val().username,
              email: snapshot.val().email,
            },
            () => {
              console.warn(this.state.user);
              this.toggleLoading();
            },
          );
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.warn(err);
    }
  }

  toggleLoading = () => ({
    loading: !this.state.loading,
  });

  pickProfile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        userImg: res,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.warn(err);
      }
    }
  };
  onChangeName = name => {
    this.setState({username: name});
  };

  onChangeEmail = email => {
    this.setState({email: email});
  };

  uploadImageToFirebase = ({uri, type, name, size}) => {
    //first we have to remove previos image from stroage then upload new one :)
    const refURL = firebaseService.storage().refFromURL(this.state.user.image);
    if (refURL !== undefined) refURL.delete();
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = '';
      const imageRef = firebaseService
        .storage()
        .ref('user')
        .child(this.state.username + ' =====> ' + uuid.v4());

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {
            type: `${type};BASE64`,
          });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {
            contentType: type,
          });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  updateProfile = async () => {
    try {
      let newURL;
      this.toggleLoading();
      if (this.state.userImg !== null) {
        newURL = await this.uploadImageToFirebase(this.state.userImg);
        console.warn(newURL);
      }
      let updateParams;
      console.warn(newURL);
      if (this.state.userImg !== null) {
        updateParams = {
          username: this.state.username,
          image: newURL,
        };
      } else {
        updateParams = {
          username: this.state.username,
        };
      }

      const currentUser = firebaseService.auth().currentUser.uid;
      firebaseService
        .database()
        .ref('/Users')
        .child(currentUser)
        .update(updateParams)
        .then(data => {
          Alert.alert('Congrats', 'Data Updated SuccessFully');
        })
        .catch(err => {
          alert(err);
        });
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const {user, userImg} = this.state;
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="Profile" />}
          containerStyle={styles.headerStyle}
        />
        <Loader visible={this.props.visible} />
        <View>
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => this.pickProfile()}>
              <Image
                source={
                  userImg !== null
                    ? {
                        uri: userImg.uri,
                      }
                    : user && user.image
                }
                style={{width: 100, height: 100, borderRadius: 50}}
                resizeMode={'cover'}
              />

              <Text style={{fontFamily: Fonts.OpenSans, paddingTop: 5}}>
                {userImg === null ? 'Change' : 'Upload your picture'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              placeholder="Enter your Name"
              keyboardType="default"
              style={styles.inputFieldStyle}
              value={this.state.username}
              onChangeText={name => this.onChangeName(name)}
            />
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.9}
              onPress={this.updateProfile}>
              <Text style={[styles.largeText, {color: theme.colors.white}]}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Profile;
