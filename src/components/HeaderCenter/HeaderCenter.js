import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

const HeaderCenter = ({name}) => {
  return (
    <View>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};
export default HeaderCenter;
export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontFamily: Fonts.GoogleSansBold,
    color: theme.colors.primaryDark,
  },
});
