import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from "tcomb-form-native";
// Below only necessary for specific styling of tcomb stuff.
// import i18n from "tcomb-form-native/lib/i18n/en";
// import templates from "tcomb-form-native/lib/templates/bootstrap";

// Modify form width
t.form.Form.stylesheet.textbox.normal.width = 100;
t.form.Form.stylesheet.textbox.error.width = 60;
// Set Form
const Form = t.form.Form;



const SignIn = t.struct({
  "First Name": t.String,
  "Last Name": t.String,
  State: t.String,
  'Password': t.String
});

let options = {
  auto: 'placeholders',
  fields: {
    'Password': {
      secureTextEntry: true
    }
  }
};

export default class Landing extends Component {
  render() {
    console.log('landing page working');
    return(
    <View style={stylesLanding.container}>
      <Text style={stylesLanding.header}
      onPress={() =>Actions.profile()}>Welcome to Nu.world</Text>
      <Text>Please sign in here</Text>
      <Form
        ref="form"
        type={SignIn}
        options={options}
      />
    </View>
    )
  }
}

const stylesLanding = StyleSheet.create({
  header: {
    color: 'red',
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
