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

export default class CalculatorLanding extends Component {
  render() {
    return(
      <Text>
        Here's some interesting stuff.
      </Text>
    )
  }
}

const stylesCalcLanding = StyleSheet.create({

})