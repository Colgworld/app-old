

'use strict'
/**
 * ## Imports
 *
 * Redux  & the config file
 */
import store from 'react-native-simple-store'
import CONFIG from './config'


export class AppGlobalData {





    /* DEVICE DATA */
    setDeviceToken(token) {
        return store.save(CONFIG.DEVTOKEN, token)
            then(() => { return store.get(CONFIG.DEVTOKEN) })
    }

    getDeviceToken() {
        // store.delete(CONFIG.DEVTOKEN)
        return store.get(CONFIG.DEVTOKEN)
    }

    /* END DEVICE DATA */





    /* USER DATA */
    setUser(user) {
        return store.save(CONFIG.USER_KEY, user)
                .then(() => {
                  return store.get(CONFIG.USER_KEY)
                })

    }

    getUser() {
        return store.get(CONFIG.USER_KEY)
    }

    deleteUserData () {
        return store.delete(CONFIG.USER_KEY)
    }
    /* END USER DATA */











    /* ONBOARD DATA */
    setOnboarded(key, o) {
        return store.save(key, o)
                .then(() => {
                    return store.get(key)
                })
    }
    resetOnboarded(key) {
        return store.delete(key)
                .then(() => {
                    return store.get(key)
                })
    }
    getOnboarded(key) {
        return store.get(key)
    }

    setOnboardData(data) {
        return store.save(CONFIG.ONBOARD_KEY, data)
                .then(() => {
                  return store.get(CONFIG.ONBOARD_KEY)
                })
    }

    getOnboardData() {
        return store.get(CONFIG.ONBOARD_KEY)
    }

    deleteOnboardData () {
        return store.delete(CONFIG.ONBOARD_KEY)
    }

        /** Onboarding Tokens **/
    getOnboardedToken () {
        // store.delete(CONFIG.ONBOARDING_KEY)
        return store.get(CONFIG.ONBOARDING_KEY)
    }
    setOnboardedToken () {
        return store.save(CONFIG.ONBOARDING_KEY, {
          onboarded: true,
        }).then(() => {
          return store.get(CONFIG.ONBOARDING_KEY)
        })
    }
    deleteOnboardedToken () {
        return store.delete(CONFIG.ONBOARDING_KEY)
    }
    /* END ONBOARD DATA */





    /**
     * ROUTE DATA
     */
    getRouteData () {
        return store.get(CONFIG.ROUTE_KEY)
    }

    setRouteData (data) {
        return store.save(CONFIG.ROUTE_KEY, data)
            .then(() => {
                return store.get(CONFIG.ROUTE_KEY)
            })
    }

    deleteRouteData () {
        return store.delete(CONFIG.ROUTE_KEY)
    }



    /**
     * PUSH Notification
     */
    getPush () {
        return store.get(CONFIG.PUSH_KEY)
    }
    setPush (v) {
        return store.save(CONFIG.PUSH_KEY, v)
            .then(() => {
                return store.get(CONFIG.PUSH_KEY)
            })
    }


}



export let appGlobalData = new AppGlobalData()
