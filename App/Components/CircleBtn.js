

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // 4.4.2
import styles from './Styles/CircleBtnStyle'

export default class App extends Component {

  static propTypes = {
    onPress: PropTypes.func,
    size: PropTypes.number
  }
  
  static defaultProps = {
    onPress: () => {},
    iconName: "plus",
    size: 30
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={() => this.props.onPress()}
          style={[styles.button, this.props.style]} >

          <Icon name={this.props.iconName}
            size={this.props.size}
            color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }
}
