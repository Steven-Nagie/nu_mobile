import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';

class Calculator extends Component {

  render() {
    return(
      <View style={stylesCalculator.container}>
        <Text style={stylesCalculator.header}>Here's the calculator</Text>
        <View style={stylesCalculator.smallContainer}>
          <Text>Here's where each component will go</Text>
        </View>
      </View>
    )
  }//End of render statement

}

const stylesCalculator = StyleSheet.create({
  header: {
    color: 'red'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'blue'
  },
  smallContainer: {
    width: 300,
    height: 500,
    bottom: 30,
    backgroundColor: 'green'
  }
})

export default connect(state => ({
  user: state.user
} ) )(Calculator);
