import React, { Component } from 'react';
import { Animated, Easing } from 'react-native'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import _ from 'underscore'

// Navigation
import DashboardNavigation from 'App/Navigation/DashboardNavigation'

// Routes (Containers)
import InviteCodeScreen from '../Containers/InviteCodeScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import AddPaymentMethodScreen from '../Containers/AddPaymentMethodScreen'
import ProjectWizardScreen from '../Containers/ProjectWizardScreen'
import DrawerScreen from 'App/Containers/DrawerScreen'
import OnboardingScreen from '../Containers/OnboardingScreen'
import ProjectListScreen from '../Containers/ProjectListScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import PaymentsScreen from '../Containers/PaymentsScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import ProjectMembersScreen from '../Containers/ProjectMembersScreen'
import ProjectFilesScreen from '../Containers/ProjectFilesScreen'
import ProjectChatScreen from '../Containers/ProjectChatScreen'
import ProjectPaymentsScreen from '../Containers/ProjectPaymentsScreen'
import ManagePaymentsScreen from '../Containers/ManagePaymentsScreen'
import SendFeedbackScreen from '../Containers/SendFeedbackScreen'
import ExploreScreen from '../Containers/ExploreScreen'
import FavoritesScreen from '../Containers/FavoritesScreen'
import HomeScreen from '../Containers/HomeScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import SelectRoleScreen from '../Containers/SelectRoleScreen'

// Components
// import TabIcon from 'App/Components/TabIcon'

// Style & config
import styles from './Styles/NavigationStyles'
import Colors from 'App/Themes/Colors'
import AppConfig from 'App/Config/AppConfig'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ExploreScreen: { screen: ExploreScreen },
  FavoritesScreen: { screen: FavoritesScreen },
  HomeScreen: { screen: HomeScreen },
  ProfileScreen: { screen: ProfileScreen, 
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title}`,
    })
  },
  DashboardScreen: { screen: DashboardNavigation },
  InviteCodeScreen: { screen: InviteCodeScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  AddPaymentMethodScreen: { screen: AddPaymentMethodScreen },
  ProjectWizardScreen: { screen: ProjectWizardScreen },
  ManagePaymentsScreen: { screen: ManagePaymentsScreen },
  SendFeedbackScreen: { screen: SendFeedbackScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  ProjectListScreen: { screen: ProjectListScreen },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen: { screen: LoginScreen },
  PaymentsScreen: { screen: PaymentsScreen },
  LaunchScreen: { screen: LaunchScreen },

  ProjectPaymentsScreen: { screen: ProjectPaymentsScreen },
  ProjectChatScreen: { screen: ProjectChatScreen },
  ProjectFilesScreen: { screen: ProjectFilesScreen },
  ProjectMembersScreen: { screen: ProjectMembersScreen },
  SelectRoleScreen: { screen: SelectRoleScreen },

  // ProjectViewerScreen: {
  //   screen: ProjectNav,
  //   navigationOptions: ({navigation}) => ({
  //     // title: `${navigation.state.params.title}`,
  //   })
  // },
  ManagePaymentsScreen: { screen: ManagePaymentsScreen },
  SendFeedbackScreen: { screen: SendFeedbackScreen },
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LaunchScreen',
  transitionConfig : () => ({
    transitionSpec: {
      duration: 250,
      timing: Animated.timing,
      easing: Easing.ease,
    },
  }),
  navigationOptions: {
    gesturesEnabled: false
  }  
})



// Manifest of possible screens
// const DrawerNav = DrawerNavigator({
//   Home: { screen: PrimaryNav },
// }, {
//   contentComponent: DrawerScreen,
//   drawerWidth: 300
// })

// export default DrawerNav

export default PrimaryNav
