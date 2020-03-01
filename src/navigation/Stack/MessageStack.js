import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Messages from '../../screens/Messages';

const MessageStack = createStackNavigator(
  {
    Messages: {
      screen: Messages,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Messages'},
);
export default MessageStack;
