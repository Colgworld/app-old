import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,ActivityIndicator } from 'react-native'
import styles from './Styles/InProgressStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

export default class InProgress extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    size: "large",
    color: Colors.darkPurple,
    message: "Please wait while we take care of that for you"
  }

  render () {
    return (
      <Grid style={styles.container}>
        <Row style={globalStyles.centerContent}>
          <Col>
            <Text style={globalStyles.centerText}>{this.props.message}</Text>
            <ActivityIndicator size={this.props.size} color={this.props.color} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
