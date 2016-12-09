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

export default class Leaderboard extends Component {

  render() {
    if (this.props.user) {
      return(
        <View style={styles.main}>
        {/*background-image: linear-gradient(229deg, #a7cd66 0%, #87d0ca 100%);*/}
          <LinearGradient
            start={[0.0, 0.5]}
            end={[1.0, 1.0]}
            colors={['#87d0ca', '#a7cd66']} style={[styles.borderDiv, {width: this.props.width}]}>

            <View style={[styles.whiteDiv, {width: (this.props.width - 3)}]}>
              <Text style={[styles.rank, {color: '#ffffff'}]}>{this.props.rank}</Text>
              <Image style={styles.face} source={require('../images/steven.jpg')} />
              <Text style={[styles.name, {color: '#ffffff'}]}>{this.props.name}</Text>
              <Text style={[styles.score, {color: '#ffffff'}]}>{this.props.score}</Text>
            </View>

          </LinearGradient>
        </View>
      )
    } else {
      return(
        <View style={styles.main}>
          <LinearGradient
            start={[0.0, 0.5]}
            end={[1.0, 1.0]}
            colors={['rgba(249, 129, 97, 1)', 'rgba(252, 215, 118, 1)', 'rgba(181, 222, 109, 1)', 'rgba(99, 202, 192, 1)']} style={[styles.borderDiv, {width: this.props.width}]}>

            <View style={[styles.whiteDiv, {width: (this.props.width - 3), backgroundColor: '#ffffff'}]}>
              <Text style={styles.rank}>{this.props.rank}</Text>
              <Image style={styles.face} source={require('../images/steven.jpg')} />
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.score}>{this.props.score}</Text>
            </View>


          </LinearGradient>
        </View>
      )
    }
  }

}



const styles = StyleSheet.create({
  main: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    height: 35,
    borderRadius: 50
  },
  whiteDiv: {
    height: 32,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    overflow: 'visible'
  },
  face: {
    height: 32,
    width: 32,
    borderRadius: 50
  },
  rank: {
    fontSize: 5,
    fontFamily: "OpenSans-Semibold",
    color: "#6ac1b9"
  },
  name: {
    fontSize: 7,
    fontFamily: "OpenSans-Bold",
    color: '#333333'
  },
  score: {
    fontSize: 5,
    fontFamily: "OpenSans-Semibold",
    color: "#f1613a"
  }
})
