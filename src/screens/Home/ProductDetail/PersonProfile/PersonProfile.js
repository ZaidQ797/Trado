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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    };
  }
  componentDidMount = () => {
    this.getData();
    this.focusListner = this.props.navigation.addListener('didFocus', () => {
      // Update your data
      this.getData();
    });
  };

  getData = () => {
    this.toggleLoading();
    const uid = this.props.navigation.getParam('uid');

    const newArr = [];
    const ref = firebaseService.database().ref('/Products');

    ref.on('value', snapshot => {
      const values = snapshot.val();
      if (values !== null) {
        const newFreshArr = Object.values(values);

        // for (let item in newFreshArr) {
        //   console.log(item);
        // }:

        const userID = firebaseService.auth().currentUser.uid;

        const uidProducts = newFreshArr.map(item => {
          if (item.uid === userID) {
            return item;
          }
          return;
        });

        alert(uidProducts);

        // newFreshArr.forEach((item, index) => {
        //   console.log(item);
        // });

        // for (let i = 0; i <= newFreshArr.length; i++) {
        //   if (newFreshArr[1].uid === uid) {
        //     newArr.push(newFreshArr[i]);
        //   }
        // }

        this.setState({
          data: newFreshArr,
          loading: false,
        });
      } else {
        this.setState({
          data: [],
          loading: false,
        });
      }
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
    const userName = this.props.navigation.getParam('username');
    const userImg = this.props.navigation.getParam('userImg');
    const userLocation = this.props.navigation.getParam('location');
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
            <Image source={{uri: userImg}} style={styles.userImageSize} />
            <Text style={styles.largeText}>{userName}</Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={theme.colors.text}
                style={{alignSelf: 'center'}}
              />
              <Text style={styles.largeText}>{userLocation}</Text>
            </View>
            <Divider style={styles.dividerStyle} />
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
          {trading ? <Trading /> : null}
          {tradeDone ? <TradeDone /> : null}
          {reviews ? <Reviews /> : null}
        </ScrollView>
      </View>
    );
  }
}

export default PersonProfile;
