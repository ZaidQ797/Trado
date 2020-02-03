import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {user} from '../../../../../assets';
import theme from '../../../../../theme';
import {Fonts} from '../../../../../utils/Fonts';
import {Rating} from 'react-native-elements';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [
        {
          id: 1,
          reviewBy: 'Ali Ahmad',
          image: user,
          date: '1-02-2020',
          rating: '4.5/5.0',
          review:
            'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
        },
        {
          id: 2,
          reviewBy: 'Ali Ahmad',
          image: user,
          date: '1-02-2020',
          rating: '4.5/5.0',
          review:
            'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
        },
      ],
    };
  }

  renderReviews = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.reviewContainer} activeOpacity={1}>
        <View style={styles.topContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image source={item.image} style={styles.imageStyle} />
            <View>
              <Text style={styles.largeText}>{item.reviewBy}</Text>
              <Text style={styles.mediumText}>{item.date}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text styles={[styles.mediumText, {padding: 5}]}>
              {item.rating}
            </Text>
            <Rating readonly startingValue={2} imageSize={10} />
          </View>
        </View>
        <Text style={styles.mediumText}>{item.review}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {reviews} = this.state;
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={reviews}
          renderItem={this.renderReviews}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
      </View>
    );
  }
}

export default Reviews;
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  reviewContainer: {
    // backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.75,
    borderColor: 'lightgray',
    elevation: 5,

    margin: 5,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 18,
    color: theme.colors.text,
    marginHorizontal: 5,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 12,
    color: theme.colors.gray,
    textAlign: 'justify',
    marginHorizontal: 5,
  },
});
