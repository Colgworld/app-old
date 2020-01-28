'use strict';

import React, {Component} from 'react'

import
{
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  WebView,
  Image,
  StatusBar
}
from 'react-native'

import Header from 'App/Components/Header'
import MultiSwitch from 'App/Components/MultiSwitch'
import FormButton from 'App/Components/FormButton'

import Feather from 'react-native-vector-icons/Feather'
import { Col, Row, Grid } from 'react-native-easy-grid';
import AppConfig from "App/Config/AppConfig"
import Form from 'App/Components/Common/Form'
import _ from 'underscore'

const {
  BACK_ICON,
  DARK_BLUE,
  GREEN
} = require('App/Config/Constants')

const {
  PRO
} = require('App/Config/Constants').default

import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'


var styles = StyleSheet.create({
  field: { 
    paddingBottom: 6,
    paddingLeft: 10,
    marginBottom: 16,
    marginTop: 10,
    borderColor: "#ebebeb",
    borderBottomWidth: 1, 

  },
  textInput: { 
    backgroundColor: "rgba(0,0,0,0)",
    paddingTop: 5, 
    height: 30, 
    borderRadius: 0,
    // paddingLeft: 10, 
    // paddingBottom: 5,
    // height: height, 
    // borderRadius: 0
  },
   resizeImg: {
    flex: 1,
    height: 100,
    width: null,
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  label: {
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  inline: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  inlineButtonWrap: { 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: "#FFFFFF", 
    height: 30, 
    paddingLeft: 20, paddingRight: 20,
    marginBottom: 10, borderColor: "#ebebeb", borderWidth: 1 }
})


function FieldTemplate(locals) {
  return (
    <Isao
      label={locals.label}
      ref={locals.path[0]}
      autoCapitalize={locals.autoCapitalize}
      returnKeyType={locals.returnKeyType}
      onSubmitEditing={locals.onSubmitEditing}
      activeColor={Colors.darkGray}
      passiveColor={'#dadada'}
      onChangeText={(value) => locals.onChangeNative(locals.path[0], value)}
    /> 
  )
}


class BankAccountForm extends Component {

  state = {
    fullname: null,
    accountNumber: null,
    routingNumber: null,
    accountType: null,
    line1: null,
    line2: null,
    city: null,
    state: null,
    postalCode: null,
    country: "US",
    last4ssn: "",
    isBusiness: false,
    errMsg: "",

    routingOnSubmit: () => {},

  }

  toggleBusiness() {
    if (this.state.isBusiness) {
      this.setState({isBusiness:false, accountType:""})
    } else {
      this.setState({isBusiness:true, accountType:"business"})
    }

  }

  componentDidMount() {
    this.setState({
      routingOnSubmit: () => this.refs.baForm.refs.input.refs.line1.refs.line1.focus()
    })
  }

  onPress() {
    this.props.onPress({
      fullname: this.state.fullname,
      accountNumber: this.state.accountNumber,
      routingNumber: this.state.routingNumber,
      accountType: this.state.accountType,
      isBusiness: this.state.isBusiness,
      last4ssn: this.state.last4ssn,
      address: {
        line1: this.state.line1,
        line2: this.state.line2,
        city: this.state.city,
        state: this.state.state,
        postalCode: this.state.postalCode,
        country: this.state.country
      }
    })
    this.props.cancel()
  }

  
  render() {

    var routingRetKey = (this.props.type == PRO) ? 'next' : 'done'
    var routingOnSubmit = (this.props.type == PRO) ? this.state.routingOnSubmit : null

      let form = [
        {
          title: "Name on Account",
          placeholder: "",
          refName: "fullname",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.accountNumber.focus(),
          value: this.state.fullname,
          returnKeyType: 'next',
          autoCapitalize: 'words',
          onTextChange: (text) => this.setState({fullname:text}),
        },
        {
          title: "Bank Account Number",
          placeholder: "",
          refName: "accountNumber",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.routingNumber.focus(),
          value: this.state.accountNumber,
          keyboardType: 'numeric',
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({accountNumber:text}),
        },
        {
          title: "Routing Number",
          placeholder: "",
          refName: "routingNumber",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.line1.focus(),
          value: this.state.routingNumber,
          keyboardType: 'numeric',
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({routingNumber:text}),
        },
        {
          title: "Address",
          placeholder: "",
          refName: "line1",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.line2.focus(),
          value: this.state.line1,
          returnKeyType: 'next',
          autoCapitalize: 'words',
          onTextChange: (text) => this.setState({line1:text}),
        },
        {
          title: "Unit or Apt #",
          placeholder: "",
          refName: "line2",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.city.focus(),
          value: this.state.line2,
          returnKeyType: 'next',
          onTextChange: (text) => this.setState({line2:text}),
        },
        {
          title: "City",
          placeholder: "",
          refName: "city",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.state.focus(),
          value: this.state.city,
          returnKeyType: 'next',
          autoCapitalize: 'words',
          onTextChange: (text) => this.setState({city:text}),
        },
        {
          title: "State",
          placeholder: "",
          refName: "state",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.postalCode.focus(),
          value: this.state.state,
          returnKeyType: 'next',
          autoCapitalize: 'characters',
          onTextChange: (text) => this.setState({state:text}),
        },
        {
          title: "Zip Code",
          placeholder: "07730",
          refName: "postalCode",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.country.focus(),
          value: this.state.postalCode,
          returnKeyType: 'next',
          onTextChange: (text) => this.setState({postalCode:text}),
        },
        {
          title: "Country",
          placeholder: "07730",
          refName: "country",
          onSubmitEditing: () => this.refs.form.refs.newBA.refs.country.blur(),
          value: this.state.country,
          returnKeyType: 'done',
          onTextChange: (text) => this.setState({country:text}),
        }
      ]

    StatusBar.setBarStyle('dark-content', true);

    let iconName = "square"
    let iconColor
    if (this.state.isBusiness) {
      iconName = "check-square"
      iconColor = GREEN
    }

    let isValid = (!_.isNull(this.state.fullname) && 
                    !_.isNull(this.state.line1) && 
                    !_.isNull(this.state.accountNumber) && 
                    !_.isNull(this.state.routingNumber) && 
                    !_.isNull(this.state.city) && 
                    !_.isNull(this.state.state) && 
                    !_.isNull(this.state.postalCode) && 
                    this.state.fullname != "" &&
                    this.state.line1 != "" &&
                    this.state.accountNumber != "" &&
                    this.state.routingNumber != "" &&
                    this.state.city != "" &&
                    this.state.state != "" &&
                    this.state.postalCode != "")
    let isDisabled = (!isValid) ? true : false

    return (
        <Grid>
          <Row>
            <Col >
              <Row size={15}>
              <Header 
                title={"Add Bank Account"} 
                titleAlign="center"
                titleStyle={globalStyles.smallHeaderTitle}
                rightIcon={AppConfig.closeIcon}
                onPressRight={() => this.props.cancel()}
                />
              </Row>

              <Row size={85}>
                <Col style={globalStyles.content}>
                <ScrollView style={[globalStyles.container]}>
                  <Row>
                    <Col>
                      <Row size={40}>
                        <Col style={globalStyles.centerContent}>
                          <Image style={[globalStyles.image, {maxWidth: 125, maxHeight: 125, marginBottom: 15}]} source={require('App/Components/Payments/images/bank.png')}  />
                          <Text style={[globalStyles.H4, globalStyles.kindaBold, globalStyles.center]}>{"Input your bank account information below. When you're done, we'll ask you to verify your account via micro-deposits."}</Text>
                        </Col>
                      </Row> 

                      <Row size={60}>
                        <Col>

                          <Form ref="form" refName="newBA" formItems={form} />
                          <Row>
                            <Col>
                              <Text style={{color: "#FF0000"}}>{this.state.errMsg}</Text>
                            </Col>
                          </Row>

                        </Col>
                      </Row>              

                      <Row style={{marginTop: 15, marginBottom: 350}}>            
                        <Col>
                          <FormButton 
                            buttonText={"Done"} 
                            onPress={() => this.onPress()}
                            isDisabled={isDisabled}
                            btnStyle={globalStyles.button}
                             />
                        </Col>
                      </Row> 

                    </Col>
                  </Row>
                </ScrollView>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
    );
  }
}


export default BankAccountForm;
