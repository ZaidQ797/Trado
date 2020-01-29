import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Trade from '../../screens/Trade';

const TradeStack = createStackNavigator(
  {
    Home: {
      screen: Trade,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default TradeStack;
