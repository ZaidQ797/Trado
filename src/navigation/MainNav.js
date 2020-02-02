import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
//Stacks
import AuthStack from './Stack/AuthStack';
// import HomeStack from './Stack/HomeStack';
import BottomTab from './Tab';

//Drawer
import DrawerNav from './Drawer';
//Splash Screen
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
      screen: DrawerNav,
    },
  },
  {initialRouteName: 'App'},
);

export default createAppContainer(mainNav);
