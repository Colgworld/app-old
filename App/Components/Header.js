import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _ from 'underscore'

import HeaderIcon from './HeaderIcon'
import { Row, Col, Grid } from 'react-native-easy-grid'

import { View, Text } from 'react-native'
import styles from './Styles/HeaderStyle'
import globalStyles from 'App/Themes/GlobalStyles'

export default class Header extends Component {
  // Prop type warnings
  static propTypes = {
    leftButtonSize: PropTypes.number.isRequired,
    headerSize: PropTypes.number.isRequired,
    rightButtonSize: PropTypes.number.isRequired,
  }
  
  // Defaults for props
  static defaultProps = {
    leftButtonSize: 0,
    headerSize: 100,
    rightButtonSize: 0,
    leftIcon: null,
    rightIcon: null,
    titleAlign: 'center',
    title: "Change Me",
    containerStyle: {}
  }

  render () {

    const _ico_rt_undefined = !_.isNull(this.props.rightIcon)
    const _ico_lt_undefined = !_.isNull(this.props.leftIcon)

    // const alignLeft = (_ico_lt_undefined && !_ico_rt_undefined) ? "flex-start" : "center"
    const alignLeft = "center"
    const alignRight = (_ico_rt_undefined && !_ico_lt_undefined) ? "flex-end" : "flex-end"
    const left = (_ico_lt_undefined) ? <HeaderIcon name={this.props.leftIcon} align={alignLeft} onPress={() => this.props.onPressLeft()} /> : null
    const right = (_ico_rt_undefined) ? <HeaderIcon name={this.props.rightIcon} align={alignRight} onPress={() => this.props.onPressRight()} /> : null
    const is_centerSz = (this.props.titleAlign == "center") ? 12 : 0 
    const leftSize = (!_ico_lt_undefined) ? is_centerSz : 12
    const titleSize = 80
    const rightSize = 12

    return (
      <Grid style={[styles.container, this.props.containerStyle]}>
        <Row style={[{alignItems: 'flex-end', paddingBottom: 10}, globalStyles.content]}>
          <Col size={leftSize} style={[styles[alignLeft]]}>
            {left}
          </Col>

          <Col size={titleSize}>
            <View style={[styles.titleWrap, styles[this.props.titleAlign]]}>
              <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
            </View>
          </Col>

          <Col size={rightSize}>
            {right}
          </Col>

        </Row>
      </Grid>
    )
  }
}
