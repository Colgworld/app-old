/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import ProjectActions, { ProjectSelectors } from '../Redux/ProjectRedux'
import OnboardingActions from '../Redux/OnboardingRedux'
import ProjectWizardActions, { ProjectWizardSelectors } from '../Redux/ProjectWizardRedux'
import { AccountSelectors } from 'App/Redux/AccountRedux'
import PaymentSourcesActions, { PaymentSourcesSelectors } from 'App/Redux/PaymentSourcesRedux'


import { NavigationActions } from 'react-navigation'

const {
  PENDING,
  WORKING,
  REQUESTED,
  SUCCEEDED,
  PRO,
  HOMEOWNER
} = require('App/Config/Constants').default

import FixtureAPI from 'App/Services/FixtureApi'
import API from 'App/Services/API'
import DebugConfig from 'App/Config/DebugConfig'
import _ from 'underscore'

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const getData = ProjectSelectors.getData

export function * createProject (action) {
  const { data } = action
  if (!_.isNull(data.image)) {
    const file = yield uploadImageFile(data.image.image)
    let p = {...data.project, attachment: file}
    data.project = p
  }
  const response = yield call(api.createProject, data)
  if (response.ok) {
    yield put(ProjectWizardActions.resetProjectWizard())
    yield put(ProjectActions.addProject(response.data))
    existProjects = yield select(getData)
    yield put(ProjectActions.setActiveProject(response.data, existProjects.length - 1))
    yield put(NavigationActions.navigate({ routeName: "ProjectDashboardScreen" }))
  } else {
    yield put(ProjectWizardActions.createProjectFailure())
  }
}

export function * updateProject (action) {
  const { data } = action
  const response = yield call(api.updateProject, data)
  if (response.ok) {
    yield put(ProjectActions.updateProjectSuccess(response.data))
    yield put(ProjectWizardActions.resetProjectWizard())
  } else {
    yield put(ProjectActions.updateProjectFailure())
  }
}

export function * getProjects (action) {
  const { data } = action
  const response = yield call(api.getProjects, data)
  if (response.ok) {
    if (!_.isNull(response.data)) {
      if (!_.isUndefined(response.data.message)) {

        // route response message
        switch(response.data.message) {
          case API.SESSION_INVALID:
            yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }))
            break
        }

      }
    }
    yield put(ProjectActions.getProjectsSuccess(response.data))
  } else {
    // yield put(MessageActions.setMessage(""))
    yield put(ProjectActions.getProjectsFailure())
  }
}

export function * getPaymentSources (action) {
  const response = yield call(api.getPaymentSources)
  if (response.ok) {
    yield put(PaymentSourcesActions.getPaymentSourcesSuccess(response.data))
  } else {
    yield put(PaymentSourcesActions.getPaymentSourcesFailure())
  }
}

export function * createPaymentSource (action) {
  const { data } = action
  const response = yield call(api.createPaymentSource, data)
  if (response.ok) {
    yield put(PaymentSourcesActions.createPaymentSourceSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: "ProfileScreen" }))
  } else {
    yield put(PaymentSourcesActions.createPaymentSourceFailure())
  }  
}

export function * deletePaymentSource (action) {
  const { data } = action
  const response = yield call(api.deletePaymentSource, data)
  if (response.ok) {
    yield put(PaymentSourcesActions.deletePaymentSourceSuccess(response.data))
  } else {
    yield put(PaymentSourcesActions.deletePaymentSourceFailure())
  }
}

export function * sendPayment (action) {
  const { data } = action
  const response = yield call(api.sendPayment, data)
  if (response.ok) {
    yield put(ProjectActions.sendPaymentSuccess(response.data))
  } else {
    yield put(ProjectActions.sendPaymentFailure(data))
  }
}

export function * createMessage (action) {
  const { data } = action

  // for creating message after successful file upload
  const doMessage = function* (file) {
    if (!_.isUndefined(file)) {
      data.message['file'] = file
    }

    const responseM = yield call(api.createMessage, data.message)
    if (responseM.ok) {
      yield put(ProjectActions.createMessageSuccess(responseM.data))
    } else {
      yield put(ProjectActions.createMessageFailure())
    }    
  }


  if (!_.isUndefined(data.image)) {
    const response = yield call(api.uploadFile, data.image)
    if (response.ok) {
      yield doMessage(response.data)
    } else {
      yield put(ProjectActions.uploadFilesFailure())
    }
  } else {
    yield doMessage()
  }
}

export function * sendMemberInvite (action) {
  const { data } = action
  const response = yield call(api.sendMemberInvite, data)
  if (response.ok) {
    yield put(ProjectActions.sendMemberInvitesSuccess(response.data))
  } else {
    yield put(ProjectActions.sendMemberInvitesFailure(data))
  }
}

export function * createChangeOrder (action) {
  const { data } = action
  const response = yield call(api.createChangeOrder, data)
  if (response.ok) {
    yield put(ProjectActions.createChangeOrderSuccess(response.data))
    yield put(ProjectActions.getProjectsRequest())
  } else {
    yield put(ProjectActions.createChangeOrderFailure(data))
  }
}

