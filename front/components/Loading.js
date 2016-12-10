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
    try {
      const user = await store.get('user');
      if (!user) {
        Actions.logOrSign();
      } else {
        AUTH_TOKEN = user.STORAGE_KEY;
        fetch("http://104.236.79.194:3001/auth", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + AUTH_TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
            if (response.status === 401) {
              Actions.logOrSign();
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
    //Here we'll check async storage for token and user information, check with an api call if the token is good, then automatically pass user onto profile page or whatever. If there is no user data then we push them to the signUp page.
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
    backgroundColor: '#F7F7F7'
  }
})

export default connect( state => ( {
  user: state.user
} ) )(Loading);
