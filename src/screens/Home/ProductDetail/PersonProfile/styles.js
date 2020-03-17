import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../../../theme';
import {Fonts} from '../../../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  userInfo: {
    flex: 0.4,
    // marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageSize: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 18,
    color: theme.colors.text,
    margin: 5,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 14,
    color: theme.colors.gray,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
  dividerStyle: {
    height: 0.5,
    width: '97%',
    marginTop: 10,
  },
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  bottomContainer: {
    backgroundColor: 'tomato',
    flex: 0.6,
  },
});
export default styles;
