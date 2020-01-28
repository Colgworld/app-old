import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from 'App/Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  }
})
