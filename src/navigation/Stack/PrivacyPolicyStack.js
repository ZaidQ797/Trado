import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import PrivacyPolicy from '../../screens/PrivacyPolicy';

const PrivacyPolicyStack = createStackNavigator(
  {
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'PrivacyPolicy'},
);
export default PrivacyPolicyStack;
