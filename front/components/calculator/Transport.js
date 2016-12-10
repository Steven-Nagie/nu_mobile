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
let flag = 0;

class Transport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonYes: styles.buttonOff,
      buttonTextYes: styles.buttonTextOff,
      buttonNo: styles.buttonOff,
      buttonTextNo: styles.buttonTextOff,
      buttonSubmit: styles.buttonOff,
      buttonTextSubmit: styles.buttonTextOff
    }
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


  /**********CALCULATOR FUNCTIONS********/
  _yes() {
    if ( !flag ){
      transportScore += 1021;
      flag += 1;
    }
    this.setState({
      buttonYes: styles.button,
      buttonTextYes: styles.buttonText,
      buttonNo: styles.buttonOff,
      buttonTextNo: styles.buttonTextOff
    })
  }
  _no() {
    if ( flag ) {
      transportScore -= 1021;
    }
    flag = 0;
    this.setState({
      buttonNo: styles.button,
      buttonTextNo: styles.buttonText,
      buttonYes: styles.buttonOff,
      buttonTextYes: styles.buttonTextOff
    })
  }

  async _airCalc() {

    var flights = this.refs.form.getValue();
    var flightTotal = flights.totalFlights * 715;
    transportScore += flightTotal;
    totalScore += transportScore;
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
          <TouchableHighlight style={this.state.buttonYes} onPress={this._yes.bind(this)}>
              <Text style={this.state.buttonTextYes}>Yes</Text>
          </TouchableHighlight>
          <TouchableHighlight style={this.state.buttonNo} onPress={this._no.bind(this)}>
              <Text style={this.state.buttonTextNo}>No</Text>
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
