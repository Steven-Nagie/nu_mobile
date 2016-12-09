import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {createUser} from '../../ducks/userDuck.js';
import store from 'react-native-simple-store';

const dismissKeyboard = require('dismissKeyboard');

import Header from '../Header';
import Footer from '../Footer';

import styles from "../styles";

let width;
let height;

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      interests: "Interests",
      title: "Title"
    }
  }

  async _submitInterests() {
    try {
      await store.update("user", {
        interests: this.state.interests
      });
      Alert.alert("Interests updated!");
    } catch(err) {
      Alert.alert(err);
    }
  }

  async _submitTitle() {
    try {
      await store.update("user", {
        title: this.state.title
      });
      Alert.alert("Title updated!");
    } catch(err) {
      Alert.alert(err);
    }
  }

  render() {
    let {height, width} = Dimensions.get('window');
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>

        <View style={styles.container}>
          <View style={stylesSettings.updateContainer}>
            <Text style={styles.text}>Update your interests</Text>
            <TextInput
              style={stylesSettings.textInput}
              onChangeText={ (text) => this.setState({interests: text}) }
              value={this.state.interests}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableHighlight style={stylesSettings.button} onPress={this._submitInterests.bind(this)}>
                <Text style={stylesSettings.buttonText}>Submit</Text>
            </TouchableHighlight>
          </View>

          <View style={stylesSettings.updateContainer}>
            <Text style={styles.text}>Update your title</Text>
            <TextInput
              style={stylesSettings.textInput}
              onChangeText={ (text) => this.setState({title: text}) }
              value={this.state.title}
            />
            <TouchableHighlight style={stylesSettings.button} onPress={this._submitTitle.bind(this)}>
                <Text style={stylesSettings.buttonText}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }

}

const stylesSettings = StyleSheet.create({
  textInput: {
    height: 100,
    width: 300,
  },
  updateContainer: {
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#8bd1ca',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 70
  }
})

export default connect( state => ({
  user: state.user
} ) )(Settings);
