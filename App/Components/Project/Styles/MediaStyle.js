import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
		flex: 1,
        
    },
    gridPad: {
    	padding: 15,

    },
    gridItem: {
    	backgroundColor: 'black',
    	height: 200, 
    	width: 150, 
    	borderRadius: 15,
    }
})
