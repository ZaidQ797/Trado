import {StyleSheet} from 'react-native';
import theme from '../../../theme';
import {Fonts} from '../../../utils/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  formContainer: {
    flex: 0.45,
    alignItems: 'flex-end',
    marginTop: '10%',
  },
  inputStyle: {
    width: '85%',
    color: 'gray',
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 17,
    padding: 13,
  },
  buttonTextStyle: {
    fontFamily: Fonts.GoogleSansBold,
  },
  iconContainer: {
    flexDirection: 'row',
    borderBottomColor: theme.colors.lightGray,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
    alignSelf: 'center',
    margin: 12,
  },
  primaryButton: {
    width: '80%',
    borderRadius: 4,
    padding: 15,
    marginVertical: 15,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  smallTextStyle: {
    fontSize: 13,
    fontFamily: Fonts.GoogleSansMedium,
    color: theme.colors.lightGray,
    alignSelf: 'center',
  },

  signupContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5,
  },
});
export default styles;
