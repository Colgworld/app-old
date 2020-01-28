import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10
  },
  label: {
    lineHeight: 40,
    marginLeft: 5,
    marginRight: 5,
  }
})
