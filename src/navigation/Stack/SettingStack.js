import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Settings from '../../screens/Settings';

const SettingStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Settings'},
);
export default SettingStack;
