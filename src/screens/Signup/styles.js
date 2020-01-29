import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
const Device_Width = Dimensions.get('window').width;
const Device_Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    height: Device_Height / 4,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerContainer: {
    width: '100%',
    height: Device_Height / 4,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    height: Device_Height / 4,
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

  primaryButton: {
    width: '80%',
    borderRadius: 4,
    padding: 15,
    marginVertical: 15,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationStyle: {
    height: '100%',
    width: '100%',
  },
});
export default styles;
