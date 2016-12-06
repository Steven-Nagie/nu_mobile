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
// import bootstrap from './tcomb-form-native/lib/stylesheets/bootstrap';
import store from 'react-native-simple-store';
import { changeComp } from '../../ducks/calcDuck';

import styles from './calcStyles.js';

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 100;
// Set Form
const Form = t.form.Form;

// let stylesheet = {}

const airForm = t.struct({
  "totalFlights": t.Number
});
let options = {
}

var transportScore = 0;
var totalScore = 0;
let userId;
let AUTH_TOKEN;

class Transport extends Component {

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


  /**********CALCULATOR FUNCTIONS********/
  _yes() {
    transportScore += 1021;
    console.log("transport score with a yes: ", transportScore);
  }
  _no() {
    console.log("transport score with a no: ", transportScore);
  }

  async _airCalc() {
    var flights = this.refs.form.getValue();
    var flightTotal = flights.totalFlights * 715;
    transportScore += flightTotal;
    totalScore += transportScore;
    console.log(transportScore, totalScore);
    // Save score to simple-store
    store.save('score', {
      total: totalScore,
      transport: transportScore
    });
    //Send score to database
    fetch("http://192.168.0.79:3001/scores/transport", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: totalScore,
        transport: transportScore,
        id: userId
      })
    })
    .then((response) => {
      console.log(response);
    })
    .done();
    this._next();
  }

  _next() {
    this.props.dispatch(changeComp(2));
  }


  /*************COMPONENT FUNCTIONS*********/
  componentWillMount() {
    this._checkUser();
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.bigText}>Do you drive a car, truck or motorcycle?</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={this._yes.bind(this)}>
              <Text style={styles.buttonText}>Yes</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._no.bind(this)}>
              <Text style={styles.buttonText}>No</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.bigText}>How many times have you flown in the past year?</Text>
        <Form
          ref="form"
          type={airForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this._airCalc.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }//Render stops here

}



export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(Transport);
