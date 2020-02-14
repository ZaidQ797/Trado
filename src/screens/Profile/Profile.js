import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
// import {uploadPic} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import theme from '../../theme';
import {Loader} from '../../utils/Loading';
import firebaseService from '../../service/firebase';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      userEmail: null,
      userPassword: null,
      userImg: null,
      loading: false,
    };
  }
  componentDidMount() {
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
            userName: snapshot.val().username,
            userImg: snapshot.val().image,
            userEmail: snapshot.val().email,
            userPassword: snapshot.val().password,
          },
          () => {
            this.toggleLoading();
          },
        );
      })
      .catch(err => {
        console.log(err);
      });
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
        userImg: res.uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  onChangeName = name => {
    this.setState({userName: name});
  };

  onChangeEmail = email => {
    this.setState({userEmail: email});
  };

  onChangePassword = password => {
    this.setState({userPassword: password});
  };
  updateProfile = () => {
    this.toggleLoading();
    const {userName, userEmail, userPassword, userImg} = this.state;
    const currentUser = firebaseService.auth().currentUser.uid;
    firebaseService
      .database()
      .ref('/Users')
      .child(currentUser)
      .update({
        username: userName,
      })
      .then(data => {
        console
          .log('Data Updated SuccessFully' + data.toString())
          .cath(error => {
            console.log(error);
          });
      });
  };
  render() {
    const {userImg, userName, userEmail, userPassword} = this.state;
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
              {userImg !== null ? (
                <Image
                  source={{uri: userImg}}
                  style={{width: 100, height: 100, borderRadius: 50}}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  source={userImg}
                  style={{width: 80, height: 80}}
                  resizeMode={'contain'}
                />
              )}
              <Text style={{fontFamily: Fonts.OpenSans, paddingTop: 5}}>
                {userImg !== null ? 'Change' : 'Upload your picture'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              placeholder="Enter your Name"
              keyboardType="default"
              style={styles.inputFieldStyle}
              value={userName}
              onChangeText={name => this.onChangeName(name)}
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={userEmail}
              style={styles.inputFieldStyle}
              onChangeText={email => this.onChangeEmail(email)}
            />
            <TextInput
              placeholder="Enter Password"
              keyboardType="name-phone-pad"
              secureTextEntry
              value={userPassword}
              style={styles.inputFieldStyle}
              onChangeText={password => this.onChangePassword(password)}
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
