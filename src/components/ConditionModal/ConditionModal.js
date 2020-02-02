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
import {
  audio,
  carIcon,
  motorcycle,
  services,
  homegarden,
  house,
  kids,
  fashion,
  sport,
  phone,
  sofa,
  clock,
  car,
  shirt,
  bicycle,
} from '../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import {fresh, likenew, poor, satisfactory, good} from '../../assets';
import {Divider} from 'react-native-elements';

class ConditionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedCondition: '',
      condition: [
        {
          key: 1,
          name: 'New',
          image: fresh,
          des: 'this is the absolutely new.Totally untouch and 100% good.',
        },
        {
          key: 2,
          name: 'Like New ',
          image: likenew,
          des: 'this is the absolutely new.Totally untouch and 100% good.',
        },
        {
          key: 3,
          name: 'Good',
          image: good,
          des: 'this is the absolutely new.Totally untouch and 100% good.',
        },
        {
          key: 4,
          name: 'Satisfactory',
          image: satisfactory,
          des: 'this is the absolutely new.Totally untouch and 100% good.',
        },
        {
          key: 5,
          name: 'Poor',
          image: poor,
          des: 'this is the absolutely new.Totally untouch and 100% good.',
        },
      ],
    };
  }
  renderConditions = ({item, index}) => {
    return (
      <View style={{flex: 1, margin: 10, padding: 5}}>
        <TouchableOpacity
          style={styles.conditionStyle}
          onPress={() => {
            this.handleSelectedCondition(item.name);
          }}>
          <Image
            source={item.image}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
          <View style={{margin: 5}}>
            <Text style={[styles.largeText]}>{item.name}</Text>
            <Text style={[styles.mediumText, {width: '80%'}]}>{item.des}</Text>
          </View>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
      </View>
    );
  };
  handleSelectedCondition = name => {
    this.setState({selectedCondition: name});
    this.toggleModal();
  };
  renderModel = () => {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        // coverScreen={true}
        // hasBackdrop={true}
        animationIn="slideInUp"
        onSwipeComplete={() => this.toggleModal()}
        swipeDirection="left">
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
            Select one of the condition
          </Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.condition}
            renderItem={this.renderConditions}
            keyExtractor={(item, index) => {
              index.toString();
            }}
          />
        </SafeAreaView>
      </Modal>
    );
  };
  // toggleModel
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  render() {
    const {selectedCondition} = this.state;
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
              {color: selectedCondition != '' ? '#000' : 'gray'},
            ]}>
            {selectedCondition != '' ? selectedCondition : 'Select Condition'}
          </Text>
        </TouchableOpacity>
        {this.state.isModalVisible ? this.renderModel() : null}
      </View>
    );
  }
}

export default ConditionModal;
