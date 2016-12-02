import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
import store from 'react-native-simple-store';
import { DefaultRenderer } from 'react-native-router-flux';


class Calculator extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("Children: ", this.props.children);
    console.log("onNavigate: ", this.props.onNavigate);
  }

  render() {
    return(
      <View style={stylesCalculator.container}>
        <Text style={stylesCalculator.header}>Here's the calculator</Text>
        <View style={stylesCalculator.smallContainer}>
          <DefaultRenderer navigationState={this.props.children[0]} onNavigate={this.props.onNavigate} />
        </View>
      </View>
    )
  }//End of render statement

}

const stylesCalculator = StyleSheet.create({
  header: {
    color: 'red',
    flex: .2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'blue'
  },
  smallContainer: {
    flex: .8,
    width: 300,
    bottom: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(state => ({
  user: state.user
} ) )(Calculator);
