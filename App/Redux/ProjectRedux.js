import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'underscore'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  
  setActive: ['project', 'key'],
  setActiveProject: ['project', 'key'],
  updateValue: ['path', 'value'],
  setProjectNav: ['nav'],
  setActiveChat: ['thread'],
  onPressMilestone: ['data'],

  getProjectsRequest: ['data'],
  getProjectsSuccess: ['payload'],
  getProjectsFailure: null,

  updateProjectRequest: ['data'],
  updateProjectSuccess: ['payload'],
  updateProjectFailure: null,

  updatePaymentRequest: ['payment'],
  updatePaymentSuccess: ['data'],
  updatePaymentFailure: null,

  sendPaymentRequest: ['data'],
  sendPaymentSuccess: ['payload'],
  sendPaymentFailure: null,  

  createMessageRequest: ['data'],
  createMessageSuccess: ['payload'],
  createMessageFailure: null,

  sendMemberInvitesRequest: ['data'],
  sendMemberInvitesSuccess: ['payload'],
  sendMemberInvitesFailure: null,

  createChangeOrderRequest: ['data'],
  createChangeOrderSuccess: ['payload'],
  createChangeOrderFailure: null,

  updateChangeOrderRequest: ['data'],
  updateChangeOrderSuccess: ['payload'],
  updateChangeOrderFailure: null,

  createFileRequest: ['data'],
  createFileSuccess: ['payload'],
  createFileFailure: null,

  // uploadFileRequest: ['data'],
  uploadFilesSuccess: ['payload'],
  uploadFilesFailure: null,

  linkUserToProjectRequest: ['data'],
  linkUserToProjectSuccess: ['payload'],
  linkUserToProjectFailure: null,

  createTokenRequest: ['data'],
  createTokenSuccess: ['payload'],
  createTokenFailure: null,

  sendFeedbackRequest: ['data'],
  sendFeedbackSuccess: ['payload'],
  sendFeedbackFailure: null,

  getAuthIntegrationTokenRequest: ['data'],
  getAuthIntegrationTokenSuccess: ['payload'],
  getAuthIntegrationTokenFailure: null,

  saveAuthIntegrationTokenRequest: ['data'],
  saveAuthIntegrationTokenSuccess: ['payload'],
  saveAuthIntegrationTokenFailure: null,

  deleteAuthIntegrationTokenRequest: ['data'],
  deleteAuthIntegrationTokenSuccess: ['payload'],
  deleteAuthIntegrationTokenFailure: null,

  saveInviteLinkRequest: ['data'],
  saveInviteLinkSuccess: ['payload'],
  saveInviteLinkFailure: null,

  newMessageThread: ['uuid', 'user'],

  updateValueInValue: ['data'],

  resetProjectData: null,
  resetChangeOrderForm: null,

  memberJoinedSuccess: ['payload'],
  addProject: ['payload']

})

export const ProjectTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaultCO = {
      title: "",
      cost: 0,
      description: "",
      status: "",
      immediate: false
    }

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: null,
  error: null,
  activeProjectKey: null,
  activeProjectID: null,
  nav: 'messages',
  activeChat: null,
  authTokens: {
    google: null,
    dropbox: null,
    dbxState: null
  },
  getProjectsOnSubscribe: false,
  changeOrder: defaultCO
})

/* ------------- Selectors ------------- */

export const ProjectSelectors = {
  getData: state => state.projects.payload,
  getProjectKey: state => state.projects.activeProjectKey,
  getProjectsOnSubscribe: state => state.projects.getProjectsOnSubscribe

}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data })

// successful api lookup
export const success = (state, { payload }) =>
  state.set("payload", null).merge({ fetching: false, error: null, payload })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

export const resetProjectData = state =>
  state.set("payload", null)

export const setActiveProject = (state, { project, key }) =>
  state.merge({ activeProjectKey: key, activeProjectID: project.project.ID })

export const updateValue = (state, { path, value }) =>
  state.setIn(path, value)

export const updateValueInValue = (state, { data }) => {
  return state
}

export const addProject = (state, { payload }) => {
  mutable = Immutable.asMutable(state.payload)
  mutable.push(payload)
  return state.set('payload', mutable)
}

export const setActiveChat = (state, { thread }) =>
  state.set('activeChat', thread)

export const setProjectNav = (state, { nav }) =>
  state.set('nav', nav)

export const createMessageSuccess = (state, { payload }) => {
  let mutable
  if (_.isUndefined(payload.message) && !_.isUndefined(state.payload[state.activeProjectKey].message_threads[payload.thread_id])) {
    mutable = Immutable.asMutable(state.payload[state.activeProjectKey].message_threads[payload.thread_id].messages)
    mutable.unshift(payload)
    if (mutable.size > 50) {
      mutable.delete(mutable.size - 1)
    }
    return state.setIn(['payload', state.activeProjectKey, 'message_threads', payload.thread_id, 'messages'], mutable)
  } else {

    // Create New Message Thread
    return state.setIn(['payload', state.activeProjectKey, 'message_threads'], {
                              ...state.payload[state.activeProjectKey].message_threads,
                              [payload.message.thread_id]: {
                                messages: [payload.message],
                                members: payload.members
                              }                            
                            })
  }



}





