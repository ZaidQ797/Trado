import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
import styles from './styles';
import {Header, Divider, SearchBar} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';

import {
  carIcon,
  motorcycle,
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
  featured,
} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebaseService from '../../service/firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: false,
      data: [],
      categories: [
        {
          key: 0,
          name: 'Featured',
          image: featured,
          selected: true,
        },
        {
          key: 1,
          name: 'Cars',
          image: carIcon,
          width: '30%',
        },
        {
          key: 2,
          name: 'Motorcycles\nand others',
          image: motorcycle,
          width: '30%',
        },
        {
          key: 3,
          name: 'Electronics',
          image: phone,
          width: '30%',
        },
        {
          key: 4,
          name: 'Sports',
          image: sport,
          width: '30%',
        },
        {
          key: 5,
          name: 'Fashion',
          image: fashion,
          width: '30%',
        },
        {
          key: 6,
          name: 'Housing',
          image: house,
          width: '30%',
        },
        {
          key: 7,
          name: 'Home & Garden',
          image: homegarden,
          width: '30%',
        },
        {
          key: 8,
          name: 'Baby and Child',
          image: kids,
          width: '30%',
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
        {id: 1, image: car, selected: false},
        {id: 2, image: sofa, selected: false},
        {id: 3, image: shirt, selected: false},
        {id: 4, image: bicycle, selected: false},
        {id: 5, image: clock, selected: false},
      ],
    };
  }
  componentDidMount() {
    this.toggleLoading();
    const ref = firebaseService.database().ref('/Procuts');
    ref.once('value').then(snapshot => {
      const newFreshArr = Object.values(snapshot.val());

      this.setState(
        {
          data: newFreshArr,
        },
        () => {
          this.toggleLoading();
        },
      );
    });
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
        style={[styles.categoryStyle, {backgroundColor: categoryColor}]}
        onPress={() => {
          this.props.navigation.navigate('FilteredCategory', {
            item: item,
          });
        }}>
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
          key={index}
          source={{uri: item.image.toString()}}
          style={styles.userImageStyle}
          resizeMode={'cover'}>
          <Ionicons
            onPress={() => {
              this.hanleFav(item);
            }}
            name="ios-heart"
            size={20}
            color={item.isFav ? theme.colors.primary : 'white'}
            style={styles.heartStyle}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  hanleFav = item => {
    const {id} = item;
    this.setState({
      data: this.state.data.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isFav: !item.isFav,
          };
        }
        return item;
      }),
    });
  };
  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
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
        {this.state.loading ? (
          <ActivityIndicator
            animating
            color={theme.colors.primary}
            // style={visible ? loader.centering : loader.hideIndicator}
            size="large"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,

              backgroundColor: 'transparent',
            }}
          />
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={this.renderProducts}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        )}
      </SafeAreaView>
    );
  }
}

export default Home;
