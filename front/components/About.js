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
import store from 'react-native-simple-store';

const dismissKeyboard = require('dismissKeyboard');

import Header from './Header';
import Footer from './Footer';

import styles from './styles';

let width;
let height;


export default class About extends Component {

  render() {
    return(
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>

        <ScrollView contentContainerStyle={[stylesAbout.contentContainer, {paddingVertical: 10, paddingHorizontal: 20}]}>
          <Text style={styles.h1}>What is nu.world?</Text>
          <Text style={styles.text}>Nu.world is designed as an environmentally conscious social movement. By engaging ourselves and our friends in an environmental mindset, we hope to improve the world just a little bit.</Text>
          <Text style={styles.h1}>Why is everything in CO2?</Text>
          <Text style={styles.text}>This is a question that comes up a lot. There are so many problems in the world, why focus solely on CO2 emissions? The reason is that CO2 equivalent emissions are a very simple but accurate way to measure someone's environmental impact. Cutting down a tree is bad in its own right, but it is possible to extrapolate the impact that such an action will have in easy to read terms of CO2. So we could say, "cutting down a tree is bad for soil erosion and wildlife habitat yada yada." Much easier to do the calculations beforehand and simply say, "The soil erosion plus loss of habitat is something like XX amount of carbon." That way we're always speaking about the same thing.</Text>
        </ScrollView>

        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    )
  }
}

const stylesAbout = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    top: 0
  },
  contentContainer: {
    flex: 1,
    height: 600,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  //Begin Profile styles
  banner: {
    padding: 20,
    height: 210,
    // position: 'absolute',
    // top: -25,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bannerSmall: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 30
  },
  bannerLinks: {
    position: 'absolute',
    height: 15,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: '#ffffff',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14,
    marginHorizontal: 10
  },
  profilePic: {
    height: 95,
    width: 90,
    borderColor: '#979797',
    borderWidth: 0.5625,
    borderRadius: 50
  },
  name: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 32,
    color: '#ffffff'
    // In ios we will add letterSpacing: 1.64
  },
  title: {
    color: '#8bd1ca',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 21
    //iOS add letterSpacing: 1.09
  },
  locationView: {
    flexDirection: "row",
  },
  location: {
    color: '#ffffff',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14
  },
  // SubScene styles
  subScene: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 65,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8bd1ca',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100,
    marginRight: 10,
  },
  footer: {
    bottom: 0
  },
})
