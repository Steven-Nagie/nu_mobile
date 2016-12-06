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
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import {changeComp} from '../../ducks/calcDuck.js';

import styles from "../styles.js";

class CalculatorLanding extends Component {
  render() {
    return(
    <View style={stylesLand.container}>
      <Image source={require('../../images/calcLandingIcons/leaf.png')} />
      <Text style={stylesLand.bigText}>
        You haven't started the calculator yet.
      </Text>
      <Text style={styles.text}>
        Let's determine your environmental footprint.
      </Text>
      <TouchableHighlight style={stylesLand.button} onPress={() => {this.props.dispatch(changeComp(1))}}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableHighlight>
    </View>
    )
  }
}

const stylesLand = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bigText: {
    fontFamily: 'OpenSans-Light',
    color: '#6f8381',
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#8bd1ca',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100
  }
})

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(CalculatorLanding);
