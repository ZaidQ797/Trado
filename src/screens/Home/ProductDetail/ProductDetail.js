import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {Header, Divider, Rating} from 'react-native-elements';
import HeaderLeft from '../../../components/HeaderLeft';
import HeaderCenter from '../../../components/HeaderCenter';
import {bicycle1, bicycle2, bicycle3, user} from '../../../assets';
import theme from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperImages: [
        {id: 1, image: bicycle1},
        {id: 2, image: bicycle2},
        {id: 3, image: bicycle3},
      ],
    };
  }

  render() {
    const id = this.props.navigation.getParam('id');
    console.warn(id);
    const {swiperImages} = this.state;
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
          {swiperImages &&
            swiperImages.map(item => {
              return (
                <ImageBackground style={styles.slide1} source={item.image}>
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
                    <Ionicons name="ios-heart" color={'white'} size={22} />
                    <Ionicons name="md-share-alt" color={'white'} size={25} />
                  </View>
                </ImageBackground>
              );
            })}
        </Swiper>
        <ScrollView style={{flex: 1}}>
          <Text style={[styles.largeText, {width: '100%'}]}>
            Orignal Audi Bicycle with auto padal 2020 Modal{'   '}
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
                1800 PKR
              </Text>
            }
          </Text>
          <Text style={styles.mediumText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled
          </Text>
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
                  Good
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
          <View
            style={[
              styles.horizontalContainer,
              {
                marginHorizontal: 12,
              },
            ]}>
            <Image
              source={user}
              resizeMode={'contain'}
              style={styles.circularImageStyle}
            />

            <View>
              <Text style={styles.largeText}>Imran Ali</Text>
              <Rating
                imageSize={15}
                readonly
                startingValue={4}
                style={styles.ratingStyle}
                ratingBackgroundColor="black"
              />
            </View>
          </View>
          <Divider style={styles.dividerStyle} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ProductDetail;
