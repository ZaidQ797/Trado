import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Trade from '../../screens/Trade';

const TradeStack = createStackNavigator(
  {
    Trades: {
      screen: Trade,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Trades'},
);
export default TradeStack;
