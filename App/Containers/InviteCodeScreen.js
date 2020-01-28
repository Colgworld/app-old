import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'

import { Grid, Row, Col } from 'react-native-easy-grid'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import Form from 'App/Components/Common/Form'

// Styles
import styles from './Styles/InviteCodeScreenStyle'
import Colors from 'App/Themes/Colors'
import globalStyles from 'App/Themes/GlobalStyles'

import AppConfig from 'App/Config/AppConfig'

class InviteCodeScreen extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    inviteCode: null,
    hasError: false
  }

  onSend() {
    if (this.state.inviteCode === AppConfig.inviteCode) {
      this.props.navigation.navigate("ProjectListScreen")
      this.props.setInvited()
    } else {
      this.setState({ hasError: true })
    }
  }

  render () {
    let errorMsg = (this.state.hasError) ? <Text style={[globalStyles.content, globalStyles.error]}>The invitation code you entered is not valid</Text> : null
    
    let form = [
      {
        title: "Enter your invitation code below.",
        placeholder: "50392839",
        refName: "invite",
        value: this.state.inviteCode,
        keyboardType: 'numeric',
        returnKeyType: 'done',
        onTextChange: (text) => this.setState({ inviteCode: text }),
      }
    ]

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Grid style={globalStyles.content}>
            <Header title="Enter Invite Code" rightIcon="x" onPressRight={() => this.props.navigation.navigate("OnboardingScreen")} />
            <Row style={[globalStyles.topOffset]} size={75}>
              <Col>
                <Form formItems={form} ref="inviteCodeForm" />
                {errorMsg}
              </Col>
            </Row>
            <Row size={25} style={{paddingTop: 40}}>
              <Col>
                <FormButton onPress={() => this.onSend()} buttonText="Submit" />
              </Col>
            </Row>
          </Grid>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInvited: () => dispatch(AccountActions.inviteSuccess())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteCodeScreen)
