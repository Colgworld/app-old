import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import _ from 'underscore'
import { Grid, Row, Col } from 'react-native-easy-grid'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'
import ProjectActions from 'App/Redux/ProjectRedux'
import { getActiveProject } from 'App/Lib/Util'

import Main from 'App/Components/Profile/Main'
import Options from 'App/Components/Profile/Options'
import NotificationSettings from 'App/Components/Profile/NotificationSettings'
import Invite from 'App/Components/Profile/Invite'
import PaymentSettings from 'App/Components/Profile/PaymentSettings'
import Account from 'App/Components/Profile/Account'
import AppConfig from 'App/Config/AppConfig'
import Header from 'App/Components/Header'

// Styles
import styles from './Styles/ProfileScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Metrics from 'App/Themes/Metrics'
import Colors from 'App/Themes/Colors'

const { OPTIONS, NOTIFICATIONS, PAYMENTS, INVITE, MAIN, ARCHIVED_PROJECTS, LEGAL, ACCOUNT, FEEDBACK, LOGOUT } = require('App/Config/Constants').default

class ProfileScreen extends Component {
  
  state = {
    nav: MAIN,
    title: "Profile"
  }

    // headerLeft: () => navigation.state.params && navigation.state.params.title != 'Profile' ? <HeaderIcon name={AppConfig.backIcon} onPress={() => navigation.navigate("ProfileScreen", { title: "Profile" })} /> : <View style={styles.empty}></View>,
    // headerTitleStyle: {
    //   fontSize: 32,
    //   textAlign: 'left',
    //   flex: 1
    // },
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params && navigation.state.params.title ? navigation.state.params.title : 'Profile'}`,
    header: null,
    tabBarLabel: "PROFILE",
    tabBarIcon: ({ tintColor }) => (
      <Feather name="user" size={Metrics.tabIconSize} color={tintColor} />
    )
  })  

   // static navigationOptions = ({ navigation }) => ({
   //  title: `${navigation.state.params.title}`,
   //   headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
   //      headerStyle:{
   //          backgroundColor:'white',
   //      },
   //  });

  // static navigationOptions = ({ navigation }) => ({
  //   title: `${navigation.state.params && navigation.state.params.title ? navigation.state.params.title : ''}`
  // })    

  // onPress(item) {
  //   this.props.navigation.setParams({ nav: item.key, title: item.title })
  //   this.setState({ nav: item.key })
  // }

  renderContent() {
    // let onPress = () => this.onPress()
    // let onPress = (data) => {}
    let onPress = (d) => {
      this.setState({nav:d.key})
      this.onPress(d)
    }

    let content = <Main {...this.props} onPress={onPress} />
    switch (this.state.nav) {
      case PAYMENTS:
        content = <PaymentSettings 
                    createPaymentSource={(data) => this.props.createPaymentSource(data)}
                    paymentSources={this.props.paymentSources}
                    accountType={this.props.profile.type}
                    preferences={this.props.preferences}
                    onSwitch={(f, v) => this.props.updatePreferences(f, v)} />
        break
      case NOTIFICATIONS:
        content = <NotificationSettings
                    preferences={this.props.preferences}
                    onSwitch={(f, v) => this.props.updatePreferences(f, v)} />
        break
      case INVITE:
        content = <Invite {...this.props} onPress={onPress} />
        break
      case ACCOUNT:
        content = <Account onPress={onPress} />
        break
      // case LEGAL:
      //   content = <Options profile={this.props.profile} onPress={onPress} />
      //   break
      // case FEEDBACK:
      //   content = <Options profile={this.props.profile} onPress={onPress} />
      //   break
      // case LOGOUT:
      //   content = <Options profile={this.props.profile} onPress={onPress} />
      //   break
      // case ARCHIVED_PROJECTS:
      //   content = <Options profile={this.props.profile} onPress={onPress} />
      //   break
    }    
    return content
  }

  onPress(d) {
    // if (!_.isUndefined(data.params)) {
      this.setState({ nav: d.key })
      let title = "Profile"
      switch (d.key) {
        case LOGOUT:
          this.props.logout()
          return
        case FEEDBACK:
          this.props.navigation.navigate("SendFeedbackScreen")
          return
        case ARCHIVED_PROJECTS:
          // this.props.navigation.navigate("ProjectListScreen")
          return
        case ACCOUNT:
          // this.props.navigation.navigate("ProjectListScreen")
          return
        case LEGAL:
          return
        // case INVITE:
        //   // this.props.navigation.navigate("")
        //   return
      }
      this.props.navigation.navigate("ProfileScreen", { title: title })
    // }
  }

  getData() {
 
    let titleAlign = "left"
    let title = "Profile"
    let leftIcon = null
    let rightIcon = null
    let tStyle = null
    let cStyle = null
    let onPressLeft = () => {}
    let onPressRight = () => {}

    switch(this.state.nav) {
      case INVITE:
        titleAlign = "center"
        title = "Invite Friends"
        leftIcon = AppConfig.backIcon
        rightIcon = null
        tStyle = globalStyles.smallHeaderTitle
        cStyle = globalStyles.smallHeaderContainer
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: INVITE}})
        break
      case ACCOUNT:
        titleAlign = "center"
        title = "Account"
        leftIcon = AppConfig.backIcon
        rightIcon = null
        tStyle = globalStyles.smallHeaderTitle
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: INVITE}})
        break
      case NOTIFICATIONS:
        titleAlign = "center"
        title = 'Notifications'
        leftIcon = AppConfig.backIcon
        rightIcon = null
        tStyle = globalStyles.smallHeaderTitle
        cStyle = globalStyles.smallHeaderContainer
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: NOTIFICATIONS}})
        break
      case PAYMENTS:
        titleAlign = "center"
        title = "Payment Settings"
        leftIcon = AppConfig.backIcon
        rightIcon = AppConfig.addIcon
        tStyle = globalStyles.smallHeaderTitle
        cStyle = globalStyles.smallHeaderContainer
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: PAYMENTS}})
        onPressRight = () => this.props.navigation.navigate("AddPaymentMethodScreen")
        break
      case OPTIONS:
        titleAlign = "center"
        title = "More Options"
        leftIcon = AppConfig.backIcon
        rightIcon = null
        tStyle = globalStyles.smallHeaderTitle
        cStyle = globalStyles.smallHeaderContainer
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: OPTIONS}})
        break
      case ARCHIVED_PROJECTS:
        break

      case LEGAL:
        title = "Legal"
        leftIcon = AppConfig.backIcon
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: LEGAL}})
        break
     
      case FEEDBACK:
        // leftIcon = null
        // onPressLeft = () => this.setState({nav: }) // this.setState({nav: {...this.state.nav, key: FEEDBACK}})
        break
     
      case LOGOUT:

        break
      
      default:
        titleAlign = "left"
        title = "Profile"
        leftIcon = null
        rightIcon = null
        tStyle = null
        onPressLeft = () => this.setState({nav: MAIN}) // this.setState({nav: {...this.state.nav, key: MAIN}})
        onPressRight = () => {}
        break        
    }

    return {
      titleAlign: titleAlign,
      title: title,
      leftIcon: leftIcon,
      rightIcon: rightIcon,
      titleStyle: tStyle,
      containerStyle: cStyle,
      onPressLeft: onPressLeft,
      onPressRight: onPressRight
    }
  }

  render () {
    const data = this.getData()

    return (
      <Grid style={styles.container}>
        <Row size={15}>
          <Header title={data.title}
                containerStyle={data.containerStyle}
                titleAlign={data.titleAlign}
                titleStyle={data.titleStyle}
                leftIcon={data.leftIcon}
                rightIcon={data.rightIcon}
                onPressLeft={() => data.onPressLeft()}
                onPressRight={() => data.onPressRight()} />
        </Row>
        <Row size={85}>
          <Col>
          {this.renderContent()}
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.account.profile,
    paymentSources: state.paymentSources.payload,
    preferences: state.account.preferences
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AccountActions.logout()),
    updatePreferences: (f, v) => dispatch(AccountActions.updatePreferences(f, v)),
    createPaymentSource: (data) => dispatch(PaymentSourcesActions.createPaymentSourceRequest(data)),
    inviteUser: (data) => dispatch(ProjectActions.sendMemberInvitesRequest(data)),
    saveInviteLink: (data) => dispatch(ProjectActions.saveInviteLinkRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
