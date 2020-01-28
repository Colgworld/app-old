'use strict';

import React, { Component } from 'react';

import {
    Text,
    Image,
    Dimensions
} from 'react-native';

import { Row, Col, Grid } from 'react-native-easy-grid'

import globalStyles from 'App/Themes/GlobalStyles'

class SelectedRoleSplash extends Component {
  render() {

    let maxWidth = Dimensions.get("window").width * .65
    return (
      <Row style={globalStyles.centerContent}>
        <Col>
          <Image source={require("./images/crayz_house.png")} style={[{maxWidth: maxWidth, alignSelf: 'center'}, globalStyles.image]} />
            <Text style={globalStyles.H2,globalStyles.center}>{this.props.title}</Text> 
            <Text style={[globalStyles.p,globalStyles.centerContent,{flex: 1, flexWrap: 'wrap'}]}>Workspace streamlines your home improvement projects by giving you the tools you need to manage them.</Text> 
        </Col>
      </Row>
    );
  }
}

export default SelectedRoleSplash;