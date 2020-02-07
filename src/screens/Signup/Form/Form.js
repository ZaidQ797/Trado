import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import theme from '../../../theme';
import {Fonts} from '../../../utils/Fonts';
import firebaseService from '../../../service/firebase';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', passowrd: '', cnf: '', errMsg: null};
  }
  handleSignup = () => {
    firebaseService
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.passowrd)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({errorMessage: error.message}));
  };
  onChangeName = name => {
    this.setState({name: name});
  };

  onChangeEmail = email => {
    this.setState({email: email});
  };

  onChangePassword = password => {
    this.setState({password: password});
  };

  onChangeCnfPassword = cnfpassword => {
    this.setState({cnfpassword: cnfpassword});
  };

  render() {
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Sign Up Now</Text>
          <Text style={[styles.mediumText, {marginVertical: 10}]}>
            Please Sign up to continue using our app
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            placeholder="Enter your Name"
            keyboardType="default"
            style={styles.inputFieldStyle}
            onChangeText={name => this.onChangeName(name)}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.inputFieldStyle}
            onChangeText={email => this.onChangeEmail(email)}
          />
          <TextInput
            placeholder="Enter Password"
            keyboardType="name-phone-pad"
            secureTextEntry
            style={styles.inputFieldStyle}
            onChangeText={password => this.onChangePassword(password)}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            keyboardType="name-phone-pad"
            style={styles.inputFieldStyle}
            onChangeText={cnf => this.onChangeCnfPassword(cnf)}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={1}
            
            onPress={this.handleSignup()}>
            <Text style={[styles.largeText, {color: theme.colors.white}]}>
              Register
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.mediumText]}>Already have an account? </Text>
            <Text
              style={[styles.mediumText, {color: theme.colors.primary}]}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Form;
