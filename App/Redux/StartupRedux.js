import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null, 
  setStartupTime: ['data'], 
  initializeApp: ['data'],
  firstRoute: ['route'],
  connectWebsocket: null,
  setAppInitialized: null
})

export const StartupTypes = Types
export default Creators


/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  firstRoute: null,
  appInitialized: false,
  startupTime: null
})

/* ------------- Selectors ------------- */

export const StartupSelectors = {
  getStartupTime: state => state.startup.startupTime
}

/* ------------- Reducers ------------- */

export const setRoute = (state, { route }) => {
    // console.tron.log(route)
    return state.merge({ firstRoute: route })
}

export const connectWebsocket = (state) => {
    return state
}

export const setAppInitialized = (state) =>
    state.set('appInitialized', true)

export const setStartupTime = (state, { data }) =>
    state.set('startupTime', data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FIRST_ROUTE]: setRoute,
  [Types.CONNECT_WEBSOCKET]: connectWebsocket,
  [Types.SET_APP_INITIALIZED]: setAppInitialized,
  [Types.SET_STARTUP_TIME]: setStartupTime
})