export const memberJoinedSuccess = (state, { payload }) => {
  return setValueInProject(state, payload, "members", "")
}

export const updatePaymentByID = (state, { payload }) => {
  var coKey
  state.payload[state.activeProjectKey].changeOrders.map((c, k) => {
    if (c.ID == payload.ID) {
      coKey = k
    }
  })
  return state.setIn(['payload', state.activeProjectKey, 'changeOrders', coKey], payload)
  // return setValueInProject(state, payload, "changeOrders")
}

export const sendPaymentSuccess = (state, { payload }) => {
  var pKey
  state.payload[state.activeProjectKey].payments.map((p, k) => {
    if (p.ID == payload.ID) {
      pKey = k
    }
  })
  return state.setIn(['payload', state.activeProjectKey, 'payments', pKey], payload)
}

export const createFileSuccess = (state, {payload}) => {
  mutable = Immutable.asMutable(state.payload[state.activeProjectKey].files)
  mutable.push(payload)
  return state.setIn(['payload', state.activeProjectKey, 'files'], mutable)
}

export const updatePaymentSuccess = (state, { data }) => {
  var pKey
  state.payload[state.activeProjectKey].payments.map((p, k) => {
    if (p.ID == data.ID) {
      pKey = k
    }
  })
  return state.setIn(['payload', state.activeProjectKey, 'payments', pKey], data)
}




const setValueInProject = (state, payload, projDataKey, itemKey) => {
  var key
  state.payload.map((p, k) => {
    if (p.project.ID == payload.project_id) {
      key = k
    }
  })
  
  if (key) {
    return state.updateIn(['payload', key, projDataKey], list => list.concat(payload.data))
  }
  return state

}

export const updatePaymentFailure = state => {
  return state
}

export const newMessageThread = (state, { uuid, user }) => {
  return state
          .setIn(['payload', state.activeProjectKey, 'message_threads', uuid, 'messages'], [])
          .setIn(['payload', state.activeProjectKey, 'message_threads', uuid, 'members'], user)
          .set('activeChat', uuid)

}

export const getTokenSuccess = (state, { payload }) => {
  return state
}

const getProject = (projects, project_id) => {
  let projKey
  projects.map((p,k) => {
    if (p.project.ID == project_id) {
      projKey = k
    }
  })
  return projKey
}

const getProjectData = (projects, keyToCheck, IDtoCheck) => {
  let key
  projects.map((p,k) => {
    p[keyToCheck].map((d,i) => {
      if (d.ID == IDtoCheck) {
        key = i
      }
    })
  })
  return key
}

export const updateChangeOrderSuccess = (state, { payload }) => {
  let projKey = getProject(state.payload, payload.project_id)
  let coKey = getProjectData(state.payload, "changeOrders", payload.ID)
  let update = false
  return state.updateIn(['payload', projKey, 'changeOrders'], (cos) => {
    cos.map((c,k) => {
      if ((c.project_id == payload.project_id) && (c.ID == payload.ID)) {
        update = true
        coKey = k
      }
    })

    if (update) {
      return cos.set(coKey, payload)
    } else {
      // else add to array
      mutable = Immutable.asMutable(cos)
      mutable.push(payload)
      return mutable
    }
  })
}

export const updateProjectSuccess = (state, { payload }) => {
  let key
  state.payload.map((p,k) => {
    if (p.project.ID == payload.project.ID) {
      key = k
    }
  })
  if (!_.isNull(key)) {
    return state.setIn(['payload', key, 'project'], payload.project)  
  } else {
    return state
  }
  
}

export const resetChangeOrderForm = state =>
  state.set('changeOrder', defaultCO)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_REQUEST]: request,
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.GET_PROJECTS_FAILURE]: failure,
  [Types.RESET_PROJECT_DATA]: resetProjectData,
  [Types.SET_ACTIVE_PROJECT]: setActiveProject,
  [Types.UPDATE_VALUE]: updateValue,
  [Types.CREATE_MESSAGE_SUCCESS]: createMessageSuccess,
  [Types.UPDATE_CHANGE_ORDER_SUCCESS]: updatePaymentByID,
  [Types.SEND_PAYMENT_SUCCESS]: sendPaymentSuccess,
  [Types.CREATE_FILE_SUCCESS]: createFileSuccess,
  [Types.SET_PROJECT_NAV]: setProjectNav,
  [Types.SET_ACTIVE_CHAT]: setActiveChat,
  [Types.UPDATE_PAYMENT_SUCCESS]: updatePaymentSuccess,
  [Types.UPDATE_PAYMENT_FAILURE]: updatePaymentFailure,
  [Types.NEW_MESSAGE_THREAD]: newMessageThread,
  [Types.GET_AUTH_INTEGRATION_TOKEN_SUCCESS]: getTokenSuccess,
  [Types.MEMBER_JOINED_SUCCESS]: memberJoinedSuccess,
  [Types.UPDATE_CHANGE_ORDER_SUCCESS]: updateChangeOrderSuccess,
  [Types.ADD_PROJECT]: addProject,
  [Types.UPDATE_PROJECT_SUCCESS]: updateProjectSuccess,
  [Types.RESET_CHANGE_ORDER_FORM]: resetChangeOrderForm
})
