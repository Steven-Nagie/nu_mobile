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
import { changeComp } from '../../ducks/calcDuck';

import styles from './calcStyles';

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
  constructor(props) {
    super(props)
  }

  async _checkUser() {
    try {
      const user = await store.get('user');
      if(!user) {
        Actions.logorSign();
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

  /*****CALCULATIONS******/
  _wasteCalc() {
    var answers = this.refs.form.getValue();
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
    fetch("http://104.236.79.194:3001/scores/waste", {
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
    this.props.dispatch(changeComp(5));
  }

  /********Component functions**********/
  componentWillMount() {
    setTimeout(() => {this._getScore()}, 1000);
    this._checkUser();
  }

  render() {
    return(
      <ScrollView contentContainerStyle={stylesWaste.contentContainer}>
        <Text style={styles.bigText}>Recycling is great for the planet! Which of the following materials do you regularly recycle?</Text>
        <View style={stylesWaste.form}>
          <Form
            ref="form"
            type={wasteForm}
            options={options}
          />
        </View>
        <TouchableHighlight style={styles.button}
          onPress={this._wasteCalc.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const stylesWaste = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    height: 570,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    textAlign: 'center'
  },
  form: {
    width: 300
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
  user: state.user,
  calcComponent: state.calcComponent
} ) )(Waste);
