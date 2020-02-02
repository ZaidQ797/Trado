import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 16,
    color: theme.colors.gray,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 12,
    color: theme.colors.gray,
    textAlign: 'justify',
  },
  modalViewContainer: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: DEVICE_HEIGHT / 1.2,
    width: '100%',
  },
  dividerStyle: {
    height: 0.5,
    marginVertical: 5,
    width: '99%',
    color: theme.colors.gray,
  },
  conditionStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    height: 32,
    width: 32,
  },
  textInputStyle: {
    padding: 10,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    fontSize: 14,
    fontFamily: Fonts.GoogleSansRegular,
  },
  cross: {
    margin: '2%',
  },
});

export default styles;
