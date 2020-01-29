import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Notifications from '../../screens/Notifications';

const NotificationStack = createStackNavigator(
  {
    Home: {
      screen: Notifications,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default NotificationStack;
