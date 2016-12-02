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
    fetch("http://192.168.0.79:3001/scores/water", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: totalScore,
        water: waterScore
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
      <View style={stylesWater.container}>
        <Text style={stylesWater.text}>How many gallons of water do you use a month? Check your water bill.</Text>
        <Form
          ref="form"
          type={waterForm}
          options={options}
        />
        <TouchableHighlight style={stylesWater.button} onPress={this._waterCalc.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
        <Text style={stylesWater.text}>Do you not know your water usage? That's fine. Click here and we'll give you an average.</Text>
        <TouchableHighlight style={stylesWater.button} onPress={this._dontKnow.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }//Render stops here

}

const stylesWater = StyleSheet.create({
  container: {
      flex: 1,
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
  user: state.user
} ) )(Water);
