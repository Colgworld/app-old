import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'

// Components
import FormButton from 'App/Components/FormButton'
import CreditCardForm from 'App/Components/Payments/CreditCardForm'
import BankAccountForm from 'App/Components/Payments/BankAccountForm'
import Header from 'App/Components/Header'

// Styles
import globalStyles from 'App/Themes/GlobalStyles'
import styles from './Styles/PaymentMethodsStyle'

export class PaymentMethods extends Component {


static navigationOptions = ({ navigation }) => ({
    title: "Add Payment",
    tabBar: null,
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Feather name="search" size={Metrics.tabIconSize} color={tintColor} />
    )
  })

  state = {
    modalVisible: false,
    type: null
  }

  render () {

    cancel = () => this.setState({modalVisible: false})
    onPress = (data) => {
      payload = { type: this.state.type }
      if (this.state.type == "stripe_ba") {
        payload["bank_account"] = data
      } else {
        payload["credit_card"] = data
      }
      this.props.createPaymentSource(payload)
    }
    modalComponent = (this.state.type == "stripe_ba") ? <BankAccountForm cancel={cancel} onPress={onPress} type={this.props.account.profile.type} /> : <CreditCardForm cancel={cancel} onPress={onPress} />

    return (
    <Grid>
    <Header />
        <Row>
            <Col>
                <Row size={90}>
                    <Col style={globalStyles.content}>
                        <Row size={40} style={globalStyles.centerContent}>
                            <Col style={globalStyles.centerContent}>
                                <Image source={require('App/Components/Payments/images/add-payment.png')}  />
                            </Col>
                        </Row>
                        <Row size={20}>
                            <Col hAlign='center' style={[globalStyles.content, globalStyles.centerContent]}>
                                <Text style={[globalStyles.bold]}>{"Add a payment method"}</Text>
                                <Text style={[globalStyles.p]}>{"You can easily and securely link any credit card, debit card or bank account to your Workspace"}</Text>
                            </Col>
                        </Row>

                        <Modal visible={this.state.modalVisible} onRequestClose={() => {}} >
                          {modalComponent}
                        </Modal>

                        <Row size={40}>
                            <Col>
                                <FormButton buttonText="Add Credit or Debit Card"
                                    onPress={() => this.setState({ type: "stripe_cc", modalVisible: true })} />
                                <FormButton buttonText="Add Bank Account"
                                    onPress={() => this.setState({ type: "stripe_ba", modalVisible: true })} />
                            </Col>
                        </Row> 
                    </Col>
                </Row>

            </Col>
          </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPaymentSource: (data) => dispatch(PaymentSourcesActions.createPaymentSourceRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods)

