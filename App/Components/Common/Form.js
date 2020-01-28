'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import {
  Text,
  TextInput,
  View,
} from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid'

import FormTextInput from 'App/Components/Common/FormTextInput'

import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import styles from './Styles/FormStyles'

const {
  DARK_PURPLE
} = require('App/Config/Constants')

class Form extends Component {

  static defaultProps = {
    formItems: []
  }

  constructor(props) {
    super(props);
  
    this.state = {};
    this.refs = {
      [props.refName]: {
        refs: {}
      }
    }
  }
  render() {
    // var _refs = this.refs.register.refs

    let errorMsg = (!_.isNull(this.props.errorMsg)) ? <Text style={{ color: '#FF0000'}}>{this.props.errorMsg}</Text> : null

    let Form = this.props.formItems.map((item, k) => {

      // Defaults
      let maxLength = (item.maxLength != null) ? item.maxLength : 1000
      let keyboardType = (item.keyboardType != null) ? item.keyboardType : 'default'
      let returnKeyType = (item.returnKeyType != null) ? item.returnKeyType : 'done'
      let autoCapitalize = (item.autoCapitalize != null) ? item.autoCapitalize : 'none'
      let placeholderTextColor = (item.placeholderTextColor != null) ? item.placeholderTextColor: Colors.lightMidGray
      let autoCorrect = (item.autoCorrect != null) ? item.autoCorrect : true
      let numberOfLines = (item.numberOfLines != null) ? item.numberOfLines : 1 
      let type = (item.type != null) ? item.type : "default"
      let values = (item.values != null) ? item.values : null
      let editable = (item.editable != null) ? item.editable : true
      let onFocus = (item.onFocus != null) ? item.onFocus : null
      let selectTextOnFocus = (item.selectTextOnFocus != null) ? item.selectTextOnFocus : false
      let leftIcon = (item.leftIcon != null) ? item.leftIcon : null


      return (
          <FormTextInput
            key={k}
            label={item.title}
            refName={item.refName}
            type={type}
            values={values}
            editable={editable}
            ref={ref => {
              let otherRefs = (!_.isUndefined(this.refs[this.props.refName]) && !_.isNull(this.refs[this.props.refName])) ? this.refs[this.props.refName].refs : {} 
              let newRef = (!_.isNull(ref)) ? {[item.refName]: ref.refs[item.refName]} : {} 
              this.refs = { 
                [this.props.refName]: {
                  ...this.refs[this.props.refName],
                  refs: { ...otherRefs, ...newRef }
                }
              }
              return ref
              }
            }
            style={[item.style, styles.input]}
            containerStyle={item.containerStyle}
            onChangeText={(text) => item.onTextChange(text)}
            onSubmitEditing={item.onSubmitEditing}
            onFocus={onFocus}
            value={item.value}
            multiline={item.multiline}
            numberOfLines={numberOfLines}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            maxLength={maxLength}
            autoCorrect={autoCorrect}
            placeholder={item.placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={item.secureTextEntry}
            selectTextOnFocus={selectTextOnFocus}
            leftIcon={leftIcon} />
      )
    })

    return (
      <Grid>
        <Row>
          <Col>
            {Form}
            {errorMsg}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Form.propTypes = {
  formItems: PropTypes.array.isRequired
};

export default Form;