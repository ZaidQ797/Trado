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
import firebaseService from '../../service/firebase';
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedCategory: null,
      categories: [],
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
  componentDidMount = async () => {
    const ref = firebaseService.database().ref('/Categories');
    ref.on('value', snapshot => {
      const val = snapshot.val();
      if (val !== null) {
        const newFreshArrr = Object.values(val);
        this.setState({
          categories: newFreshArrr,
          loading: false,
        });
      } else {
        this.setState({
          categories: [],
          loading: false,
        });
      }
    });
  };

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
            this.handleSelectedCategory(item);
          }}
          activeOpacity={1}
          style={[styles.categoryStyle, {backgroundColor: categoryColor}]}>
          <Image source={{uri: item.image}} style={styles.iconStyle} />
        </TouchableOpacity>
        <Text style={[styles.mediumText, {}]}>{item.name}</Text>
      </View>
    );
  };
  handleSelectedCategory = item => {
    this.setState({selectedCategory: item}, () => {
      this.props.getSelectedCategory(this.state.selectedCategory);
    });
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
              {color: selectedCategory != null ? '#000' : 'gray'},
            ]}>
            {selectedCategory != null
              ? selectedCategory.name
              : 'Select Category'}
          </Text>
        </TouchableOpacity>
        {this.state.isModalVisible ? this.renderModel() : null}
      </View>
    );
  }
}

export default CustomModal;
