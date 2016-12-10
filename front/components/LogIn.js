import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import _ from "lodash";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import {createUser} from '../ducks/userDuck.js';
import store from 'react-native-simple-store';

const dismissKeyboard = require('dismissKeyboard');

import styles from './styles';

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

const Log = t.struct({
  "email": t.String,
  "password": t.String
});

let options = {
  auto: 'placeholders',
  fields: {
    'password': {
      secureTextEntry: true
    }
  }
};


class LogIn extends Component {

  _saveUser(id, first, last, state, title, interests, photo, token) {
    store.save('user', {
      id: id,
      firstname: first,
      lastname: last,
      state: state,
      image: photo,
      interests: interests,
      title: title,
      STORAGE_KEY: token
    });
    
  }

  _userLogin() {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      fetch("http://104.236.79.194:3001/sessions/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        })
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          Alert.alert("You may have misspelled your email or password.");
        } else {
          this._saveUser(response.user.id, response.user.firstname, response.user.lastname, response.user.state, response.user.title, response.user.interests, response.user.photo, response.id_token);
          Alert.alert(
            "Login Success!"
          );
          Actions.profile();
        }
      })
      .done();
    }
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <View style={styles.container}>

      <Image source={require('../images/nu-colorr.png')} style={{marginBottom: 10}} />

        <Form
          ref="form"
          type={Log}
          options={options}
        />

        <TouchableHighlight style={styles.button} onPress={this._userLogin.bind(this)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
      </View>
      </TouchableWithoutFeedback>
    )
  }

}

export default connect( state => ( {
  user: state.user
} ) )(LogIn);
