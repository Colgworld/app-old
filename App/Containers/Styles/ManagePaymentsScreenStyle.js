import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  payment: {
    borderColor: Colors.darkPurple, 
    borderWidth:1, 
    borderRadius:15, 
    paddingTop:10, 
    paddingBottom:10, 
    marginBottom:10
  },
  
})
