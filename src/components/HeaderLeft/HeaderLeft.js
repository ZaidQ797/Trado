import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {drawer, back} from '../../assets';
import theme from '../../theme';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderLeft = ({navigation, icon}) => {
  return (
    <View>
      {icon === 'back' ? (
        <TouchableWithoutFeedback
          activeOpacity={0}
          style={styles.drawerIcon}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={back}
            resizeMode={'contain'}
            style={styles.drawerIcon}
          />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          activeOpacity={0}
          style={styles.drawerIcon}
          onPress={() => {
           alert('pressed');
          }}>
          <Image
            source={drawer}
            resizeMode={'contain'}
            style={styles.drawerIcon}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
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
