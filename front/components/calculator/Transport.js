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

const airForm = t.struct({
  "totalFlights": t.Number
});
let options = {

};


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
  }


  /*************COMPONENT FUNCTIONS*********/
  componentWillMount() {
    this._checkUser();
  }

  render() {
    return(
      <View style={stylesTransport.container}>
        <Text style={stylesTransport.text}>Do you own a car?</Text>
          <TouchableHighlight style={stylesTransport.button} onPress={this._yes.bind(this)}>
              <Text>Yes</Text>
          </TouchableHighlight>
          <TouchableHighlight style={stylesTransport.button} onPress={this._no.bind(this)}>
              <Text>No</Text>
          </TouchableHighlight>
        <Text style={stylesTransport.text}>How many times have you flown in the past year?</Text>
        <Form
          ref="form"
          type={airForm}
          options={options}
        />
        <TouchableHighlight style={stylesTransport.button} onPress={this._airCalc.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }//Render stops here

}

const stylesTransport = StyleSheet.create({
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
} ) )(Transport);
