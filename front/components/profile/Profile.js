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
import LinearGradient from 'react-native-linear-gradient';

const dismissKeyboard = require('dismissKeyboard');

import Header from '../Header';
import Footer from '../Footer';
import Feed from './Feed';
import Followers from './Followers';

let width;
let height;
let profilePic;
let score;
let percent;
let AUTH_TOKEN;
let userid;

class Profile extends Component {
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


/******FUNCTIONS******/
  async _checkUser() {
    try {
      const user = await store.get('user');
      if (!user) {
        console.log('There is no store data');
      } else {
        this.props.dispatch(createUser(user));
        AUTH_TOKEN = user.STORAGE_KEY;
        userid = user.id;
      }
    } catch(err) {
      console.log(err);
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
      } else {
        return;
      }
    } catch(err) {
      Alert.alert(err)
    }
  }



/*******COMPONENT FUNCTIONS********/
  componentWillMount() {
    this._checkUser();
    this._getScore();
  }

  //******* RENDER COMPONENT *******
  render() {
    let {height, width} = Dimensions.get("window");
    if (!this.props.user.image) {
      profilePic =
        <Image style={styles.profilePic} source={require('../../images/steven.jpg')} />
    } else {
      profilePic =
        <Image style={styles.profilePic} source={{uri: this.props.user.image}} />
    }
    if (!this.state.totalScore) {
      score = 0;
      percent = 0;
    } else {
      score = this.state.totalScore;
      percent = this.state.emissionsPercent;
    }
    return(
        <View style={styles.main}>
          <View style={styles.header}>
            <Header />
          </View>

          <ScrollView contentContainerStyle={styles.contentContainer}>

            <Image source={require('../../images/banner-background.jpg')} style={[styles.banner,  {width: width}]}>
              <View style={styles.imageContainer}>
                {profilePic}
              </View>

              <View style={[styles.bannerLinks, {width: width}]}>
                <Text style={styles.linkText}>Feed</Text>
                <Text style={[styles.linkText, {color: '#35b6a5'}]}>Followers</Text>
                <Text style={styles.linkText}>Following</Text>
              </View>

              <View style={[styles.bannerSmall, {width: width}]}>
                <Text style={styles.name}>{this.props.user.firstname + " " + this.props.user.lastname}</Text>
                <TouchableHighlight>
                  <Text style={styles.title}>{this.props.user.title}</Text>
                </TouchableHighlight>
                <View style={styles.locationView}>
                  <Image source={require('../../images/location-pin.png')} />
                  <Text style={styles.location}>{this.props.user.state}</Text>
                </View>

                <View style={styles.score}>
                  <Text style={styles.scoreText}>Monthly emissions: <Text style={[styles.scoreText, {fontFamily: 'OpenSans-Bold'}]}>{score}</Text></Text>
                  <View style={[styles.emissionsCounterView, {width: width * .6}]}>
                    <LinearGradient
                      start={[0.0, 0.5]}
                      end={[1.0, 1.0]}
                      colors={['rgba(99, 202, 192, 1)', 'rgba(181, 222, 109, 1)', 'rgba(252, 215, 118, 1)', 'rgba(249, 129, 97, 1)']}
                      style={{height: 25, width: (width * .3) * {percent}, borderRadius: 50}} />
                  </View>
                  <Text style={[styles.scoreText, {width: width * .6}]}><Text style={[styles.scoreText, {fontFamily: 'OpenSans-Bold'}]}>{percent}%</Text> of the monthly US national allowance</Text>
                </View>

                <View style={[styles.interestsView, {width: width * .6}]}>
                  <Text style={styles.interestsText}>{this.props.user.interests}</Text>
                </View>
              </View>

            </Image>

            {/*This is where the various assorted scenes will go with the DefaultRenderer*/}
            <View
              style={[styles.subScene, {width: width}]}>
              <Followers />
            </View>

          </ScrollView>

          <View style={styles.footer}>
            <Footer />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    top: 0
  },
  contentContainer: {
    flex: 1,
    height: 1200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  //Begin Profile styles
  banner: {
    padding: 20,
    height: 300,
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
  score: {
    marginTop: 5
  },
  scoreText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'OpenSans-Regular'
  },
  emissionsCounterView: {
    height: 25,
    borderRadius: 50,
    borderColor: '#8bd1ca',
    borderWidth: 1,
  },
  interestsView: {
    marginTop: 5
  },
  interestsText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'OpenSans-Regular',
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

export default connect( state => ({
  user: state.user
} ) )(Profile);
