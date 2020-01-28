import React, { Component } from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

import Form from 'App/Components/Common/Form'
import FormButton from 'App/Components/FormButton'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'

import Header from 'App/Components/Header'

class LoginScreen extends Component {


  static navigationOptions = {
    title: "Login",
    headerLeft: null,
    header: null
  }

  state = {
    email: '',
    password: ''
  }


  onSubmit() {
    this.props.login(this.state.email, this.state.password)
  }

  render () {
   let loginButtonText = "Login"


   const {goBack} = this.props.navigation;

    let form = [
      {
        title: "Username/Email",
        placeholder: "youremail@domain.com",
        refName: "email",
        onSubmitEditing: () => this.refs.form.refs.login.refs.password.focus(),
        value: this.state.email,
        returnKeyType: 'next',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoCorrect: false,
        onTextChange: (text) => this.setState({email:text}),
      },
      {
        title: "Password",
        placeholder: "*********",
        refName: "password",
        onSubmitEditing: () => this.refs.form.refs.login.refs.password.blur(),
        secureTextEntry: true,
        value: this.state.password,
        returnKeyType: 'done',
        onTextChange: (text) => this.setState({password:text}),
      }
    ]

    return (
          <Grid style={globalStyles.bg}>
            <Row size={15}>
            <Header leftIcon={null} titleAlign="left" title="Log in" rightIcon="x" onPressRight={() => this.props.navigation.navigate("OnboardingScreen")} />
            </Row>
            <Row size={85} style={globalStyles.content}>
              <Col>
                <Row size={3} style={globalStyles.topOffset}>
                  <Col>
                    <Form ref="form" refName="login" formItems={form} errorMsg={this.props.errorMsg} />
                  </Col>
                </Row>
                <Row size={1}>
                  <Col>
                    <Row>
                      <Col style={globalStyles.centerContent}>
                        <FormButton isDisabled={false} buttonText="Login" onPress={() => this.onSubmit()} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPasswordScreen")}>
                          <Text style={globalStyles.p}>Forgot your password?</Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMsg: state.account.loginMsg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (u, p) => dispatch(AccountActions.login(u, p))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
