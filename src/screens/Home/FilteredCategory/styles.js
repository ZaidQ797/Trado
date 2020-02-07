import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../../theme';
import {Fonts} from '../../../utils/Fonts';
const DEVIDE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tagStyle: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default styles;
