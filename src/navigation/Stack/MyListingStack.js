import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import MyListing from '../../screens/MyListing';

const MyListingStack = createStackNavigator(
  {
    Home: {
      screen: MyListing,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default MyListingStack;
