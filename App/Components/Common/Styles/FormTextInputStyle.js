import { StyleSheet } from 'react-native'
import Colors from 'App/Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    marginBottom: 9,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
    alignSelf: 'stretch',
    minHeight: 55,
  },
  indent: {
    paddingLeft: 30,
    marginTop: 5
  },
  title: {
    marginBottom: 8,
    color: Colors.formTitle,
    fontWeight: '700'
  },
  input: {
    padding: 6,
    color: Colors.darkPurple
  },
  leftIconStyle: {
    position: 'absolute',
    bottom: 9,
    left: 20
  }
})
