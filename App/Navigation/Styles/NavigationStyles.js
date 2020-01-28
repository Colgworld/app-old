import { StyleSheet } from 'react-native'
import { Colors } from 'App/Themes/'


export default StyleSheet.create({
  	header: {
		backgroundColor: Colors.white,
		height: 60
  	},
	headerTitle: {
		color: Colors.darkPurple,
		fontSize: 25,
		fontWeight: "500",
		textAlign: 'left',
	},
	label: {
      fontSize: 10,
    },
    icon: {
      height: 20,
      marginTop: 10,
      marginBottom: 5
    },
    activeLabel: {
    	color: Colors.red
    }
})
