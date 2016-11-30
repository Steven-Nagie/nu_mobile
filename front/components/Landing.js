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
// import {createUser} from '../ducks/userDuck.js';


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

class Landing extends Component {

  componentWillMount() {
    //Here we'll check async storage for token and user information, then automatically pass user onto profile page or whatever.
  }

  // This is setting the item STORAGE_KEY (named in _userSignup and _userLogin functions) to the value of the id token that we receive in the JSON response when we hit our api for user signup/login.
  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // I'll cut this out later, but for now it's useful to see how it sends the token in order to get authorization.
  async _getProtectedQuote() {
  var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  console.log(DEMO_TOKEN);
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
  console.log(value);
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
      this._onValueChange(STORAGE_KEY, response.id_token);
      Alert.alert(
        "Signup Success!"
      );
      // this.props.dispatch(createUser(value);
      // Actions.profile();
    })
    .done();
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
      this._onValueChange(STORAGE_KEY, responseData.id_token);
      Alert.alert(
        "Login Success!"
      );
      Actions.profile();
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

  //********** RENDER COMPONENT **************

  render() {
    // console.log(this.props);
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


export default connect( state => ( {
  user: state.user
} ) )(Landing);
