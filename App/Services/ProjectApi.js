// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (session_key) => {

  const api = apisauce.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'X-Blue-Cheese-Fist': session_key
    },
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getProjects = () => api.get('/api/projects')
  const setPayment = (data) => api.put('/api/payment', data)
  const createPayments = (data) => api.post('/api/payment', data)
  const addPaymentSource = (data) => api.post('/api/paymentsource', data)
  const deletePaymentSource = (id) => api.post('/api/paymentsource', id)
  const sendPayment = (data) => api.post('/api/sendpayment', data)
  const createMessage = (data) => api.post('/api/message', data)
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getProjects,
    setPayment,
    createPayments,
    addPaymentSource,
    deletePaymentSource,
    sendPayment,
    createMessage
  }
}

// let's return back our create method as the default.
export default {
  create
}
