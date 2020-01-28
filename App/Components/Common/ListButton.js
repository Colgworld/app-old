import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'
import styles from './Styles/ListButtonStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import Feather from 'react-native-vector-icons/Feather'

export default class ListButton extends Component {
  // // Prop type warnings
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
  }
  
  // Defaults for props
  static defaultProps = {
    onPress: () => {},
    iconColor: Colors.midGray
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.item)} style={[styles.container, globalStyles.centerContent]} >
      <Row style={styles.listItem}>
        <Col size={20} style={[globalStyles.centerContent]}>
          <Feather name={this.props.item.icon} size={20} color={this.props.iconColor} /> 
        </Col>
        <Col size={80}>
          <Text style={styles.title}>{this.props.item.title}</Text>
        </Col>
      </Row>
      </TouchableOpacity>
    )
  }
}
