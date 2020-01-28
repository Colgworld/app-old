import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  disabledBtn: {
    backgroundColor: Colors.midGray
  },
  enabledBtn: {
    backgroundColor: Colors.darkPurple
  }
})
