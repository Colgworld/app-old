import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/PaymentSettingsStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import NotificationSwitch from 'App/Components/NotificationSwitch'
import { Col, Row, Grid } from "react-native-easy-grid";
import PaymentSource from 'App/Components/Payments/PaymentSource'
import PaymentSourcesList from 'App/Components/Payments/PaymentSourcesList'
const { PRO, HOMEOWNER } = require("App/Config/Constants").default

export default class PaymentSettings extends Component {

  static defaultProps = {
    accountType: PRO,
    preferences: {
      accept_ach: false,
      accept_cc: false
    },
    onSwitch: (v) => {},
  }

  renderSwitches() {
    let Switches = (this.props.accountType == PRO) ? <Row size={35}>
                    <Col>
                      <Text style={globalStyles.purpleImportant}>Payment Processing Costs</Text>
                      <NotificationSwitch 
                        hideSwitch={true}
                        onSwitch={(v) => this.props.onSwitch("accept_ach", v)}
                        disabled={true}
                        value={this.props.preferences.accept_ach}
                        label={'ACH Transfers'} 
                        label2={'ACH transfers have a $5.00 flat fee'} />
                      <NotificationSwitch 
                        hideSwitch={true}
                        onSwitch={(v) => this.props.onSwitch("accept_cc", v)}
                        disabled={true}
                        value={this.props.preferences.accept_cc}
                        label={'Credit/Debit Cards'} 
                        label2={'Standard 2.9% + 30¢ per payment'} />
                    </Col>
                  </Row> : null
    return (
      Switches
    )
  }

  renderPaymentMethods() {
    return (
        <Row size={65}>
          <Col>
              <Text style={globalStyles.purpleImportant}>Payment Methods</Text>
              <PaymentSourcesList {...this.props} renderTitle={false} paymentSources={this.props.paymentSources} selectable={false} />
          </Col>
        </Row>
    )
  }

  render () {



    return (
        <Grid style={styles.container}>
          <Row>
            <Col>
              {this.renderSwitches()}
              {this.renderPaymentMethods()}
            </Col>
          </Row>
        </Grid>
    )
  }
}
