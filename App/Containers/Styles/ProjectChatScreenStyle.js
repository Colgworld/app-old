import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    fontSize: 20,
    textAlign: 'center' 
  },
  imagePreview: { 
    padding: 10, 
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderWidth: 1
  },
  imgPreviewCloseBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.midGray,
    borderWidth:1
  },
  imgPrevContainer: {
    position:'absolute',
    left:3,
    top:3,
    zIndex:10
  },
  imgPrevIcon: {
    color:Colors.midGray
  }

})
