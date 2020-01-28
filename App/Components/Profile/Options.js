import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/OptionsStyle'
const { ARCHIVED_PROJECTS, LEGAL, FEEDBACK, LOGOUT } = require('App/Config/Constants').default

import ListButton from 'App/Components/Common/ListButton'

export default class Options extends Component {
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

  renderItems({item}) {
    return (
      <ListButton item={item} onPress={(item) => this.props.onPress(item)} />
    )
  }

  render () {

      // {key: ARCHIVED_PROJECTS, title: 'Archived Projects', icon: 'folder'},
      // {key: LEGAL, title: 'Legal', icon: 'file-text'},
    let data = [
      {key: FEEDBACK, title: 'Get Help', icon: 'help-circle'},
      {key: LOGOUT, title: 'Logout', icon: 'power'}
    ]

    return (
      <View style={styles.container}>
        <FlatList 
          data={data}
          renderItem={(obj) => this.renderItems(obj)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}
