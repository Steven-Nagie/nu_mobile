import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';

const stylesCalculator = StyleSheet.create({
  header: {
    color: 'red',
    flex: .2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7'
  },
  top: {
    flex: .3,
    marginBottom: 40,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  icons: {
    height: 55,
    width: 55
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 20
  },
  progress: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    color: '#6f8381',
  },
  percent: {
    color: '#b7bdbd',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular'
  },
  progressBar: {
    height: 5,
    backgroundColor: '#e0e0e0',
    marginTop: 5
  },
  smallContainer: {
    flex: .8,
    width: 300,
    bottom: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default [
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
  ],
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
  ],
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
  ],
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
  ],
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
  ],
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon-color.png')} />,
  ],
  [
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon-color.png')} />,
    <Image style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon-color.png')} />,
  ],
];
