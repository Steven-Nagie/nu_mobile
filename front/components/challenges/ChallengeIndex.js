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

import styles from '../styles.js';

import Header from '../Header';
import Footer from '../Footer';

import challengeIcons from './challengeIcons';

import EnergyChallenges from "./EnergyChallenges";
import TransportChallenges from "./TransportChallenges";
import SocialChallenges from "./SocialChallenges";
import WaterChallenges from "./WaterChallenges";
import WasteChallenges from "./WasteChallenges";
import FoodChallenges from "./FoodChallenges";

let width;
let height;
// let componentArray = [
//   <TransportChallenges key="TChal"/>,
//   <EnergyChallenges key="EChal"/>,
//   <WaterChallenges key="WChal"/>,
//   <WasteChallenges key="WASChal"/>,
//   <FoodChallenges key="FChal"/>,
//   <SocialChallenges key="SChal"/>
// ]



class ChallengeIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      calcComponent: 0
    }
  }


  render() {
    // let relaventChallengeComponent = componentArray[0];
    let {height, width} = Dimensions.get("window");
    let challengeIconsCurrent = challengeIcons[0];
    return(
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={stylesIndex.container}>
          <View style={[stylesIndex.top, {width: width}]}>
            <View style={[stylesIndex.topIcons, {width: width}]}>
              {challengeIconsCurrent}
            </View>


          </View>

          <View style={stylesIndex.smallContainer}>
            {relaventChallengeComponent}
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
  }
})


export default connect(state => ({
  user: state.user,
  calcComponent: state.calcComponent
} ) )(ChallengeIndex);
