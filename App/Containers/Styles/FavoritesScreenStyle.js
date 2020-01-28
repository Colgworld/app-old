import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  image: {
    marginBottom: 15
  },
  text: {
  	paddingRight:15,
  	paddingLeft:15, 
    textAlign: 'center'
  }
})
