import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subtitle: {
    color: Colors.midGray
  },
  name: {
    color: Colors.darkPurple,
    fontSize: 18
  }
})
