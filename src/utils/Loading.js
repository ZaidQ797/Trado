import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import theme from '../theme';

export const Loader = ({visible, color}) => (
  <ActivityIndicator
    animating
    color={color}
    style={visible ? loader.centering : loader.hideIndicator}
    size="large"
  />
);
const loader = StyleSheet.create({
  centering: {
    flex: 1,
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,
    //zIndex: 70,
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
  hideIndicator: {
    position: 'absolute',
    top: -100,
    opacity: 0,
  },
});
