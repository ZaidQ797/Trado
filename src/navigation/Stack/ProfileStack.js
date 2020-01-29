import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Profile from '../../screens/Profile';

const ProfileStack = createStackNavigator(
  {
    Home: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default ProfileStack;
