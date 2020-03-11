import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {Header, Divider, Rating} from 'react-native-elements';
import HeaderLeft from '../../../components/HeaderLeft';
import HeaderCenter from '../../../components/HeaderCenter';
import {
  bicycle1,
  bicycle2,
  bicycle3,
  user,
  default_user,
} from '../../../assets';
import theme from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firebaseService from '../../../service/firebase';
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 32.082466,
      longitude: 72.669128,
      error: null,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      description: 'Sargodha',
      isFavorite: false,
      swiperImages: [],
      user: null,
    };
  }
  componentDidMount = () => {
    const item = this.props.navigation.getParam('item');
    const {uid} = item;
    const ref = firebaseService
      .database()
      .ref('/Users')
      .child(uid);
    ref
      .once('value')
      .then(snapshot => {
        this.setState(
          {
            user: snapshot.val(),
          },
          () => {
            console.warn(this.state.user);
          },
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
  toggleFavorite = () => {
    this.setState({isFavorite: !this.state.isFavorite});
  };
  render() {
    const item = this.props.navigation.getParam('item');

    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      description,
    } = this.state;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <Header
          leftComponent={
            <HeaderLeft navigation={this.props.navigation} icon={'back'} />
          }
          centerComponent={<HeaderCenter name="Prodcut Details" />}
          containerStyle={styles.headerStyle}
        />

        <Swiper
          autoplay
          containerStyle={styles.wrapper}
          dotColor="white"
          activeDotColor={theme.colors.primary}>
          {item &&
            item.images.map(item => {
              return (
                <ImageBackground style={styles.slide1} source={{uri: item}}>
                  <View
                    style={[
                      styles.slide1,
                      {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        justifyContent: 'space-between',
                        padding: 10,
                        flexDirection: 'row',
                      },
                    ]}>
                    <Ionicons
                      name="ios-heart"
                      color={
                        this.state.isFavorite ? theme.colors.primary : 'white'
                      }
                      size={22}
                      onPress={() => {
                        this.toggleFavorite();
                      }}
                    />
                    <Ionicons name="md-share-alt" color={'white'} size={25} />
                  </View>
                </ImageBackground>
              );
            })}
        </Swiper>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Text style={[styles.largeText, {width: '100%'}]}>
            {item.name}
            <Text
              style={[
                styles.largeText,
                {
                  color: theme.colors.primary,
                  fontSize: 20,
                  alignSelf: 'flex-end',
                },
              ]}>
              {item.price} PKR
            </Text>
          </Text>
          <Text style={styles.mediumText}>{item.description}</Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[styles.largeText]}>
              Condition:{'   '}
              {
                <Text
                  style={[
                    styles.largeText,
                    {
                      color: theme.colors.primary,
                      fontSize: 20,
                      alignSelf: 'flex-end',
                    },
                  ]}>
                  {item.condition}
                </Text>
              }
            </Text>
            <View style={styles.postedDateContainer}>
              <AntDesign name="clockcircle" size={18} color="gray" />
              <Text style={[styles.mediumText, {alignSelf: 'center'}]}>
                2 days ago
              </Text>
            </View>
          </View>
          <Divider style={styles.dividerStyle} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate('PersonProfile', {
                item: this.state.user,
              });
            }}
            style={[
              styles.horizontalContainer,
              {
                marginHorizontal: 12,
              },
            ]}>
            <Image
              source={
                this.state.user !== null
                  ? {uri: this.state.user.image}
                  : default_user
              }
              resizeMode={'cover'}
              style={styles.circularImageStyle}
            />
            <View>
              <Text style={styles.largeText}>
                {this.state.user && this.state.user.username}
              </Text>
              <Rating
                imageSize={15}
                readonly
                startingValue={4}
                style={styles.ratingStyle}
                ratingBackgroundColor="black"
              />
            </View>
            <Ionicons
              name="ios-arrow-forward"
              size={20}
              color={theme.colors.gray}
              style={{position: 'absolute', right: 0, alignSelf: 'center'}}
            />
          </TouchableOpacity>

          <Divider style={styles.dividerStyle} />
          <Text style={[styles.largeText, {margin: 5}]}>Location</Text>
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              scrollEnabled={false}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              }}>
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                title="TechNDevs"
                description={description}
              />
            </MapView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ProductDetail;
