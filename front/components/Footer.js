import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Header extends Component {
  render() {
    return(
      <View style={styles.main}>
        <TouchableHighlight onPress={Actions.calculator}>
          <Image style={styles.icon} source={require('../images/footIcons/footprint.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={Actions.challenges}>
          <Image style={styles.icon} source={require('../images/footIcons/trophy.png')} />
        </TouchableHighlight>
        <Image style={styles.icon} source={require('../images/footIcons/stats.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 30
  }
})
