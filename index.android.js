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
import Landing from './front/components/Landing.js';
import Profile from './front/components/Profile.js';
import Calculator from './front/components/calculator/Calculator.js';
import CalculatorLanding from "./front/components/calculator/CalculatorLanding.js";
import Transport from "./front/components/calculator/Transport";
import Water from "./front/components/calculator/Water";
import Waste from "./front/components/calculator/Waste";
import Food from "./front/components/calculator/Food";
import Energy from "./front/components/calculator/Energy";


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
                  key="landing"
                  component={Landing}
                  title="Nu.World"
                  initial
                  hideNavBar
                />
                <Scene
                  key="profile"
                  component={Profile}
                  title="Your profile"
                  hideNavBar
                />
                <Scene
                  key="transport"
                  component={Transport}
                  title="Transport"
                  hideNavBar
                />
                {/*<Scene
                  key="calculator"
                  component={Calculator}
                  title="Calculator"
                  hideNavBar
                />
                <Scene
                  key="transport"
                  component={Transport}
                  title="Transportation Calculator"
                  hideNavBar
                />
                <Scene
                  key="water"
                  component={Water}
                  title="Water Calculator"
                  hideNavBar
                />
                <Scene
                  key="waste"
                  component={Waste}
                  title="Waste Calculator"
                  hideNavBar
                />
                <Scene
                  key="energy"
                  component={Energy}
                  title="Energy Calculator"
                  hideNavBar
                />
                <Scene
                  key="food"
                  component={Food}
                  title="Food Calculator"
                  hideNavBar
                />*/}
                {/*I think the trick to navigating subcomponents is to use Switch*/}
                {/*<Scene
                  key="calculator"
                  component={Calculator}
                  title="Calculator"
                  hideNavBar
                >
                  <Scene
                    key="calcLanding"
                    component={CalculatorLanding}
                    title="Welcome to the Carbon Calculator"
                    initial
                    hideNavBar
                  />
                  <Scene
                    key="water"
                    component={Water}
                    title="Water Calculator"
                    hideNavBar
                  />
                </Scene>*/}


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
