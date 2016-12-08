import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import LinearGradient from 'react-native-linear-gradient';

import Header from "./Header";
import Footer from "./Footer";
import Leaderboard from "./Leaderboard";

let totalScore;
let transportScore;
let energyScore;
let waterScore;
let wasteScore;
let foodScore;
let userId;
let AUTH_TOKEN;
let height;
let width;

export default class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: 0,
      transportScore: 0,
      energyScore: 0,
      waterScore: 0,
      wasteScore: 0,
      foodScore: 0,
      emissionsPercent: 0,
      earths: "so many",
    }
  }

  async _getScore() {
    try {
      const score = await store.get('score');
      if(score){
        this.setState({
          totalScore: score.total,
          transportScore: score.transport,
          energyScore: score.energy,
          waterScore: score.water,
          wasteScore: score.waste,
          emissionsPercent: (Math.round(score.total / 1980.45) * 100),
          foodScore: score.food
        })
      }
    } catch(err) {
      Alert.alert(err)
    }
  }

  componentWillMount() {
    this._getScore();
  }

  render() {
    let {height, width} = Dimensions.get('window');
    // Maybe do quotes around image tag since we're outsie return statement here
    const earthImage = <Image style={styles.earth} source={require('../images/earth.png')}/>
    const earthImages = [earthImage, earthImage, earthImage];
    return(
      <View style={styles.main}>
        <View style={styles.header}>
          <Header />
        </View>

        <View style={styles.container}>
          <View style={[styles.containerLeft, {width: (width * .3), height: (height - 180)}]}>
            <View style={[styles.yourFootprint, {width: (width * .3), height: ((height - 190) / 3)}]}>
              <Text style={styles.footprintHead}>Your Footprint</Text>
              <Text style={styles.footprintText}>{this.state.totalScore}</Text>
              <TouchableHighlight style={styles.button} onPress={Actions.calculator}>
                <Text style={styles.buttonText}>Reevaluate</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.leaderboard, {width: (width * .3), height: ((height - 190) / 1.5)}]}>
              <View style={styles.leaderboardTop}>
                <Text style={styles.footprintHead}>Leaderboard</Text>
              </View>

              <Leaderboard />

            </View>
          </View>

          <View style={[styles.containerRight, {width: (width * .6), height: (height - 180)}]}>

            <View style={[styles.rightSmallContainer, {width: (width * .6), height: ((height - 190) / 3)}]}>
              <Text style={styles.headText}>Emissions Allowance</Text>
              <Text style={styles.text}>Per person monthly allowance based on U.S. goals to reduce 2005 levels by 26-28% by 2025.</Text>
              <View style={[styles.progressView, {width: width * .6}]}>
                <Text style={styles.progress}>Shares used</Text>
                <LinearGradient
                  start={[0.0, 0.5]}
                  end={[1.0, 1.0]}
                  colors={['rgba(249, 129, 97, 1)', 'rgba(252, 215, 118, 1)', 'rgba(181, 222, 109, 1)', 'rgba(99, 202, 192, 1)']}
                  style={[styles.progressBarColor, {width: (width*.27)}]}>
                  <View style={[styles.progressBar, {width: ((width*.27) / this.state.emissionsPercent)}]} />
                </LinearGradient>

                <Text style={styles.percent}>{this.state.emissionsPercent}%</Text>
              </View>
            </View>

            <View style={[styles.rightSmallContainer, {width: (width * .6), height: ((height - 190) / 3)}]}>
              <Text style={styles.headText}>Resources</Text>
              <Text style={styles.text}>It takes {this.state.earths} Earths to support your current lifestyle.</Text>
              <View style={[styles.earthsContainer, {width: (width * .6)}]}>
                {earthImages}
              </View>
            </View>

            <View style={[styles.rightSmallContainer, {width: (width * .6), height: ((height - 190) / 3), paddingVertical: 5}]}>
              <Text style={styles.headText}> CO2 Emissions</Text>
              <Text style={styles.units}>(lbs CO2equivalent)</Text>
              <View style={[styles.iconContainer, {width: (width * .6)}]}>
                <View style={styles.icons}>
                  <Image style={styles.iconImage} source={require('../images/statsIcons/transportation-icon.png')} />
                  <Text style={styles.iconText}>Travel</Text>
                  <Text style={styles.iconNumber}>{this.state.transportScore}</Text>
                </View>
                <View style={styles.icons}>
                  <Image style={styles.iconImage} source={require('../images/statsIcons/energy-icon.png')} />
                  <Text style={styles.iconText}>Energy</Text>
                  <Text style={styles.iconNumber}>{this.state.energyScore}</Text>
                </View>
                <View style={styles.icons}>
                  <Image style={styles.iconImage} source={require('../images/statsIcons/water-icon.png')} />
                  <Text style={styles.iconText}>Water</Text>
                  <Text style={styles.iconNumber}>{this.state.waterScore}</Text>
                </View>
                <View style={styles.icons}>
                  <Image style={styles.iconImage} source={require('../images/statsIcons/waste-icon.png')} />
                  <Text style={styles.iconText}>Waste</Text>
                  <Text style={styles.iconNumber}>{this.state.wasteScore}</Text>
                </View>
                <View style={styles.icons}>
                  <Image style={styles.iconImage} source={require('../images/statsIcons/food-icon.png')} />
                  <Text style={styles.iconText}>Food</Text>
                  <Text style={styles.iconNumber}>{this.state.foodScore}</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  header: {
    top: 0
  },
  footer: {
    bottom: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  containerLeft: {
    justifyContent: 'space-between'
  },
  yourFootprint: {
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  leaderboard: {
    backgroundColor: '#ffffff'
  },
  leaderboardTop: {
    height: 30,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#d3e8e6'
  },
  containerRight: {
    justifyContent: 'space-between'
  },
  rightSmallContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  headText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Light',
    color: '#333333'
  },
  footprintHead: {
    fontSize: 18,
    fontFamily: 'OpenSans-Light',
    color: '#333333',
    textAlign: 'center'
  },
  units: {
    fontSize: 10,
    marginVertical: 5
  },
  text: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#9ea09f',
    textAlign: 'center'
  },
  footprintText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    color: '#9ea09f',
    textAlign: 'center'
  },
  earthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  earth: {
    height: 30,
    width: 30
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 3
  },
  progress: {
    fontSize: 12,
    fontFamily: 'OpenSans-Bold',
    color: '#6f8381',
  },
  percent: {
    color: '#b7bdbd',
    fontSize: 12,
    fontFamily: 'OpenSans-Regular'
  },
  progressBarColor: {
    height: 5
  },
  progressBar: {
    height: 5,
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end'
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    marginTop: 3
  },
  icons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 15,
    marginTop: 3
  },
  iconImage: {

  },
  iconText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: '#333333'
  },
  iconNumber: {
    fontFamily: "OpenSans-Semibold",
    fontSize: 8,
    color: '#99acab'
  },
  buttonText: {
    fontSize: 10,
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
