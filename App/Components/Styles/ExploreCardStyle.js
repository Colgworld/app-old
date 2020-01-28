import { StyleSheet, Dimensions } from 'react-native'
import AppConfig from 'App/Config/AppConfig'

const br = 10 

export default StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    borderRadius: br,
    height: 200,
    width: Dimensions.get("window").width - AppConfig.carouselPadding,
    marginBottom: 10
  },
  image: {
    alignSelf: "stretch", 
    height: 200, 
    width: Dimensions.get("window").width - AppConfig.carouselPadding,
    resizeMode: 'stretch',
    borderRadius: br
  },
  twoThirds: {
    width: Dimensions.get("window").width / 3 * 2
  },
  textWrap: {
    position: 'absolute',
    bottom: 0,
    padding: 10
  },
  title: {
    fontWeight: '800',
    color: 'white',
    zIndex: 10,
    marginBottom: 10
  },
  desc: {
    fontWeight: '300',
    color: 'white',
    fontStyle: 'italic',
  },
  via: {
    position: 'absolute',
    fontWeight: '600',
    fontSize: 12,
    top: 10,
    right: 15,
    color: 'white',
    fontStyle: 'italic'
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    borderRadius: br,
    height: 200,
    width: Dimensions.get("window").width - AppConfig.carouselPadding,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.65
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
