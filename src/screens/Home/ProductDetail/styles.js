import {StyleSheet} from 'react-native';
import theme from '../../../theme';
import {Fonts} from '../../../utils/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 0.5,
  },
  slide1: {
    flex: 1,
  },
  iconStyle: {
    alignSelf: 'flex-end',
    margin: 10,
  },

  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 18,
    color: theme.colors.text,
    margin: 10,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 12,
    color: theme.colors.gray,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
  postedDateContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  dividerStyle: {
    height: 1,
    width: '98%',
    color: theme.colors.gray,
    alignSelf: 'center',
    marginVertical: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  circularImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 70,
    alignSelf: 'center',
  },
});
export default styles;
