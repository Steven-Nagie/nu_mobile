import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import store from "./front/store.js"

/************IMPORT COMPONENTS***********/
import Header from './front/components/Header';
import Loading from './front/components/Loading';
import LogOrSign from './front/components/LogOrSign';
import LogIn from "./front/components/LogIn";
import SignUp from './front/components/SignUp.js';
import Profile from './front/components/profile/Profile.js';
import Calculator from './front/components/calculator/Calculator.js';
import CalculatorLanding from "./front/components/calculator/CalculatorLanding.js";
import Transport from "./front/components/calculator/Transport";
import Water from "./front/components/calculator/Water";
import Waste from "./front/components/calculator/Waste";
import Food from "./front/components/calculator/Food";
import Energy from "./front/components/calculator/Energy";
import ChallengeIndex from "./front/components/challenges/ChallengeIndex";
import Images from "./front/components/ImagePicker";
import Stats from "./front/components/Stats";
import Settings from './front/components/profile/Settings.js';

const TabIcon = ({ selected, title }) => {
  return (
      <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
  );
};

const RouterWithRedux = connect()(Router);

export default class nu extends Component {
  render() {
    return (
      <Provider store={ store }>
        <RouterWithRedux>
          <Scene key="root">

                <Scene
                  key="images"
                  component={Images}
                  title="cukkkkk"
                  hideNavBar
                />
                <Scene
                  key="loading"
                  component={Loading}
                  title="Nu.World"
                  hideNavBar
                  initial
                />
                <Scene
                  key="logOrSign"
                  component={LogOrSign}
                  title="Nu.World"
                  hideNavBar
                />
                <Scene
                  key="signUp"
                  component={SignUp}
                  title="Nu.World"
                  hideNavBar
                />
                <Scene
                  key="logIn"
                  component={LogIn}
                  title="Nu.World"
                  hideNavBar
                />
                <Scene
                  key="calculator"
                  component={Calculator}
                  title="Calculator"
                  hideNavBar
                />
                <Scene
                  key="profile"
                  component={Profile}
                  title="Profile"
                  hideNavBar
                />
                <Scene
                  key="challenges"
                  component={ChallengeIndex}
                  title="Challenges"
                  hideNavBar
                />
                <Scene
                  key="stats"
                  component={Stats}
                  title="Stats"
                  hideNavBar
                />
                <Scene
                  key="settings"
                  component={Settings}
                  title="Settings"
                  hideNavBar
                />


          </Scene>
        </RouterWithRedux>
      </Provider>
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
