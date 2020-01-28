'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';

import { Isao } from 'react-native-textinput-effects'

import Header from 'App/Components/Header'
import FormButton from 'App/Components/FormButton'
import AppConfig from "App/Config/AppConfig"
import Form from 'App/Components/Common/Form'


import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

import { Col, Row, Grid } from 'react-native-easy-grid';


class CreditCardForm extends Component {

    state = {
      name: "",
      number: "",
      month: "",
      year: "",
      cvc: "",
      zip: ""
    }

    onChange(value) {
        this.setState({value})
    }

    onPress() {
        this.props.onPress(this.state)
        this.props.cancel()
    }

    render() {
      StatusBar.setBarStyle('dark-content', true);

      let form = [
        {
          title: "Name on Card",
          placeholder: "",
          refName: "name",
          onSubmitEditing: () => this.refs.form.refs.newCC.refs.number.focus(),
          value: this.state.name,
          returnKeyType: 'next',
          autoCapitalize: 'words',
          onTextChange: (text) => this.setState({name:text}),
        },
        {
          title: "Card Number",
          placeholder: "1234 1234 1234 1234",
          refName: "number",
          onSubmitEditing: () => this.refs.form.refs.newCC.refs.month.focus(),
          value: this.state.number,
          keyboardType: 'numeric',
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({number:text}),
        },
        {
          title: "Exp. Month",
          placeholder: "MM",
          refName: "month",
          onSubmitEditing: () => this.refs.form.refs.newCC.refs.year.focus(),
          value: this.state.month,
          keyboardType: 'numeric',
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({month:text}),
        },
        {
          title: "Exp. Year",
          placeholder: "YY",
          refName: "year",
          onSubmitEditing: () => this.refs.form.refs.newCC.refs.cvc.focus(),
          value: this.state.year,
          keyboardType: 'numeric',
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({year:text}),
        },
        {
          title: "3 Digit Security Code",
          placeholder: "123",
          refName: "cvc",
          onSubmitEditing: () => this.refs.form.refs.newCC.refs.zip.focus(),
          value: this.state.cvc,
          keyboardType: 'numeric',
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({cvc:text}),
        },
        {
          title: "Zip Code",
          placeholder: "07730",
          refName: "zip",
          onSubmitEditing: () => this.refs.form.refs.newCC.refs.zip.blur(),
          value: this.state.zip,
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({zip:text}),
        }
      ]


        return (
          <Grid>
            <Row >
              <Col >
                <Row size={15} >
                  <Col>
                  <Header 
                    title={"Add Credit Card"} 
                    titleAlign="center" titleStyle={globalStyles.smallHeaderTitle}
                    rightIcon={AppConfig.closeIcon}
                    leftIcon={null}
                    onPressRight={() => this.props.cancel()}
                    />
                  </Col>
                </Row>

                <Row size={85}>
                  <Col>
                    <ScrollView>
                      <KeyboardAvoidingView behavior="position" enabled>
                      <Row>
                        <Col style={[globalStyles.content, globalStyles.centerContent]}>

                          <Row size={25}>
                            <Col style={[globalStyles.centerContent, { marginTop: 20, marginBottom: 5}]}>
                                <Image style={[globalStyles.image, {maxWidth: 125, maxHeight: 125}]} source={require('App/Components/Payments/images/ccard.png')}  />
                                <Text style={[globalStyles.p, globalStyles.center]}>{"Paying for your project with a credit card? We accept all major credit cards. (Debit cards too.)"}</Text>

                           </Col>
                          </Row>
             

                          <Row size={50}>
                            <Form ref="form" refName="newCC" formItems={form} errorMsg={this.props.errorMsg} />
                          </Row>

                          <Row size={10}>
                            <Col style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                              <FormButton 
                                buttonText={"Done"} 
                                onPress={() => this.onPress()}
                                isDisabled={false}
                                textStyle={{ fontSize: 12}}
                                btnStyle={[globalStyles.button]}
                                 />
                            </Col>                        
                          </Row>
                        </Col>
                      </Row>
                      </KeyboardAvoidingView>
                    </ScrollView>
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


export default CreditCardForm;