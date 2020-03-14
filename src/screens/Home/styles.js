import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatListMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 15,
    color: theme.colors.secondary,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 12,
    color: theme.colors.gray,
    textAlign: 'center',
  },
  headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 5,
    fontFamily: Fonts.GoogleSansRegular,
  },
  categoryStyle: {
    borderRadius: 60,
    backgroundColor: 'tomato',
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    alignSelf: 'center',
    padding: 15,
  },
  iconStyle: {
    height: 40,
    width: 40,
    // borderRadius: 50,
    padding: 10,
  },
  heartStyle: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  productContainer: {
    backgroundColor: 'white',
    elevation: 4,
    shadowOpacity: 5,
    flex: 0.5,
    borderRadius: 5,
    margin: 5,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    shadowColor: 'lightgray',
    borderRadius: 5,
  },
  userImageStyle: {
    height: 170,
    width: '100%',
    borderRadius: 5,
  },
  catTitle: {
    marginVertical: 2,
    marginHorizontal: 2,
    textAlign: 'center',
    fontFamily: Fonts.GoogleSansRegular,
  },
  catContainer: {
    width: Dimensions.get('window').width / 5,
  },
});
export default styles;
