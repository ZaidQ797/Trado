import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Content from './Content';
import {home, group} from '../../assets';
import theme from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Import Drawer Screens
import BottomTab from '../Tab';
import AboutusStack from '../Stack/AboutusStack';
import PrivacyPolicyStack from '../Stack/PrivacyPolicyStack';
import ProfileStack from '../Stack/ProfileStack';
import SettingStack from '../Stack/SettingStack';

const drawerNav = createDrawerNavigator(
  {
    'Home ': {
      screen: BottomTab,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <AntDesign name="home" size={24} color={tintColor} />
        ),
      },
    },
    'Profile ': {
      screen: ProfileStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <FontAwesome name="user" size={24} color={tintColor} />
        ),
      },
    },
    'About Us': {
      screen: AboutusStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <AntDesign name="infocirlce" size={24} color={tintColor} />
        ),
      },
    },
    'Privacy Policy ': {
      screen: PrivacyPolicyStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <AntDesign name="filetext1" size={24} color={tintColor} />
        ),
      },
    },
    'Settings ': {
      screen: SettingStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialIcons name="settings" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home ',
    drawerLockMode: 'unlocked',
    drawerType: 'front',
    drawerBackgroundColor: 'white',
    drawerPosition: 'left',
    contentComponent: Content,
    contentOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.primaryDark,
      activeBackgroundColor: '#f1f1f1',
    },
  },
);

export default drawerNav;
