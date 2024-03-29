import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

//Stacks
import AuthStack from './Stacks/AuthStack';
import HomeStack from './Stacks/HomeStack';
//Splash
import Splash from '../screens/Splash';

const mainNav = createSwitchNavigator(
  {
    Splash: {
      screen: Splash,
    },
    Auth: {
      screen: AuthStack,
    },
    App: {
      screen: HomeStack,
    },
  },
  {
    initialRouteName: 'Splash',
  },
);
export default createAppContainer(mainNav);
