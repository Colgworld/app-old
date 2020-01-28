import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import styles from './Styles/AccountStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import NotificationSwitch from 'App/Components/NotificationSwitch'

import Form from 'App/Components/Common/Form'

export default class Account extends Component {

  static defaultProps = {
    preferences: {
      username: null,
      subscription: "Standard",
    },
  }

  render () {

      // {
      //   title: "Username",
      //   placeholder: this.props.preferences.username,
      //   refName: "username",
      //   value: this.props.preferences.username,
      //   editable: false
      // },
    let form = [
      {
        title: "Subscription",
        placeholder: this.props.preferences.subscription,
        refName: "subscription",
        value: this.props.preferences.subscription,
        editable: false
      }
    ]
    return (
      <View style={styles.container}>
        <Form ref="form" formItems={form} />
      </View>
    )
  }
}