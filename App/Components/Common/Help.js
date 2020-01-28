'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
} from 'react-native';

// import _ from 'underscore'

import globalStyles from 'App/Themes/GlobalStyles'
import FormButton from 'App/Components/FormButton'

var t = require('tcomb-form-native');
var Form = t.form.Form;

var HelpForm = t.struct({
    feedback: t.String
})

var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 150;
stylesheet.textboxView.normal.height = 150;
stylesheet.textbox.normal.flex = 1;
stylesheet.textbox.error.flex = 1;



function Template(locals) {


    return (
        <View>
            <View style={{}}>{locals.inputs["feedback"]}</View>
        </View>
    )
}


class Help extends Component {

    state = {
        feedback: "",
        message: null
    }

    Submit() {
      var payload = {
        message: this.state.feedback,
      }
      this.props.onSubmit(payload)

      this.setState({ message: "Thank you for your feedback! We will be in touch soon" })
    }

    render() {

      var content
      var options = {
          template: Template,
          fields: {
              feedback: {
                  multiline: true,
                  stylesheet: stylesheet,
                  numberOfLines: 3,
                  editable: true,
                  onChange: (e) => this.setState({feedback: e.nativeEvent.text}),
              }
          }
      }

      if (_.isNull(this.state.message)) {
        content = <View>
                    <Form
                      ref="form"
                      type={HelpForm}
                      options={options}
                    />

                    <FormButton buttonText="Submit" onPress={() => this.Submit()} />
                  </View>
      } else {
        content = <Text>{this.state.message}</Text>
      }

      return (
          <View style={globalStyles.container}>
              <View style={globalStyles.content}>

                {content}

              </View>
          </View>
      );
    }
}


export default Help;