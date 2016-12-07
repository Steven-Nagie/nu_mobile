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
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import { changeChallenge } from '../../ducks/challengeDuck';

import styles from '../styles.js';

import Header from '../Header';
import Footer from '../Footer';

import challengeIcons from './challengeIcons';

import allChallenges from "./allChallenges";

import ChallengeHolder from './ChallengeHolder';

let width;
let height;


class ChallengeIndex extends Component {


  constructor(props) {
    super(props);

    this.state = {
      user: {},
      calcComponent: 0,
      challenge: ""
    }
  }


  render() {
    const challenges = allChallenges
    .filter(challenge => challenge.category === this.props.challenge)
    .map(challenge => (
      <ChallengeHolder key={allChallenges.indexOf(challenge)} title={challenge.title} copy={challenge.copy} category={challenge.category} co2={challenge.co2} />
    ));
    // let relaventChallengeComponent = componentArray[0];
    let {height, width} = Dimensions.get("window");
    let challengeIconsCurrent = challengeIcons[this.props.challenge];
    return(
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={stylesIndex.container}>
          <View style={[stylesIndex.top, {width: width}]}>
            <View style={[stylesIndex.topIcons, {width: width}]}>
              <TouchableHighlight onPress={() => {this.props.dispatch(changeChallenge('transport'))}}>
                {challengeIconsCurrent[0]}
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.props.dispatch(changeChallenge('energy'))}}>
                {challengeIconsCurrent[1]}
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.props.dispatch(changeChallenge('water'))}}>
                {challengeIconsCurrent[2]}
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.props.dispatch(changeChallenge('waste'))}}>
                {challengeIconsCurrent[3]}
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.props.dispatch(changeChallenge('food'))}}>
                {challengeIconsCurrent[4]}
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.props.dispatch(changeChallenge('social'))}}>
                {challengeIconsCurrent[5]}
              </TouchableHighlight>
            </View>


          </View>

          <View style={stylesIndex.smallContainer}>
            <ScrollView contentContainerStyle={stylesIndex.contentContainer}>
              {challenges}
            </ScrollView>
          </View>

        </View>

        {/************FOOTER********/}
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    )
  }//End of render statement

}

const stylesIndex = StyleSheet.create({
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
    paddingHorizontal: 20,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3,
    marginTop: 30
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
  progressBarColor: {
    height: 5,
    marginTop: 5
  },
  progressBar: {
    height: 5,
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end'
  },
  smallContainer: {
    flex: .8,
    width: 300,
    bottom: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    width: 300,
    // height: 400
  }
})


export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent,
  challenge: state.challenge
} ) )(ChallengeIndex);
