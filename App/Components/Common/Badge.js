import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text } from 'react-native'
import styles from './Styles/BadgeStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import { Grid, Row, Col } from 'react-native-easy-grid'

export default class Badge extends Component {
  // Prop type warnings
  static propTypes = {
    text: PropTypes.string,
    contanerStyle: PropTypes.object,
    textStyle: PropTypes.object,
  }
  
  // Defaults for props
  static defaultProps = {
    text: "changeme",
    containerStyle: {},
    textStyle: {}
  }

  render () {
    return (
      <Grid style={[styles.container, this.props.containerStyle]}>
        <Row>
          <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
        </Row>
      </Grid>
    )
  }
}
