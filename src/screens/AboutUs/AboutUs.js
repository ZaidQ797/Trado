import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> AboutUs </Text>
      </View>
    );
  }
}

export default AboutUs;
