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
        <View style={styles.right}>
          <Image source={require('../images/notification-bell.png')} />
          <TouchableHighlight onPress={Actions.profile}>
            <Image source={require('../images/steven.jpg')} style={styles.thumbnail} />
          </TouchableHighlight>
          <Image source={require('../images/triangle-header.png')} style={styles.triangle}/>
        </View>
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
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10
  },
  triangle: {
    height: 8,
    width: 8,
    marginTop: 3,
    marginLeft: 3
  }
})
