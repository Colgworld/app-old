import React, { Component } from 'react';
import {
  View,
  Text,
  Slider,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Keyboard
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather'
import { Grid, Row, Col } from 'react-native-easy-grid'
import AppConfig from 'App/Config/AppConfig'

import Dimensions from 'Dimensions'


import MultiSwitch from 'App/Components/MultiSwitch'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import styles from './Styles/PaymentEditorStyle'

const {
  PAYMENT_MULTIPLIER_PERCENT,
  PAYMENT_MULTIPLIER_CURRENCY,
  LIGHTGRAY
} = require('App/Config/Constants')


export default class PaymentEditor extends Component {


  onFieldChange(k, f, v) {
    this.props.onFieldChange(key, field, value)
  }

  render() {

    let gutter = 20
    let maxSliderWidth = Dimensions.get("window").width - (gutter*2)
          
    let onTextChange = (v) => this.props.onTextChange(v.nativeEvent.text, "percent")
    let onPress = () => this.props.onPress() //() => this.toggleEditPayment(null, p)
    let onSlidingComplete = (val) => this.props.onSlidingComplete(val)
    let onValueChange = (val) => this.props.onValueChange(val)
    let sliderWidth = maxSliderWidth * this.props.sliderMaxValue
    let textInputWidth = (Dimensions.get("window").width / 2 ) - (gutter*4.8)

    let percent = this.props.payment.percent


    let currencyC = <Row vAlign="stretch">
                      <Col vAlign="middle" style={{}}>
                        <Text style={styles.label}>{"$ " + this.props.payment.amount}</Text>
                      </Col>
                    </Row>
    let percentC = <Row vAlign="stretch">
                    <Col vAlign="middle" style={{}}>
                      <Text style={styles.label}>{this.props.payment.percent + " %"}</Text>
                    </Col>
                  </Row>
    let numInputWidth = 40
    let defaultValue = this.props.payment.percent.toString()
    let label = "%"

    switch(this.props.paymentMultiplier) {
      case AppConfig.paymentMultiplierPercent:
        percentC = <Row vAlign="stretch">
                      <Col size={70} vAlign="middle">
                        <TextInput 
                          selectTextOnFocus={true}
                          keyboardType="number-pad"
                          returnKeyType={"done"}
                          ref={AppConfig.paymentMultiplierPercent}
                          maxLength={5}
                          style={styles.input}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          defaultValue={defaultValue}
                          onChange={onTextChange} />
                      </Col>
                      <Col size={30} vAlign="middle">
                        <Text style={styles.label}>{label}</Text>
                      </Col>
                    </Row>
        break;
      case AppConfig.paymentMultiplierCurrency:
        numInputWidth = 100
        defaultValue = this.props.payment.amount.toString()
        label = "$ "
        onTextChange = (v) => this.props.onTextChange(v.nativeEvent.text, "amount")
        currencyC = <Row>
                      <Col size={15}>
                        <Text style={styles.label}>{label}</Text>
                      </Col>
                      
                      <Col size={80}>
                        <TextInput 
                          selectTextOnFocus={true}
                          autoCapitalize="words"
                          keyboardType="number-pad"
                          returnKeyType={"done"}
                          placeholder="sdfsdfsdf"
                          ref={AppConfig.paymentMultiplierCurrency}
                          maxLength={5}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          style={styles.input}
                          defaultValue={defaultValue}
                          onChange={onTextChange} />
                      </Col>

                    </Row>
        break;
    }

    return (
      <Grid>
        <Row>
          <Col>
            <Row>
              <Col size={10}>
                <Text style={[styles.label, globalStyles.H3]}>{this.props.payment.delta + 1 + ". " }</Text>
              </Col>
              <Col size={50}>
                <TextInput
                  placeholder="Payment purpose"
                  autoFocus={true}
                  selectTextOnFocus={true}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.refs[this.props.paymentMultiplier].focus()}
                  ref={this.props.refPrefix + "PaymentInput"}
                  style={[styles.input, {marginRight: 5}]}
                  defaultValue={this.props.payment.title}
                  onChange={(v) => this.props.onTextChange(v.nativeEvent.text, "title")}  />            
              </Col>

              <Col size={40}>
                <Row style={{}}>
                  <Col>
                    {percentC}
                  </Col>
                  <Col>
                    {currencyC}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

      </Row>
      <Row>
          <Col fullWidth>
            <Row>
              <Col size={50}>
                <TouchableOpacity onPress={this.props.onDonePress} style={{ width: Dimensions.get("window").width /2 }} >
                  <Icon 
                      name="check" 
                      size={40} 
                      color="#61dc57" 
                      style={[globalStyles.icon, globalStyles.center]} />
                </TouchableOpacity>
              </Col>

              <Col size={50}>
                <TouchableOpacity onPress={this.props.onCancelPress}  style={{ width: Dimensions.get("window").width /2 }} >
                  <Icon 
                      name="x" 
                      size={40} 
                      color="#e5645b" 
                      style={[globalStyles.icon, globalStyles.center]} />
                </TouchableOpacity>
              </Col>
            </Row>
          </Col>
      </Row>
    </Grid>
    )
  }
}          


