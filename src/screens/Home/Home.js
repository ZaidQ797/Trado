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
import {NavigationEvents} from 'react-navigation';

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
  default_user,
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
      backup: [],
      categories: [],
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
      categories: [],
      isRefreshing: false,
    };
  }
  componentDidMount = () => {
    this.getData();
    this.focusListner = this.props.navigation.addListener('didFocus', () => {
      // Update your data
      this.getData();
    });
  };

  getCategories = () => {
    const ref = firebaseService.database().ref('/Categories');
    ref.on('value', snapshot => {
      const val = snapshot.val();
      if (val !== null) {
        const newFreshArrr = Object.values(val);
        this.setState({
          categories: newFreshArrr,
          loading: false,
        });
      } else {
        this.setState({
          categories: [],
          loading: false,
        });
      }
    });
  };

  getData = () => {
    this.getCategories();
    this.toggleLoading();
    const ref = firebaseService.database().ref('/Products');
    ref.on('value', snapshot => {
      const values = snapshot.val();
      if (values !== null) {
        const newFreshArr = Object.values(values);
        this.setState({
          data: newFreshArr,
          backup: newFreshArr,
          loading: false,
          isRefreshing: false,
        });
      } else {
        this.setState({
          data: [],
          backup: [],
          loading: false,
          isRefreshing: false,
        });
      }
    });
  };

  updateSearch = search => {
    this.setState({
      data: this.state.backup.filter(obj =>
        obj.name.toUpperCase().includes(search.toUpperCase()),
      ),
      search,
    });
  };

  componentWillUnmount = () => {
    this.focusListner.remove();
  };

  onCategoryPress = catItem => {
    const {cat_id} = catItem;
    this.setState({
      data: this.state.backup.filter(item => item.cat_id === cat_id),
    });
  };

  renderCategories = ({item, index}) => {
    const {categoriesColors} = this.state;
    const categoryColor = categoriesColors[index % categoriesColors.length];
    return (
      <View style={styles.catContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.categoryStyle, {backgroundColor: categoryColor}]}
          onPress={() => {
            this.onCategoryPress(item);
          }}
          key={index}>
          <Image
            source={
              item !== null
                ? {uri: item !== null ? item.image : ''}
                : default_user
            }
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.catTitle}>
          {item.name}
        </Text>
      </View>
    );
  };

  renderProducts = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.productContainer}
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate('ProductDetail', {item});
        }}>
        <ImageBackground
          key={index}
          source={item !== null ? {uri: item.images[0]} : default_user}
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
        <Text
          style={{
            margin: 5,
            color: '#000',
            fontFamily: Fonts.GoogleSansRegular,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  hanleFav = item => {
    // const {u_id} = item;
    // this.setState({
    //   data: this.state.data.map(item => {
    //     if (item.u_id === u_id) {
    //       return {
    //         ...item,
    //         isFav: !item.isFav,
    //       };
    //     }
    //     return item;
    //   }),
    // });
  };
  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  onRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        setTimeout(() => {
          this.getData();
        }, 1000);
      },
    );
  };

  render() {
    const {search, categories, products} = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationEvents
          onDidFocus={this.getData}
          onWillFocus={() => this.setState({loading: true})}
        />
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="Home" />}
          containerStyle={styles.headerStyle}
        />
        <SearchBar
          placeholder="Search"
          value={search}
          inputStyle={{fontFamily: Fonts.GoogleSansRegular}}
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
            extraData={categories}
            renderItem={this.renderCategories}
            keyExtractor={(item, index) => {
              index.toString();
            }}
          />
        </View>

        {!this.state.loading && this.state.data.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Data Available</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.data}
            extraData={this.state}
            renderItem={this.renderProducts}
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            keyExtractor={index => {
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
