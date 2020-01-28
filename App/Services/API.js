// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Config from 'react-native-config'

const api = apisauce.create({
  baseURL: Config.API_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 120000
})

const fbapi = apisauce.create({
  baseURL: 'https://graph.facebook.com'
})

// our "constructor"
const create = () => {

  // account
  const login = (user, pass) => api.post('/account/login', {email: user, password: pass})
  const logout = () => api.post('/account/logout')
  const register = (user) => api.post('/account/register', user)
  const getUser = (email) => api.get('/account/user?email='+email, null, {
    headers: {
      [Config.GET_USER_HEADER]: email
    }
  })
  const forgotPassword = (email) => api.post('/account/forgot', email, {
      headers: {
        [Config.FORGOT_PASSWORD_HEADER]: Config.FORGOT_PASSWORD_SECRET
      }
    })
  const verifyForgotPWToken = (data) => api.post('/account/forgot-verify', data, {
      headers: {
        [Config.FORGOT_PASSWORD_HEADER]: Config.FORGOT_PASSWORD_SECRET
      }
    })
  const resetPassword = (data) => api.post('/account/reset-password', data, {
      headers: {
        [Config.FORGOT_PASSWORD_HEADER]: Config.FORGOT_PASSWORD_SECRET
      }
    })  
  const getProfile = () => api.get('/api/profile')
  const updateProfile = (data) => api.put('/api/profile', data)
  const updatePreferences = (data) => api.put('/api/preferences', data)

  const verifyPaymentSource = (data) => api.post('/api/stripe/verify-microdeposits', data)

  // project
  const createProject = (data) => api.post('/api/project', data)
  const updateProject = (data) => api.put('/api/project', data)
  const getProjects = () => api.get('/api/projects')
  const updatePayment = (data) => api.put('/api/payment', data)
  const getPaymentSources = () => api.get('/api/payment-sources')
  const createPaymentSource = (data) => api.post('/api/payment-source', data)
  const deletePaymentSource = (id) => api.delete('/api/payment-source', id)
  const sendPayment = (data) => api.post('/api/sendpayment', data)
  const createMessage = (data) => api.post('/api/message', data)
  const uploadFile = (data) => api.post('/api/upload-file', data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=------------------------753cc99bf150c7e2'
    } 
  })
  const sendMemberInvite = (data) => api.post('/api/invite', data)
  const createChangeOrder = (data) => api.post('/api/changeorder', data)
  const updateChangeOrder = (data) => api.put('/api/changeorder', data)
  const createFile = (data) => api.post('/api/file', data)
  const linkUserToProject = (data) => api.post('/api/join', data)
  const saveInviteLink = (data) => api.post('/api/saveInviteLink', data)

  // device
  const createDevice = (data) => api.post('/api/device', data)
  const getDevices = () => api.get('/api/devices')

  const sendFeedback = (data) => api.post('/api/feedback', data)
  const createToken = (data) => api.post('/api/token', data)
  const getToken = () => api.get('/api/tokens')

  // explore
  const getExplore = (data) => api.get('/api/explore')

  // centrifugo
  const getWsData = () => api.get('/api/wstoken')

  const getFacebookData = (token) => fbapi.get('/v2.5/me?fields=email,name,first_name,last_name,picture&access_token='+token)

  return {
    // a list of the API functions from step 2
    login,
    logout,
    register,
    getUser,
    forgotPassword,
    verifyForgotPWToken,
    resetPassword,
    getProfile,
    updateProfile,
    updatePreferences,
    getFacebookData,

    verifyPaymentSource,

    getProjects,
    createProject,
    updateProject,
    updatePayment,
    getPaymentSources,
    createPaymentSource,
    deletePaymentSource,
    sendPayment,
    createMessage,
    uploadFile,
    sendMemberInvite,
    createChangeOrder,
    updateChangeOrder,
    createFile,
    linkUserToProject,
    saveInviteLink,

    createDevice,
    getDevices,

    sendFeedback,
    createToken,
    getToken, 

    getWsData,
    
    getExplore
  }
}

const setAuthHeader = (session_key) => {
  api.setHeader(Config.SESSION_HEADER, session_key)
}

const setMultipart = () => {
  api.setHeader('Content-Type': 'multipart/form-data')
}

const setBaseURL = (url = Config.TEST_API_URL) => {
  api.setBaseURL(url)
}

// API responses
export const SESSION_INVALID = "SessionInvalid"

// let's return back our create method as the default.
export default {
  create,
  setAuthHeader,
  setMultipart,

  SESSION_INVALID
}
