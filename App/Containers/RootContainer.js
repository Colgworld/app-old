import React, { Component } from 'react'
import { View, StatusBar, AppState, Platform, Linking } from 'react-native'
import ReduxNavigation from 'App/Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from 'App/Redux/StartupRedux'
import OnboardingActions from 'App/Redux/OnboardingRedux'
import ProjectActions from 'App/Redux/ProjectRedux'
import AccountActions from 'App/Redux/AccountRedux'
import DeviceActions from 'App/Redux/DeviceRedux'
import ReduxPersist from 'App/Config/ReduxPersist'
import _ from 'underscore'

var shittyQs = require('shitty-qs')
import branch from 'react-native-branch'

// Styles
import styles from './Styles/RootContainerStyles'
import AppConfig from 'App/Config/AppConfig'

import GlobalModal from 'App/Components/Modals/GlobalModal'

const { ACCOUNT_FORGOT, JOIN_PROJECT, JOIN_APP } = require('App/Config/Constants').default

class RootContainer extends Component {

  constructor(props) {
    super(props);

    // this.props.actions.getPushEnabled();

    this.state = {
      seconds: 5,
      appState: AppState.currentState,
    };

    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    // time when app was started
    this.props.startupTime(new Date)

    let handleAppStateChange = (appState) => this.handleAppStateChange(appState)
    AppState.addEventListener('change', handleAppStateChange);
    // Linking.addEventListener('url', this._handleOpenURL);
    let parseUrl = (url) => this.parseUrl(url)

    Linking.getInitialURL().then(url => {
      if (url) {
        parseUrl(url)
      }
    });    
    Linking.addEventListener('url', (event) => {
      parseUrl(event.url)
    });


    branch.subscribe(({ error, params }) => {
      // params will never be null if error is null
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }

      // Non Branch link clicked (Dropbox or Other Auth)
      if (params['+non_branch_link']) {
        const nonBranchUrl = params['+non_branch_link']
        // Route non-Branch URL if appropriate.
        // this.props.initializeApp()
        // return
      }

      // App was open, no branch link tapped
      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        // return
        if (!this.props.appInitialized) {
          this.props.initializeApp()
        } else {
        }
      }

      // Branch link was tapped
      if (params['+clicked_branch_link']) {
        let verifyForgotPWToken = (params) => this.props.verifyForgotPWToken(params)
        let joinProject = (params) => this.props.joinProject(params)
        let setUserOnboardedData = (params) => this.props.setUserOnboardedData(params)
        
        switch(params['route']) {
          case ACCOUNT_FORGOT:
            verifyForgotPWToken(params)
            break;
          case JOIN_PROJECT:
            if (_.isNull(this.props.account.session_key)) {
              setUserOnboardedData(params) // store for after their onboarding
            } else {
              joinProject(params) // join logged in user to project
            }
            break;
          // case JOIN_APP:
          //   break
          // case "subscription":
          //   break
          default:
            this.props.initializeApp()
            break
        } 
        // A Branch link was opened.
        // Route link based on data in params.
        return
      }



    })
    
  }

  parseUrl(url) {
    // Is a branch link  
    if (url.includes("app.link")) {
      branch.openURL(url)
    }
    let params
    let route
    var raw = decodeURIComponent(url)
    var res = raw.split(/[\s,\?/]/)
    let query
    try {
      var [, query_string] = url.match(/\#(.*)/)
      query = shittyQs(query_string)
    } catch(error) {
    }

    // If Facebook login
    if (!_.isUndefined(query) && !_.isUndefined(query.access_token)) {
      this.props.loginWithFacebook({
        credentials: {
          token: query.access_token
        }
      })
    }
  }

  handleAppStateChange(appState) {

    if (appState === 'background') {
      this.setState({ appState: "background" })

      // Trigger delayed local notification
      // let date = new Date(Date.now() + (this.state.seconds * 1000));
      // if (Platform.OS === 'ios') {
      //   date = date.toISOString();
      // }
      // PushNotification.localNotificationSchedule({
      //   message: "My Notification Message",
      //   number: 10,
      //   date,
      // });
    
    } else {
      this.setState({ appState: "active" })
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <GlobalModal modal={this.props.modal} />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appInitialized: state.startup.appInitialized,
    account: state.account,
    modal: state.modal,
  }
}


// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  startupTime: (date) => dispatch(StartupActions.setStartupTime(date)),
  initializeApp: (data) => dispatch(StartupActions.initializeApp(data)),
  connectWebsocket: () => dispatch(StartupActions.connectWebsocket()),
  joinProject: (data) => dispatch(ProjectActions.linkUserToProjectRequest(data)),
  setUserOnboardedData: (data) => dispatch(OnboardingActions.setUserOnboardedData(data)),
  verifyForgotPWToken: (data) => dispatch(AccountActions.verifyForgotPWTokenRequest(data)),
  loginWithFacebook: (data) => dispatch(AccountActions.loginWithFacebook(data))
  // setDeviceUUID: (data) => dispatch(DeviceActions.createDeviceUuidRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
