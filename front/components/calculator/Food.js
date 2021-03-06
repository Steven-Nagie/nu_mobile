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
    totalScore += foodScore;
    this._sendFood();
  }

  async _updateStore() {
    try {
      await store.update('score', {
        total: totalScore,
        food: foodScore
      });
    } catch(err) {
      console.log(err);
    }
  }

  _sendFood() {
    // Save score to simple-store
    this._updateStore();
    //Send score to database
    fetch("http://104.236.79.194:3001/scores/food", {
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
    this._next();
  }

  _next() {
    this.props.dispatch(changeComp(6));
  }

  /********Component functions**********/
  componentWillMount() {
    setTimeout(() => {this._getScore()}, 1000);
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
      paddingBottom: 20,
      height: 500,
      alignItems: 'center',
      justifyContent: 'space-between',
  }
})

export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(Food);
