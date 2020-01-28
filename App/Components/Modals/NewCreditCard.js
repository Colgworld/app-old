import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal } from 'react-native'
import styles from './Styles/NewCreditCardStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import CreditCardForm from 'App/Components/Payments/CreditCardForm'

export default class NewCreditCard extends Component {
  // Prop type warnings
  static propTypes = {
    cancel: PropTypes.func,
    onPress: PropTypes.func,
  }
  
  // Defaults for props
  static defaultProps = {
    cancel: () => {},
    onPress: () => {},
    visible: false
  }

  render () {
    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.cancel()}>
        <CreditCardForm cancel={this.props.cancel} onPress={this.props.onPress} />
      </Modal>
    )
  }
}
