import immutablePersistenceTransform from 'App/Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'
import Config from 'react-native-config'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: (Config.DEVELOP) ? false : true,
  reducerVersion: '1.1',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    blacklist: [
      'startup', 
      'nav', 
      'projectWizard', 
      'paymentSources', 
      'onboarding', 
      'modal'
    ], // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
