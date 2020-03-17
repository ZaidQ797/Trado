import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import theme from './src/theme';
//Main Nav
import MainNav from './src/navigation';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.disableYellowBox = true;
    return (
      <ThemeProvider theme={theme}>
        <MainNav />
      </ThemeProvider>
    );
  }
}

export default App;
