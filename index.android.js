import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Landing from './front/components/Landing.js';
import Profile from './front/components/Profile.js';

export default class nu extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="landing"
            component={Landing}
            title="Nu.World"
            initial
          />
          <Scene
            key="profile"
            component={Profile}
            title="Your profile"
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nu', () => nu);
