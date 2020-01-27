import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {fb, google} from '../../assets';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }
  onChangeEmail = email => {
    this.setState({email: email});
  };
  onChangePassword = password => {
    this.setState({password: password});
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flex: 1, flexGrow: 1}}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}> Login Now</Text>
          <Text style={[styles.mediumText, {marginVertical: 10}]}>
            Please Login to continue using our app
          </Text>
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
        <View style={styles.bottomContainer}>
          <Text style={[styles.mediumText, {marginBottom: 10}]}>
            {' '}
            or login with email
          </Text>
          <TextInput
            placeholder="Email"
            style={styles.inputFieldStyle}
            onChangeText={password => this.onChangeEmail(password)}
          />
          <TextInput
            placeholder="Password"
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
          <TouchableOpacity style={styles.primaryButton} activeOpacity={1}>
            <Text style={[styles.largeText, {color: theme.colors.white}]}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.mediumText]}>Don't have an account? </Text>
            <Text
              style={[styles.mediumText, {color: theme.colors.primary}]}
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              Sign up
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Login;
