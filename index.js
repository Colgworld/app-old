import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
  'RCTBridge required dispatch_sync',
  'Required dispatch_sync',
  'Warning: isMounted',
  'Module',
]);

import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'

AppRegistry.registerComponent('Workspace', () => App)
