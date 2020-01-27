import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Text style={{alignSelf: 'center', fontFamily: 'GoogleSans-Bold'}}>
      
          this is the first project on ios{' '}
        </Text>
      </SafeAreaView>
    );
  }
}

export default App;
