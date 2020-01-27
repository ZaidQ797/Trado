import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './styles';
import {splash} from '../../assets';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <ImageBackground source={splash} style={styles.splashStyle}>
      <Text>Hi there</Text>
      // </ImageBackground>
    );
  }
}

export default Splash;
