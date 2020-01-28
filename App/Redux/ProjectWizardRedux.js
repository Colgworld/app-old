import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from 'App/Config/AppConfig'
const { PRO, HOMEOWNER } = require("App/Config/Constants").default

const fieldValidate = require('./FieldValidation').default
import _ from 'underscore'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createProjectRequest: ['data'],
  createProjectSuccess: ['payload'],
  projectWizardFailure: null,

  projectWizardUpdateForm: ['field', 'value'],
  projectWizardActivePayment: ['field', 'value'],
  projectWizardUpdatePayment: ['payment'],
  projectWizardCheckValidated: ['step'],

  sendInviteRequestBySMS: ['data'],
  sendInviteRequestBySMSSuccess: ['payload'],
  sendInviteRequestBySMSFailure: null,

  resetProjectWizard: null
})

export const ProjectWizardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: null,
  error: null,
  inProgress: false,
  disabledBtn: true,
  form: {
    activeStep: 'start',
    accountType: null,
    project: {
      name: null,
      nameHasError: true,
      nameErrorMsg: null,

      clientName: null,
      clientNameHasError: true,
      clientNameErrorMsg: null,      
      clientAddress: null,
      clientAddress1: null,
      clientAddress2: null,
      clientCity: null,
      clientState: null,
      clientZip: null,

      cost: null,
      budget: null,
      budgetHasError: true,
      budgetErrorMsg: null,

      startDate: null,
      startDateHasError: true,
      startDateErrorMsg: null,
      
      endDate: null,
      endDateHasError: true,
      endDateErrorMsg: null,

      image: null

    },
    members: [
      {
        firstname: null,
        lastname: null,
        phone: null,
      }
    ],
    membersHasError: false,
    membersErrorMsg: null,
    
    payments: [],
    paymentsHasError: false,
    paymentsErrorMsg: null,

    paymentMultiplier: AppConfig.paymentMultiplierPercent,
    totalCostAllocated: 0,
    remainingCost: null,
    showAddPaymentIcon: true,

    activePayment: {
      title: null,
      amount: 0,
      description: "",
      delta: null
    },
  },

  response: null,
  smsInviteSent: false,
  smsInviteSentMsg: null
   
})

/* ------------- Selectors ------------- */

export const ProjectWizardSelectors = {
  getResponse: state => state.projectWizard.response
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.set("response", payload)
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const updateForm = (state, { field, value }) => {
  let nextState = state.setIn(field, value)
    .set('inProgress', true)

  // validate form fields
  return formValidate(fieldValidate(nextState, { field, value }))
}

export const updateActivePayment = (state, { field, value }) => {
  let nextState = state.setIn(['form', 'activePayment', field], value)

  return nextState
  // validate form fields
  // return formValidate(fieldValidate(nextState, { field, value }))
}


export const updatePayment = (state, { payment }) => {
  // let nextState = state.setIn(['form', 'activePayment', field], value)

  // return state.form.payments.update(
  //   state.form.payments.findIndex(function(item) { 
  //     return item.get("name") === "third"; 
  //   }), function(item) {
  //     return item.set("count", 4);
  //   }
  // );   
  

  let exists = false
  let key = null
  // return state
  state.form.payments.map((p,k) => {
    if (p.delta == payment.delta) {
      exists = true
      key = k
    }
  })


  let nextState
  if (!exists) {
    nextState = state.updateIn(['form', 'payments'], list => list.concat({...payment, delta: state.form.payments.length}))
                  .setIn(['form', 'activePayment', 'delta'], null)
                  .setIn(['form', 'activePayment', 'description'], "")
                  .setIn(['form', 'activePayment', 'title'], "")
                  .setIn(['form', 'activePayment', 'amount'], 0)
  } else {
    nextState = state.setIn(['form', 'payments', key, 'amount'], payment.amount)
                  .setIn(['form', 'payments', key, 'description'], payment.description)
                  .setIn(['form', 'payments', key, 'title'], payment.title)
                  .setIn(['form', 'payments', key, 'delta'], payment.delta)
                  .setIn(['form', 'activePayment', 'delta'], null)
                  .setIn(['form', 'activePayment', 'description'], "")
                  .setIn(['form', 'activePayment', 'title'], "")
                  .setIn(['form', 'activePayment', 'amount'], 0)
  }  

  return nextState
  // return formValidate(calculatePayments(nextState))
}

export const checkValidated = (state, { step }) => {
  return formValidate(state)
}

export const smsSent = (state, { payload }) => {
  return state
}

export const resetProjectWizard = state => 
  INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_PROJECT_REQUEST]: request,
  [Types.CREATE_PROJECT_SUCCESS]: success,
  [Types.PROJECT_WIZARD_FAILURE]: failure,
  [Types.PROJECT_WIZARD_UPDATE_FORM]: updateForm,
  [Types.PROJECT_WIZARD_ACTIVE_PAYMENT]: updateActivePayment,
  [Types.PROJECT_WIZARD_UPDATE_PAYMENT]: updatePayment,
  [Types.PROJECT_WIZARD_CHECK_VALIDATED]: checkValidated,
  [Types.RESET_PROJECT_WIZARD]: resetProjectWizard
})


const formValidate = (state) => {
  switch(state.form.activeStep) {
    case "start":
      if (!state.form.project.nameHasError && 
          !state.form.project.costHasError && 
          !state.form.project.detailsHasError && 
          (!state.form.project.startDateHasError && !state.form.project.endDateHasError && state.form.accountType == PRO) || (!state.form.project.budgetHasError && state.form.accountType == HOMEOWNER)) {
        return state.set('disabledBtn', false)
      } else {
        return state.set('disabledBtn', true)
      }
      break;
    case "invite":
      if (!state.form.membersHasError) {
        return state.set('disabledBtn', false)
      } else {
        return state.set('disabledBtn', true)
      }
      break;
    case "payments":
      if (!state.form.paymentsHasError) {
        return state.set('disabledBtn', false)
      } else {
        return state.set('disabledBtn', true)
      }
      break;
  }
  return state
}


const calculatePayments = (state) => {

  var paymentTotal = 0
  let nextState
  hasError = true


  let paymentsUpd = []
  state.form.payments.map((p, k) => {
    p = p.asMutable()

    amount = (state.form.paymentMultiplier === AppConfig.paymentMultiplierPercent) ? Number(((Number(p.percent) / 100) * state.form.project.cost).toFixed(2)) : Number(p.amount)
    percentage = (state.form.paymentMultiplier === AppConfig.paymentMultiplierPercent) ? Number(p.percent) : Number((Number(p.amount) / state.form.project.cost).toFixed(2)) * 100
    
    paymentTotal = paymentTotal + amount
    p.percent = percentage
    p.amount = amount
    paymentsUpd.push(p)
    // nextState = state.setIn(['form', 'payments', k, 'percent'], percentage)
    //               .setIn(['form', 'payments', k, 'amount'], amount)

  })
  var remaining = state.form.project.cost - paymentTotal
  if (remaining == 0) {
    hasError = false
  }

  return state.setIn(['form', 'totalCostAllocated'], paymentTotal)
            .setIn(['form', 'remainingCost'], remaining)
            .setIn(['form', 'paymentsHasError'], hasError)
            .setIn(['form', 'showAddPaymentIcon'], hasError)
            .setIn(['form', 'payments'], paymentsUpd)
}