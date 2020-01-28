import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal, ScrollView } from 'react-native'
import styles from './Styles/NewMemberStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'

import FormButton from 'App/Components/FormButton'
import Form from 'App/Components/Common/Form'
import Header from 'App/Components/Header'
import AppConfig from 'App/Config/AppConfig'
import globalStyles from 'App/Themes/GlobalStyles'
import PaymentSourcesList from 'App/Components/Payments/PaymentSourcesList'

export default class SendPayment extends Component {
  // // Prop type warnings
  static propTypes = {
    payment: PropTypes.object,
    paymentSources: PropTypes.object,
    onPaymentPress: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    payment: {
      ID: null,
      title: null,
      amount: null,
      status: null
    },
    onPaymentPress: (s) => {},
    verifyPaymentSourceMsg: null
  }

  state = {
    selected: null
  }

  close() {
    this.setState({selected: null})
    this.props.close()
  }

  onPaymentPress(selected) {
    this.setState({selected})
    this.props.onPaymentPress(selected)
  }

  render () {
    let rightIcon = AppConfig.closeIcon
    const _sel = !_.isNull(this.state.selected)
    let buttonText = (_sel) ? "Pay" : "Select Payment"
    let btnStyle = (_sel) ? globalStyles.greenButton : globalStyles.buttonDisabled
    let onPress = (_sel) ? () => this.props.onPress(this.state.selected): null

    editable = false
    amount = (!_.isUndefined(this.props.payment.amount)) ? "$ " + this.props.payment.amount.toString() : ""
    let form = [
      {
        title: "Milestone Name",
        value: this.props.payment.milestoneName,
        editable: editable
      },
      {
        title: "Milestone Amount",
        value: amount,
        editable: editable
      },
      {
        title: "Description",
        value: this.props.payment.title,
        editable: editable
      },
    ]




    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.close()}>
        <Grid>
          <Row size={15}>
          <Header title={"Send Payment"}
                  rightIcon={rightIcon}
                  onPressRight={() => this.close()}
          />
          </Row>
          <Row size={85} style={globalStyles.content}>
            <Col> 
                  <Form formItems={form} />
                  <PaymentSourcesList {...this.props} 
                    message={this.props.verifyPaymentSourceMsg}
                    onPress={(s) => this.onPaymentPress(s)}
                    verifyPaymentSource={(p) => this.props.verifyPaymentSource(p)} />
                <FormButton buttonText={buttonText} onPress={onPress} btnStyle={btnStyle} />
            </Col>        
          </Row>
        </Grid>
      </Modal> 
    )
  }
}
