import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, 
    borderTopWidth: 1, 
    borderTopColor: Colors.offWhite, 
    paddingTop: 5,
    paddingBottom: 15
  },
  sendContainer: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sendText: {
    color: Colors.red,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  composer: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 20,
    paddingLeft: 10,
  }
})
