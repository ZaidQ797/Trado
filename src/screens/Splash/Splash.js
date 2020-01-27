import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './styles';
import {splash} from '../../assets';
import {Fonts} from '../../utils/Fonts';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground source={splash} style={styles.splashStyle}>
        <View style={styles.appNameContainer}>
          <Text style={styles.appNameStyle}>Trado</Text>
          <Text style={[styles.mediumText, {alignSelf: 'center'}]}>
            Swap your products with Trado
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text style={styles.largeText}>Trade Now!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
