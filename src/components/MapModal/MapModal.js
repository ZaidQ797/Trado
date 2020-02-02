import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
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
      locationset: '',
      latitude: 32.082466,
      longitude: 72.669128,
      error: null,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      description: 'Sargodha',
    };
  }

  handleSelectedLocation = () => {
    // this.setState({selectedLocation: location});
    this.toggleModal();
  };
  renderModel = () => {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      description,
      locationset,
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
              this.handleSelectedLocation();
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
              {color: locationset != '' ? '#000' : 'gray'},
            ]}>
            {locationset != '' ? locationset : 'Set Location'}
          </Text>
        </TouchableOpacity>
        {this.state.isModalVisible ? this.renderModel() : null}
      </View>
    );
  }
}

export default MapModal;
