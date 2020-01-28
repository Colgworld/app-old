'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated
} from 'react-native';
import { Madoka } from 'react-native-textinput-effects'

import FormButton from 'App/Components/FormButton'
import globalStyles from 'App/Themes/GlobalStyles'
// import Animation from 'lottie-react-native';
import Colors from 'App/Themes/Colors'

import Start from './Start'

const {
    DARK_BLUE,
    FOOTER_HEIGHT,
    HEADER_HEIGHT,
    HEADER_OFFSET
} = require("App/Config/Constants")

import Dimensions from 'Dimensions'

class ProjectWizardHomeowner extends Component {

  render() {
    return (
      <Start {...this.props} />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    marginTop: 20
  }
});


export default ProjectWizardHomeowner;