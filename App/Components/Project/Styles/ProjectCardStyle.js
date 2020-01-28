import { StyleSheet, Dimensions } from 'react-native'
import AppConfig from 'App/Config/AppConfig'

const br = 3

export default StyleSheet.create({
  container: {
    marginBottom: 15, 
    borderRadius: br
  },
  image: {
    alignSelf:"stretch", 
    height: 200, 
    width: Dimensions.get("window").width - AppConfig.carouselPadding,
    resizeMode: 'stretch',
    borderRadius: br
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: br,
    height: 100,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
})
