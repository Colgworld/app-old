import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    marginTop: 0, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    backgroundColor: 'white', 
    paddingTop: 15, 
    paddingBottom: 15, 
    borderRadius: 15    
  },
  headerWrap: {
    paddingLeft:15,
    paddingTop:0
  },
  image: {
    alignSelf:"stretch", 
    height: 250, 
    width: 'auto', 
    resizeMode: 'contain'
  },
  address: {
    color: Colors.orange, 
    fontSize: 12, 
    fontWeight: '300'
  }
})
