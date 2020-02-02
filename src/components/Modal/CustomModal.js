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
  
  carIcon,
  motorcycle,
 
  homegarden,
  house,
  kids,
  fashion,
  sport,
  phone,
 
} from '../../assets';
import Entypo from 'react-native-vector-icons/Entypo';

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      price: '',
      selectedCategory: '',
      categories: [
        {
          key: 1,
          name: 'Cars',
          image: carIcon,
        },
        {
          key: 2,
          name: 'Motorcycles ',
          image: motorcycle,
        },
        {
          key: 3,
          name: 'Electronics',
          image: phone,
        },
        {
          key: 4,
          name: 'Sports',
          image: sport,
        },
        {
          key: 5,
          name: 'Fashion',
          image: fashion,
        },
        {
          key: 6,
          name: 'Housing',
          image: house,
        },
        {
          key: 7,
          name: 'Household',
          image: homegarden,
        },
        {
          key: 8,
          name: 'Baby and Child',
          image: kids,
        },
      ],
      categoriesColors: [
        '#317FB7',
        '#F8863B',
        '#6BCEBA',
        '#A276D7',
        '#1FC4F4',
        '#E44A6C',
        '#EC7DBF',
        '#317FB7',
      ],
    };
  }
  renderCategories = ({item, index}) => {
    const {categoriesColors} = this.state;
    const categoryColor = categoriesColors[index % categoriesColors.length];
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          flex: 1,
          // backgroundColor: 'tomato',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.handleSelectedCategory(item.name);
          }}
          activeOpacity={1}
          style={[styles.categoryStyle, {backgroundColor: categoryColor}]}>
          <Image source={item.image} style={styles.iconStyle} />
        </TouchableOpacity>
        <Text style={[styles.mediumText, {}]}>{item.name}</Text>
      </View>
    );
  };
  handleSelectedCategory = name => {
    this.setState({selectedCategory: name});
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
            What are you selling
          </Text>

          <FlatList
            numColumns={4}
            showsHorizontalScrollIndicator={false}
            data={this.state.categories}
            renderItem={this.renderCategories}
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
    const {selectedCategory} = this.state;
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
              {color: selectedCategory != '' ? '#000' : 'gray'},
            ]}>
            {selectedCategory != '' ? selectedCategory : 'Select Category'}
          </Text>
        </TouchableOpacity>
        {this.state.isModalVisible ? this.renderModel() : null}
      </View>
    );
  }
}

export default CustomModal;
