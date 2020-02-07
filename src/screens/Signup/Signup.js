import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {fb, google, welcomeIllustration} from '../../assets';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}> Welcome</Text>
          <Text style={[styles.mediumText, {marginVertical: 10}]}>
            Please Signup or Login to continue using our app
          </Text>
        </View>
        <View style={styles.centerContainer}>
          <Image
            source={welcomeIllustration}
            style={styles.illustrationStyle}
            resizeMode={'contain'}
          />
        </View>

        <View style={[styles.centerContainer, {flex: 0.3}]}>
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
            or login with email
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('Form')}>
            <Text style={[styles.largeText, {color: theme.colors.white}]}>
              Sign Up
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

export default Signup;
