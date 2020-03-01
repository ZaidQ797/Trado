import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Notifications from '../../screens/Notifications';

const NotificationStack = createStackNavigator(
  {
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Notifications'},
);
export default NotificationStack;
