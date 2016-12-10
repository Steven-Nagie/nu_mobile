import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import { changeComp } from '../../ducks/calcDuck';

import styles from './calcStyles';

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

let totalScore;
let userId;
let AUTH_TOKEN;

class Energy extends Component {
  constructor(props) {
    super(props)

  }

  async _checkUser() {
    try {
      const user = await store.get('user');
      if(!user) {
        Actions.logOrSign();
      } else {
        AUTH_TOKEN = user.STORAGE_KEY;
        userId = user.id;
      }
    } catch(err) {
      Alert.alert(err);
    }
  }

  /****Get the total score*****/
  async _getScore() {
    try{
      const score = await store.get('score');
      if (score) {
        totalScore = score.total;
      }
    } catch(err) {
      Alert.alert(err);
    }
  }

  /*********CALCULATIONS***********/
  _sendEnergy() {
    let energyScore = 1303;
    totalScore += energyScore;
    console.log(totalScore + " total score");
    // Save score to simple-store
    store.update('score', {
      total: totalScore,
      energy: energyScore
    });
    //Send score to database
    fetch("http://104.236.79.194:3001/scores/energy", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: totalScore,
        energy: energyScore,
        id: userId
      })
    })
    .done();
    this._next();
  }

  _next() {
    this.props.dispatch(changeComp(3));
  }

  /********Component functions**********/
  componentWillMount() {
    this._checkUser();
    setTimeout(() => {this._getScore()}, 1000);
  }

  render() {
    return(
      <View style={stylesEnergy.container}>
        <Text style={[styles.bigText, {marginBottom: 20}]}>One of the biggest sources of emissions on an individual scale is your home. Unless you're homeless, you're emitting. Are you homeless?</Text>
        <TouchableHighlight style={styles.button}
          onPress={this._sendEnergy.bind(this)}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableHighlight>
      </View>
    )
  } //End render

}


const stylesEnergy = StyleSheet.create({
  container: {
      flex: 1,
      paddingBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 90,
    margin: 40,
    padding: 20,
    backgroundColor: 'blue'
  }
})

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(Energy);
