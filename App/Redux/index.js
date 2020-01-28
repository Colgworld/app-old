/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict'

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas/'
import ReduxPersist from 'App/Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  startup: require('./StartupRedux').reducer,
  auth: null,
  account: require("./AccountRedux").reducer,
  device: require("./DeviceRedux").reducer,
  paymentSources: require("./PaymentSourcesRedux").reducer,
  projects: require("./ProjectRedux").reducer,
  projectWizard: require("./ProjectWizardRedux").reducer,
  onboarding: require("./OnboardingRedux").reducer,
  explore: require("./ExploreRedux").reducer,
  modal: require("./ModalRedux").reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      let nextRootReducer = require('./').reducers
      if (ReduxPersist.active) { 
        const persistConfig = ReduxPersist.storeConfig;
        nextRootReducer = persistReducer(persistConfig, reducers);
      }
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
