import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import theme from '../../../theme';
import RNFetchBlob from 'rn-fetch-blob';
import {Fonts} from '../../../utils/Fonts';
import uuid from 'react-native-uuid';
import DocumentPicker from 'react-native-document-picker';
import {default_user, user} from '../../../assets';
import firebaseService from '../../../service/firebase';
import Snackbar from 'react-native-snackbar';
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Form extends Component {
  state = {
    userName: '',
    password: '',
    email: '',
    confirmPassword: '',
    image: null,
    gotImage: false,
  };
  height = Dimensions.get('window').height;
  width = Dimensions.get('window').width;
  //update userName state
  handleuserNameChange = userName => {
    this.setState({
      userName: userName,
    });
  };

  pickProfile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        image: res.uri,
        gotImage: true,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  //update email state
  handleEmailChange = email => {
    this.setState({email: email});
  };

  //update password state
  handlePasswordChange = password => {
    this.setState({
      password: password,
    });
  };

  handleCnfrmPasswordChange = confirmPassword => {
    this.setState({confirmPassword: confirmPassword});
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  // User signUp method
  handleSignupOnPress = () => {
    const {image, email, password} = this.state;
    let validation = this.validateData();
    console.warn(validation);
    if (validation == true) {
      this.toggleLoading();
      firebaseService
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          // console.warn("User SignUp Successfully");
          this.uploadImage(image);
        })
        .catch(error => {
          this.toggleLoading();
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          // console.warn("ERROR => ", errorCode, errorMessage);
        });
    }
  };

  // validate User's Register Data...
  validateData = () => {
    const {gotImage, userName, email, password, confirmPassword} = this.state;
    // console.warn(gotImage, name, email, number, address, password);
    if (gotImage != true) {
      Snackbar.show({
        text: 'Kindly upload image',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: theme.colors.primary,
        fontFamily: Fonts.GoogleSansMedium,
      });
      return false;
    } else {
      if (userName == '') {
        Snackbar.show({
          text: 'Kindly enter your name',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      } else if (userName.length < 8) {
        Snackbar.show({
          text: 'Name must have more than 8 chachracters',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      }
      if (email == '') {
        Snackbar.show({
          text: 'Kindly enter your email',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      } else {
        if (email) {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(email) === false) {
            Snackbar.show({
              text: 'Kindly enter correct email',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: theme.colors.primary,
              fontFamily: Fonts.GoogleSansMedium,
            });
            return false;
          }
        }
      }
      if (password == '') {
        Snackbar.show({
          text: 'Kindly enter password',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      } else {
        if (password.length < 8) {
          Snackbar.show({
            text: 'Password must contain 8 characters',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: theme.colors.primary,
            fontFamily: Fonts.GoogleSansMedium,
          });
          return false;
        }
      }
      if (confirmPassword == '') {
        Snackbar.show({
          text: 'Kindly confirm password',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      } else {
        if (confirmPassword != password) {
          Snackbar.show({
            text: 'Passwords did not match',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: theme.colors.primary,
            fontFamily: Fonts.GoogleSansMedium,
          });
          return false;
        } else {
          return true;
        }
      }
    }
  };

  // First Upload image and download Image URI then call saveUserToDB()...
  uploadImage = (uri, mime = 'image/jpeg') => {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      // alert(uploadUri);
      // return;
      let uploadBlob = '';
      const imageRef = firebaseService
        .storage()
        .ref('images')
        .child(uuid.v4());

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          const downnloadImageURI = imageRef.getDownloadURL().then(url => {
            const imageUri = url;
            this.saveUserInfo(imageUri);
          });
          return downnloadImageURI;
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          this.toggleLoading();
          reject(error);
        });
    });
  };
  saveUserInfo = imgUri => {
    const {userName, email, password} = this.state;
    const {navigate} = this.props.navigation;
    const userId = firebaseService.auth().currentUser.uid;
    const params = {
      uid: userId,
      image: imgUri,
      username: userName,
      email: email,
      password: password,
    };
    //firebaseService.database().ref('/Users').push(params)
    firebaseService
      .database()
      .ref('/Users')
      .child(userId)
      .set(params)
      .then(res => {
        this.toggleLoading();
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const {image, gotImage} = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {this.state.loading ? (
            <ActivityIndicator
              animating
              color={theme.colors.primary}
              // style={visible ? loader.centering : loader.hideIndicator}
              size="large"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ) : null}
          <View
            style={{
              height: this.height / 4,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => this.pickProfile()}>
              {gotImage ? (
                <Image
                  source={{uri: image}}
                  style={{width: 100, height: 100, borderRadius: 50}}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  source={default_user}
                  style={{
                    width: 80,
                    height: 80,
                    tintColor: theme.colors.primary,
                  }}
                  resizeMode={'contain'}
                />
              )}
              <Text
                style={{
                  fontFamily: Fonts.GoogleSansRegular,
                  paddingTop: 5,
                  color: 'gray',
                }}>
                {gotImage ? 'Change' : 'Upload your picture'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.iconContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Username"
                keyboardType={'default'}
                onChangeText={userName => this.handleuserNameChange(userName)}
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.iconContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email"
                keyboardType={'email-address'}
                onChangeText={email => this.handleEmailChange(email)}
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.iconContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Password"
                keyboardType={'numbers-and-punctuation'}
                // secureTextEntry={true}
                onChangeText={password => this.handlePasswordChange(password)}
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.iconContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                keyboardType={'numbers-and-punctuation'}
                // secureTextEntry={true}
                onChangeText={confirmPassword =>
                  this.handleCnfrmPasswordChange(confirmPassword)
                }
                placeholderTextColor="gray"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={this.handleSignupOnPress}>
              <Text style={[styles.largeText, {color: theme.colors.white}]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.smallTextStyle}>Already have an account? </Text>
            <Text
              style={[styles.smallTextStyle, {color: theme.colors.primary}]}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              Login
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Form;
