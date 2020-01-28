import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
// import { path } from 'ramda'
import AccountActions, { AccountSelectors } from 'App/Redux/AccountRedux'
import ProjectActions from 'App/Redux/ProjectRedux'
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'
import StartupActions from 'App/Redux/StartupRedux'
import OnboardingActions, { OnboardingSelectors } from 'App/Redux/OnboardingRedux'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import _ from 'underscore'
var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;


import DebugConfig from 'App/Config/DebugConfig'
import FixtureAPI from 'App/Services/FixtureApi'
import API from 'App/Services/API'

const { FACEBOOK, GOOGLE } = require("App/Config/Constants").default

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

export const getOnboardData = OnboardingSelectors.getOnboardData
export const getUserData = AccountSelectors.getUserData

export function * login (action) {
  const { username, password } = action
  const login = yield call(api.login, username, password)
  if (login.ok) {
    yield put(AccountActions.loginSuccess(login.data.sessionKey))
    API.setAuthHeader(login.data.sessionKey)

    const profile = yield call(api.getProfile)
    if (profile.ok) {
      setCrashlytics(profile.data)
      yield put(AccountActions.getProfileSuccess(profile.data))
      yield put(ProjectActions.setProjectNav("messages"))
      yield put(ProjectActions.getProjectsRequest())
      yield put(PaymentSourcesActions.getPaymentSourcesRequest())
      yield put(ProjectActions.getAuthIntegrationTokenRequest())      
      yield put(StartupActions.connectWebsocket())
      var userData = yield select(getUserData)

      var nextRoute = "ProjectNavigation"
  
      yield put(NavigationActions.navigate({ routeName: nextRoute }))
    } else {
      yield put(AccountActions.getProfileFailure())
    }

  } else {
    yield put(AccountActions.loginFailure())
  }
}

function setCrashlytics (data) {
  Crashlytics.setUserName(data.firstname + " " + data.lastname);
  Crashlytics.setUserEmail(data.email);
  Crashlytics.setUserIdentifier(data.user_public_id);  
}

export function * logout (action) {
  yield call(api.logout)
  yield put(AccountActions.logoutSuccess())
  yield put(NavigationActions.navigate({ routeName: 'OnboardingScreen' }))
}


export function * register (action) {
  const { data } = action
  const response = yield call(api.register, data)

  if (response.ok) {
    API.setAuthHeader(response.data.sessionKey)
    yield put(AccountActions.registerSuccess(response.data))
    if (data.linkUser) {
      const obData = yield select(getOnboardData)
      if (!_.isNull(obData)) {
        const linked = yield call(api.linkUserToProject, obData)
        if (linked.ok) {
          yield put(OnboardingActions.linkUserToProjectSuccess())
        } else {
          yield put(OnboardingActions.linkUserToProjectFailure())
        }
      }
    }    
    yield put(NavigationActions.navigate({ routeName: 'ProjectNavigation' }))
    yield put(ProjectActions.resetProjectData())
    yield put(StartupActions.connectWebsocket())
  } else {
    yield put(AccountActions.registerFailure())
  }
}

export function * forgotPassword (action) {
  const { email } = action
  const response = yield call(api.forgotPassword, email)
  if (response.ok) {
    yield put(AccountActions.forgotPasswordSuccess(response.data))
  } else {
    yield put(AccountActions.forgotPasswordFailure())
  }
}

export function * verifyForgotPWToken (action) {
  const { data } = action
  const response = yield call(api.verifyForgotPWToken, data)
  if (response.ok) {
    if (response.data.message  == "TokenVerified") {
      yield put(NavigationActions.navigate({ routeName: "ForgotPasswordScreen", params: { token: response.data.token } }))
      yield put(AccountActions.verifyForgotPWTokenSuccess())
    }
  } else {
    yield put(AccountActions.verifyForgotPWTokenFailure())
  }
}

export function * resetPassword (action) {
  const { data } = action
  const response = yield call(api.resetPassword, data)
  if (response.ok) {
    yield put(NavigationActions.navigate({ routeName: "LoginScreen" }))
  } else {
    yield put(NavigationActions.navigate({ routeName: "ForgotPasswordScreen" }))
  }
}

export function * getProfile (action) {
  const response = yield call(api.getProfile)
  if (response.ok) {
    setCrashlytics(response.data)
    yield put(AccountActions.getProfileSuccess(response.data))
  } else {
    switch (response.status) {
      case 401:
        yield put(AccountActions.getProfileFailure())
        yield put(NavigationActions.navigate({ routeName: "LoginScreen" }))
        break
      case 502:
        yield delay(4000)
        yield put(AccountActions.getProfileRequest())
      default:
        break
    }
  }
}

export function * updateProfile (action) {
  const { profile } = action
  const response = yield call(api.updateProfile(profile))
  if (response.ok) {
    yield put(AccountActions.updateProfile(response.data))
  }
}

export function * updatePreferences (action) {
  const { field, value } = action
  const response = yield call(api.updatePreferences, {
    field: field,
    value: value
  })

  if (response.ok) {
    // Do Nothing
    // yield put(AccountActions.updatePreferencesSuccess())
  }
}

export function * toggleTestApi (action) {
  const { data } = action
  if (isTest) {
    API.setAuthHeader(Config.API_URL)
    return
  }
  API.setAuthHeader(Config.TEST_API_URL)
  // const response = yield call(api.isTestUser, data)
  // if (response.ok) {
  //  yield put(NavigationActions.navigate({ routeName: "LoginScreen" }))
  // } else {
  //   yield put(NavigationActions.navigate({ routeName: "ForgotPasswordScreen" }))
  // }  
}

export function * loginWithFacebook (action) {
  const { data } = action
  const fbData = yield call(api.getFacebookData, data.credentials.token)
  if (fbData.ok) {
    const user = yield call(api.getUser, fbData.data.email)
    if (user.data.exists) {
      // yield put(NavigationActions.navigate({routeName: "OnboardingScreen", params: {token: data.credentials.token}}))
      yield login({username: fbData.data.email, password: fbData.data.id})
    } else {
      const obData = yield select(getOnboardData)
      let accountType = (!_.isNull(obData)) ? obData.type : null
      let params = {
                      email: fbData.data.email,
                      remote_login: FACEBOOK,
                      password: fbData.data.id,
                      firstname: fbData.data.first_name,
                      lastname: fbData.data.last_name,
                      image: fbData.data.picture.data.url,
                      type: accountType,
                      facebook_token: data.credentials.token
                    }
      yield put(NavigationActions.navigate({ 
                        routeName: "SelectRoleScreen", 
                        params: params 
                      }))
    }
  }
}



