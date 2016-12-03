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

const wasteForm = t.struct({
  "metal": t.Boolean,
  "plastic": t.Boolean,
  "glass": t.Boolean,
  "newspaper": t.Boolean,
  "magazines": t.Boolean,
});
let options = {

};

let totalScore;
let userId;
let AUTH_TOKEN;
let wasteScore = 58;

class Waste extends Component {

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

  /*****CALCULATIONS******/
  _wasteCalc() {
    var answers = this.refs.form.getValue();
    console.log(answers);
    if (answers.metal) {
      wasteScore -= 7
    }

    if (answers.plastic) {
      wasteScore -= 3
    }

    if (answers.glass) {
      wasteScore -= 2
    }

    if (answers.newspaper) {
      wasteScore -= 9
    }

    if (answers.magazines) {
      wasteScore -= 2
    }

    this._sendWaste();
  }


  _sendWaste() {
    totalScore += wasteScore;
    // Save score to simple-store
    store.update('score', {
      total: totalScore,
      waste: wasteScore
    });
    //Send score to database
    fetch("http://10.0.0.21:3001/scores/waste", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: totalScore,
        waste: wasteScore,
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
      <View>
        <Text sytle={stylesWaste.text}>Recycling is great for the planet! Which of the following materials do you regularly recycle?</Text>
        <Form
          ref="form"
          type={wasteForm}
          options={options}
        />
        <TouchableHighlight style={stylesWaste.button}
          onPress={this._wasteCalc.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const stylesWaste = StyleSheet.create({
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
});

export default connect(state => ({
  user: state.user
} ) )(Waste);
