import React from "react"
import { TabNavigator } from 'react-navigation'

import ProjectNavigation from 'App/Navigation/ProjectNavigation'

import HomeScreen from '../Containers/HomeScreen'
import ExploreScreen from '../Containers/ExploreScreen'
// import ProjectDashboardScreen from '../Containers/ProjectDashboardScreen'
// import ProjectListScreen from '../Containers/ProjectListScreen'
import FavoritesScreen from '../Containers/FavoritesScreen'
import ProfileScreen from '../Containers/ProfileScreen'

import styles from './Styles/NavigationStyles'
import Colors from 'App/Themes/Colors'
import AppConfig from 'App/Config/AppConfig'

import TabBar from 'App/Components/TabBar'

import Feather from 'react-native-vector-icons/Feather'

const iconSize = 25

// Manifest of possible screens
const DashboardNavigation = TabNavigator({
  
  HomeScreen: {
    screen: HomeScreen,
  },
  ExploreScreen: {
    screen: ExploreScreen,
  },
  ProjectNavigation: {
    screen: ProjectNavigation,
  },
  FavoritesScreen: {
    screen: FavoritesScreen,
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },  
},
 {
  swipeEnabled: false,
  lazy: false,
  headerMode: 'none',
  initialRouteName: 'ProjectNavigation',
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarComponent: props => (
     <TabBar {...props} />
  ),
  tabBarOptions: {
    activeTintColor: Colors.red,
    inactiveTintColor: Colors.darkGray,
    pressColor: Colors.lightGray,
    showLabel: true,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    labelStyle: styles.label,
    activeLabelStyle: styles.activeLabel,
    iconStyle: styles.icon,
    style: {
      backgroundColor: Colors.white,
      
    },
    onTabPress: (tab) => {
    }    
  }
})

export default DashboardNavigation
