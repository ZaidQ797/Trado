import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Home from '../../screens/Home';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default HomeStack;
