import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 25,
    bottom: 50,
    zIndex: 20
  },
  button: { 
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 40,
    height: 40,
    backgroundColor: Colors.red,
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,.4)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 1,
    shadowOpacity: .65,
    zIndex: 20,
  }
})
