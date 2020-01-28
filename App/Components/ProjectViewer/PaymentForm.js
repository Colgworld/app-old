'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Header from 'App/Components/Header'
import PaymentSource from 'App/Components/Payments/PaymentSource'
import FormButton from 'App/Components/FormButton'
import * as Animatable from 'react-native-animatable';

import { NavigationActions } from 'react-navigation'

import _ from 'underscore'

import { Grid, Row, Col } from 'react-native-easy-grid'

import globalStyles from 'App/Themes/GlobalStyles'

import Dimensions from 'Dimensions'

import Feather from 'react-native-vector-icons/Feather'

const {
  DARK_PURPLE
} = require('App/Config/Constants')

class PaymentForm extends Component {

  state = {
      selected: (new Map(): Map<string, boolean>),
      payBtnDisabled: true,
      buttonsOffset: 1000,
      paymentPreviewSize: 0,
      selectedSource: {
        source_id: "",
        name: "Tap or Add Payment to send payment"
      },
      height: 0
  }


  onAddPaymentMethodButtonPress(type) {
    this.props.cancel()
    switch(type) {
      case "cc":
        this.props.navigate({ routeName: "AddPaymentMethodScreen", params: { type: type } })
        break;
      case "bank":
        this.props.navigate({ routeName: "AddPaymentMethodScreen", params: { type: type } })
        break;
    }
  }    


