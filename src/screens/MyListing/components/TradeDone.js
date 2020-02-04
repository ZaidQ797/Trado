import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {bicycle, bicycle2, sofa, clock} from '../../../assets';
import {Divider} from 'react-native-elements';
import {Fonts} from '../../../utils/Fonts';
import theme from '../../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class TradeDone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tradeDone: [
        {
          id: 0,
          productGiven: 'Iphone 6s',
          productGet: 'Samsung Galaxy 2',
          conditionOfMine: 'Like New',
          conditionOfHis: 'New',
          priceOfMine: '$1234',
          priceOfHis: '$1234',
          imageOfMin: bicycle2,
          imageOfHis: bicycle,
        },
        {
          id: 1,
          productGiven: 'Iphone 6s',
          productGet: 'Samsung Galaxy 2',
          conditionOfMine: 'Like New',
          conditionOfHis: 'New',
          priceOfMine: '$1234',
          priceOfHis: '$1234',
          imageOfMin: sofa,
          imageOfHis: clock,
        },
      ],
    };
  }
  renderTradeDone = ({item, index}) => {
    return (
      <View style={styles.tradeDoneContainer}>
        <View style={styles.productContainer}>
          <Image style={styles.imageStyle} source={item.imageOfHis} />
          <Divider style={styles.dividerStyle} />
          <Text style={styles.largeText}>{item.productGiven}</Text>
          <Divider style={styles.dividerStyle} />
          <Text style={styles.mediumText}>
            Value:{'  '}
            <Text style={[styles.mediumText, {color: theme.colors.primary}]}>
              {item.priceOfMine}
            </Text>
          </Text>
          <Divider style={styles.dividerStyle} />
          <Text style={styles.mediumText}>
            Price:{'  '}
            <Text style={[styles.mediumText, {color: theme.colors.primary}]}>
              {item.conditionOfMine}
            </Text>
          </Text>
          <Divider style={styles.dividerStyle} />
        </View>
        <FontAwesome
          name="arrows-h"
          size={25}
          color={theme.colors.primary}
          style={{
            alignSelf: 'center',
            marginTop: '13%',
          }}
        />
        <View style={styles.productContainer}>
          <Image style={styles.imageStyle} source={item.imageOfMin} />
          <Text style={styles.largeText}>{item.imageOfMin}</Text>
          <Divider style={styles.dividerStyle} />
          <Text style={styles.mediumText}>
            Value:{'  '}
            <Text style={[styles.mediumText, {color: theme.colors.primary}]}>
              {item.priceOfMine}
            </Text>
          </Text>
          <Divider style={styles.dividerStyle} />
          <Text style={styles.mediumText}>
            Price:{'  '}
            <Text style={[styles.mediumText, {color: theme.colors.primary}]}>
              {item.conditionOfMine}
            </Text>
          </Text>
          <Divider style={styles.dividerStyle} />
        </View>
      </View>
    );
  };
  render() {
    const {tradeDone} = this.state;
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={tradeDone}
          renderItem={this.renderTradeDone}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default TradeDone;
export const styles = StyleSheet.create({
  tradeDoneContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    shadowOpacity: 10,
    shadowColor: 'white',
    backgroundColor: 'white',
  },
  productContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    // backgroundColor: 'white',
  },
  imageStyle: {width: '100%', height: 100},
  dividerStyle: {
    height: 0.5,
    color: 'gray',
    width: '100%',
    marginVertical: 2,
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 16,
    color: theme.colors.text,
    margin: 5,
  },
  mediumText: {
    fontFamily: Fonts.GoogleSansRegular,
    fontSize: 14,
    color: theme.colors.gray,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
});
