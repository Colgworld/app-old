import React, { Component } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'

import styles from './Styles/HeaderIconStyle'
import Colors from 'App/Themes/Colors'
import Metrics from 'App/Themes/Metrics'
import globalStyles from 'App/Themes/GlobalStyles'

export default class HeaderIcon extends Component {
  // // Prop type warnings
  static propTypes = {
    align: PropTypes.string,
  }
  
  // Defaults for props
  static defaultProps = {
    align: 'center'
  }

  render () {
    return (
      <Feather style={[this.props.iconStyle, {alignSelf: this.props.align}, globalStyles.centerIcon]} name={this.props.name} size={Metrics.tabIconSize} color={Colors.darkPurple} onPress={() => this.props.onPress()}/>
    )
  }
}
