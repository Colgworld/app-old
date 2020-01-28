import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/InputToolbarStyle'

import ChatCustomActions from 'App/Components/Chat/ChatCustomActions'
import { Composer } from 'react-native-gifted-chat';
import { Grid, Row, Col } from 'react-native-easy-grid'

export default class InputToolbar extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  onSend() {
    // this.props.onSend()
  }

  render () {

    return (
      <Grid style={styles.container}>
        <Row>
          <Col size={10}>
            <ChatCustomActions onActionsPress={(data) => this.props.onActionsPress(data)} />
          </Col>
          <Col size={65}>
            <Composer {...this.props} ref="composer" textInputStyle={styles.composer}  />
          </Col>
          <Col size={20}>
            <TouchableOpacity
              onPress={() => this.props.onSend()}
              accessibilityTraits="button"
            >
              <View style={styles.sendContainer}>
                <Text style={styles.sendText}>Send</Text>
              </View>
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
    )
  }
}
