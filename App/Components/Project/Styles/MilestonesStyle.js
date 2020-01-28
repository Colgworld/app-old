import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  badgeWrap: {
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 5,
    paddingBottom: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  workWrap: {
    backgroundColor: Colors.lightGray
  },
  reqWrap: {
    backgroundColor: Colors.orange
  },
  working: {
    color: Colors.darkGray
  },
  requested: {
    color: Colors.white
  },
  badge: {
    fontSize: 12,
    textAlign: 'center'    
  }
})
