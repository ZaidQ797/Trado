import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {splash} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import firebaseService from '../../service/firebase';
import {Loader} from '../../utils/Loading';
import theme from '../../theme';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    firebaseService.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Form');
    });
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
          <Loader visible="true" color={'white'} />
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
