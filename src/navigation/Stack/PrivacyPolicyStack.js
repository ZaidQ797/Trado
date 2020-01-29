import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import PrivacyPolicy from '../../screens/PrivacyPolicy';

const PrivacyPolicyStack = createStackNavigator(
  {
    Home: {
      screen: PrivacyPolicy,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);
export default PrivacyPolicyStack;
