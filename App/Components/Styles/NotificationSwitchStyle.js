import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    maxHeight: 80
  },
  row: {
    marginBottom: 9,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
    alignSelf: 'stretch',
  },
  indent: {
    marginTop: 5
  },
  title: {
    marginBottom: 10,
    color: Colors.formTitle,
    fontWeight: '700',
    fontSize: 15,
  },
  description: {
  	marginBottom: 8,
    color: Colors.formTitle,
    fontWeight: '500',
    fontSize: 12
  },
  input: {
    padding: 6,
    color: Colors.darkPurple,
  },
  switchAlignment: {
  	alignSelf: 'flex-end',
  	margin: 15,
  },
})
