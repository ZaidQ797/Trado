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
class PersonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trading: true,
      tradeDone: false,
      reviews: false,
    };
  }
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
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={
            <HeaderLeft navigation={this.props.navigation} icon={'back'} />
          }
          centerComponent={<HeaderCenter name="Prodcut Details" />}
          containerStyle={styles.headerStyle}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userInfo}>
            <Image source={user} style={styles.userImageSize} />
            <Text style={styles.largeText}>Zaid Qureshi</Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={theme.colors.text}
                style={{alignSelf: 'center'}}
              />
              <Text style={styles.largeText}>Lahore,PK</Text>
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
        </ScrollView>
      </View>
    );
  }
}

export default PersonProfile;
