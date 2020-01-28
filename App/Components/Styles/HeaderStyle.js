import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexWrap: 'wrap', 
    alignItems: 'flex-end',
    flexDirection:'row',
  },
  headerIcon: {

  },
  title: {
    fontSize: 26,
    color: Colors.darkPurple,
    textAlign: 'left',
    alignSelf: 'stretch',
    fontFamily: "Raleway-Medium",
    fontWeight: '700'
  },
  titleWrap: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch' 
  },
  right: {
    alignItems: 'center',
  }
})
