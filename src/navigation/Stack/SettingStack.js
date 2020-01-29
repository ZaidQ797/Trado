import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Settings from '../../screens/Settings';

const SettingStack = createStackNavigator(
  {
    Home: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default SettingStack;
