import React from "react"
import { StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'

import ProjectDashboardScreen from '../Containers/ProjectDashboardScreen'
import ProjectListScreen from '../Containers/ProjectListScreen'

import styles from './Styles/NavigationStyles'
import Colors from 'App/Themes/Colors'
import AppConfig from 'App/Config/AppConfig'

import TabBar from 'App/Components/TabBar'

import Feather from 'react-native-vector-icons/Feather'

const iconSize = 25

// Manifest of possible screens
const ProjectNavigation = StackNavigator({
  ProjectListScreen: { screen: ProjectListScreen },
  ProjectDashboardScreen: { screen: ProjectDashboardScreen,  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ProjectListScreen',
  mode: 'modal',
  transitionConfig : () => ({
    transitionSpec: {
      duration: 450,
      timing: Animated.timing,
      easing: Easing.inOut(Easing.poly(4)),
      delay: 75,
      useNativeDriver: true
    },    
  }),
  navigationOptions: {
    gesturesEnabled: false,
  }  
})

export default ProjectNavigation
