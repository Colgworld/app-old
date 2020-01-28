import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import styles from './Styles/TabIconStyle'

import Feather from 'react-native-vector-icons/Feather'

export default class TabIcon extends Component {
  // // Prop type warnings
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  }
  
  // Defaults for props
  static defaultProps = {
    name: 'user',
    iconSize: 35,
    color: "#999999"
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={styles.container}>
        <Feather style={styles.icon} name={this.props.name} size={this.props.iconSize} color={this.props.color} />
      </TouchableOpacity>
    )
  }
}
