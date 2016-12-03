import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import _ from "lodash";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import {createUser} from '../ducks/userDuck.js';
import store from 'react-native-simple-store'


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

class Landing extends Component {

  async _checkUser() {
    console.log('calling checkuser with store');
    try {
      const user = await store.get('user');
      if (!user) {
        console.log('There is no store data');
      } else {
        console.log(user);
        this.props.dispatch(createUser(user));
        Actions.profile();
      }
    } catch(err) {
      console.log(err);
    }
  }

  _saveUser(id, first, last, state, token) {
    store.save('user', {
      id: id,
      firstname: first,
      lastname: last,
      state: state,
      STORAGE_KEY: token
    });
  }

  componentWillMount() {
    //Here we'll check async storage for token and user information, then automatically pass user onto profile page or whatever.
    this._checkUser();
  }

  _userSignup() {
  var value = this.refs.form.getValue();
  if (value) { // if validation fails, value will be null
    fetch("http://10.0.0.21:3001/users", {
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
        // This is to push the user to the redux. However, I'm now sure that's necessary, since we're using the store package. Also, this value has the password, which is bad.
        this.props.dispatch(createUser(_.pick(value, ['firstname', 'lastname', 'state', 'id'])));
        Actions.profile();
      }
    })
    .done();
  }
}

_userLogin() {
  /****For simplicity's sake during development, I simply push the user to profile page if there is a token. ****/
  Actions.profile();
  // var value = this.refs.form.getValue();
  // if (value) { // if validation fails, value will be null
  //   fetch("http://10.0.0.21:3001/sessions/create", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: value.firstname,
  //       password: value.password,
  //     })
  //   })
  //   // .then((response) => response.json())
  //   .then((responseData) => {
  //     store.update('user', {
  //       STORAGE_KEY: response.id_token
  //     });
  //     Alert.alert(
  //       "Login Success!"
  //     );
  //     Actions.profile();
  //   })
  //   .done();
  // }
}

  //********** RENDER COMPONENT **************

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
