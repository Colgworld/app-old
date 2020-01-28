import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'

const { REQUESTED, SUCCEEDED, WORKING, HOMEOWNER, PENDING } = require("App/Config/Constants").default

import FormButton from 'App/Components/FormButton'

import styles from './Styles/PaymentMilestonesStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

export default class PaymentMilestones extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  paymentPressAction(payment, status, k) {
      var a = k-1
      switch (k) {
        case 0:
          this.props.onPaymentPress(payment, status, k)
          break;
        case a:
          break;
        default:
          if (this.props.payments[k-1].status == SUCCEEDED) {
            this.props.onPaymentPress(payment, status, k)
            statusText = "In Progress"
          }
          break;
      }
  }

  render () {

    Payments = this.props.payments.map((payment, k) => {
          
        let pressPaymentAction
        let type = this.props.type
        let content = null;
        let btnBGColor = "#FFFFFF"
        let iconColor = "#ebebeb"

        let icon_bg_color = Colors.darkPurple
        let icon_text_color = "#FFFFFF"
        let statusText = "Pending"
        let btnTextColor = Colors.darkPurple
        let statusTextColor = Colors.darkPurple
        let amountTxtColor = Colors.darkPurple2
        let border_color = Colors.lightGray
        let payNowBtn
        let font_style = 'normal'
        let font_size = 16
        let iconName = "ios-checkmark-circle-outline"
        let paymentRequestedBtnText = "Payment Requested"
        let icon = <Row style={styles.iconTextWrap}>
                      <Col style={[styles.iconTextBubble, {backgroundColor: icon_bg_color}]}>
                        <Text style={[styles.iconText, {color: icon_text_color}]}>{k+1}</Text>
                      </Col>
                    </Row>


        switch(payment.status) {

          case null:
          case "":
            (type == HOMEOWNER) ? iconColor = Colors.darkPurple : iconColor = Colors.darkPurple;
            (type == HOMEOWNER) ? btnTextColor = Colors.darkPurple : btnTextColor = Colors.darkPurple;
            // (type == HOMEOWNER) ? statusText = "In Progress" : statusText = "Pending";
            if (type != HOMEOWNER) {
              pressPaymentAction = () => this.paymentPressAction(payment, WORKING, k)
            }
            break;

          case WORKING:
            (type == HOMEOWNER) ? statusText = "Your Pro has started" : statusText = "When complete, tap to request payment"
            if (type != HOMEOWNER) {
              pressPaymentAction = () => this.paymentPressAction(payment, REQUESTED, k)
            }
            break;

          case REQUESTED:
            let mainColor
            (type == HOMEOWNER) ? mainColor = Colors.red : mainColor = Colors.green;
            (type == HOMEOWNER) ? iconColor = mainColor : iconColor = mainColor;
            (type == HOMEOWNER) ? btnTextColor = mainColor : btnTextColor = "#FFFFFF";
            (type == HOMEOWNER) ? statusText = "Your Pro has requested payment" : statusText = "Payment Requested";
            (type == HOMEOWNER) ? statusTextColor = mainColor : statusTextColor = "#FFFFFF";
            (type == HOMEOWNER) ? iconName = "ios-alert" : iconName = "ios-alert";
            (type == HOMEOWNER) ? btnBGColor = "#FFFFFF" : btnBGColor = mainColor;
            (type == HOMEOWNER) ? amountTxtColor = mainColor : amountTxtColor = "#FFFFFF";
            (type == HOMEOWNER) ? icon_bg_color = mainColor : icon_bg_color = "#FFFFFF";
            (type == HOMEOWNER) ? icon_text_color = Colors.lightGray : icon_text_color = mainColor;

            border_color = mainColor

            // icon = <Icon name={iconName} size={buttonSize} color={iconColor} style={styles.icon} />
            icon = <Row style={styles.iconTextWrap}>
                      <Col style={[styles.iconTextBubble, {backgroundColor: icon_bg_color}]} hAlign="center" vAlign="middle" fullWidth>
                        <Text style={[styles.iconText, {color: icon_text_color}]}>{"!"}</Text>
                      </Col>
                    </Row>
            if (type == HOMEOWNER) {
              payNowBtn = <Row style={{marginTop: 10}}>
                            <Col size={90} offset={5}>
                              <FormButton buttonText="Pay Now" 
                                  btnStyle={{backgroundColor: Colors.green, borderColor: Colors.green}}
                                  onPress={() => this.props.onPayNowPress(payment, k)} />
                            </Col>
                          </Row>
            }
            break;

          case PENDING:
            (type == HOMEOWNER) ? statusText = "Payment is being processed" : statusText = "Payment is being processed"
            break;

          case SUCCEEDED:
            iconColor = Colors.lightGray
            btnBGColor = Colors.green
            icon_bg_color = Colors.white
            icon_text_color = Colors.green
            border_color = Colors.lightGray
            statusText = "Payment Complete!"
            iconName = "ios-checkmark-circle"
            btnTextColor = Colors.lightGray
            amountTxtColor = Colors.lightGray
            statusTextColor = Colors.lightGray
            icon = <Row style={styles.iconTextWrap}>
                      <Col style={[styles.iconTextBubble, { backgroundColor: icon_bg_color }]}>
                        <Text style={[{color: icon_text_color}, styles.iconText]}>{"✓"}</Text>
                      </Col>
                    </Row>
            break;


        }

        return (
          <Row key={k}>
            <Col size={94} offset={3} 
                style={{
                  backgroundColor: btnBGColor, 
                  borderRadius: 4, 
                  marginBottom: 9, 
                  borderWidth: 1, 
                  borderColor: border_color,
                  shadowColor: 'rgba(0,0,0,.85)',
                  shadowOffset: { width: 1, height: 3 },
                  shadowOpacity: 0.16,
                  shadowRadius: 4
                  }} >
            <TouchableOpacity onPress={pressPaymentAction} >
              <Row style={globalStyles.content}>
                <Col>
                  <Row>
                    <Col size={15} style={globalStyles.centerContent}>
                      {icon}
                    </Col>
                    <Col size={65}>
                      <Text style={{ color: btnTextColor, fontStyle: font_style }}>{payment.title}</Text>
                      <Text style={[globalStyles.buttonText, {color: statusTextColor, fontStyle: font_style, fontSize: font_size }]}>{statusText}</Text>
                    </Col>
                    <Col size={20}>
                      <Text style={[{color: amountTxtColor, lineHeight:40}]}>${payment.amount}</Text>
                    </Col>
                  </Row>
                  {payNowBtn}
                </Col>
              </Row>
            </TouchableOpacity>
            </Col>
          </Row>
        )
      })  


    return (
      <View style={styles.container}>

        {Payments}

      </View>
    )
  }
}
