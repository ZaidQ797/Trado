import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.21,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameStyle: {
    fontFamily: Fonts.GoogleSansBold,
    fontSize: 40,
    alignSelf: 'center',
    color: 'white',
  },
  heading: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 21,
    color: theme.colors.secondary,
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 16,
    color: theme.colors.secondary,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 12,
    color: theme.colors.gray,
  },
  bottomContainer: {
    flex: 0.64,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    // backgroundColor: 'green',
  },

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainer: {
    width: '35%',
    paddingVertical: 10,
    paddingHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  inputFieldStyle: {
    width: '80%',
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
  },
  primaryButton: {
    width: '80%',
    borderRadius: 4,
    padding: 15,
    marginVertical: 15,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
