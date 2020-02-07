import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
const Device_Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  bottomContainer: {
    width: '100%',
    height: Device_Height / 1,
    justifyContent: 'flex-start',

    alignItems: 'center',
  },
});
export default styles;
