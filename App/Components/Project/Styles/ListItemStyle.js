import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
  },
  btnStyle: {
    flexDirection: 'column',
    paddingTop: 5,
    flex: 1
  },
  innerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    minHeight: 55,
    maxHeight: 55,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '800',
    color: Colors.darkGray
  },
  bigTitle: {
    fontSize: 20,
    marginTop: 12,
    marginLeft: 6
  },
  summary: {
    fontSize: 12,
    color: Colors.darkGray
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 60
  },
  image: {
    alignItems: 'center',
    alignSelf: 'stretch',
    maxHeight: 40,
    maxWidth: 40
  },
  dateWrap: {
    alignItems: 'flex-end' 
  },
  rightText: {
    right: 10,
    fontSize: 12
  }
})
