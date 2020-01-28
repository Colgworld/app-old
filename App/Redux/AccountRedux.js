import { createReducer, createActions } from 'reduxsauce'
import Immutable, { Record } from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['username', 'password'],
  loginSuccess: ['session_key'],
  loginFailure: null,
  resetLogin: null,
  register: ['data'],
  registerSuccess: ['payload'],
  registerFailure: null,
  logout: null,
  logoutSuccess: null,
  forgotPasswordRequest: ['email'],
  forgotPasswordSuccess: ['payload'],
  forgotPasswordFailure: null,

  resetPasswordRequest: ['data'],
  resetPasswordSuccess: ['payload'],
  resetPasswordFailure: null,

  getProfileRequest: null,
  getProfileSuccess: ['payload'],
  getProfileFailure: null,
  verifyForgotPWTokenRequest: ['data'],
  verifyForgotPWTokenSuccess: ['payload'],
  verifyForgotPWTokenFailure: null,

  inviteSuccess: null,

  updatePreferences: ['field', 'value'],

  loginWithFacebook: ['data'],
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  session_key: null,
  profile: {
    email: null,
    firstname: null,
    lastname: null,
    ID: null,
    type: null
  },
  preferences: {
    accept_ach: true,
    accept_cc: true,
    allow_push: true,
    allow_text: false
  },
  forgotPassMsg: null,
  loginMsg: null,
  onboarded: null,
  invited: null,
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getSessionKey: state => state.account.session_key,
  getUserData: state => state.account
}

/* ------------- Reducers ------------- */

export const login = (state, { email, password }) =>
  state.merge({ fetching: true, email })

export const loginSuccess = (state, { session_key }) =>
  state.merge({ fetching: false, session_key})
    .set("loginMsg", null)
    .set('onboarded', true)

export const loginFailure = (state) =>
  state.set("loginMsg", "Your email and/or password is incorrect")

export const logout = (state) =>
  state.set('session_key', null)

export const register = (state, { payload }) =>
  state.merge({ profile: payload.profile, session_key: payload.sessionKey })
    .set('onboarded', true)

export const getProfileSuccess = (state, { payload }) =>
  state.set('profile', payload)
    .set('onboarded', true)

export const verifyForgotPWTokenFailure = state =>
  state.set("forgotPassMsg", "")

export const resetLogin = state =>
  state.set("loginMsg", null)

export const inviteSuccess = state => 
  state.set("invited", true)

export const getProfileFailure = state =>
  state.set("session_key", null)

export const updatePreferences = (state, { field, value }) =>
  state.setIn(["preferences", field], value)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.REGISTER_SUCCESS]: register,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,
  [Types.RESET_LOGIN]: resetLogin,
  [Types.INVITE_SUCCESS]: inviteSuccess,
  [Types.UPDATE_PREFERENCES]: updatePreferences,
})
