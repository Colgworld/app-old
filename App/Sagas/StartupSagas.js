import { put, select, call, take } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'
import StartupActions, { StartupSelectors, StartupTypes } from 'App/Redux/StartupRedux'
import AccountActions, { AccountSelectors } from 'App/Redux/AccountRedux'
import OnboardingActions, { OnboardingSelectors } from 'App/Redux/OnboardingRedux'
import ProjectActions, { ProjectSelectors, ProjectTypes } from 'App/Redux/ProjectRedux'
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'

import { NavigationActions } from 'react-navigation'
import Config from 'react-native-config'
import DebugConfig from 'App/Config/DebugConfig'

import _ from 'underscore'

var JSURL = require("jsurl");

// exported to make available for tests
// export const selectAvatar = GithubSelectors.selectAvatar
export const getStartupTime = StartupSelectors.getStartupTime
export const getUserData = AccountSelectors.getUserData
export const getOnboarded = OnboardingSelectors.getOnboarded

import API from 'App/Services/API'

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

// process STARTUP actions
export function * startup (action) {

}

export function * initializeApp (action) {
  // const { data } = action
  // let onboardKey = "null"
  // let hasBranchIdentifier = false
  // if (data) {
  //   if (!_.isUndefined(data["$canonical_identifier"])) {
  //     onboardKey = data["$canonical_identifier"].replace("/", "_")
  //     hasBranchIdentifier = true
  //   }
  // }

  var startupTime = yield select(getStartupTime) 
  var userData = yield select(getUserData)

  if (!userData.onboarded) {
    yield put(OnboardingActions.setOnboarded(false))
  } 
  else if (userData.onboarded === null) {
    yield put(OnboardingActions.setOnboarded(false))
  }
  else {
    yield put(OnboardingActions.setOnboarded(true))
  }


  var onboarded = yield select(getOnboarded)

  var firstRoute
  if (!_.isNull(onboarded)) {
    if (Config.DEVELOP) {
      console.log("IN DEVELOP MODE", Config.DEV_SESSION_KEY)
      API.setAuthHeader(Config.DEV_SESSION_KEY)
      yield put(AccountActions.loginSuccess(Config.DEV_SESSION_KEY))
      yield put(AccountActions.getProfileRequest())
      yield put(ProjectActions.getAuthIntegrationTokenRequest())
      yield put(StartupActions.connectWebsocket())
      firstRoute = "DashboardScreen"
    } else {

      if (!userData.onboarded) {
        firstRoute = "OnboardingScreen"
      } else {
        if (_.isNull(userData.session_key)) {
          yield put(AccountActions.resetLogin())
          firstRoute = "LoginScreen"
        } else {
            API.setAuthHeader(userData.session_key)
            
            yield put(AccountActions.getProfileRequest())
            yield put(ProjectActions.setProjectNav("messages"))
            // yield put(ProjectActions.getProjectsRequest()) // happens at websocket connect
            yield put(PaymentSourcesActions.getPaymentSourcesRequest())
            yield put(ProjectActions.getAuthIntegrationTokenRequest())
            yield put(StartupActions.connectWebsocket())
            firstRoute = "DashboardScreen"            
        }
      }

    }

    if (!_.isNull(firstRoute)) {
      // while (true) {
      //     if (((new Date) - startupTime) > 3500) {
      yield put(NavigationActions.navigate({ routeName: firstRoute }))
      //       break
      //     }
      // }

    }
  
    yield put(StartupActions.setAppInitialized())


    // // Resume Last Session
    // // if (r != null) {
    // if (false) {
    //   // r["project_id"] = '1'
    //   switch (r.route) {
    //     case "ProjectViewermembers":
    //     case "ProjectViewerchat":
    //     case "ProjectViewerpayments":
    //     case "ProjectViewerfiles":
    //     case "ProjectViewerdetails":
    //       Actions.ProjectViewer({ data: r })
    //       break;

    //     case "ProjectList":
    //       Actions.ProjectList({ resume: true, params: params, data: r })
    //       break;

    //   }
    // } else {
    //   if (!token) {
    //     Actions.Login()
    //   } else {
    //     Actions.ProjectList({ params: params })
    //   }                            
    // }

  }

}












function initWebsocket(userID) {
  return eventChannel(emitter => {
    let wsUrl = Config.WEBSOCKET_SERVICE_HOST + "/ws?userID=" + userID 
    ws = new WebSocket(wsUrl)
    ws.onopen = () => {
      return emitter({ type: ProjectTypes.GET_PROJECTS_REQUEST })
      // ws.send('hello server')
    }
    ws.onerror = (error) => {
      return emitter({ type: StartupTypes.CONNECT_WEBSOCKET })
    }
    ws.onclose = (evt) => {
      return emitter({ type: StartupTypes.CONNECT_WEBSOCKET })
    }
    ws.onmessage = (e) => {
      let msg = null
      try {
        msg = JSON.parse(e.data)
        data = JSON.parse(msg.data)
      } catch(e) {
      }
      if (msg) {
        const type = msg.type
        switch (type) {
          case 'MESSAGE':
            return emitter({ type: ProjectTypes.CREATE_MESSAGE_SUCCESS, payload: data })
          case 'PAYMENT':
            return emitter({ type: ProjectTypes.UPDATE_PAYMENT_SUCCESS, data: data })
          case "FILE":
            return emitter({ type: ProjectTypes.CREATE_FILE_SUCCESS, payload: data })
          case "MEMBER_JOINED":
            return emitter({ type: ProjectTypes.MEMBER_JOINED_SUCCESS, payload: data })
          case "CHANGE_ORDER":
            return emitter({ type: ProjectTypes.UPDATE_CHANGE_ORDER_SUCCESS, payload: data })
          case "PROJECT":
            return emitter({ type: ProjectTypes.UPDATE_PROJECT_SUCCESS, payload: data })
          default:
            // nothing to do
        }
      }
    }
    // unsubscribe function
    return () => {
    }
  })
}


export function * connectWebsocket (action) {

  var userData = yield select(getUserData)
  const channel = yield call(initWebsocket, userData.profile.ID)

  while (true) {
    const action = yield take(channel)
    yield delay(1000)
    yield put(action)
  }

}