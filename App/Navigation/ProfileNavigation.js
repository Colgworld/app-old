import React, { Component } from 'react';
import { Animated, Easing } from 'react-native'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'

// Routes (Containers)
import ProfileScreen from 'App/Containers/ProfileScreen'
import PaymentMethodsScreen from 'App/Containers/ManagePaymentsScreen'

// Components
import TabIcon from 'App/Components/TabIcon'

// Style & config
import styles from './Styles/NavigationStyles'
import Colors from 'App/Themes/Colors'
import AppConfig from 'App/Config/AppConfig'

// Manifest of possible screens
const ProfileNavigation = StackNavigator({
  ProfileScreen: { screen: ProfileScreen },
  PaymentMethodsScreen: { screen: PaymentMethodsScreen },
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'PaymentMethodsScreen',
  navigationOptions: ({ navigation }) => {
    headerStyle = styles.header
    headerTitleStyle = styles.headerTitle
    title = null
    headerLeftIcon = AppConfig.backIcon
    headerRightIcon = null
    onPressLeft = () => navigation.goBack()
    onPressRight = () => {}

    switch(navigation.state.routeName) {
      case "InviteCodeScreen":
        title = "Enter Invite Code"
        headerTitleStyle = styles.headerTitle
        headerLeftIcon = null
        // headerRightIcon = AppConfig.closeIcon
        // onPressRight = () => navigation.navigate("ProjectListScreen")      
        break;

    }
    
    headerLeft = (headerLeftIcon) ? <TabIcon name={headerLeftIcon} onPress={onPressLeft} color={Colors.darkPurple} /> : null
    headerRight = (headerRightIcon) ? <TabIcon name={headerRightIcon} onPress={onPressRight} color={Colors.darkPurple} /> : null

   
    return { headerStyle, headerTitleStyle, headerLeft, headerRight, title }
  },
  transitionConfig : () => ({
    transitionSpec: {
      duration: 250,
      timing: Animated.timing,
      easing: Easing.ease,
    },
  }),  
})



export default ProfileNavigation
