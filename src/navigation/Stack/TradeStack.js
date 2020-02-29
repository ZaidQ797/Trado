import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Trade from '../../screens/Trade';

const TradeStack = createStackNavigator(
  {
    Trade: {
      screen: Trade,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Trade'},
);
export default TradeStack;
