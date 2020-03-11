import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  SafeAreaView,
  ActivityIndicator,
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
import firebaseService from '../../service/firebase';
import Snackbar from 'react-native-snackbar';
import uuid from 'react-native-uuid';
import RNFetchBlob from 'rn-fetch-blob';
import {log} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Trade extends Component {
  static navigationOptions = () => ({});
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedCurrency: null,
      name: null,
      price: null,
      description: null,
      isModalVisible: false,
      selectedCondition: null,
      selectedCategory: null,
      selectedLocation: null,
      loading: false,
      condition: [
        {id: 0, name: 'Select Condition'},
        {id: 1, name: 'New'},
        {id: 2, name: 'Like New'},
        {id: 3, name: 'Good'},
        {id: 4, name: 'Fair'},
        {id: 5, name: 'Poor'},
      ],
      currencies: [
        {id: 0, name: 'Currency'},
        {id: 1, name: 'PKR'},
        {id: 2, name: '$'},
        {id: 3, name: 'EURO'},
        {id: 4, name: 'SAR'},
        {id: 5, name: 'AED'},
      ],
      imagesUploaded: false,
      uploading: false,
      uploadedImagesURL: [],
    };
  }
  pickProfile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        images: results,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
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
  handleProduct = () => {
    if (this.validateData()) {
      this.saveUserProduct();
    }
  };
  uploadImageToFirebase = ({uri, type, name, size}) => {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = '';
      const imageRef = firebaseService
        .storage()
        .ref('images')
        .child(uuid.v4());

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {
            type: `${type};BASE64`,
          });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {
            contentType: type,
          });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          this.toggleLoading();
          alert(error);
          reject(error);
        });
    });
  };
  uploadImage = async () => {
    try {
      this.setState({uploading: true});
      const res = await Promise.all(
        this.state.images.map(item => {
          return this.uploadImageToFirebase(item);
        }),
      );
      this.setState({
        uploading: false,
        uploadedImagesURL: res,
        imagesUploaded: true,
      });
    } catch (err) {
      console.warn(err);
    }
  };
  //Save Product
  saveUserProduct = () => {
    const {
      name,
      price,
      description,
      selectedLocation,
      selectedCondition,
      selectedCurrency,
      selectedCategory,
    } = this.state;
    const userId = firebaseService.auth().currentUser.uid;
    const params = {
      name,
      price,
      currency: selectedCurrency,
      description: description,
      condition: selectedCondition,
      category: selectedCategory.cat_id,
      location: selectedLocation,
      images: this.state.uploadedImagesURL,
      uid: userId,
    };
    firebaseService
      .database()
      .ref('/Products')
      .push(params)
      .then(res => {
        this.toggleLoading();
        this.setState(
          {
            name: '',
            price: '',
            description: null,
            selectedCategory: null,
            selectedCondition: null,
            selectedLocation: null,
          },
          () => {
            this.props.navigation.push('Home');
          },
        );
      })
      .catch(err => {
        alert(err);
      });
  };
  // validate User's Register Data...
  validateData = () => {
    const {
      title,
      price,
      description,
      selectedImage1,
      selectedImage2,
      selectedImage3,
      selectedImage4,
      selectedCondition,
      selectedCategory,
      selectedLocation,
      selectedCurrency,
    } = this.state;
    // console.warn(gotImage, name, email, number, address, password);
    if (
      selectedImage1 === null ||
      selectedImage2 === null ||
      selectedImage3 === null ||
      selectedImage4 === null
    ) {
      Snackbar.show({
        text: 'Kindly upload  Images',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: theme.colors.primary,
        fontFamily: Fonts.GoogleSansMedium,
      });
      return false;
    } else {
      if (title === null) {
        Snackbar.show({
          text: 'Kindly enter Product name',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      } else {
        if (price === null) {
          Snackbar.show({
            text: 'Kindly enter product price',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: theme.colors.primary,
            fontFamily: Fonts.GoogleSansMedium,
          });
          return false;
        }
      }

      if (selectedCurrency === null) {
        Snackbar.show({
          text: 'Kindly select currency',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      }

      if (selectedCategory === null) {
        Snackbar.show({
          text: 'Kindly select category',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      }
      if (selectedCondition === null) {
        Snackbar.show({
          text: 'Kindly select condition',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      }
      if (selectedLocation === null) {
        Snackbar.show({
          text: 'Kindly select Location',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      }
      if (description === null) {
        Snackbar.show({
          text: 'Kindly add your product description',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.primary,
          fontFamily: Fonts.GoogleSansMedium,
        });
        return false;
      } else return true;
    }
  };

  renderImage = ({item, index}) => {
    return (
      <Image
        key={index}
        source={{uri: item.uri}}
        style={{height: 100, width: 100, borderRadius: 5, margin: 2}}
      />
    );
  };

  render() {
    const {title, price, description} = this.state;
    return (
      <View style={{flex: 1}}>
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
        {this.state.images.length === 0 && (
          <TouchableOpacity onPress={this.pickProfile}>
            <Image
              source={upload}
              style={{alignSelf: 'center', width: 100, height: 100}}
            />
          </TouchableOpacity>
        )}

        {this.state.images.length > 0 && (
          <View>
            <FlatList
              data={this.state.images}
              horizontal
              renderItem={this.renderImage}
              showsHorizontalScrollIndicator={false}
              keyExtractor={index => index.toString()}
            />
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            {opacity: this.state.imagesUploaded ? 0.5 : 0.9},
          ]}
          activeOpacity={0.7}
          disabled={this.state.uploadedImagesURL.length > 0}
          onPress={this.uploadImage}>
          {this.state.uploading ? (
            <ActivityIndicator animating size={'large'} color={'#fff'} />
          ) : (
            <Text style={[styles.largeText, {color: theme.colors.white}]}>
              {this.state.imagesUploaded ? 'Uploaded Success' : 'Upload Images'}
            </Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Product Title'}
          value={title}
          placeholderTextColor={'gray'}
          onChangeText={name => this.setState({name})}
        />
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TextInput
            style={[styles.textInputStyle, {width: '50%'}]}
            placeholder={'Product Price'}
            value={price}
            placeholderTextColor={'gray'}
            onChangeText={price => this.setState({price: price})}
          />
          {Platform.OS === 'ios' ? (
            <Picker
              selectedValue={this.state.selectedCurrency}
              placeholder="Currency"
              style={[styles.textInputStyle, {width: '40%'}]}
              itemStyle={{
                height: 40,
                borderRadius: 5,
                fontFamily: Fonts.GoogleSansMedium,
                fontSize: 14,
              }}
              onValueChange={value => {
                this.setState({selectedCurrency: value}, () => {
                  console.warn(value);
                });
              }}>
              {this.state.currencies &&
                this.state.currencies.map((item, index) => {
                  switch (item.id) {
                    case 1:
                      return (
                        <Picker.Item label={item.name} value={item.name} />
                      );
                    default:
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          style={styles.mediumText}
                        />
                      );
                  }
                })}
            </Picker>
          ) : (
            <View
              style={[
                styles.textInputStyle,
                {width: '40%', paddingVertical: 10, paddingHorizontal: 0},
              ]}>
              <Picker
                selectedValue={this.state.selectedCurrency}
                style={{width: '100%', borderRadius: 5, height: 28}}
                prompt={'Select Currency'}
                placeholder={'none'}
                onValueChange={value => {
                  this.setState({selectedCurrency: value});
                }}>
                {this.state.currencies &&
                  this.state.currencies.map((item, index) => {
                    switch (item.id) {
                      case item.id === '0':
                        return (
                          <Picker.Item
                            id={index}
                            label={item.name}
                            value={item.name}
                          />
                        );
                      default:
                        return (
                          <Picker.Item
                            id={index}
                            label={item.name}
                            value={item.name}
                          />
                        );
                    }
                  })}
              </Picker>
            </View>
          )}
        </View>
        <CustomModal
          getSelectedCategory={(selectedCategory, id) => {
            this.setState({selectedCategory: selectedCategory});
          }}
        />
        <ConditionModal
          getSelectedCondition={selectedCondition => {
            this.setState({selectedCondition: selectedCondition});
          }}
        />
        <MapModal
          getSelectedLocation={selectedLocation => {
            this.setState({selectedLocation: selectedLocation});
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Product Description'}
          value={description}
          multiline={true}
          textAlignVertical="top"
          placeholderTextColor={'gray'}
          onChangeText={description =>
            this.setState({description: description})
          }
        />
        <TouchableOpacity
          style={[
            styles.primaryButton,
            {opacity: this.state.imagesUploaded ? 0.9 : 0.5},
          ]}
          activeOpacity={0.7}
          disabled={!this.state.imagesUploaded}
          onPress={this.handleProduct}>
          <Text style={[styles.largeText, {color: theme.colors.white}]}>
            Add Product
          </Text>
        </TouchableOpacity>
        {this.state.loading ? (
          <ActivityIndicator
            animating
            color={theme.colors.primary}
            // style={visible ? loader.centering : loader.hideIndicator}
            size="large"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : null}
      </View>
    );
  }
}

export default Trade;
