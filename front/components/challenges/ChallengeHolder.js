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

export default class ChallengeHolder extends Component {
  render() {
    return(
      <View style={styles.main}>
        <View style={styles.left}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <Text style={styles.copy}>
            {this.props.copy}
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.category}>#{this.props.category}</Text>
            <Text style={styles.saved}>Save {this.props.co2} lbs of CO2e a month</Text>
          </View>
        </View>
        {/*Keeping this here for later, when I have a chance to show it to Kendra. For now, for the sake of simplicity, I'll leave it out.*/}
        <View style={styles.right}>
          {/*<Text style={styles.score}>Nu Score <Text style={styles.scoreNumber}>{this.props.score}</Text></Text>
          <Text style={styles.checkIns}>No. of Check-ins</Text>*/}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    paddingLeft: 3,
    paddingTop: 3,
    width: 300,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 12,
    color: '#006573'
  },
  copy: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    color: '#333333'
  },
  category: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    color: '#f2613a',
    marginBottom: 20
  },
  saved: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 11,
    color: '#006573',
    marginBottom: 20,
    marginLeft: 5
  },
  left: {
    width: 260,
    justifyContent: 'space-between',
  },
  right: {
    // borderWidth: 1,
    // borderColor: '#ebebeb',
    // borderRadius: 2,
    height: 90,
    width: 60
  },
  bottom: {
    flexDirection: 'row'
  }
})
