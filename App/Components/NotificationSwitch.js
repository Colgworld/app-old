import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, Switch } from 'react-native'
import styles from './Styles/NotificationSwitchStyle'
import { Col, Row, Grid } from "react-native-easy-grid";

// <Text style={styles.title}>{this.props.label}</Text>

export default class NotificationSwitch extends Component {

  static defaultProps = {
    value: false,
    onSwitch: (v) => {},
    disabled: false,
    hideSwitch: false
  }

  renderSwitch() {

    let switchC = (this.props.hideSwitch) ? null : <Switch style={styles.switchAlignment} disabled={this.props.disabled} onValueChange={v => this.props.onSwitch(v)} value={this.props.value} />

    return (
      switchC
    )
  }

  render () {


    return (
      <Grid style={styles.container}>
        <Row style={styles.row, styles.indent}>
          <Col size={75}>
            <Text style={styles.title}>{this.props.label}</Text>
            <Text style={styles.description}>{this.props.label2}</Text>
          </Col>
          <Col size={25}>
            {this.renderSwitch()}
          </Col>
        </Row>
      </Grid>
    
    )
  }
}
