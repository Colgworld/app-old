import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        width: 45,

        flexDirection: 'row',
        padding: 6,
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',    
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',    
    },
    left: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})
