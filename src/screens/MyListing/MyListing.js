import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import styles from './styles';
import theme from '../../theme';
import Trading from './components/Trading';
import TradeDone from './components/TradeDone';
import Favorite from './components/Favorite';
import firebaseService from '../../service/firebase';

class MyListing extends Component {
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
    const userId = firebaseService.auth().currentUser.uid;
    const ref = firebaseService.database().ref('/Products');
    ref.on('value', snapshot => {
      if (snapshot.val() === null) return;
      this.setState(
        {
          userProducts: Object.values(snapshot.val())
            .filter(obj => obj.uid === userId)
            .map(item => item),
        },
        () => {},
      );
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
        favorite: false,
      });
    }
    if (index === 2) {
      this.setState({
        trading: false,
        tradeDone: true,
        favorite: false,
      });
    }
    if (index === 3) {
      this.setState({
        trading: false,
        tradeDone: false,
        favorite: true,
      });
    }
  };

  render() {
    const {trading, tradeDone, favorite} = this.state;
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="My Listing" />}
          containerStyle={styles.headerStyle}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={[styles.mediumText, {color: 'white'}]}>Trading</Text>
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
                  backgroundColor: favorite ? theme.colors.primary : '#303030',
                },
              ]}>
              <Text style={[styles.mediumText, {color: 'white'}]}>
                Favorite
              </Text>
            </TouchableOpacity>
          </View>
          {trading && <Trading data={this.state.userProducts} />}
          {tradeDone ? <TradeDone /> : null}
          {favorite ? <Favorite /> : null}
        </ScrollView>
      </View>
    );
  }
}

export default MyListing;
