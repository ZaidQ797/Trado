import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  SafeAreaView,
} from 'react-native';
import {upload} from '../../assets';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import {Header, Divider, SearchBar} from 'react-native-elements';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
import CustomModal from '../../components/Modal';
import ConditionModal from '../../components/ConditionModal/ConditionModal';
import MapModal from '../../components/MapModal';

class Trade extends Component {
  static navigationOptions = () => ({});
  constructor(props) {
    super(props);
    this.state = {
      selectedImage1: null,
      selectedImage2: null,
      selectedImage3: null,
      selectedImage4: null,
      title: '',
      price: '',
      isModalVisible: false,
      selectedCondition: '',
      condition: [
        {id: 0, name: 'Select Condition'},
        {id: 1, name: 'New'},
        {id: 2, name: 'Like New'},
        {id: 3, name: 'Good'},
        {id: 4, name: 'Fair'},
        {id: 5, name: 'Poor'},
      ],
    };
  }
  pickProfile = async clickedImage => {
    // Pick Image
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      if (clickedImage === 1) {
        this.setState({
          selectedImage1: res.uri,
        });
      }
      if (clickedImage === 2) {
        this.setState({
          selectedImage2: res.uri,
        });
      }
      if (clickedImage === 3) {
        this.setState({
          selectedImage3: res.uri,
        });
      }
      if (clickedImage === 4) {
        this.setState({
          selectedImage4: res.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  renderModel = () => {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        coverScreen={true}
        hasBackdrop={true}
        animationIn="slideInUp"
        swipeThreshold={300}
        onSwipeComplete={() => this.toggleModal()}
        swipeDirection="bottom">
        <SafeAreaView style={styles.modalViewContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.toggleModal()}>
            <Text style={styles.okButtonTextStyle}>Yes</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  render() {
    const {
      selectedImage1,
      selectedImage3,
      selectedImage2,
      selectedImage4,
      title,
      price,
      condition,
      categories,
      selectedCondition,
      selectedCategory,
    } = this.state;
    return (
      <View style={{flex:1}}>
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="Home" />}
          containerStyle={styles.headerStyle}
        />
        <Text
          style={[
            styles.largeText,
            {color: theme.colors.primary, marginLeft: 10, marginTop: 10},
          ]}>
          Upload Photos
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '4%',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.pickProfile(1)}>
            {selectedImage1 !== null ? (
              <Image
                source={{uri: selectedImage1}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 5,
                }}
                resizeMode={'cover'}
              />
            ) : (
              <Image source={upload} style={styles.uploadImage} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.pickProfile(2)}>
            {selectedImage2 !== null ? (
              <Image
                source={{uri: selectedImage2}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 5,
                }}
                resizeMode={'cover'}
              />
            ) : (
              <Image source={upload} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.pickProfile(3)}>
            {selectedImage3 !== null ? (
              <Image
                source={{uri: selectedImage3}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 5,
                }}
                resizeMode={'cover'}
              />
            ) : (
              <Image source={upload} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.pickProfile(4)}>
            {selectedImage4 !== null ? (
              <Image
                source={{uri: selectedImage4}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 5,
                }}
                resizeMode={'cover'}
              />
            ) : (
              <Image source={upload} />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Product Title'}
          value={title}
          placeholderTextColor={'gray'}
          onChangeText={title => this.setState({title: title})}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Product Price'}
          value={price}
          placeholderTextColor={'gray'}
          onChangeText={price => this.setState({price: price})}
        />
        <CustomModal />
        <ConditionModal />
        <MapModal />
      </View>
    );
  }
}

export default Trade;
