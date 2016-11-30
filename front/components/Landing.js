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
import t from "tcomb-form-native";
// Below only necessary for specific styling of tcomb stuff.
// import i18n from "tcomb-form-native/lib/i18n/en";
// import templates from "tcomb-form-native/lib/templates/bootstrap";

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 60;
// Set Form
const Form = t.form.Form;

const SignIn = t.struct({
  "Username": t.String,
  'Password': t.String
});

let options = {
  auto: 'placeholders',
  fields: {
    'Password': {
      secureTextEntry: true
    }
  }
};



// Auth stuff
let STORAGE_KEY = "id_token";

export default class Landing extends Component {

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _getProtectedQuote() {
  var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  fetch("http://192.168.0.79:3001/api/protected/random-quote", {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + DEMO_TOKEN
    }
  })
  .then((response) => response.text())
  .then((quote) => {
    Alert.alert(
      "Chuck Norris Quote:", quote,
      [{text: "Hate it", onPress: () => console.log("The user does not like this quote")},
      {text: 'Love it', onPress: () => console.log("The user likes this quote")}]
      );
  })
  .done();
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
        username: value.username,
        password: value.password,
      })
    })
    .then(response => response.json())
    .then((response) => {
      Alert.alert(
        "Signup Success!",
        "Click the button to get a Chuck Norris quote!"
      );
      this._onValueChange(STORAGE_KEY, response.id_token);
    })
    .done();
  }
}

async _userLogout() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    Alert.alert("Logout Success!")
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
}

_userLogin() {
  var value = this.refs.form.getValue();
  if (value) { // if validation fails, value will be null
    fetch("http://192.168.0.79:3001/sessions/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: value.username,
        password: value.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      Alert.alert(
        "Login Success!",
        "Click the button to get a Chuck Norris quote!"
      ),
      this._onValueChange(STORAGE_KEY, responseData.id_token)
    })
    .done();
  }
}

  render() {
    return(
    <View style={stylesLanding.container}>
      <Text style={stylesLanding.header}
      onPress={() =>Actions.profile()}>Welcome to Nu.world</Text>
      <Text>Please sign in here</Text>
      <Form
        ref="form"
        type={SignIn}
        options={options}
      />
      <TouchableHighlight style={stylesLanding.button} onPress={this._userSignup.bind(this)}>
      <Text style={stylesLanding.buttonText}>Save New User</Text>
      </TouchableHighlight>
      <TouchableHighlight style={stylesLanding.button} onPress={this._userLogin.bind(this)}>
      <Text style={stylesLanding.buttonText}>Log In</Text>
      </TouchableHighlight>
      <TouchableHighlight style={stylesLanding.button} onPress={this._userLogout.bind(this)}>
      <Text style={stylesLanding.buttonText}>Log Out</Text>
      </TouchableHighlight>
      <TouchableHighlight style={stylesLanding.button} onPress={this._getProtectedQuote.bind(this)}>
        <Text style={stylesLanding.buttonText}>Do whatever</Text>
      </TouchableHighlight>
    </View>
    )
  }
}

const stylesLanding = StyleSheet.create({
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
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
