import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Profile from '../../screens/Profile';

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Profile'},
);
export default ProfileStack;
