import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'underscore'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  getPaymentSourcesRequest: ['data'],
  getPaymentSourcesSuccess: ['payload'],
  getPaymentSourcesFailure: null,  

  createPaymentSourceRequest: ['data'],
  createPaymentSourceSuccess: ['payload'],
  createPaymentSourceFailure: null,

  deletePaymentSourceRequest: ['data'],
  deletePaymentSourceSuccess: ['payload'],
  deletePaymentSourceFailure: null,

  verifyPaymentSourceRequest: ['data'],
  verifyPaymentSourceSuccess: ['payload'],
  verifyPaymentSourceFailure: null,

  setModal: ['data']

})

export const PaymentSourcesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const defaultPayload = {
    creditCards: null, 
    bankAccounts: null
  }

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  creating: null,
  payload: defaultPayload,
  error: null,

  verifying: false,
  verifyFailureMsg: null,

  modalVisible: false

})

/* ------------- Selectors ------------- */

export const PaymentSourcesSelectors = {
  getPaymentSourceData: state => state.paymentSources.payload
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: defaultPayload })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: defaultPayload })

export const createSuccess = (state, action) => {
  const { payload } = action
  type = (payload.type == "stripe_cc") ? "creditCards" : "bankAccounts"
  if (_.isNull(state.payload[type])) {
    return state.setIn(['payload', type], Immutable([payload]))
  } else {
    var key = state.payload[type].size
    return state.setIn(['payload', type, key], payload)
  }
}

export const verify = state => 
  state.set('verifying', true)

// message from stripe
export const verifyFailure = state => 
  state.set('verifyFailureMsg', "The amounts provided do not match the amounts that were sent to the bank account.")

export const verifySuccess = (state, { payload }) => {
  return state.set('verifyFailureMsg', null)
    .set('verifying', false)
    .set('modalVisible', false)
    // update('payload', list => list.())
}

export const setModal = (state, { data }) =>
  state.set('modalVisible', data)

// export const createPaymentSourceSuccess = (state, { payload }) => {

//   return state.setIn([], payload)
// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PAYMENT_SOURCES_REQUEST]: request,
  [Types.GET_PAYMENT_SOURCES_SUCCESS]: success,
  [Types.GET_PAYMENT_SOURCES_FAILURE]: failure,
  [Types.CREATE_PAYMENT_SOURCE_SUCCESS]: createSuccess,
  [Types.VERIFY_PAYMENT_SOURCE_REQUEST]: verify,
  [Types.VERIFY_PAYMENT_SOURCE_FAILURE]: verifyFailure,
  [Types.VERIFY_PAYMENT_SOURCE_SUCCESS]: verifySuccess,
  [Types.SET_MODAL]: setModal
})
