import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import MyListing from '../../screens/MyListing';

const MyListingStack = createStackNavigator(
  {
    MyListing: {
      screen: MyListing,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'MyListing'},
);
export default MyListingStack;
