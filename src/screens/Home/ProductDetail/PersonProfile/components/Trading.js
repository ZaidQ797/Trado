import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {sofa, clock, car, shirt, bicycle} from '../../../../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Trading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.data,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      this.setState({
        products: this.props.data,
      });
    }
  };

  renderProducts = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate('ProductDetail', {id: index});
        }}>
        <ImageBackground
          source={{uri: item.images[0]}}
          style={styles.userImageStyle}
          resizeMode={'cover'}>
          <Ionicons
            name="ios-heart"
            size={20}
            color="white"
            style={styles.heartStyle}
          />
        </ImageBackground>
        <Text>{item.name}</Text>
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
export default Trading;
