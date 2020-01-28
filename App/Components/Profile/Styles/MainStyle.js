import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50
  },
  listItem: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25
  }
})
