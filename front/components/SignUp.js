import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import _ from "lodash";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import {createUser} from '../ducks/userDuck.js';
import store from 'react-native-simple-store';

const dismissKeyboard = require('dismissKeyboard');

import styles from "./styles";


// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

const SignIn = t.struct({
  "firstname": t.String,
  "lastname": t.String,
  "state": t.String,
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



// Auth stuff
let STORAGE_KEY = "id_token";

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  _saveUser(id, first, last, state, token) {
    store.save('user', {
      id: id,
      firstname: first,
      lastname: last,
      state: state,
      interests: "Interests",
      title: "Title",
      STORAGE_KEY: token
    });
  }

  _userSignup() {
  var value = this.refs.form.getValue();
  if (value) { // if validation fails, value will be null
    fetch("http://192.168.0.79:3001/users", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: value.firstname,
        lastname: value.lastname,
        state: value.state,
        email: value.email,
        password: value.password
      })
    })
    // For whatever reason changing from json actually hurts the thing.
    .then(response => response.json())
    .then((response) => {
      if (response.message) {
        Alert.alert("That email is already taken, please try again.");
      } else {
        this._saveUser(response.user.id, response.user.firstname, response.user.lastname, response.user.state, response.id_token);
        Alert.alert(
          "Signup Success!"
        );
        // This is to push the user to the redux. However, I'm not sure that's necessary, since we're using the store package. Also, this value has the password, which is bad.
        this.props.dispatch(createUser(_.pick(value, ['firstname', 'lastname', 'state', 'id'])));
        Actions.profile();
      }
    })
    .done();
  }
}



  //********** RENDER COMPONENT **************

  render() {
    return(
    <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
    <View style={stylesSignUp.container}>
      <Text style={styles.h1}
      onPress={() =>Actions.profile()}>Welcome to Nu.world</Text>
      <Text style={styles.subHeader}>Create an account here</Text>
      <Form
        ref="form"
        type={SignIn}
        options={options}
      />
      <TouchableHighlight style={stylesSignUp.button} onPress={this._userSignup.bind(this)}>
        <Text style={stylesSignUp.buttonText}>Save New User</Text>
      </TouchableHighlight>
    </View>
    </TouchableWithoutFeedback>
    )
  }
}

const stylesSignUp = StyleSheet.create({
  header: {
    color: 'red',
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#8bd1ca',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100
  },
})


export default connect( state => ( {
  user: state.user
} ) )(SignUp);
