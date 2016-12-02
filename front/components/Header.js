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
        <Image source={require('../images/nu-colorr.png')} />
        <Image source={require('../images/page-1.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10, 
    alignItems: 'center'
  }
})
