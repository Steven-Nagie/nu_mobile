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

class Transport extends Component {

  /**********CALCULATOR FUNCTIONS********/
  _yes() {
    console.log('yes');
  }
  _no() {
    console.log('no');
  }


  render() {
    return(
      <View style={stylesTransport.container}>
        <Text style={stylesTransport.text}>Do you own a car?</Text>
          <TouchableHighlight style={stylesTransport.button} onPress={this._yes.bind(this)}>
              <Text>Yes</Text>
          </TouchableHighlight>
          <TouchableHighlight style={stylesTransport.button} onPress={this._no.bind(this)}>
              <Text>No</Text>
          </TouchableHighlight>
        <Text style={stylesTransport.text}>How many times have you flown in the past year?</Text>
      </View>
    )
  }//Render stops here

}

const stylesTransport = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 90,
    margin: 40,
    padding: 20,
    backgroundColor: 'blue'
  }
})

export default connect(state => ({
  user: state.user
} ) )(Transport);
