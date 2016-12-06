import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';

import styles from '../styles.js';

import calcIcons from './calcIcons';

import Header from '../Header';
import Footer from '../Footer';

import CalculatorLanding from './CalculatorLanding';
import Transport from './Transport';
import Energy from './Energy';
import Water from './Water';
import Waste from './Waste';
import Food from './Food';
import CalcStats from "./CalcStats.js";


let width;
let height;
let percentComplete = 0;
let stepComponent;
let componentArray = [
  <CalculatorLanding />,
  <Transport />,
  <Energy />,
  <Water />,
  <Waste />,
  <Food />,
  <CalcStats />
];


class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      calcComponent: 0
    }
  }

  _getPercent() {
    if (this.props.calcComponent === 2) {
      percentComplete = 20;
    } else if (this.props.calcComponent === 3) {
      percentComplete = 40;
    } else if (this.props.calcComponent === 4) {
      percentComplete = 60;
    } else if (this.props.calcComponent === 5) {
      percentComplete = 80;
    } else if (this.props.calcComponent > 5) {
      percentComplete = 100;
    }
    console.log(percentComplete);
  }

  render() {
    let stepComponent = componentArray[this.props.calcComponent];
    this._getPercent();
    let {height, width} = Dimensions.get("window");
    let calcIconsCurrent = calcIcons[this.props.calcComponent];
    return(
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={stylesCalculator.container}>
          <View style={[stylesCalculator.top, {width: width}]}>
            <View style={[stylesCalculator.topIcons, {width: width}]}>
              {calcIconsCurrent}
            </View>

            <View style={[stylesCalculator.progressView, {width: width}]}>
              <Text style={stylesCalculator.progress}>Progress</Text>
              <View style={[stylesCalculator.progressBar, {width: (width*.6)}]} />
              <Text style={stylesCalculator.percent}>{percentComplete}%</Text>
            </View>

          </View>

          <View style={stylesCalculator.smallContainer}>
            {stepComponent}
          </View>

        </View>

        {/************FOOTER********/}
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    )
  }//End of render statement

}

const stylesCalculator = StyleSheet.create({
  header: {
    color: 'red',
    flex: .2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7'
  },
  top: {
    flex: .3,
    marginBottom: 40,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  icons: {
    height: 55,
    width: 55
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 20
  },
  progress: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    color: '#6f8381',
  },
  percent: {
    color: '#b7bdbd',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular'
  },
  progressBar: {
    height: 5,
    backgroundColor: '#e0e0e0',
    marginTop: 5
  },
  smallContainer: {
    flex: .8,
    width: 300,
    bottom: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// Code for bar in color.
// linear-gradient(180deg, rgba(99, 202, 192, 1) 0%, rgba(181, 222, 109, 1) 37%, rgba(252, 215, 118, 1) 70%, rgba(249, 129, 97, 1) 100%)

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(Calculator);
