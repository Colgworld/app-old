import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onboardingRequest: ['data'],
  onboardingSuccess: ['payload'],
  onboardingFailure: null,
  setRole: ['role'],
  setRoute: ['route'],
  setOnboarded: ['payload'],
  setUserOnboarded: ['data'],
  setUserOnboardedData: ['data'],
  setData: ['data'],
  linkUserToProjectSuccess: ['payload'],
  linkUserToProjectFailure: null
})

export const OnboardingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  role: null,
  route: 'select_role',
  onboarded: null,
  onboardedData: null
})

/* ------------- Selectors ------------- */

export const OnboardingSelectors = {
  getOnboarded: state => state.onboarding.onboarded,
  getOnboardData: state => state.onboarding.onboardedData
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const setRole = (state, action) => {
  const { role } = action
  return state.set("role", role)
}

export const setOnboarded = (state, action) => {
  const { payload } = action
  return state.set('onboarded', payload)
}

export const setData = (state, action) => {
  const { data } = action
  return state.merge({ onboardedData: data })
}

export const setRoute = (state, { route }) =>
  state.set("route", route)
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ONBOARDING_REQUEST]: request,
  [Types.ONBOARDING_SUCCESS]: success,
  [Types.ONBOARDING_FAILURE]: failure,
  [Types.SET_ROLE]: setRole,
  [Types.SET_ONBOARDED]: setOnboarded,
  [Types.SET_DATA]: setData,
  [Types.SET_ROUTE]: setRoute
})
