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
import _ from "lodash";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import {createUser} from '../ducks/userDuck.js';
import store from 'react-native-simple-store';

class Loading extends Component {

  async _authUser() {
    console.log('calling checkuser with store');
    try {
      const user = await store.get('user');
      if (!user) {
        Actions.landing();
      } else {
        console.log(user);
        AUTH_TOKEN = user.STORAGE_KEY;
        fetch("http://10.0.0.21:3001/auth", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + AUTH_TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
            console.log(response);
            if (response.status === 401) {
              Actions.landing();
            } else if (response.status === 200) {
              // Have to figure out how to get proper scope for this:
              // this.props.dispatch(createUser(user));
              Actions.profile();
            }
          }).done();
      }
    } catch(err) {
      console.log(err);
    }
  }

  componentWillMount() {
    //Here we'll check async storage for token and user information, check with an api call if the token is good, then automatically pass user onto profile page or whatever. If there is no user data then we push them to the landing page.
    this._authUser();
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={require('../images/nu-colorr.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    height: 150,
    width: 150
  }
})

export default connect( state => ( {
  user: state.user
} ) )(Loading);
