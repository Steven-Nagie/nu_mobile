import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {createUser} from '../../ducks/userDuck.js';
import store from 'react-native-simple-store';

import Header from '../Header';

let width;
let height;

class Profile extends Component {

/******FUNCTIONS******/
  async _checkUser() {
    console.log('calling checkuser with store');
    try {
      const user = await store.get('user');
      if (!user) {
        console.log('There is no store data');
      } else {
        console.log(user);
        this.props.dispatch(createUser(user));
      }
    } catch(err) {
      console.log(err);
    }
  }

  async _userLogout() {
    try {
      await store.delete('user');
      Actions.landing();
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
    console.log(width);
    return(
        <View style={styles.main}>
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.container}>

            <Image source={require('../../images/steven.jpg')} style={[styles.banner,  {width: width}]}>
              <View style={styles.imageContainer}>
                <Image style={styles.profilePic} source={require('../../images/steven.jpg')} />
              </View>

              <View style={[styles.bannerSmall, {width: width}]}>
                <Text style={styles.name}>{this.props.user.firstname}</Text>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.location}>{this.props.user.state}</Text>
              </View>

              <View style={[styles.bannerLinks, {width: width}]}>
              <Text style={{marginHorizontal: 10}}>Feed</Text>
              <Text style={{marginHorizontal: 10}}>Followers</Text>
              <Text style={{marginHorizontal: 10}}>Following</Text>
              </View>
            </Image>

            <TouchableHighlight style={styles.button} onPress={this._userLogout.bind(this)}>
            <Text style={styles.buttonText}>Log Out</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={Actions.calculator}>
              <Text style={styles.buttonText}>Go to calculator</Text>
            </TouchableHighlight>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'green'
  },
  header: {
    top: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  //Begin Profile styles
  banner: {
    padding: 20,
    height: 210,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bannerSmall: {
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 30
  },
  bannerLinks: {
    position: 'absolute',
    height: 15,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
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
    fontSize: 54,
    color: '#ffffff'
    // In ios we will add letterSpacing: 1.64
  },
  title: {
    color: '#8bd1ca',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 36
    //iOS add letterSpacing: 1.09
  },
  location: {
    color: '#ffffff',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 27
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

export default connect( state => ({
  user: state.user
} ) )(Profile);
