import { takeLatest, takeEvery, all } from 'redux-saga/effects'



/* ------------- Types ------------- */

import { StartupTypes } from 'App/Redux/StartupRedux'
import { AccountTypes } from 'App/Redux/AccountRedux'
import { ProjectTypes } from 'App/Redux/ProjectRedux'
import { DeviceTypes } from 'App/Redux/DeviceRedux'
import { ProjectWizardTypes } from 'App/Redux/ProjectWizardRedux'
import { PaymentSourcesTypes } from 'App/Redux/PaymentSourcesRedux'
import { ExploreTypes } from 'App/Redux/ExploreRedux'
import { OnboardingTypes } from 'App/Redux/OnboardingRedux'

/* ------------- Sagas ------------- */

import { startup, initializeApp, connectWebsocket } from './StartupSagas'
import { login, 
        register, 
        logout, 
        forgotPassword, 
        getProfile,
        verifyForgotPWToken,
        resetPassword,
        updatePreferences,
        loginWithFacebook } from './AccountSagas'
import { getProjects, 
        updateProject, 
        createProject, 
        getPaymentSources,
        createPaymentSource,
        deletePaymentSource,
        sendPayment,
        createMessage,
        sendMemberInvite,
        createChangeOrder,
        updateChangeOrder,
        createFile,
        linkUserToProject,
        sendFeedback,
        createToken, 
        getToken,
        onPressMilestone,
        saveInviteLink,
        setActive } from './ProjectSagas'
import { createDevice, getDevices } from './DeviceSagas'
import { verifyPaymentSource } from './PaymentSourceSagas'
import { getExplore } from './ExploreSagas'
import { setUserOnboardedData } from './OnboardingSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const accountApi = DebugConfig.useFixtures ? FixtureAccountAPI : AccountAPI.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.INITIALIZE_APP, initializeApp),
    takeLatest(StartupTypes.CONNECT_WEBSOCKET, connectWebsocket),

    takeLatest(AccountTypes.LOGIN, login),
    takeLatest(AccountTypes.LOGOUT, logout),
    takeLatest(AccountTypes.REGISTER, register),
    takeLatest(AccountTypes.FORGOT_PASSWORD_REQUEST, forgotPassword),
    takeLatest(AccountTypes.RESET_PASSWORD_REQUEST, resetPassword),
    takeLatest(AccountTypes.VERIFY_FORGOT_P_W_TOKEN_REQUEST, verifyForgotPWToken),
    takeLatest(AccountTypes.UPDATE_PREFERENCES, updatePreferences),
    takeLatest(AccountTypes.LOGIN_WITH_FACEBOOK, loginWithFacebook),

    takeLatest(AccountTypes.GET_PROFILE_REQUEST, getProfile),

    takeLatest(ProjectWizardTypes.CREATE_PROJECT_REQUEST, createProject),

    takeLatest(PaymentSourcesTypes.GET_PAYMENT_SOURCES_REQUEST, getPaymentSources),
    takeLatest(PaymentSourcesTypes.CREATE_PAYMENT_SOURCE_REQUEST, createPaymentSource),
    takeLatest(PaymentSourcesTypes.DELETE_PAYMENT_SOURCE_REQUEST, deletePaymentSource),
    takeLatest(PaymentSourcesTypes.VERIFY_PAYMENT_SOURCE_REQUEST, verifyPaymentSource),

    takeLatest(ProjectTypes.GET_PROJECTS_REQUEST, getProjects),
    takeLatest(ProjectTypes.UPDATE_PROJECT_REQUEST, updateProject),
    takeLatest(ProjectTypes.SEND_PAYMENT_REQUEST, sendPayment),
    takeEvery(ProjectTypes.CREATE_MESSAGE_REQUEST, createMessage),
    takeLatest(ProjectTypes.SEND_MEMBER_INVITES_REQUEST, sendMemberInvite),
    takeLatest(ProjectTypes.CREATE_CHANGE_ORDER_REQUEST, createChangeOrder),
    takeLatest(ProjectTypes.UPDATE_CHANGE_ORDER_REQUEST, updateChangeOrder),
    takeEvery(ProjectTypes.CREATE_FILE_REQUEST, createFile),
    takeLatest(ProjectTypes.LINK_USER_TO_PROJECT_REQUEST, linkUserToProject),
    takeLatest(ProjectTypes.ON_PRESS_MILESTONE, onPressMilestone),
    takeLatest(ProjectTypes.SAVE_INVITE_LINK_REQUEST, saveInviteLink),
    takeLatest(ProjectTypes.SET_ACTIVE, setActive),
    
    takeLatest(DeviceTypes.CREATE_DEVICE_REQUEST, createDevice),
    takeLatest(DeviceTypes.GET_DEVICES_REQUEST, getDevices),

    takeLatest(ProjectTypes.SEND_FEEDBACK_REQUEST, sendFeedback),
    takeLatest(ProjectTypes.SAVE_AUTH_INTEGRATION_TOKEN_REQUEST, createToken),
    takeLatest(ProjectTypes.GET_AUTH_INTEGRATION_TOKEN_REQUEST, getToken),

    takeLatest(ExploreTypes.GET_EXPLORE_REQUEST, getExplore),

    takeLatest(OnboardingTypes.SET_USER_ONBOARDED_DATA, setUserOnboardedData)

  ])
}
