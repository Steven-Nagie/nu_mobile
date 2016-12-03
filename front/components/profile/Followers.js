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
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


export default class Followers extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
        <Follower
          img={require('../../images/steven.jpg')}
          name="Steven Nagie"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f7f7f7',
    height: 890,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden'
  }
})



class Follower extends Component {
  render() {
    return(
      <View style={stylesThumbnail.container}>
        <Image style={stylesThumbnail.image} source={this.props.img} />
        <Text style={stylesThumbnail.name}>{this.props.name}</Text>
        <TouchableHighlight style={stylesThumbnail.button}>
          <Text style={stylesThumbnail.buttonText}>Following</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const stylesThumbnail = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 110,
    height: 150,
    margin: 20
  },
  image: {
    height: 110,
    width: 104,
    borderColor: '#979797',
    borderWidth: 0.5625,
    borderRadius: 50
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: '#333333'
  },
  button: {
    backgroundColor: '#8bd1ca',
    width: 88,
    height: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'OpenSans-Semibold',
    color: "#ffffff",
  },
})
