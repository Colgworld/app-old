import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, } from 'react-native'
import styles from './Styles/NotificationSettingsStyle'
import NotificationSwitch from 'App/Components/NotificationSwitch'
import globalStyles from 'App/Themes/GlobalStyles'


export default class NotificationSettings extends Component {

  static defaultProps = {
    preferences: {
      allow_push: false,
      allow_text: false,
    },
    onSwitch: (v) => {}
  }

  render () {
    return (
      <View style={styles.container}>
        <NotificationSwitch
          onSwitch={(v) => this.props.onSwitch("allow_push", v)}
          value={this.props.preferences.allow_push}
          label="Push Notifications"
          label2="Turn this on to receive push notifications about your projects."
        />
        {/*<NotificationSwitch
                  onSwitch={(v) => this.props.onSwitch("allow_text", v)}
                  value={this.props.preferences.allow_text}
                  label="Text Notifications"
                  label2="Turn this on to receive text notifications about your projects."
                />*/}
      </View>
    )
  }
}