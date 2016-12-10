import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from "react-native-simple-store";
import { connect } from 'react-redux';

let profilePic;


class Header extends Component {
  constructor(props) {
    super(props);
  }

  async _userLogout() {
    try {
      await store.delete('user');
      Actions.logOrSign();
      Alert.alert("Logout Success!");
    } catch (error) {
      console.log('Storage error: ' + error.message);
    }
  }

  render() {
    if (!this.props.user.image) {
      profilePic =
        <Image style={styles.thumbnail} source={require('../images/steven.jpg')} />
    } else {
      profilePic =
        <Image style={styles.thumbnail} source={{uri: this.props.user.image}} />
    }
    return(
      <View style={styles.main}>
        <TouchableHighlight onPress={Actions.profile}>
          <Image source={require('../images/nu-colorr.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._userLogout.bind(this)}>
          <Image source={require('../images/search.png')} />
        </TouchableHighlight>
        <View style={styles.right}>
          <TouchableHighlight onPress={Actions.about}>
            <Image source={require('../images/notification-bell.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={Actions.settings}>
            {profilePic}
          </TouchableHighlight>
          <Image source={require('../images/triangle-header.png')} style={styles.triangle}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  main: {
    backgroundColor: '#FFFFFF',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 50
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10
  },
  triangle: {
    height: 8,
    width: 8,
    marginTop: 3,
    marginLeft: 3
  }
})

export default connect( state => ({
  user: state.user
} ) )(Header);
