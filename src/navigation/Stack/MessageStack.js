import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Messages from '../../screens/Messages';

const MessageStack = createStackNavigator(
  {
    Home: {
      screen: Messages,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default MessageStack;
