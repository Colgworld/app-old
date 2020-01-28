import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDevicesRequest: ['data'],
  getDevicesSuccess: ['payload'],
  getDevicesFailure: null,

  createDeviceRequest: ['data'],
  createDeviceSuccess: ['payload'],
  createDeviceFailure: null,

})

export const DeviceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const DeviceSelectors = {
  getDevices: state => state.device
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

export const createSuccess = (state, { payload }) =>
  state.merge({ payload })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DEVICES_REQUEST]: request,
  [Types.GET_DEVICES_SUCCESS]: success,
  [Types.GET_DEVICES_FAILURE]: failure,
  [Types.CREATE_DEVICE_SUCCESS]: createSuccess
})
