/* @flow */
/* <FormButton buttonText="Login"  /> */
import React, { Component } from 'react';

import { Image, Text, View, TouchableHighlight, TouchableOpacity, DeviceEventEmitter, ScrollView } from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid'
import Icon from 'react-native-vector-icons/Feather'


import globalStyles from 'App/Themes/GlobalStyles';

import Dimensions from 'Dimensions';
import LinearsGradient from 'react-native-linear-gradient';

import FormButton from 'App/Components/FormButton'
import _ from 'underscore'

var { FBLoginManager } = require('react-native-facebook-login');

const { 
  PRO, 
  HOMEOWNER, 
} = require("App/Config/Constants").default

const logo = require("App/Images/logus.png")

export default class Onboarding extends Component {

  constructor(props) {
    super(props);
  
  }

  static defaultProps = {
    loginWithFacebook: () => {}
  }

  state = {
  }


  onPress() {
    // FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
    FBLoginManager.loginWithPermissions(["email","user_friends"], (error, data) => {
      if (_.isNull(error)) {
        this.props.loginWithFacebook(data)
      } else {
        console.log("Error logging in with Facebook", error)
      }
    })
  }

  render() {
    return (
        <Grid style={[globalStyles.content, globalStyles.container]}>
            <TouchableOpacity onPress={() => this.props.login()}>
              <Text style={[globalStyles.darkPurple, globalStyles.thicc, {paddingTop: 40}]}>
                Log In
              </Text>
            </TouchableOpacity>
          <Row size={80} style={globalStyles.centerContent}>
            <Col style={globalStyles.centerContent}>
              <Image source={logo} style={[globalStyles.centerImage, {maxWidth: 109, resizeMode: 'contain', maxHeight: 126}]} />
              <Text style={{fontSize: 40}}>workspace</Text>
            </Col>
          </Row>
          <Row size={20}>
            <Col style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity 
                onPress={() => this.onPress()} 
                underlayColor={'#4469b0'} 
                style={[globalStyles.FBButton, {alignItems: 'center', justifyContent: 'center'}]} >
                <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Col size={25}>
                    <Icon name="facebook" size={25} style={[globalStyles.white, {paddingLeft: 20}]}/>
                  </Col>
                  <Col size={80}>
                    <Text style={globalStyles.buttonText}>Continue with Facebook</Text>
                  </Col>
                </Row>
              </TouchableOpacity>
              <FormButton buttonText="Create Account" btnStyle={globalStyles.button} textStyle={globalStyles.white} onPress={() => this.props.register()} />
              {/*<Text style={[globalStyles.centerText, {fontSize: 12}]}>{"By signing up, I agree to Workspace’s Terms of Service, Payments Terms of Service, and Privacy Policy"}</Text>*/}
            </Col>
          </Row>
        </Grid>
    );

  }
}
