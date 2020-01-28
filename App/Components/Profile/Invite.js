import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Platform } from 'react-native'
import styles from './Styles/InviteStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import AddMembers from 'App/Components/Project/AddMembers'
import Metrics from 'App/Themes/Metrics'
import { Grid, Row, Col } from 'react-native-easy-grid'

export default class Invite extends Component {

  render () {
    return (
      <Grid style={globalStyles.container}>
        <Row style={globalStyles.content}>
          <Col>
            <AddMembers {...this.props} onPress={(data) => this.props.saveInviteLink(data)} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
