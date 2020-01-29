import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import theme from '../../theme';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../../utils/Fonts';
//import all tabs
import HomeStack from '../Stack/HomeStack';
import NotificationStack from '../Stack/NotificationStack';
import TradeStack from '../Stack/TradeStack';
import MessageStack from '../Stack/MessageStack';
import MyListingStack from '../Stack/MyListingStack';

const Device_Height = Dimensions.get('window').height;
const Device_Width = Dimensions.get('window').width;

const bottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        header: null,
      },
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        header: null,
      },
    },
    Trade: {
      screen: TradeStack,
      navigationOptions: {
        header: null,
      },
    },
    Messages: {
      screen: MessageStack,
      navigationOptions: {
        header: null,
      },
    },
    MyListing: {
      screen: MyListingStack,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            return <AntDesign name="home" size={24} color={tintColor} />;
          case 'Notification':
            return (
              <Ionicons name="ios-notifications" size={24} color={tintColor} />
            );
          case 'Trade':
            return (
              <View
                style={{
                  backgroundColor: theme.colors.primary,

                  width: 50,
                  height: 60,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo name="camera" size={24} color="white" />
              </View>
            );
          case 'Messages':
            return <Entypo name="message" size={24} color={tintColor} />;
          case 'MyListing':
            return <Entypo name="list" size={24} color={tintColor} />;
          default:
            iconName;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: 'gray',
      style: {borderTopColor: 'lightgray'},
      showLabel: true,
      labelStyle: {
        fontFamily: Fonts.GoogleSansMedium,
      },
      backgroundColor: 'gray',
    },
  },
);

export default bottomTab;
