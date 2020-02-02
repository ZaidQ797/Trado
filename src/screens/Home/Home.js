import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
import styles from './styles';
import {Header, Divider, SearchBar} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import {
  audio,
  carIcon,
  motorcycle,
  services,
  homegarden,
  house,
  kids,
  fashion,
  sport,
  phone,
  sofa,
  clock,
  car,
  shirt,
  bicycle,
} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      categories: [
        {
          key: 1,
          name: 'Cars',
          image: carIcon,
        },
        {
          key: 2,
          name: 'Motorcycles\nand others',
          image: motorcycle,
        },
        {
          key: 3,
          name: 'Electronics',
          image: phone,
        },
        {
          key: 4,
          name: 'Sports',
          image: sport,
        },
        {
          key: 5,
          name: 'Fashion',
          image: fashion,
        },
        {
          key: 6,
          name: 'Housing',
          image: house,
        },
        {
          key: 7,
          name: 'Home & Garden',
          image: homegarden,
        },
        {
          key: 8,
          name: 'Baby and Child',
          image: kids,
        },
      ],
      categoriesColors: [
        '#317FB7',
        '#F8863B',
        '#6BCEBA',
        '#A276D7',
        '#1FC4F4',
        '#E44A6C',
        '#EC7DBF',
        '#317FB7',
      ],
      products: [
        {key: 1, image: car},
        {key: 2, image: sofa},
        {key: 3, image: shirt},
        {key: 4, image: bicycle},
        {key: 5, image: clock},
      ],
    };
  }
  updateSearch = search => {
    this.setState({search: search});
  };

  renderCategories = ({item, index}) => {
    const {categoriesColors} = this.state;
    const categoryColor = categoriesColors[index % categoriesColors.length];
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.categoryStyle, {backgroundColor: categoryColor}]}>
        <Image
          source={item.image}
          resizeMode={'contain'}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    );
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
          source={item.image}
          style={styles.userImageStyle}
          resizeMode={'cover'}>
          <Ionicons
            name="ios-heart"
            size={20}
            color="white"
            style={styles.heartStyle}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    const {search, categories, products} = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="Home" />}
          containerStyle={styles.headerStyle}
        />
        <SearchBar
          placeholder="Search"
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputStyle}
          onChangeText={search => {
            this.updateSearch(search);
          }}
        />
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={this.renderCategories}
            keyExtractor={(item, index) => {
              index.toString();
            }}
          />
        </View>
        <FlatList
          data={products}
          renderItem={this.renderProducts}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }
}

export default Home;
