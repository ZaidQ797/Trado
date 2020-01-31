import {Platform} from 'react-native';
import {Fonts} from '../utils/Fonts';
const theme = {
  colors: {
    primary: '#FF3F56',
    secondary: '#000000',
    tertiary: '#F6F6F6',
    iconColor: '#515C6F',
    white: '#f1f1f1',
    gray: '#5c5c5c',
    text: '#222B45',
  },
  Header: {
    backgroundColor: '#fff',
    statusBarProps: {
      barStyle: Platform.Os === 'android' ? 'light-content' : 'dark-content',
      translucent: true,
    },
  },
  Button: {
    raised: true,
    containerStyle: {marginVertical: 10},
    loadingProps: {size: 'large', color: '#a92533'},
    titleStyle: {color: 'white'},
    buttonStyle: {
      borderRadius: 20,
      backgroundColor: '#a92533',
    },
  },

  Text: {
    style: {
      fontSize: 16,
      padding: 5,
      fontFamily: Fonts.GoogleSansBold,
    },
  },
  dimens: {
    itemContainerPadding: 20,
  },
  SocialIcon: {
    style: {
      borderRadius: 5,
      paddingLeft: 30,
      paddingRight: 30,
    },
  },

  Input: {
    containerStyle: {
      marginVertical: 5,
      borderBottomWidth: 0,
    },
    borderBottomWidth: 0,
    placeholderTextColor: '#ADADAD',
    activeOpacity: 1,

    errorStyle: {textAlign: 'center', fontSize: 12},
    leftIconContainerStyle: {
      marginRight: 5,
    },
  },

  Icon: {
    size: 25,
    color: '#ADADAD',
  },
  CheckBox: {
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  },

  Picker: {
    itemStyle: {borderRadius: 1},
  },
  dividerStyle: {
    width: '90%',
    height: 1.5,
    color: '#707070',
  },
};

export default theme;
