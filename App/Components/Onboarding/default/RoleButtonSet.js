'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions
} from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable';

import globalStyles from 'App/Themes/GlobalStyles';


class RoleButtonSet extends Component {

  state = {
    opacity: 1,
    animating: false
  }

  render() {

    let imgWidth = Dimensions.get("window").width / 3
    let imgHeight = imgWidth

    let Content = this.props.buttons.map((b,k) => {
      let image = (b.selected) ? b.activeImg : b.inactiveImg

      return (
          <Col key={k}>
              <Animatable.View ref={b.role} transition={["opacity"]}>
                <TouchableOpacity onPress={b.onPress}>
                  <View>
                      <Image source={image} style={[globalStyles.image, {width: imgWidth, height: imgHeight, alignSelf: 'center'}]} />
                      <Text style={[{textAlign:'center'}]}>{b.name}</Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
          </Col>  
      );
    })


    return (
      <Row style={{ paddingTop: 30, paddingBottom: 30,}} >
        <Col>
          <Row>
            {Content}
          </Row>
        </Col>
      </Row>
    )

  }
}


export default RoleButtonSet; 