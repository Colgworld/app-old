'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import globalStyles from 'App/Themes/GlobalStyles'
import Feather from 'react-native-vector-icons/Feather'

import { Grid, Row, Col } from 'react-native-easy-grid'

class PaymentSource extends Component {
  render() {


    let verifiedStatus = (this.props.payment.verified) ? null : <Text>Tap to verify your bank account and pay</Text>

    return (
      <Row style={{flex:.5}}>
        <TouchableOpacity onPress={this.props.onPress} style={{flex: 1}}>
          <Col>
            <Row style={[globalStyles.content, styles.btnStyle]}>
              <Col size={12}>
                <Feather name={this.props.icon} size={30} color={this.props.iconColor} style={{ marginRight: 10}} />
              </Col>
              <Col size={80}>
                  <Text style={this.props.txtStyle}>{this.props.payment.name}</Text>
                  <Text style={[this.props.txtStyle, {fontSize: 10}]}>{this.props.teaserTxt + this.props.payment.last4}</Text>
                  {verifiedStatus}
              </Col>
            </Row>
          </Col>
        </TouchableOpacity>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
  },

  btnTitle: {
    color: "#FFFFFF"
  },
});


export default PaymentSource;
