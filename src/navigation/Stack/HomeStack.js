import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Home from '../../screens/Home';
import ProductDetail from '../../screens/Home/ProductDetail';
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default HomeStack;
