import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import {uploadPic} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import theme from '../../theme';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: '',
      name: 'Muhammad Zaid Qureshi',
      email: 'qzaid797@gmail.com',
      password: '123456',
    };
  }
  pickProfile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        selectedImage: res,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  onChangeName = name => {
    this.setState({name: name});
  };

  onChangeEmail = email => {
    this.setState({email: email});
  };

  onChangePassword = password => {
    this.setState({password: password});
  };

  render() {
    const {selectedImage, name, email, password} = this.state;
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="Profile" />}
          containerStyle={styles.headerStyle}
        />
        <View
          style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.pickProfile()}>
            {selectedImage !== '' ? (
              <Image
                source={{uri: selectedImage.uri}}
                style={{width: 100, height: 100, borderRadius: 50}}
                resizeMode={'cover'}
              />
            ) : (
              <Image
                source={uploadPic}
                style={{width: 80, height: 80}}
                resizeMode={'contain'}
              />
            )}
            <Text style={{fontFamily: Fonts.OpenSans, paddingTop: 5}}>
              {selectedImage !== '' ? 'Change' : 'Upload your picture'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            placeholder="Enter your Name"
            keyboardType="default"
            style={styles.inputFieldStyle}
            value={name}
            onChangeText={name => this.onChangeName(name)}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            style={styles.inputFieldStyle}
            onChangeText={email => this.onChangeEmail(email)}
          />
          <TextInput
            placeholder="Enter Password"
            keyboardType="name-phone-pad"
            secureTextEntry
            value={password}
            style={styles.inputFieldStyle}
            onChangeText={password => this.onChangePassword(password)}
          />

          <TouchableOpacity style={styles.primaryButton} activeOpacity={1}>
            <Text style={[styles.largeText, {color: theme.colors.white}]}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Profile;
