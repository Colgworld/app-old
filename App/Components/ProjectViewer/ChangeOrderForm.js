
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Slider,
  Modal,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import globalStyles from 'App/Themes/GlobalStyles'

// import {RichTextEditor} from 'react-native-zss-rich-text-editor'

import Header from 'App/Components/Header'
import Feather from 'react-native-vector-icons/Feather'

// import { Row, Column as Col } from 'react-native-responsive-grid'
import { Col, Row, Grid } from 'react-native-easy-grid';

/**
 * Form
 */
const t = require('tcomb-form-native')
var Form = t.form.Form;

// here we are: define your domain model
var ChangeOrder = t.struct({
  title: t.String,
  cost: t.Number,
  addedTime: t.Number,
  description: t.String,
});


const {
  BACK_ICON,
  DARK_PURPLE
} = require("App/Config/Constants")


import FormButton from 'App/Components/FormButton'






export default class ChangeOrderForm extends Component {

    state = {
        value: {
            description: "",
            cost: "",
            addedTime: "",
            title: ""
        },

        editable: false
        
    }

    componentDidMount() {
      if (this.props.editable) {
        this.setState({
          editable: true,
          value: this.props.co
        })
      }
    }

    onChange(value, k) {
        this.setState({value})
    }

    onDone() {
      if (this.props.editable) {
        this.props.updateChangeOrder(this.state.value)
      } else {
        this.props.createChangeOrder(this.state.value)
      }
    }


    render () {

      let myCustomTemplate = (locals) => {
        let iconName
        let iconSize = 22
        let maxLength
        let autoCapitalize = "words"
        let height
        let returnKey = "next"
        if (locals.multiline) {
          height = 100
        }

        switch (locals.path[0]) {
          case "description":
            iconName = "clipboard"
            autoCapitalize = "sentences"
            maxLength = 999
            break;
          case "cost":
            iconName = "dollar-sign"
            maxLength = 8
            // iconSize = 25
            break;
          case "addedTime":
            maxLength = 3
            iconName = "calendar"
            autoCapitalize = "words"
            break;
          case "title":
            iconName = "edit-3"
            break;
          default:
            autoCapitalize = "none"
            maxLength = 50
            break;

        }

        // let value = this.props.form.fields[locals.path[0]]


        return (

          <Row style={{marginBottom: 25}}>
            <Col>

            <Row>
              <Col size={10}>
                <Icon name={iconName}
                  size={iconSize}
                  color={DARK_PURPLE}
                   />
              </Col>
              <Col size={90}>
                <Text style={globalStyles.H4}>{locals.label}</Text>
              </Col>
            </Row>

            <Row>
              <Col vAlign="middle">

                  <TextInput
                      style={[globalStyles.input, globalStyles.borderGray]}
                      placeholder={locals.placeholder}
                      ref={locals.path[0]}
                      returnKeyType={returnKey}
                      onSubmitEditing={locals.onSubmitEditing}
                      autoCapitalize={autoCapitalize}
                      maxLength={maxLength}
                      multiline={locals.multiline}
                      underlineColorAndroid="transparent"
                      hasError={locals.hasError}
                      value={locals.value}
                      keyboardType={locals.keyboardType}
                      onChangeText={(value) => locals.onChange(value)}/>
              </Col>
            </Row>
          </Col>
        </Row>
        )
      }


      let options = {
        fields: {
          description: {
            label: "Describe Changes",
            multiline: true,
            placeholder: "Try to be specific!",
            numberOfLines: 3,
            template: myCustomTemplate,
            // hasError: this.props.projectWizard.project.nameHasError,
            // error: this.props.projectWizard.project.nameErrorMsg
          },
          title: {
            placeholder: "i.e. \"New Kitchen Sink\"",
            label: "Change Order Name*",
            template: myCustomTemplate,
            onSubmitEditing: () => this.refs.form.getComponent('cost').refs.cost.focus()
          },
          cost: {
            label: "Cost*",
            placeholder: "$12,000",
            template: myCustomTemplate,
            // hasError: this.props.projectWizard.project.costHasError,
            // error: this.props.projectWizard.project.costErrorMsg
          },
          addedTime: {
            label: "Added Time*",
            placeholder: "2 = +2 days",
            template: myCustomTemplate,
            // hasError: this.props.projectWizard.project.detailsHasError,
            // error: this.props.projectWizard.project.detailsErrorMsg
          }
        }
      };

      let onChange = this.onChange.bind(this)

      let onPress = () => this.onDone()

      return (
          <Grid>
            <Row>
              <Col>
              <Row size={10}>
                <Header 
                  title={this.props.title} 
                  leftBtnHandler={() => this.props.cancel()} 
                  leftIcon={BACK_ICON}
                />
              </Row>

              <Row size={90}>
                <Col>
                  <ScrollView style={globalStyles.content}>

                      <Form
                        ref="coForm"
                        type={ChangeOrder}
                        options={options}
                        value={this.state.value}
                        onChange={onChange} />

                      <FormButton 
                          onPress={onPress} 
                          buttonText="OK" />

                      <FormButton 
                          btnStyle={{ 
                                  backgroundColor: "#FFFFFF",
                                  borderWidth: 2, 
                                  borderColor: "#3b7cec",}}
                          textStyle={{color: "#3b7cec"}}
                          onPress={() => this.props.cancel()} 
                          buttonText="Cancel" />

                  </ScrollView>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
      )
    }
}