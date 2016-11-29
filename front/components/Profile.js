import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class Profile extends Component {
  render() {
    return(
      <View
        style={stylesProfile.container}>
        <Text
          style={stylesProfile.header}
          onPress={() => Actions.landing()}
        >This will be the profile page</Text>
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
