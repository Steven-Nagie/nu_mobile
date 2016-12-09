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
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

const dismissKeyboard = require('dismissKeyboard');

import Header from '../Header';
import Footer from '../Footer';

import styles from "../styles";

var options = {
  title: 'Select Photo',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

let width;
let height;
let photo;
let userId;
let AUTH_TOKEN;

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      interests: "Interests",
      title: "Title",
      avatarSource: null
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

  async _submitInterests() {
    try {
      await store.update("user", {
        interests: this.state.interests
      });
      Alert.alert("Interests updated!");
      this._sendInterests();
    } catch(err) {
      Alert.alert(err);
    }
  }

  _sendInterests() {
    fetch("http://104.236.79.194:3001/users/interests", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        interests: this.state.interests,
        id: userId
      })
    })
    .done();
  }

  async _submitTitle() {
    try {
      await store.update("user", {
        title: this.state.title
      });
      Alert.alert("Title updated!");
      this._sendTitle();
    } catch(err) {
      Alert.alert(err);
    }
  }

  _sendTitle() {
    fetch("http://104.236.79.194:3001/users/title", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        id: userId
      })
    })
    .done();
  }

  _getPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
        this._submitPhoto(source)
      }
    });
  }

  async _submitPhoto(source) {
    try {
      await store.update("user", {
        image: source
      });
      Alert.alert("Photo updated!");
    } catch(err) {
      Alert.alert(err);
    }
  }

  componentWillMount() {
    this._checkUser();
  }

  render() {
    let {height, width} = Dimensions.get('window');
    if (this.state.avatarSource) {
      photo =  <Image source={this.state.avatarSource} style={{height: 50, width: 50, borderRadius: 50}} />
    } else {
      photo = <View style={stylesSettings.placeholder} />
    }
    return(
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
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
        </ScrollView>

        <View style={stylesSettings.updateContainer}>
          <Text style={[styles.text, {marginBottom: 10}]}>Update your photo</Text>
          {photo}
          <TouchableHighlight style={[stylesSettings.button, {alignSelf: 'center', marginTop: 10}]} onPress={this._getPhoto.bind(this)}>
            <Text style={stylesSettings.buttonText}>Update Photo</Text>
          </TouchableHighlight>
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
    alignSelf: 'center',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#8bd1ca',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 70
  },
  placeholder: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#d8d8d8'
  }
})

export default connect( state => ({
  user: state.user
} ) )(Settings);
