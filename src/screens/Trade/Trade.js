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
      selectedImage1: null,
      selectedImage2: null,
      selectedImage3: null,
      selectedImage4: null,
      downloadedUri1: null,
      downloadedUri2: null,
      downloadedUri3: null,
      downloadedUri4: null,
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
          selectedImage1: res,
        });
      }
      if (clickedImage === 2) {
        this.setState({
          selectedImage2: res,
        });
      }
      if (clickedImage === 3) {
        this.setState({
          selectedImage3: res,
        });
      }
      if (clickedImage === 4) {
        this.setState({
          selectedImage4: res,
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
    let validation = this.validateData();
    if (validation == true) {
      this.toggleLoading();
      this.uploadImage(0);
      this.uploadImage(1);
      this.uploadImage(2);
      this.uploadImage(3);
      this.toggleLoading();
    }
  };
  uploadImage = key => {
    const {
      selectedImage1,
      selectedImage2,
      selectedImage3,
      selectedImage4,
    } = this.state;
    let uri;
    switch (key) {
      case 0:
        uri = selectedImage1.uri;
        return new Promise((resolve, reject) => {
          //  file:///fkaskdjfhaskdfhasdkfhasdfhajsdkfhasdkfha.jpg
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

          //return;
          // alert(uploadUri);
          // return;
          let uploadBlob = '';
          const imageRef = firebaseService
            .storage()
            .ref('images')
            .child(uuid.v4());

          fs.readFile(uploadUri, 'base64')
            .then(data => {
              return Blob.build(data, {
                type: `${this.state.selectedImage1.type};BASE64`,
              });
            })
            .then(blob => {
              uploadBlob = blob;

              return imageRef.put(blob, {
                contentType: this.state.selectedImage1.type,
              });
            })
            .then(() => {
              uploadBlob.close();
              const downnloadImageURI = imageRef.getDownloadURL().then(url => {
                this.setState({downloadedUri1: url}, () => {
                  console.log('URI 1==============>');
                  console.log(this.state.downloadedUri1);
                  console.log('URI 1==============>');
                });
              });
              return downnloadImageURI;
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

      case 1:
        uri = selectedImage2.uri;
        return new Promise((resolve, reject) => {
          //  file:///fkaskdjfhaskdfhasdkfhasdfhajsdkfhasdkfha.jpg
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

          //return;
          // alert(uploadUri);
          // return;
          let uploadBlob = '';
          const imageRef = firebaseService
            .storage()
            .ref('images')
            .child(uuid.v4());

          fs.readFile(uploadUri, 'base64')
            .then(data => {
              return Blob.build(data, {
                type: `${this.state.selectedImage2.type};BASE64`,
              });
            })
            .then(blob => {
              uploadBlob = blob;
              console.log('====================================');
              console.log(uploadBlob);
              console.log('====================================');
              return imageRef.put(blob, {
                contentType: this.state.selectedImage2.type,
              });
            })
            .then(() => {
              uploadBlob.close();
              const downnloadImageURI = imageRef.getDownloadURL().then(url => {
                this.setState({downloadedUri2: url}, () => {
                  console.log('URI 2==============>');

                  console.log(this.state.downloadedUri2);
                  console.log('==============>');
                });
              });
              return downnloadImageURI;
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

      case 2:
        uri = selectedImage3.uri;
        return new Promise((resolve, reject) => {
          //  file:///fkaskdjfhaskdfhasdkfhasdfhajsdkfhasdkfha.jpg
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

          //return;
          // alert(uploadUri);
          // return;
          let uploadBlob = '';
          const imageRef = firebaseService
            .storage()
            .ref('images')
            .child(uuid.v4());

          fs.readFile(uploadUri, 'base64')
            .then(data => {
              return Blob.build(data, {
                type: `${this.state.selectedImage3.type};BASE64`,
              });
            })
            .then(blob => {
              uploadBlob = blob;
              console.log('====================================');
              console.log(uploadBlob);
              console.log('====================================');
              return imageRef.put(blob, {
                contentType: this.state.selectedImage3.type,
              });
            })
            .then(() => {
              uploadBlob.close();
              const downnloadImageURI = imageRef.getDownloadURL().then(url => {
                this.setState({downloadedUri3: url}, () => {
                  console.log('URI 2==============>');
                  console.log(this.state.downloadedUri3);
                  console.log('==============>');
                });
              });
              return downnloadImageURI;
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

      case 3:
        uri = selectedImage4.uri;
        return new Promise((resolve, reject) => {
          //  file:///fkaskdjfhaskdfhasdkfhasdfhajsdkfhasdkfha.jpg
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

          //return;
          // alert(uploadUri);
          // return;
          let uploadBlob = '';
          const imageRef = firebaseService
            .storage()
            .ref('images')
            .child(uuid.v4());

          fs.readFile(uploadUri, 'base64')
            .then(data => {
              return Blob.build(data, {
                type: `${this.state.selectedImage4.type};BASE64`,
              });
            })
            .then(blob => {
              uploadBlob = blob;
              console.log('====================================');
              console.log(uploadBlob);
              console.log('====================================');
              return imageRef.put(blob, {
                contentType: this.state.selectedImage4.type,
              });
            })
            .then(() => {
              uploadBlob.close();
              const downnloadImageURI = imageRef.getDownloadURL().then(url => {
                this.setState({downloadedUri4: url}, () => {
                  console.log('URI 4==============>');
                  console.log(this.state.downloadedUri4);
                  console.log('==============>');
                  this.saveUserProduct();
                });
              });
              return downnloadImageURI;
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

      default:
        return;
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
      downloadedUri1,
      downloadedUri2,
      downloadedUri3,
      downloadedUri4,
    } = this.state;
    const userId = firebaseService.auth().currentUser.uid;
    const params = {
      name: name,
      price: price,
      currency: selectedCurrency,
      description: description,
      condition: selectedCondition,
      category: selectedCategory,
      location: selectedLocation,
      images: [downloadedUri1, downloadedUri2, downloadedUri3, downloadedUri4],
      uid: userId,
    };
    //firebaseService.database().ref('/Users').push(params)
    firebaseService
      .database()
      .ref('/Products')
      .push(params)
      .then(res => {
        this.toggleLoading();
        this.setState(
          {
            name: null,
            price: null,
            description: null,
            selectedCategory: null,
            selectedCondition: null,
            selectedLocation: null,
            selectedImage1: null,
            selectedImage2: null,
            selectedImage3: null,
            selectedImage4: null,
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
  render() {
    const {
      selectedImage1,
      selectedImage3,
      selectedImage2,
      selectedImage4,
      title,
      price,
      description,
    } = this.state;
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
                source={{uri: selectedImage1.uri}}
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
                source={{uri: selectedImage2.uri}}
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
                source={{uri: selectedImage3.uri}}
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
                source={{uri: selectedImage4.uri}}
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
              {currencies &&
                currencies.map((item, index) => {
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
          style={styles.primaryButton}
          activeOpacity={0.7}
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
