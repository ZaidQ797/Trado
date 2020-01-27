import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

const styles = StyleSheet.create({
  splashStyle: {
    flex: 1,
  },
  appNameContainer: {
    flex: 0.21,
    justifyContent: 'flex-end',
  },
  appNameStyle: {
    fontFamily: Fonts.GoogleSansBold,
    fontSize: 40,
    alignSelf: 'center',
    color: 'white',
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 16,
    color: theme.colors.white,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 14,
    color: theme.colors.white,
  },
  bottomContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 5,
  },
  buttonStyle: {
    width: '70%',
    paddingVertical: 10,
    paddingHorizontal: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
  },
});
export default styles;
