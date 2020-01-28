import 'App/Config'
import DebugConfig from 'App/Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from 'App/Redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
import Config from 'react-native-config'

// create our store
const store = createStore()
const persistor = persistStore(store)

/**
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    // Disable PersistGate if in develop mode
    let Root =  (Config.DEVELOP) ? <RootContainer /> : <PersistGate loading={null} persistor={persistor}>
                                                          <RootContainer />
                                                      </PersistGate>   
    return (
    <Provider store={store}>
      {Root}   
    </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App