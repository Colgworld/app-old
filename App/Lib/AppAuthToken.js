/**
 * # AppAuthToken.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 * Singleton module see https://k94n.com/es6-modules-single-instance-pattern
 */
'use strict'
/**
 * ## Imports
 *
 * Redux  & the config file
 */
import store from 'react-native-simple-store'
import CONFIG from './config'

export class AppAuthToken {
  /**
   * ## AppAuthToken
   *
   * set the key from the config
   */
  constructor () {
    this.SESSION_TOKEN_KEY = CONFIG.SESSION_TOKEN_KEY
    this.USER_ID_KEY = CONFIG.USER_ID_KEY
  }



  /**
   * ### storeSessionToken
   * Store the session key
   */
  storeSessionToken (token) {
    return store.save(this.SESSION_TOKEN_KEY, {
      sessionToken: token
    })
  }

  getUserID() {
    return store.get(this.USER_ID_KEY)
  }

  storeUserID(user_id) {
    return store.save(this.USER_ID_KEY, {
      user_id: user_id
    })
  }

  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */

  getSessionToken (sessionToken) {


    if (sessionToken) {

      return store.save(this.SESSION_TOKEN_KEY, {
        sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_KEY)
      })
    }
    return store.get(this.SESSION_TOKEN_KEY)
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken () {

    return store.delete(this.SESSION_TOKEN_KEY)
  }



  getAuthIntegrationToken(type) {
    return store.get(type)
  }

  setAuthIntegrationToken(type, token) {
    return store.save(type, token)
  }

  deleteAuthIntegrationToken(type) {
    return store.delete(type)
  }



}
// The singleton variable
export let appAuthToken = new AppAuthToken()
