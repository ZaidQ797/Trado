import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

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
    textAlign: 'center',
  },
  modalViewContainer: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: 400,
    width: '100%',
  },
  categoryStyle: {
    borderRadius: 60,
    padding: 5,
    backgroundColor: 'tomato',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  iconStyle: {
    height: 40,
    width: 40,
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
