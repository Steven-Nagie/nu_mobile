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
import { changeChallenge } from '../../ducks/challengeDuck';

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

export default {
  transportation: [
    <Image key="6" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon-color.png')} />,
    <Image key="7" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image key="8" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image key="9" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image key="10" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
    <Image key="600" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/social-icon.png')} />
  ],
  energy: [
    <Image key="11" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon.png')} />,
    <Image key="12" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon-color.png')} />,
    <Image key="13" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image key="14" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image key="15" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
    <Image key="600" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/social-icon.png')} />
  ],
  water: [
    <Image key="16" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon.png')} />,
    <Image key="17" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image key="18" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon-color.png')} />,
    <Image key="19" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image key="20" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
    <Image key="600" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/social-icon.png')} />
  ],
  waste: [
    <Image key="21" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon.png')} />,
    <Image key="22" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image key="23" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image key="24" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon-color.png')} />,
    <Image key="25" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
    <Image key="600" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/social-icon.png')} />
  ],
  food: [
    <Image key="26" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon.png')} />,
    <Image key="27" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image key="28" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image key="29" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image key="30" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon-color.png')} />,
    <Image key="600" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/social-icon.png')} />
  ],
  social: [
    <Image key="31" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/transportation-icon.png')} />,
    <Image key="32" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/energy-icon.png')} />,
    <Image key="33" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/water-icon.png')} />,
    <Image key="34" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/waste-icon.png')} />,
    <Image key="35" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/food-icon.png')} />,
    <Image key="600" style={stylesCalculator.icons} source={require('../../images/calcLandingIcons/social-icon-color.png')} />
  ],
};
