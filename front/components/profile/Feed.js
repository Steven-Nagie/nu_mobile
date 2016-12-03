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

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.share}
          onChangeText={ (text) => this.setState( { text } )}
          value={this.state.text}
          multiline={ true }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  share: {
    width: 300,
    height: 70,
    borderColor: 'gray',
    borderWidth: 1
  }
})
