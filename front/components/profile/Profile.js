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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {createUser} from '../../ducks/userDuck.js';
import store from 'react-native-simple-store';

import Header from '../Header';
import Footer from '../Footer';
import Feed from './Feed';
import Followers from './Followers';

let width;
let height;

class Profile extends Component {

/******FUNCTIONS******/
  async _checkUser() {
    try {
      const user = await store.get('user');
      if (!user) {
        console.log('There is no store data');
      } else {
        this.props.dispatch(createUser(user));
      }
    } catch(err) {
      console.log(err);
    }
  }

  async _userLogout() {
    try {
      await store.delete('user');
      Actions.signUp();
      Alert.alert("Logout Success!");
    } catch (error) {
      console.log('Storage error: ' + error.message);
    }
  }

/*******COMPONENT FUNCTIONS********/
  componentWillMount() {
    this._checkUser();
  }

  //******* RENDER COMPONENT *******
  render() {
    let {height, width} = Dimensions.get("window");
    return(
        <View style={styles.main}>
          <View style={styles.header}>
            <Header />
          </View>

          <ScrollView contentContainerStyle={styles.contentContainer}>

            <Image source={require('../../images/banner-background.jpg')} style={[styles.banner,  {width: width}]}>
              <View style={styles.imageContainer}>
                <Image style={styles.profilePic} source={require('../../images/steven.jpg')} />
              </View>

              <View style={[styles.bannerLinks, {width: width}]}>
                <Text style={styles.linkText}>Feed</Text>
                <Text style={styles.linkText}>Followers</Text>
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
              </View>

            </Image>

            {/*This is where the various assorted scenes will go with the DefaultRenderer*/}
            <View
              style={[styles.subScene, {width: width}]}>
              <Followers />
            </View>

          </ScrollView>

          <View style={[styles.buttonContainer, {width: width}]}>
            <TouchableHighlight style={styles.button} onPress={this._userLogout.bind(this)}>
            <Text style={styles.buttonText}>Log Out</Text>
            </TouchableHighlight>
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
    flex: 1,
  },
  header: {
    top: 0,
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

export default connect( state => ({
  user: state.user
} ) )(Profile);
