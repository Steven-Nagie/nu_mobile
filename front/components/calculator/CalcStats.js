import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import changeComp from '../../ducks/calcDuck';

import styles from './calcStyles';

let totalScore;
let transportScore;
let energyScore;
let waterScore;
let wasteScore;
let foodScore;
let userId;
let AUTH_TOKEN;
let height;
let width;

class CalcStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: 0
    }
  }

  async _getScore() {
    try {
      const score = await store.get('score');
      console.log(score);
      if(score){
        this.setState({
          totalScore: score.total
        })
        totalScore = score.total;
        transportScore = score.transport;
        energyScore = score.energy;
        waterScore = score.water;
        wasteScore = score.waste;
        foodScore = score.food;
      }

    } catch(err) {
      console.log(err)
    }
  }

  componentWillMount() {
    this._getScore();
  }
  
  render() {
    let {height, width} = Dimensions.get('window');
    return(
      <View style={stylesStats.container}>
        <View style={stylesStats.header}>
          <Text style={styles.headerText}>Final Results</Text>
        </View>
        <View style={stylesStats.main}>
          <View style={stylesStats.mainLeft}>
          </View>
          <View style={stylesStats.mainRight}>
            <Text style={stylesStats.smallHeaderText}>
              Overall Emissions
            </Text>
            <Text style={stylesStats.infoText}>
              {this.state.totalScore} lbs of CO2 equivalent
            </Text>
            <Text style={stylesStats.smallHeaderText}>
              Resources
            </Text>
            <Text style={stylesStats.smallHeaderText}>
              Actions
            </Text>
          </View>
        </View>
        <View style={stylesStats.buttonView}>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const stylesStats = StyleSheet.create({
  container: {
    paddingBottom: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 90,
    width: 280,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3e8e6'
  },
  main: {
    width: 260,
    height: 220,
    flexDirection: 'row'
  },
  mainLeft: {
    height: 220,
    width: 130,
    alignItems: 'center',
    // justifyContent: ''
  },
  mainRight: {
    height: 220,
    width: 130,
  },
  smallHeaderText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Semibold',
    color: '#53a49c'
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    color: '#333333'
  }
})

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(CalcStats);