export function * updateChangeOrder (action) {
  const { data } = action
  const response = yield call(api.updateChangeOrder, data)
  if (response.ok) {
    yield put(ProjectActions.updateChangeOrderSuccess(response.data))
  } else {
    yield put(ProjectActions.updateChangeOrderFailure(data))
  }
}

function * doFile (data) {
  const file = yield call(api.createFile, data)
  if (file.ok) {
    yield put(ProjectActions.createFileSuccess(file.data))
  } else {
    yield put(ProjectActions.createFileFailure())
  }    
}

function * uploadImageFile (image) {
  const response = yield call(api.uploadFile, image)
  if (response.ok) {
    return response.data
  } else {
    yield put(ProjectActions.uploadFilesFailure())
  }  
}

export function * createFile (action) {
  const { data } = action
  if (!_.isUndefined(data.image)) {
    yield uploadImageFile(data.image)
  } 
  yield doFile(data)
}

export function * linkUserToProject (action) {
  const { data } = action
  const response = yield call(api.linkUserToProject, data)
  if (response.ok) {
    // @ TODO does nothing atm
    // yield put(OnboardingActions.linkUserToProjectSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: "ProjectListScreen" }))
    yield put(ProjectActions.getProjectsRequest())
  } else {
    yield put(OnboardingActions.linkUserToProjectFailure())
    yield put(NavigationActions.navigate({ routeName: "LoginScreen" }))
  }
}

export function * sendFeedback (action) {
  const { data } = action
  const response = yield call(api.sendFeedback, data)
  if (response.ok) {
    yield put(ProjectActions.sendFeedbackSuccess(response.data))
  } else {
    yield put(ProjectActions.sendFeedbackFailure(data))
  }
}

export function * createToken (action) {
  const { data } = action
  if (data.token != "") {
    const response = yield call(api.createToken, data)
    if (response.ok) {
      // yield put(ProjectActions.createTokenSuccess(response.data))
      yield put(ProjectActions.updateValue(['authTokens', response.data.type], response.data.token))
    } else {

    }
  }
}

export function * getToken (action) {
  const { data } = action
  const response = yield call(api.getToken, data)
  if (response.ok) {
    for (type in response.data) {
      yield put(ProjectActions.updateValue(['authTokens', type], response.data[type]))
    }
  } else {
  }
}


/**
 * 
 * Invites
 */
export function * sendInviteBySMS (action) {
  const { data } = action
  const response = yield call(api.sendInviteBySMS, data)
  if (response.ok) {
    yield put(ProjectWizardActions.sendInviteBySMSSuccess())
  } else {
    yield put(ProjectWizardActions.sendInviteBySMSFailure())
  }
}


export function * saveInviteLink (action) {
  const { data } = action
  const response = yield call(api.saveInviteLink, data)
  if (response.ok) {
  } else {
  }
}
/**
 * End Invites
 */



export function * setActive (action) {
  const { project, key } = action
  yield put(ProjectActions.setActiveProject(project, key))
  yield put(NavigationActions.navigate({ routeName: "ProjectDashboardScreen" }))
}



export function * onPressMilestone (action) {
  const { data } = action
  let is_requesting_payment = false

  let status = WORKING
  switch(data.status) {
    case "":
    case PENDING:
      status = WORKING
      break
    case WORKING:
      let is_zero_payment = (data.amount == 0) ? true : false
      status = (!is_zero_payment) ? REQUESTED : SUCCEEDED
      is_requesting_payment = (!is_zero_payment) ? true : false
      break
    case REQUESTED:
      status = SUCCEEDED
      break
  }

  isVerified = yield checkPaymentSourceVerified(is_requesting_payment)
  if (isVerified || status == WORKING) {
    var d = data.asMutable()
    d.status = status    
    const response = yield call(api.updatePayment, d)
    if (response.ok) {
      yield put(ProjectActions.updatePaymentSuccess(response.data))
    } else {
      yield put(ProjectActions.updatePaymentFailure())
    } 
  }
}

function * checkPaymentSourceVerified (is_requesting_payment = false) {
  paymentSources = yield select(PaymentSourcesSelectors.getPaymentSourceData)
  account = yield select(AccountSelectors.getUserData)
  isVerified = false

  hasVerifiedCC = false
  if (!_.isNull(paymentSources.creditCards)) {
    for (var i = paymentSources.creditCards.length - 1; i >= 0; i--) {   
      if (paymentSources.creditCards[i].verified) {
        hasVerifiedCC = true
      }
    }  
  } 
  hasVerifiedBA = false
  if (!_.isNull(paymentSources.bankAccounts)) {
    for (var i = paymentSources.bankAccounts.length - 1; i >= 0; i--) {
      if (paymentSources.bankAccounts[i].verified) {
        hasVerifiedBA = true
      }
    }  
  }

  switch (account.profile.type) {
    case PRO:
      isVerified = (hasVerifiedBA) ? true : false
      break;
    case HOMEOWNER:
      isVerified = (hasVerifiedBA || hasVerifiedCC) ? true : false
      break
  }

  if (!isVerified && is_requesting_payment) {
      yield put(NavigationActions.navigate({ routeName: "AddPaymentMethodScreen" }))
  }
  return isVerified
}



