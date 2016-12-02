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

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

class Waste extends Component {
  render() {
    return(

    )
  } //End render

}


const stylesWaste = StyleSheet.create({
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
} ) )(Waste);
