import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {fb, google} from '../../assets';
import firebaseService from '../../service/firebase';
import Snackbar from 'react-native-snackbar';
import {Fonts} from '../../utils/Fonts';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', loading: false};
  }

  replaceScreen = screen => {
    const {navigate} = this.props.navigation;
    navigate('Home');
  };
  // toggle loading to show or hide progress model...
  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  // let the valid user signIn...
  signIn = () => {
    let validation = this.validateData();
    let {email, password} = this.state;
    if (validation === true) {
      this.toggleLoading(); // start
      firebaseService
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.toggleLoading(); // stop
          this.replaceScreen('Home');
        })
        .catch(err => {
          this.toggleLoading(); // stop
          // alert(err);
          alert('Invalid credentials or user may not registered.');
        });
    }
  };

  // validate User's Register Data...
  validateData = () => {
    const {email, password} = this.state;
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
      return true;
    }
  };

  onChangeEmail = email => {
    this.setState({email: email});
  };
  onChangePassword = password => {
    this.setState({password: password});
  };
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
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
              backgroundColor: 'transparent',
            }}
          />
        ) : (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <Text style={styles.heading}> Login Now</Text>
              <Text style={[styles.mediumText, {marginVertical: 10}]}>
                Please Login to continue using our app
              </Text>
            </View>

            <View style={styles.bottomContainer}>
              <Text style={[styles.mediumText, {marginBottom: 10}]}>
                {' '}
                or login with email
              </Text>
              <TextInput
                placeholder="Email"
                style={styles.inputFieldStyle}
                keyboardType="email-address"
                onChangeText={password => this.onChangeEmail(password)}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.inputFieldStyle}
                onChangeText={password => this.onChangePassword(password)}
              />
              <Text
                style={[
                  styles.mediumText,
                  {alignSelf: 'flex-end', marginRight: '10%'},
                ]}>
                Fogot Passowrd?
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={1}
                onPress={this.signIn}>
                <Text style={[styles.largeText, {color: theme.colors.white}]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.centerContainer}>
              <Text style={[styles.mediumText, {marginVertical: 20}]}>
                Enter via social networks
              </Text>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.iconContainer, {backgroundColor: '#DB4A39'}]}>
                  <Image
                    source={google}
                    resizeMode={'contain'}
                    style={[styles.iconStyle]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.iconContainer, {backgroundColor: '#4267B2'}]}>
                  <Image
                    source={fb}
                    resizeMode={'contain'}
                    style={[styles.iconStyle]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text style={[styles.mediumText]}>Don't have an account? </Text>
              <Text
                style={[styles.mediumText, {color: theme.colors.primary}]}
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                Sign up
              </Text>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

export default Login;
