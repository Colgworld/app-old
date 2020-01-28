import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/NotificationStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'


// Modal themes
const {
  NOTIFICATION,
  PAYMENT_REQUESTED,
  PAYMENT_REMINDER,
  PAYMENT_SENT_SUCCESS,
  PAYMENT_RECEIVED_SUCCESS,
  PAYMENT_ISSUE,
  CHANGE_ORDER_REVIEW,
  CHANGE_ORDER_REMINDER,
  CHANGE_ORDER_ACCEPTED,
  CHANGE_ORDER_DECLINED,
  CHANGE_ORDER_PAID,
} = require("App/Config/Constants").default


export default class Notification extends Component {
  // Prop type warnings
  static propTypes = {
    modal: PropTypes.object,
  }
  
  // Defaults for props
  static defaultProps = {
    modal: {
      visible: false,
      activeModal: null,
      message: null,
      title: null,
      image: null      
    }
  }

  renderModal() {
    let Modal

    let title
    let image
    let button1Text
    let button2Text
    if (this.props.modal.visible) {
      switch (this.props.modal.activeModal) {
        case PAYMENT_REQUESTED:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case PAYMENT_REMINDER:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case PAYMENT_SENT_SUCCESS:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case PAYMENT_RECEIVED_SUCCESS:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case PAYMENT_ISSUE:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case CHANGE_ORDER_REVIEW:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case CHANGE_ORDER_REMINDER:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case CHANGE_ORDER_ACCEPTED:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case CHANGE_ORDER_DECLINED:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
        case CHANGE_ORDER_PAID:
          title = "PAYMENT REQUESTED"
          button1Text = "Send Payment"
          button1OnPress = () => {}
          button2Text = "Remind Me Later"
          button2OnPress = () => {}
          image = require('App/Images/check_green.png')
          break
      }
    }
    return (
      Modal
    )
  }

  render () {
    return (
      <Grid style={styles.container}>
        <Row>
          <Col>
            <Text>NotificationBase Component</Text>
          </Col>
        </Row>
      </Grid>
    )
  }
}
