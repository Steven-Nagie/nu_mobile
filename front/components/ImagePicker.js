import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import { RNS3 } from 'react-native-aws3';
import config from "../configPhoto.json";
import { transferUtility } from 'react-native-s3';

  var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


  let r;


export default class Images extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatarSource: null,
      sendSource: null
    }
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
        }
      });
  }

  /*********With react-native-aws3************/
  _sendPhoto() {
    console.log(this.state.sendSource);
    let file = {
      uri: this.state.sendSource,
      name: "Baby's first image",
      type: "image/jpeg"
    };

    let sendOptions = {
      keyPrefix: "uploads/",
      bucket: "nu-photos",
      region: "us-east-1",
      accessKey: config.access,
      secretKey: config.secretAccess,
      successActionStatus: 201
    };

      RNS3.put(file, sendOptions).progress((e) => console.log(e.loaded / e.total)).then(response => {
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
          console.log(response);
        } else {
          console.log(response);
        }
      }).catch(err => {
        console.log(err);
      });
    }

  /*******CLOUDINARY BASIC API POST***********/
  // async _sendPhoto() {
  //   try {
  //     fetch("https://api.cloudinary.com/v1_1/nu-world/image/upload")
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  render() {
    if (this.state.avatarSource) {
      r =  <Image source={this.state.avatarSource} style={{height: 100, width: 100}} />
    } else {
      r = <Text>HHHH</Text>
    }
    return(
      <View>
      <Text> HKL:J</Text>
      <TouchableHighlight onPress={this._getPhoto.bind(this)}>
        <Text>Getp hoho</Text>
      </TouchableHighlight>
      {r}
      <TouchableHighlight onPress={this._sendPhoto.bind(this)}>
        <Text> Send PHoto</Text>
      </TouchableHighlight>
      </View>
    )
  }
}
