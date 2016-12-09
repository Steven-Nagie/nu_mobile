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
      totalScore: 0,
    }
  }

  async _getScore() {
    try {
      const score = await store.get('score');
      if(score){
        this.setState({
          totalScore: score.total
        })
      }

    } catch(err) {
      Alert.alert(err)
    }
  }

  componentWillMount() {
    setTimeout(() => {this._getScore()}, 1000);
  }

  render() {
    let {height, width} = Dimensions.get('window');
    let emissionsDifference = this.state.totalScore - 1980.45;
    let percentChange = Math.round((emissionsDifference/this.state.totalScore) * 100);
    return(
      <View style={stylesStats.container}>
        <View style={stylesStats.header}>
          <Text style={styles.headerText}>Final Results</Text>
        </View>
        <View style={stylesStats.main}>
            <View style={stylesStats.miniView}>
              <Text style={stylesStats.smallHeaderText}>
                Overall Emissions
              </Text>
              <Text style={stylesStats.infoText}>
                {this.state.totalScore} lbs of CO2 equivalent
              </Text>
            </View>
            <View style={stylesStats.miniView}>
              <Text style={stylesStats.smallHeaderText}>
                Resources
              </Text>
              <Text style={stylesStats.text}>
                You are <Text style={stylesStats.infoText}>{this.state.totalScore - 1980.45} lbs</Text> above the 2025 US national goal.
              </Text>
            </View>
            <View style={stylesStats.miniView}>
              <Text style={stylesStats.smallHeaderText}>
                Actions
              </Text>
              <Text style={stylesStats.text}>
                To adhere to US national goals, you can reduce your emissions by <Text style={stylesStats.infoText}>{percentChange}%</Text>
              </Text>
          </View>
        </View>
        <View style={stylesStats.buttonView}>
          <TouchableHighlight style={[stylesStats.button, {marginRight: 10}]} onPress={Actions.challenges}>
            <Text style={stylesStats.buttonText}>See How</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[stylesStats.button, {marginRight: 10}]} onPress={Actions.stats}>
            <Text style={stylesStats.buttonText}>More Details</Text>
          </TouchableHighlight>
          <TouchableHighlight style={stylesStats.button} onPress={Actions.profile}>
            <Text style={stylesStats.buttonText}>Go to Profile</Text>
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
    width: 300,
    height: 220,
    // flexDirection: 'row'
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  mainLeft: {
    height: 220,
    width: 150,
    alignItems: 'center',
    // justifyContent: ''
  },
  mainRight: {
    height: 220,
    width: 150,
    justifyContent: 'space-between'
  },
  smallHeaderText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Semibold',
    color: '#53a49c'
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    color: '#333333',
    textAlign: 'center'
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#a6b1b0',
    textAlign: 'center'
  },
  miniView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#8bd1ca',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 70
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'OpenSans-Semibold'
  },
})

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(CalcStats);
