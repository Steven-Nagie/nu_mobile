import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

export default class LogOrSign extends Component {
  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight style={[styles.button, {margin: 20}]} onPress={Actions.logIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        <Image source={require('../images/nu-colorr.png')} />
        <TouchableHighlight style={[styles.button, {margin: 20}]} onPress={Actions.signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
