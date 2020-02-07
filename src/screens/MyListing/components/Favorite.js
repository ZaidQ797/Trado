import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {sofa, clock, car, shirt, bicycle} from '../../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../../theme';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {key: 1, image: car, selected: true},
        {key: 2, image: sofa, selected: true},
        {key: 3, image: shirt, selected: true},
        {key: 4, image: bicycle, selected: true},
        {key: 5, image: clock, selected: true},
      ],
    };
  }
  renderProducts = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate('ProductDetail', {id: index});
        }}>
        <ImageBackground
          source={item.image}
          style={styles.userImageStyle}
          resizeMode={'cover'}>
          <Ionicons
            name="ios-heart"
            size={20}
            color={item.selected ? theme.colors.primary : 'white'}
            style={styles.heartStyle}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    const {products} = this.state;
    return (
      <FlatList
        data={products}
        renderItem={this.renderProducts}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    );
  }
}
export const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    elevation: 4,
    shadowOpacity: 5,
    flex: 0.5,
    borderRadius: 5,
    margin: 5,
    alignItems: 'flex-start',
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
  heartStyle: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});
export default Favorite;
