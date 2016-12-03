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
import styles from "../styles.js";

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

  async _checkUser() {
    try {
      const user = await store.get('user');
      if(!user) {
        //In actual app you would want to shoot user back to sign in page.
        // Actions.landing();
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

  /*******Calculations******/
  _waterCalc() {
    var gallons = this.refs.form.getValue();
    waterScore = gallons.totalGallons * 0.0052;
    console.log("Here's the calculated total: ", waterScore);
    this._sendWater();
  }

  _dontKnow() {
    waterScore = 15.61;
    console.log('heres the dont know total: ', waterScore)
    this._sendWater();
  }

  _sendWater() {
    totalScore += waterScore;
    // Save score to simple-store
    store.update('score', {
      total: totalScore,
      water: waterScore
    });
    //Send score to database
    fetch("http://10.0.0.21:3001/scores/water", {
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

  }


  /********Component functions**********/
  componentWillMount() {
    this._getScore();
    this._checkUser();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>How many gallons of water do you use a month? Check your water bill.</Text>
        <Form
          ref="form"
          type={waterForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this._waterCalc.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <Text style={styles.text}>Do you not know your water usage? That's fine. Click here and we'll give you an average.</Text>
        <TouchableHighlight style={styles.button} onPress={this._dontKnow.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }//Render stops here

}

export default connect(state => ({
  user: state.user
} ) )(Water);
