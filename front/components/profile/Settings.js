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
import { RNS3 } from 'react-native-aws3';

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
let sendPhotoStyles;
let access;
let secretAccess;
let flag = true;
let imageLocation;

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      interests: "Interests",
      title: "Title",
      avatarSource: null,
      sendSource: null
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
    .then(function(response) {
      if (response.status !== 201) {
        Alert.alert("That didn't work, try again");
      }
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
    .then(function(response) {
      if (response.status !== 201) {
        Alert.alert("That didn't work, try again");
      }
    })
    .done();
  }


  /************PHOTO STUFF**************/
  _getPhoto() {
    ImagePicker.showImagePicker(options, (response) => {

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
        const sourceForS3 = response.uri;

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source,
          sendSource: sourceForS3
        });
        this._submitPhoto(source);
        this._getAccess();
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

  _getAccess() {
    fetch("http://104.236.79.194:3001/photos/access", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(function(response) {
      access = response.access;
      secretAccess = response.secretAccess;
    })
    .done();
  }



  _sendPhoto() {
    let file = {
      uri: this.state.sendSource,
      name: userId + " pic " + new Date(),
      type: "image/jpeg"
    };

    let sendOptions = {
      keyPrefix: "uploads/",
      bucket: "nu-photos",
      region: "us-east-1",
      accessKey: access,
      secretKey: secretAccess,
      successActionStatus: 201
    };

      RNS3.put(file, sendOptions).progress((e) => console.log(e.loaded / e.total)).then(response => {
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
          console.log(response);
        } else {
          imageLocation = response.body.postResponse.location;
          this._sendPhotoHome();
          this._submitPhoto(imageLocation);
        }
      }).catch(err => {
        Alert.alert(err);
      });
    }

    _sendPhotoHome() {
      fetch("http://104.236.79.194:3001/photos/upload", {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + AUTH_TOKEN,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          photo: imageLocation,
          id: userId
        })
      })
      .then(function(response) {
        if (response.status !== 201) {
          Alert.alert("That didn't work, try again");
        }
      })
      .done();
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
    if (!flag) {
      sendPhotoStyles = stylesSettings.buttonOff;
      sendPhotoText = stylesSettings.buttonTextOff;
    } else {
      sendPhotoStyles = stylesSettings.button;
      sendPhotoText = stylesSettings.buttonText;
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
          <View style={stylesSettings.buttonHolder}>
            <TouchableHighlight style={[stylesSettings.button, {alignSelf: 'center', marginTop: 10, marginRight: 10}]} onPress={this._getPhoto.bind(this)}>
              <Text style={stylesSettings.buttonText}>Take Photo</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[sendPhotoStyles, {alignSelf: 'center', marginTop: 10}]} onPress={this._sendPhoto.bind(this)}>
              <Text style={sendPhotoText}>Send Photo</Text>
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
    alignSelf: 'center',
    textAlign: 'center'
  },
  buttonTextOff: {
    fontSize: 14,
    color: '#8bd1ca',
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
  buttonOff: {
    borderColor: '#8bd1ca',
    borderWidth: 1,
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
  },
  buttonHolder: {
    flexDirection: 'row'
  }
})

export default connect( state => ({
  user: state.user
} ) )(Settings);
