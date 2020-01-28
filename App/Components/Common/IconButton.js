import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/IconButtonStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'

import Icon from 'react-native-vector-icons/Feather'

export default class IconButton extends Component {
  // Prop type warnings
  static propTypes = {
    onPress: PropTypes.func,
    btnText: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool
  }
  
  // Defaults for props
  static defaultProps = {
    onPress: () => {},
    btnText: "btnText",
    icon: "check",
    iconSize: 32,
    iconStyle: {},
    iconBtnStyle: {},
    disabled: false,
    containerStyle: {},
    padding: 4
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} disabled={this.props.disabled} style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.iconBtn, this.props.iconBtnStyle, {maxWidth: this.props.iconSize + (this.props.padding*2) }]}>
          <View style={{padding:this.props.padding}}>
            <Icon name={this.props.icon} size={this.props.iconSize} style={[styles.icon, this.props.iconStyle]} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
