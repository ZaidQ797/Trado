import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import Form from '../../screens/Signup/Form';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        header: null,
      },
    },
    Form: {
      screen: Form,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Login'},
);
export default AuthStack;
