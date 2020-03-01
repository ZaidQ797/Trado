import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import AboutUs from '../../screens/AboutUs';

const AbouUsStack = createStackNavigator(
  {
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'AboutUs'},
);
export default AbouUsStack;
