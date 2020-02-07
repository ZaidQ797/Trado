import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderCenter from '../../components/HeaderCenter';
import styles from './styles';
class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          leftComponent={<HeaderLeft navigation={this.props.navigation} />}
          centerComponent={<HeaderCenter name="About Us" />}
          containerStyle={styles.headerStyle}
        />
        <ScrollView style={{flex: 1, margin: 10}}>
          <Text style={styles.largeText}>Lorem Ipsum</Text>
          <Text style={styles.mediumText}>
            Lorem Ipsum ist ein einfacher Demo-Text für die Print- und
            Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der
            Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller
            eine Hand voll Wörter nahm und diese durcheinander warf um ein
            Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt,
            sondern auch in Spruch in die elektronische Schriftbearbeitung
            geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit
            dem erscheinen von "Letraset", welches Passagen von Lorem Ipsum
            enhielt, so wie Desktop Software wie "Aldus PageMaker" - ebenfalls
            mit Lorem Ipsum.
          </Text>
          <Text style={styles.largeText}>Lorem Ipsum</Text>
          <Text style={styles.mediumText}>
            Lorem Ipsum ist ein einfacher Demo-Text für die Print- und
            Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der
            Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller
            eine Hand voll Wörter nahm und diese durcheinander warf um ein
            Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt,
            sondern auch in Spruch in die elektronische Schriftbearbeitung
            geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit
            dem erscheinen von "Letraset", welches Passagen von Lorem Ipsum
            enhielt, so wie Desktop Software wie "Aldus PageMaker" - ebenfalls
            mit Lorem Ipsum.
          </Text>
          <Text style={styles.largeText}>Lorem Ipsum</Text>
          <Text style={styles.mediumText}>
            Lorem Ipsum ist ein einfacher Demo-Text für die Print- und
            Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der
            Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller
            eine Hand voll Wörter nahm und diese durcheinander warf um ein
            Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt,
            sondern auch in Spruch in die elektronische Schriftbearbeitung
            geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit
            dem erscheinen von "Letraset", welches Passagen von Lorem Ipsum
            enhielt, so wie Desktop Software wie "Aldus PageMaker" - ebenfalls
            mit Lorem Ipsum.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default AboutUs;
