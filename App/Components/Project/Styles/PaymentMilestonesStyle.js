import { StyleSheet } from 'react-native'

// import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  iconTextWrap: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    fontWeight: '500', 
    textAlign: 'center', 
    padding: 6
  },
  iconTextBubble: {
    borderRadius:30/2,
    width: 30,
    maxWidth: 30,
    height: 30
  },

})
