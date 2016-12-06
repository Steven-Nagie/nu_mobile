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
import changeComp from '../../ducks/calcDuck';

import styles from './calcStyles';

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

let totalScore;
let userId;
let AUTH_TOKEN;
let foodScore;

class Food extends Component {

  async _checkUser() {
    try {
      const user = await store.get('user');
      if(!user) {
        //In actual app you would want to shoot user back to sign in page.
        // Actions.signUp();
        console.log('There is no store data');
      } else {
        AUTH_TOKEN = user.STORAGE_KEY;
        userId = user.id;
        console.log(user);
        console.log('this is the auth token ', AUTH_TOKEN)
      }
    } catch(err) {
      console.log(err);
    }
  }

  /****Get the total score*****/
  async _getScore() {
    try{
      const score = await store.get('score');
      console.log(score);
      if (score) {
        totalScore = score.total;
        console.log(totalScore);
      }
    } catch(err) {
      console.log(err);
    }
  }

  /*********CALCULATIONS***********/
  _foodCalc(diet) {
    switch(diet) {
      case "average":
        foodScore = 685;
        break;
      case "extraMeat":
        foodScore = 868;
        break;
      case "noMeat":
        foodScore = 451;
        break;
      case "pesc":
        foodScore = 612;
        break;
      case "veg":
        foodScore = 420;
        break;
      case "vegan":
        foodScore = 246;
        break;
      default:
        console.log("something's happening");
    }
    this._sendFood();
  }

  _sendFood() {
    totalScore += foodScore;
    // Save score to simple-store
    store.update('score', {
      total: totalScore,
      food: foodScore
    });
    //Send score to database
    fetch("http://192.168.0.79:3001/scores/waste", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: totalScore,
        food: foodScore,
        id: userId
      })
    })
    .done();
    Actions.profile();
  }

  /********Component functions**********/
  componentWillMount() {
    this._getScore();
    this._checkUser();
  }

  render() {
    return(
      <ScrollView contentContainerStyle={stylesFood.contentContainer}>
        <Text style={styles.bigText}>Which of the following best describes your diet?</Text>
        <TouchableHighlight style={styles.button}
          onPress={this._foodCalc.bind(this, "average")}>
          <Text style={styles.buttonText}>Average</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          onPress={this._foodCalc.bind(this, "extraMeat")}>
          <Text style={styles.buttonText}>Extra Meaty</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          onPress={this._foodCalc.bind(this, "noMeat")}>
          <Text style={styles.buttonText}>No Red Meat</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          onPress={this._foodCalc.bind(this, "pesc")}>
          <Text style={styles.buttonText}>Pescatarian</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          onPress={this._foodCalc.bind(this, "veg")}>
          <Text style={styles.buttonText}>Vegetarian</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          onPress={this._foodCalc.bind(this, "vegan")}>
          <Text style={styles.buttonText}>Vegan</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  } //End render

}


const stylesFood = StyleSheet.create({
  contentContainer: {
      flex: 1,
      paddingHorizontal: 10,
      height: 500,
      alignItems: 'center',
      justifyContent: 'space-between',
  }
})

export default connect(state => ({
  user: state.user
} ) )(Food);
