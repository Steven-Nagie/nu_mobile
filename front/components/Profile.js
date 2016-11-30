import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class Profile extends Component {

  async _checkUser() {
    console.log('calling _checkUser');
    try {
      const AUTH_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
      if (!AUTH_TOKEN) {
        Actions.landing();
        Alert.alert('Please log in to access this page');
      } else {
        console.log(AUTH_TOKEN);
      }
    } catch(err) {
      console.log(err);
    }
  }

  componentWillMount() {
    console.log('Profile component mounted');
    // this._checkUser();
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
        <Text>Here you'll have your <Text style={{fontWeight: "bold"}}>NAME</Text></Text>
        <Text>This will be your state</Text>
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
  }
})
