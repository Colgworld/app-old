import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal } from 'react-native'
import styles from './Styles/NewBankAccountStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import BankAccountForm from 'App/Components/Payments/BankAccountForm'
const { PRO } = require("App/Config/Constants").default

export default class NewBankAccount extends Component {
  // Prop type warnings
  static propTypes = {
    cancel: PropTypes.func,
    onPress: PropTypes.func,
  }
  
  // Defaults for props
  static defaultProps = {
    cancel: () => {},
    onPress: () => {},
    account_type: PRO,
    visible: false
  }

  render () {
    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.cancel()}>
        <BankAccountForm cancel={this.props.cancel} onPress={this.props.onPress} type={this.props.account_type} />
      </Modal>
    )
  }
}
