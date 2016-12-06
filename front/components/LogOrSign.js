import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

export default class LogOrSign extends Component {
  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={Actions.logIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={Actions.signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