  _onPressItem(id) {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
      });
  }



  // Set payment to be used for payment and show confirmation
  setPayment(payment) {

    if (payment.verified) {
      if (this.state.buttonsOffset != 0) {
        this.refs.buttons.bounceInUp(800).then((endState) => {

        })        
      }

      this.props.onPaymentSourcePress(payment)
      this.setState({
        paymentPreviewSize: 50,
        buttonsOffset: 0,
        selectedSource: payment,
        payBtnDisabled: false,
        height: 170
      })
    } else {
    }

  }

  render() {



    let _renderItem = ({item}) => {


        return (
                <Row>
                  <Col fullWidth>
                    <TouchableOpacity>
                      <Row>
                        <Col fullWidth>
                          <Text style={{ fontSize: 14 }}>{item.title}</Text>
                          <Text style={{ fontSize: 12 }}>{item.subTitle}</Text>
                        </Col>
                      </Row>
                    </TouchableOpacity>
                  </Col>
                </Row>
        )
    }


    let fee
    let totalCost = <Text>{"Total Cost: $" + this.props.payablePayment.amount}</Text>
    if (this.state.selectedSource['type'] == "stripe_cc") {
      var f = (.029 * this.props.payablePayment.amount) + .30
      var val = this.props.payablePayment.amount + f
      fee = <Text style={{}}>Credit Card Fee: ${f}</Text>
      totalCost = <Text>{"Total Cost: " + val}</Text>
      
    }




  
    let otherPaymentSources = <Row>
                                <Col fullWidth>
                                  <Text style={[styles.title, globalStyles.center]}>{"Other (Not Secure)"}</Text>
                                  <PaymentSource
                                    onPress={() => this.setPayment({name:"Cash", last4:"", source_id: "cash"})}
                                    payment={{name:"Cash", last4:"", source_id: "cash"}}
                                    icon="dollar-sign"
                                    iconColor="#666666"
                                    txtStyle={{color:"#666666"}}
                                    teaserTxt="Hand your pro the money"
                                    btnStyle={[globalStyles.source, globalStyles.inline, {backgroundColor:"#ffffff", justifyContent: "space-between"}]} />
                                </Col>
                              </Row>










    let activePayment = null
    if (typeof(this.props.selectedPayment) != "undefined") {
      activePayment = this.props.selectedPayment['source_id']
    }


    let bankaccounts = <Text style={[globalStyles.center, globalStyles.content]}>You have no bank accounts setup.</Text>
    let ccs = <Text style={[globalStyles.center, globalStyles.content]}>You have no credit cards setup.</Text>
    if (!_.isNull(this.props.paymentSources)) {


      /* BANK ACCOUNTS */
      if (!_.isNull(this.props.paymentSources.bankAccounts)) {
        bankaccounts = this.props.paymentSources.bankAccounts.map((pm, i) => {

          let opacity = .5
          let fontWeight = "normal"
          let bgColor
          let teaserTxt

          if (activePayment === pm['source_id']) {
            opacity = 1
            fontWeight = "bold"
          }

          bgColor = "#FFFFFF"
          teaserTxt = "Acct " 
          
          return (
            <PaymentSource
              key={i}
              onPress={() => this.setPayment(pm)}
              payment={pm}
              icon="lock"
              iconColor={DARK_PURPLE}
              txtStyle={{color:DARK_PURPLE, fontWeight: fontWeight}}
              teaserTxt="Checking account ending in "
              btnStyle={{}} />
          )

        })      
      }



      /* CREDIT CARDS */
      if (!_.isNull(this.props.paymentSources.creditCards)) {
        ccs = this.props.paymentSources.creditCards.map((pm, i) => {

          let opacity = .5
          let fontWeight = "normal"
          let bgColor
          let teaserTxt

          if (activePayment === pm['source_id']) {
            opacity = 1
            fontWeight = "bold"
          }  

          bgColor = "#FFFFFF"
          teaserTxt = "Visa "
      

          return (
            <PaymentSource
              key={i}
              onPress={() => this.setPayment(pm)}
              payment={pm}
              teaserTxt="Card ending in "
              icon="credit-card"
              txtStyle={{color:DARK_PURPLE, fontWeight: fontWeight}}
              iconColor={DARK_PURPLE}
              btnStyle={{}} />

          )

        })        
      }


    }




    let iconSize = 20


    return (
    <Grid>
      <Row>
        <Col>
          <Row size={10}>
              <Header title="Select payment method"
                leftBtnHandler={() => this.props.cancel()}
                leftIcon="x" />
          </Row>
  
          <Row size={90}>
            <Col>

              <Row size={75}>
                <Col style={globalStyles.content}>

                  <Row>
                    <Col>
                      <Row size={75}>
                        <Col>
                          <Text style={[globalStyles.center]}>"Bank Accounts"</Text>
                          
                          {bankaccounts}
                          
                          <TouchableOpacity 
                            onPress={() => this.onAddPaymentMethodButtonPress("bank")} >
                            <Feather name="plus-circle" size={35} color={DARK_PURPLE} style={globalStyles.center} />
                          </TouchableOpacity>

                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Text style={[globalStyles.center]}>"Credit Cards"</Text>
                      
                      {ccs}
                      
                      <TouchableOpacity 
                        onPress={() => this.onAddPaymentMethodButtonPress("cc")} >
                          <Feather name="plus-circle" size={35} color={DARK_PURPLE} style={[globalStyles.center]} />
                      </TouchableOpacity>
                    </Col>
                  </Row>

                </Col>
              </Row>

              <Row size={this.state.paymentPreviewSize}>
                <Col style={{backgroundColor: "#ebebeb"}}>
                  <Animatable.View ref="buttons" style={{flex: 1}}>
                    <Row style={globalStyles.content}>
                      <Col>
                          <Text style={{}}>Milestone Amount: ${this.props.payablePayment.amount}</Text>
                          <Text style={{}}>{"Paying with: " + this.state.selectedSource.name}</Text>
                          {fee}
                          {totalCost}
                        <Row>
                          <Col size={50} style={globalStyles.content}>
                            <FormButton
                              btnStyle={{}}
                              buttonText="Pay"
                              isDisabled={this.state.payBtnDisabled}
                              onPress={() => this.props.onPress(this.state.selectedSource)} />
                          </Col>
                          <Col size={50} style={globalStyles.content}>
                            <FormButton
                              btnStyle={[{backgroundColor:"rgba(205,11,36,1)", borderColor:"rgba(205,11,36,1)"}]}
                              buttonText="Cancel"
                              onPress={() => this.props.cancel()} />
                          </Col>
                        </Row>

                      </Col>
                    </Row>
                  </Animatable.View>
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

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 16
  },
  payment: {
      borderBottomWidth: 1,
      borderBottomColor: "#ebebeb",
      padding: 10

  },
  btn: {
    width: (Dimensions.get("window").width / 2) - 30
  },
  invoice: {
    backgroundColor: "#ebebeb",
    
  },
  invoiceDetails: {
    height: 100,
    padding: 10
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
    color: "#000000"
  },
});


export default PaymentForm;