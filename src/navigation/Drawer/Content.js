import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {DrawerItems} from 'react-navigation-drawer';
import theme from '../../theme';
import {user} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebaseService from '../../service/firebase';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg: null,
      userName: null,
    };
  }
  componentDidMount() {
    const user = firebaseService.auth().currentUser.uid;
    const ref = firebaseService.database().ref('/Users');

    ref.once('value').then(snapshot => {
      const newFreshArr = Object.values(snapshot.val());

      this.setState(
        {
          data: newFreshArr,
        },
        () => {},
      );
    });
  }
  render() {
    return (
      <SafeAreaView
        style={styles.mainContainer}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeaderContainer}>
          <Image source={user} style={styles.userIcon} />
          <Text style={styles.largeText}>Zaid Qureshi</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.drawerItemsContainerStyle}>
          <DrawerItems {...this.props} />

          <TouchableOpacity>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <AntDesign
                  name="logout"
                  size={22}
                  color={theme.colors.primaryDark}
                />
              </View>
              <Text style={styles.label}>Logout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Content;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  drawerHeaderContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  userIcon: {
    borderRadius: 70,
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  largeText: {
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 16,
    marginTop: 10,
    color: 'white',
    marginLeft: 8,
    alignSelf: 'center',
  },
  logOutStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 18,
    fontFamily: Fonts.GoogleSansMedium,
    fontSize: 16,
    color: theme.colors.lightGray,
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
});
