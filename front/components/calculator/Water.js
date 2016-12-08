import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import {changeComp} from '../../ducks/calcDuck';


import styles from "./calcStyles.js";

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

const waterForm = t.struct({
  "totalGallons": t.Number
});
let options = {

};

let totalScore;
let waterScore;
let userId;
let AUTH_TOKEN;

class Water extends Component {
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

  /*******Calculations******/
  _waterCalc() {
    var gallons = this.refs.form.getValue();
    waterScore = gallons.totalGallons * 0.0052;
    totalScore += Math.round(waterScore);
    this._sendWater();
  }

  _dontKnow() {
    waterScore = Math.round(15.61);
    totalScore += waterScore;
    this._sendWater();
  }

  _sendWater() {
    // Save score to simple-store
    store.update('score', {
      total: totalScore,
      water: waterScore
    });
    //Send score to database
    fetch("http://104.236.79.194:3001/scores/water", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: totalScore,
        water: waterScore,
        id: userId
      })
    })
    .done();
    this._next();
  }

  _next() {
    this.props.dispatch(changeComp(4));
  }


  /********Component functions**********/
  componentWillMount() {
    this._checkUser();
    setTimeout(() => {this._getScore();}, 500)
  }

  render() {
    return(
      <ScrollView contentContainerStyle={waterStyles.contentContainer}>
        <Text style={styles.bigText}>How many gallons of water do you use a month? Check your water bill.</Text>
        <Form
          ref="form"
          type={waterForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this._waterCalc.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <Text style={styles.bigText}>Do you not know your water usage? That's fine. Click here and we'll give you an average.</Text>
        <TouchableHighlight style={styles.button} onPress={this._dontKnow.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }//Render stops here

}

const waterStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    height: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(Water);
