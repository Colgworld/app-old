import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  buttonWrap: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
    maxHeight: 75
  },
  title: {
    fontWeight: '700',
    paddingBottom: 5
  },
  p: {
    fontSize: 12
  },
  imageWrap: {
  },
  image: {
    maxWidth: 50,
    maxHeight: 50
  }
})
