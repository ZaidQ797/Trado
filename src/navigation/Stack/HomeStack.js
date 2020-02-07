import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Home from '../../screens/Home';
import ProductDetail from '../../screens/Home/ProductDetail';
import PersonProfile from '../../screens/Home/ProductDetail/PersonProfile';
import FilteredCategory from '../../screens/Home/FilteredCategory';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
    PersonProfile: {
      screen: PersonProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    FilteredCategory: {
      screen: FilteredCategory,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default HomeStack;
