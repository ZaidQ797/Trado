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
import {Fonts} from '../../../utils/Fonts';
import DocumentPicker from 'react-native-document-picker';
import {default_user} from '../../../assets';
import firebaseService from '../../../service/firebase';
import {Loader} from '../../../utils/Loading';
class Form extends Component {
  state = {
    userName: '',
    password: '',
    email: '',
    confirmPassword: '',
    selectedImage: '',
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
        selectedImage: res,
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

  handleSignupOnPress = () => {
    this.toggleLoading();
    const {email, password} = this.state;

    firebaseService
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.saveUserInfo();
      })
      .catch(err => {
        this.toggleLoading();
        alert(err);
      });
  };

  saveUserInfo = () => {
    const {userName, email, password} = this.state;
    const {navigate} = this.props.navigation;
    const uid = firebaseService.auth().currentUser.uid;
    const params = {
      username: userName,
      email: email,
      password: password,
    };
    //firebaseService.database().ref('/Users').push(params)
    firebaseService
      .database()
      .ref('/Users')
      .child(uid)
      .set(params)
      .then(res => {
        this.toggleLoading();
        navigate('Home');
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const {selectedImage} = this.state;
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
              {selectedImage !== '' ? (
                <Image
                  source={{uri: selectedImage.uri}}
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
                {selectedImage !== '' ? 'Change' : 'Upload your picture'}
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
                secureTextEntry={true}
                onChangeText={password => this.handlePasswordChange(password)}
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.iconContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                keyboardType={'numbers-and-punctuation'}
                secureTextEntry={true}
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
