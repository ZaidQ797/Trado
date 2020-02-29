import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../theme';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

class MapModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      locationset: null,
      latitude: 32.082466,
      longitude: 72.669128,
      error: null,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      description: 'Sargodha',
    };
  }

  handleSelectedLocation = value => {
    this.setState({locationset: value}, () => {
      this.props.getSelectedLocation(this.state.locationset);
    });
    this.toggleModal();
  };
  renderModel = () => {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      description,
    } = this.state;
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        // coverScreen={true}
        // hasBackdrop={true}
        animationIn="slideInUp"
        onSwipeComplete={() => this.toggleModal()}
        swipeDirection="up">
        <SafeAreaView style={styles.modalViewContainer}>
          <Entypo
            name="cross"
            size={23}
            color={theme.colors.gray}
            style={styles.cross}
            onPress={() => this.toggleModal()}
          />
          <Text
            style={[
              styles.largeText,
              {alignSelf: 'center', marginVertical: '1%', fontSize: 18},
            ]}>
            Set your meeting point
          </Text>
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
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={1}
            onPress={() => {
              this.handleSelectedLocation('lat and long');
            }}>
            <Text style={[styles.largeText, {color: 'white'}]}>
              Set Location
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  // toggleModel
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  // storagePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Fine Location',
  //         message: 'App needs access to get current location ',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       //Alert.alert('Permission granted', 'Now you can download anything!');
  //     } else {
  //       Alert.alert(
  //         'Permission Denied!',
  //         'You need to give location  permission to set location',
  //       );
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  render() {
    const {locationset} = this.state;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.toggleModal();
          }}>
          <Text
            style={[
              styles.textInputStyle,
              {color: locationset != null ? '#000' : 'gray'},
            ]}>
            {locationset != null ? locationset : 'Set Location'}
          </Text>
        </TouchableOpacity>
        {this.state.isModalVisible ? this.renderModel() : null}
      </View>
    );
  }
}

export default MapModal;
