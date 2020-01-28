import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  helpText: {
    color: Colors.midGray,
    lineHeight: 20,
    fontSize: 16
  },
  helpTextWrap: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginBottom: 12,
    justifyContent: 'center'
  }
})
