import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')
const navBarHeight = (Platform.OS === 'ios') ? 64 : 54
const headerHeight = 85
export const carouselPadding = 60

// Used via Metrics.baseMargin
const metrics = {
  windowWidth: width,
  windowHeight: height,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: navBarHeight,
  headerHeight: headerHeight,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 168
  },
  tabIconSize: 25,
  projectCardWidth: width - carouselPadding,
  profileHeight: height - (navBarHeight + headerHeight),
}

export default metrics
