import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
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
  primaryButton: {
    width: '90%',
    borderRadius: 4,
    padding: 15,
    marginVertical: 15,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  modalViewContainer: {
    borderRadius: 5,

    backgroundColor: 'white',
    height: 400,
    width: '100%',
  },
});
export default styles;
