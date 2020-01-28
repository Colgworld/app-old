'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar
} from 'react-native';

import globalStyles from 'App/Themes/GlobalStyles'

import { Actions } from 'react-native-router-flux'
import { Col, Row, Grid } from 'react-native-easy-grid';

import Header from 'App/Components/Header'
import FormButton from 'App/Components/FormButton'

const {
    BACK_ICON,
    DARK_BLUE
} = require('App/Config/Constants')

class AddPaymentMethod extends Component {
  render() {
    StatusBar.setBarStyle('dark-content', true);
    
    return (
    <Grid>
        <Row>
            <Col>

                <Row size={10}>
                    <Header title="Add Payment"
                        leftIcon={BACK_ICON}
                        leftIconStyle={{color: "#000000"}}
                        headerStyle={[globalStyles.headerShadow, {backgroundColor: '#FFFFFF'}]}
                        textStyle={{color: "#000000"}}
                        leftBtnHandler={() => Actions.pop()} />
                </Row>

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
                                <Text style={[globalStyles.p]}>{"Use credit cards, debit cards, and bank accounts, oh my!"}</Text>
                            </Col>
                        </Row>

                        <Row size={40}>
                            <Col>
                                <FormButton buttonText="Add A Card"
                                    onPress={() => Actions.CreditCardForm({actions:this.props.actions})} />
                                <FormButton buttonText="Add A Bank Account"
                                    onPress={() => Actions.BankAccountForm({actions:this.props.actions})} />
                                <FormButton buttonText="Cancel" 
                                    onPress={() => Actions.pop()}
                                    btnStyle={{backgroundColor: '#FFFFFF'}} textStyle={{color: DARK_BLUE}} />
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

});


export default AddPaymentMethod;