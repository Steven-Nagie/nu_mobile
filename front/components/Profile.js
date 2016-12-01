import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';


class Profile extends Component {

/******FUNCTIONS******/
  async _checkUser() {
    console.log('calling checkuser with store');
    try {
      const user = await store.get('user');
      if (!user) {
        console.log('There is no store data');
      } else {
        console.log(user);
      }
    } catch(err) {
      console.log(err);
    }
  }

  async _userLogout() {
    try {
      await store.delete('user');
      Alert.alert("Logout Success!")
    } catch (error) {
      console.log('Storage error: ' + error.message);
    }
  }

/*******COMPONENT FUNCTIONS********/
  componentWillMount() {
    this._checkUser();
  }

  //******* RENDER COMPONENT *******
  render() {
    return(
      <View
        style={stylesProfile.container}>
        <Text
          style={stylesProfile.header}
          onPress={() => Actions.landing()}
        >This will be the profile page</Text>
        <Text>Here you'll have your name: <Text style={{fontWeight: "bold"}}>{this.props.user.firstname}</Text></Text>
        <Text>This will be your state: {this.props.user.state}</Text>
        <TouchableHighlight style={stylesProfile.button} onPress={this._userLogout.bind(this)}>
          <Text style={stylesProfile.buttonText}>Log Out</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={stylesProfile.button}
          onPress={Actions.calculator}>
          <Text style={stylesProfile.buttonText}>Go to calculator</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const stylesProfile = StyleSheet.create({
  header: {
    color: 'blue',
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

export default connect( state => ({
  user: state.user
} ) )(Profile);
