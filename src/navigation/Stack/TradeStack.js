import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//screens
import Trade from '../../screens/Trade';
import MapModal from '../../components/MapModal';
const TradeStack = createStackNavigator(
  {
    Trades: {
      screen: Trade,
      navigationOptions: {
        header: null,
      },
    },
    MapModal: {screen: MapModal, navigationOptions: {headerShown: false}},
  },
  {initialRouteName: 'Trades'},
);
export default TradeStack;
