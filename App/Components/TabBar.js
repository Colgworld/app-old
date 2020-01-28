import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Dimensions, Platform, Animated } from 'react-native'
import { TabBarBottom } from 'react-navigation'
import styles from './Styles/TabBarStyle'
import Colors from 'App/Themes/Colors'

import Feather from 'react-native-vector-icons/Feather'
import { Grid, Row, Col } from 'react-native-easy-grid'

const TAB_BAR_OFFSET = -100;

export default class TabBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isVisible: true,
      offset: new Animated.Value(0),
    }
  }

  static defaultProps = {
    marginBottom: 0
  }

  componentWillReceiveProps(props) {
    if (props.navigation.state.index === 2 && this.props.navigation.state.index === 2) {
      const oldState = this.props.navigation.state;
      const oldRoute = oldState.routes[oldState.index].routes[oldState.routes[oldState.index].index];
      const oldParams = oldRoute.params;
      const wasVisible = !oldParams || oldParams.visible;

      const newState = props.navigation.state;
      const newRoute = newState.routes[newState.index].routes[newState.routes[newState.index].index];
      const newParams = newRoute.params;
      const isVisible = !newParams || newParams.visible;

      if (wasVisible && !isVisible) {
        Animated.timing(this.state.offset, { toValue: TAB_BAR_OFFSET, duration: 350 }).start();
      } else if (isVisible && !wasVisible) {
        Animated.timing(this.state.offset, { toValue: 0, duration: 350 }).start();
      }
    }
  }  

  render () {
    return this.state.isVisible ?
    <TabBarBottom {...this.props} style={[styles.container2, { bottom: this.state.offset }]} />
    :
    null
  }
}

