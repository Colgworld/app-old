import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'
import { Madoka } from 'react-native-textinput-effects'
import _ from 'underscore'

import { Row, Col, Grid } from 'react-native-easy-grid'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import Form from 'App/Components/Common/Form'

import { branchLib } from 'App/Lib/Branch'
import { guid } from 'App/Lib/Util'
import AppConfig from 'App/Config/AppConfig'

// Styles
import globalStyles from 'App/Themes/GlobalStyles'
import styles from './Styles/ForgotPasswordScreenStyle'

const { ACCOUNT_FORGOT } = require('App/Config/Constants').default

class ForgotPasswordScreen extends Component {

  state = {
    email: null,
    password: null,
    pass_again: null,
    sent: false
  }

  static navigationOptions = {
    header: null
  }

  render () {
    let formForgot = [
      {
        title: "Email",
        placeholder: "youremail@domain.com",
        refName: "email",
        value: this.state.email,
        returnKeyType: 'done',
        onSubmitEditing: () => this.refs.forgotpwform.refs.forgotpwform.refs.email.blur(),
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoCorrect: false,
        onTextChange: (text) => this.setState({email:text}),
      }
    ]

    let formNewPass = [
      {
        title: "New Password",
        placeholder: "********",
        refName: "pass",
        onSubmitEditing: () => this.refs.forgotpwform.refs.forgotpwform.refs.pass_again.focus(),
        value: this.state.password,
        secureTextEntry: true,
        returnKeyType: 'next',
        autoCapitalize: 'none',
        autoCorrect: false,
        onTextChange: (text) => this.setState({password:text}),
      },
      {
        title: "Confirm New Password",
        placeholder: "********",
        refName: "pass_again",
        secureTextEntry: true,
        onSubmitEditing: () => this.refs.forgotpwform.refs.forgotpwform.refs.pass_again.blur(),
        value: this.state.pass_again,
        returnKeyType: 'done',
        autoCapitalize: 'none',
        autoCorrect: false,
        onTextChange: (text) => this.setState({pass_again:text}),
      }      
    ]


    let _params_undef = _.isUndefined(this.props.navigation.state.params)

    let passDisabled = ((this.state.password === this.state.pass_again) && !_.isNull(this.state.password)) ? false : true
    let forgotDisabled = (!_.isNull(this.state.email)) ? false : true
    let isDisabled = (_params_undef) ? forgotDisabled : passDisabled
    let form = (_params_undef) ? formForgot : formNewPass
    
    let onPress = () => {
      let token = guid()
      branchLib.getShortURL({
        identifier: 'reset-password',
        metadata: {
          token: token,
          route: ACCOUNT_FORGOT,
          email: this.state.email,
        },
        title: "Workspace: Reset Password",
        contentImageUrl: AppConfig.defaultShareImage,
        contentDescription: "Reset your password"
      }).then((r) => {
        this.props.forgotPassword({ 
          email: this.state.email, 
          url: r,
          token: token })
        this.setState({ sent: true })
      })
    }
    if (!_params_undef) {
      onPress = () => this.props.resetPassword({ 
        password: this.state.password, 
        pass_again: this.state.pass_again, 
        token: this.props.navigation.state.params.token })
    } 


    let Content = <Col>
                    <Form ref="forgotpwform" refName="forgotpwform" formItems={form} errorMsg={this.props.errorMsg} />
                    <FormButton buttonText="Reset Password" isDisabled={isDisabled} onPress={onPress}/>
                  </Col>

    if (this.state.sent) {
      Content = <Col><Text>Please check your email to reset your password.</Text></Col>
    }

    return (
          <Grid style={globalStyles.bg}>
            <Row size={15}>
            <Header leftIcon={null} titleAlign="left" title="Forgot Password" rightIcon="x" onPressRight={() => this.props.navigation.navigate("OnboardingScreen")} />
            </Row>
            <Row size={85} style={[globalStyles.topOffset, globalStyles.content]}>
              {Content}
            </Row>
          </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (data) => {dispatch(AccountActions.forgotPasswordRequest(data))},
    resetPassword: (data) => {dispatch(AccountActions.resetPasswordRequest(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
