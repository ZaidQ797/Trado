import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import HeaderLeft from '../../../../components/HeaderLeft';
import HeaderCenter from '../../../../components/HeaderCenter';
import styles from './styles';
import {user} from '../../../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../../../../theme';
import Trading from './components/Trading';
import TradeDone from './components/TradeDone';
import Reviews from './components/Reviews';
import firebaseService from '../../../../service/firebase';
class PersonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trading: true,
      tradeDone: false,
      reviews: false,
      userProducts: [],
    };
  }
  componentDidMount = () => {
    this.getData();
    this.focusListner = this.props.navigation.addListener('didFocus', () => {
      // Update your data
      this.getData();
    });
  };

  getData = async () => {
    this.toggleLoading();
    const item = this.props.navigation.getParam('item');
    const ref = firebaseService.database().ref('/Products');
    ref.on('value', snapshot => {
      if (snapshot.val() === null) return;
      this.setState({
        userProducts: Object.values(snapshot.val()).filter(
          obj => obj.uid === item.uid,
        ),
      });
    });
  };
  componentWillUnmount = () => {
    this.focusListner.remove();
  };
  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };
  //change tabs
  changeTab = index => {
    if (index === 1) {
      this.setState({
        trading: true,
        tradeDone: false,
        reviews: false,
      });
    }
    if (index === 2) {
      this.setState({
        trading: false,
        tradeDone: true,
        reviews: false,
      });
    }
    if (index === 3) {
      this.setState({
        trading: false,
        tradeDone: false,
        reviews: true,
      });
    }
  };

  render() {
    const {trading, tradeDone, reviews} = this.state;
    const item = this.props.navigation.getParam('item');
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={
            <HeaderLeft navigation={this.props.navigation} icon={'back'} />
          }
          centerComponent={<HeaderCenter name="Person Profile" />}
          containerStyle={styles.headerStyle}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userInfo}>
            <Image source={{uri: item.image}} style={styles.userImageSize} />
            <Text style={styles.largeText}>{item.username}</Text>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="mail"
                size={24}
                color={theme.colors.text}
                style={{alignSelf: 'center'}}
              />
              <Text style={styles.largeText}>{item.email}</Text>
            </View>
            <Divider style={styles.dividerStyle} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.changeTab(1);
              }}
              style={[
                styles.categoryContainer,
                {
                  backgroundColor: trading ? theme.colors.primary : '#303030',
                },
              ]}>
              <Text style={[styles.mediumText, {color: 'white'}]}>
                {' '}
                Trading
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.changeTab(2);
              }}
              style={[
                styles.categoryContainer,
                {
                  backgroundColor: tradeDone ? theme.colors.primary : '#303030',
                },
              ]}>
              <Text style={[styles.mediumText, {color: 'white'}]}>
                Trade Done
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.changeTab(3);
              }}
              style={[
                styles.categoryContainer,
                {
                  backgroundColor: reviews ? theme.colors.primary : '#303030',
                },
              ]}>
              <Text style={[styles.mediumText, {color: 'white'}]}>Reviews</Text>
            </TouchableOpacity> */}
          </View>
          {trading && <Trading data={this.state.userProducts} />}
          {tradeDone && <TradeDone />}
          {/* {reviews && <Reviews />} */}
        </ScrollView>
      </View>
    );
  }
}

export default PersonProfile;
