import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  navigation: {
    marginTop: 10
  },
  closeIcon: {
    position: 'absolute',
    top:30,
    right:0,
    zIndex: 11    
  },
  navWrap: {
    paddingTop: 10,
    paddingBottom: 0,
    height: 50,
    maxHeight: 50
  },
  navItem: {
    borderColor: Colors.lightGray,
    height: 35,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 7,
    borderWidth: 2,
    marginLeft: 10,
    minWidth: 100
  },
  navItemtext: {
    marginTop: 5,
    marginBottom: 5,
  },
  activeNav: {
    borderColor: Colors.red
  },
  activeNavText: {
    color: Colors.red
  },  
  activeTitle: {
    color: Colors.red,
  },  
  title: {
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 10,
    fontWeight: '600',
    fontFamily: "Raleway-Medium",
  },
  sliderContentContainer: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 10
  } 
})
