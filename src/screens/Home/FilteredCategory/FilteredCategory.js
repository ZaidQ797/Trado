import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import theme from '../../../theme';
import {Fonts} from '../../../utils/Fonts';
import {Header, Divider, SearchBar} from 'react-native-elements';
import HeaderLeft from '../../../components/HeaderLeft';
import HeaderCenter from '../../../components/HeaderCenter';
import Entypo from 'react-native-vector-icons/Entypo';
class FilteredCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterCategory: [],
    };
  }

  render() {
    // const name = this.props.navigation.getParam('name');
    // const width = this.props.navigation.getParam('width');
    const item = this.props.navigation.getParam('item');
    this.state.filterCategory.push(item);
    console.warn(this.state.filterCategory.name);
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={
            <HeaderLeft navigation={this.props.navigation} icon="back" />
          }
          centerComponent={<HeaderCenter name={name} />}
          containerStyle={styles.headerStyle}
        />
        {/* <TouchableOpacity
          style={[styles.tagStyle, {width: width}]}
          activeOpacity={1}>
          <Text style={{alignSelf: 'center'}}>{name}</Text>
          <Entypo
            name="cross"
            size={18}
            style={{alignSelf: 'center', color: 'gray'}}
            onPress={() => this.props.navigation.goBack()}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default FilteredCategory;
