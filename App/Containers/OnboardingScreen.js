import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, StatusBar, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import OnboardingActions from '../Redux/OnboardingRedux'
import AccountActions from '../Redux/AccountRedux'
import _ from 'underscore'
import { Grid, Row, Col } from 'react-native-easy-grid'

import DefaultOnboarding from 'App/Components/Onboarding/default'
var { FBLoginManager } = require('react-native-facebook-login');
import Icon from 'react-native-vector-icons/Feather'


const { HOMEOWNER, FACEBOOK, GOOGLE } = require("App/Config/Constants").default
import FormButton from 'App/Components/FormButton'

// Styles
import styles from './Styles/OnboardingScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles';

const logo = require("App/Images/logus.png")
class OnboardingScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  
    this.state = {};
    StatusBar.setBarStyle('dark-content', true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onboarding.onboardedData != this.props.onboarding.onboardedData) {
      this.props.setRole(HOMEOWNER)
    }
  }

  onComplete() {
    this.props.setOnboarded()
    this.props.navigation.navigate("RegisterScreen")
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

  render () {

    return (
        <Grid style={[globalStyles.content, globalStyles.container]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
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
              <FormButton buttonText="Create Account" btnStyle={globalStyles.button} textStyle={globalStyles.white} onPress={() => this.props.navigation.navigate("RegisterScreen")} />
              {/*<Text style={[globalStyles.centerText, {fontSize: 12}]}>{"By signing up, I agree to Workspace’s Terms of Service, Payments Terms of Service, and Privacy Policy"}</Text>*/}
            </Col>
          </Row>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    onboarding: state.onboarding,
    session_key: state.account.session_key
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRole: (role) => dispatch(OnboardingActions.setRole(role)),
    setRoute: (r) => dispatch(OnboardingActions.setRoute(r)),
    setOnboarded: () => dispatch(OnboardingActions.setOnboarded()),
    loginWithFacebook: (data) => dispatch(AccountActions.loginWithFacebook(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen)
