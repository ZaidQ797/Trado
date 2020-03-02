import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {drawer, back} from '../../assets';
import theme from '../../theme';
import {Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderLeft = ({navigation, icon}) => {
  return (
    <TouchableWithoutFeedback
      activeOpacity={0}
      style={styles.drawerIcon}
      onPress={() => {
        icon === 'back' ? navigation.goBack() : navigation.openDrawer();
      }}>
      {icon === 'back' ? (
        <Ionicons name={'ios-arrow-back'} size={30} />
      ) : (
        // <Image source={back} resizeMode={'contain'} style={styles.drawerIcon} />
        <Entypo name={'menu'} size={30} />
      )}
    </TouchableWithoutFeedback>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  drawerIcon: {
    height: 25,
    width: 25,
    color: theme.colors.primaryDark,
  },
});
