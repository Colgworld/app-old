'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

import globalStyles from 'App/Themes/GlobalStyles'

class FormButton extends Component {
  render() {
    return (
      <Button style={[globalStyles.button, this.props.btnStyle]}
        testID={this.props.testID}
        textStyle={[globalStyles.kindaBold, globalStyles.whiteText, globalStyles.buttonText, this.props.textStyle]}
        isDisabled={this.props.isDisabled}
        onPress={this.props.onPress} >
        {this.props.buttonText}
      </Button>
    );
  }
}

export default FormButton;