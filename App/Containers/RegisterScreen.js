import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, TouchableOpacity, Dimensions, Keyboard, Platform } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from 'App/Redux/AccountRedux'
import _ from 'underscore'

// Styles
import styles from './Styles/RegisterScreenStyle'

import Form from 'App/Components/Common/Form'
import FormButton from 'App/Components/FormButton'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'

import Header from 'App/Components/Header'
const { PRO, HOMEOWNER } = require('App/Config/Constants').default

class RegisterScreen extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_again: '',
    username: '',
    phone: '',
    isDisabled: true,
    buttonText: "Create Account",
    linkUser: false,
    keyboardShowing: false
  }

  static navigationOptions = {
    title: "Sign Up",
    headerLeft: null,
    header: null
  }

  componentDidMount() {
    if (!_.isUndefined(this.props.onboarding.onboardedData)) {
      this.setState({ linkUser: true })
    }
    this.keyboardDidShowListener = (Platform.OS == "android") ? Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this)) : Keyboard.addListener('keyboardWillShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = (Platform.OS == "android") ? Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this)) : Keyboard.addListener('keyboardWillHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.setState({keyboardShowing:true});
  }

  _keyboardDidHide () {
    this.setState({keyboardShowing:false});
  }

  onChange(field, value) {

    var vals = this.state
    this.setState({
      [field]: value
    })
    vals[field] = value


    if (vals['firstname'] != '' &&
        vals['lastname'] != '' &&
        vals['email'] != '' &&
        vals['password'] != '' &&
        vals['password_again'] != '' &&
        vals['password'] == vals['password_again']) {
      

      this.setState({isDisabled:false, buttonText:"Create Account"})
    } else {

      this.setState({isDisabled:true, buttonText:"Complete the form"})
    }
  }


  onSubmit() {
    let role = (!_.isNull(this.props.onboarding.onboardedData)) ? this.props.onboarding.onboardedData.role : PRO
    this.props.navigation.navigate("SelectRoleScreen", {
      email: this.state.email, 
      password: this.state.password, 
      firstname: this.state.firstname, 
      lastname: this.state.lastname, 
      role: role, 
      phone: this.state.phone,
      linkUser: this.state.linkUser
    })
  }


  render () {
    let loginButtonText = "Register"

    let form = [
      {
        title: "First Name",
        placeholder: "John",
        refName: "firstname",
        onSubmitEditing: () => this.refs.form.refs.register.refs.lastname.focus(),
        value: this.state.firstname,
        returnKeyType: 'next',
        onTextChange: (text) => this.onChange('firstname', text),
        autoCapitalize: 'words'
      },
      {
        title: "Last Name",
        placeholder: "Doe",
        refName: "lastname",
        onSubmitEditing: () => this.refs.form.refs.register.refs.email.focus(),
        value: this.state.lastname,
        returnKeyType: 'next',
        onTextChange: (text) => this.onChange('lastname', text),
        autoCapitalize: 'words'
      },
      {
        title: "Email",
        placeholder: "you@domain.com",
        refName: "email",
        onSubmitEditing: () => this.refs.form.refs.register.refs.password.focus(),
        keyboardType: 'email-address',
        value: this.state.email,
        returnKeyType: 'next',
        onTextChange: (text) => this.onChange('email', text),
      },
      {
        title: "Password",
        placeholder: "**********",
        refName: "password",
        onSubmitEditing: () => this.refs.form.refs.register.refs.password_again.focus(),
        secureTextEntry: true,
        value: this.state.password,
        returnKeyType: 'next',
        onTextChange: (text) => this.onChange('password', text),
      },
      {
        title: "Confirm Password",
        placeholder: "**********",
        refName: "password_again",
        onSubmitEditing: () => this.refs.form.refs.register.refs.password_again.blur(),
        secureTextEntry: true,
        value: this.state.password_again,
        returnKeyType: 'done',
        onTextChange: (text) => this.onChange('password_again', text),
      }
    ]


    let Buttons = (!this.state.keyboardShowing) ? <Row size={20}>
                        <Col>
                          <FormButton 
                              onPress={() => this.onSubmit()}
                              buttonText={this.state.buttonText} 
                              isDisabled={this.state.isDisabled} />

                          <FormButton 
                              onPress={() => this.props.navigation.navigate("LoginScreen")}
                              buttonText="I already have an account" 
                              btnStyle={globalStyles.invButton}
                              textStyle={globalStyles.darkPurple} />
                        </Col>
                      </Row> : null


    return (
      <Grid style={globalStyles.bg}>
        <Row size={15}>
          <Header title="Sign Up" titleAlign="left" rightIcon="x" onPressRight={() => this.props.navigation.navigate("OnboardingScreen")} />
        </Row>
        <Row size={85} style={globalStyles.content}>
          <Col>
            <Row size={85}>
              <Col>
              <ScrollView keyboardShouldPersistTaps="always">
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={130}>
                    <Grid style={[globalStyles.topOffset, {paddingBottom:100}]}>
                      <Row>
                        <Col>
                        <Form formItems={form} refName="register" ref="form" />

                        </Col>
                      </Row>
                    </Grid>
                </KeyboardAvoidingView>
              </ScrollView>
              </Col>
            </Row>
            {Buttons}
          </Col>
        </Row>
      </Grid>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    onboarding: state.onboarding,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(AccountActions.register(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
