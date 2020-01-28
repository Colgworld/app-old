'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Row, Col, Grid } from 'react-native-easy-grid'


import globalStyles from 'App/Themes/GlobalStyles'

class MultiSwitch extends Component {


    render() {

    let size = this.props.data.length

    return (
        <Row style={{ padding: 10 }}>
            <Col>
              <Text style={[globalStyles.label]}>{this.props.title}</Text>
            </Col>
            <Col>
              <Row>
              {
                
                
                this.props.data.map((type, i) => {
                  let bgColor = this.props.btnColor
                  let textColor = this.props.btnTextColor
                  if (this.props.activeValue == type.value) {
                    bgColor = this.props.activeBtnColor
                    textColor = this.props.activeBtnTextColor
                  }
                  if (type.value !== "") {

                    let onPress = () => this.props.onPress(type.value)
                    return (
                        <Col key={i} size={100/size} style={[this.props.btnStyle, {backgroundColor:bgColor, flex:1}]} hAlign="center" >
                          <TouchableOpacity onPress={onPress} style={{alignSelf: 'stretch'}}>
                            <Text style={[this.props.btnTextStyle, {color:textColor, height: 30, textAlign:'center'}]}>{type.text}</Text>
                          </TouchableOpacity>
                        </Col>
                      )
                    }
                  })
                }
                </Row>
            </Col>
        </Row>
    );
    }
}

const styles = StyleSheet.create({
    switch: {
        alignItems: 'center',
    }
});


export default MultiSwitch;