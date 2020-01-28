import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    paddingRight:40,
    paddingLeft:40, 
    textAlign: 'center',
    lineHeight: 20
  },
  listWrap: {
    marginTop: 10, 
    borderTopWidth: 1, 
    borderTopColor: Colors.lightGray
  }
})
