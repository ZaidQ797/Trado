import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Trade extends Component {
  static navigationOptions = () => ({
    tabBarLabel: () => {
      tabBarLabel = 'Hi';
    },
  });
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> Trade </Text>
      </View>
    );
  }
}

export default Trade;
