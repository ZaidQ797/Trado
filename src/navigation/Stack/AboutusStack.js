import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import AboutUs from '../../screens/AboutUs';

const AbouUsStack = createStackNavigator(
  {
    Home: {
      screen: AboutUs,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default AbouUsStack;
