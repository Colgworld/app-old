import { StyleSheet, PixelRatio } from 'react-native';

const {
  HEADER_HEIGHT,
  HEADER_OFFSET,
} = require('App/Config/Constants')

import Dimensions from "Dimensions"

var x = Dimensions.get('window').width;
var y = Dimensions.get('window').height;

var MULT = PixelRatio.getFontScale()

import Colors from './Colors'


if (x < 350 && y < 650) {
  MULT = .7
}
// var iPad = [768, 1024];
// iphone6s = 375x667

const type = {
  title: 'SourceSansPro-Semibold',
  base: 'HelveticaNeue-Light',
  bold: 'HelveticaNeue-Medium',
  emphasis: 'HelveticaNeue-MediumItalic'
}

const styles = StyleSheet.create({

  half: {
    width: x / 2
  },
  H1: {
    fontSize: 32 * MULT,
    marginTop: 8,
    marginBottom: 18,
    marginLeft: 12,
    fontFamily: type.title,
  },
  H2: {
    fontSize: 28 * MULT,
    marginTop: 10,
    marginBottom: 18,
    fontFamily: type.title,
  },
  H3: {
    fontSize: 18 * MULT,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '400',
    fontFamily: type.title,
  },
  H4: {
    fontSize: 14 * MULT,
    marginBottom: 8,
    marginTop: 5,
    fontFamily: type.title,
  },
  H5: {
    fontSize: 12 * MULT,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: type.title,
  },
  H1Center: {
    fontSize: 22 * MULT,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: type.title,
  },
  inputTitle: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16 * MULT
  },
  bold: {
    fontWeight: '800',
  },
  kindaBold: {
    fontWeight: '400',
  },
  boldTitle: {
    color:"#FFFFFF",
    fontSize: 22 * MULT,
    fontWeight: '800',
    fontFamily: type.bold
  },
  title: {
    marginLeft: 20 * MULT,
    marginRight: 20 * MULT,
    fontSize: 24 * MULT,
    fontFamily: type.bold,
  },
  smallHeaderTitle: {
    textAlign: 'center', 
    fontSize: 16,
    paddingBottom: 2
  },
  smallHeaderContainer: {
    paddingBottom: 10
  },
  helpMessage: {
    color: Colors.green,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.green
  },
  bg: {
    backgroundColor: Colors.white
  },
  purpleImportant: {
    color: Colors.darkPurple,
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 10,
  },
  projectTitle: {
    fontWeight: '400',
    fontSize: 24 * MULT
  },

  error: {
    color: Colors.red
  },

  switch: {
    marginTop: 15,
  },
  switchBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    // borderWidth: 3,
    // borderColor: '#2552a0',
  },
  tag: {
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 10,
    marginBottom: 5
  },

  header: {
    paddingTop: HEADER_OFFSET,
    height: HEADER_HEIGHT,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
  },
  tmpheader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15
  },
  headerShadow: {
    shadowColor: 'rgba(0,0,0,.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.46,
    shadowRadius: 14,    
  },
  iconShadow: {
    shadowColor: 'rgba(135,42,127,.95)',
    shadowOffset: { width: 9, height: 4 },
    shadowOpacity: 0.36,
    shadowRadius: 14,
  },  
  headerLine: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,    
  },
  headerText: {
    fontSize: 20 * MULT,
    marginBottom: 5,
    color: Colors.darkPurple,
    textAlign: 'center',
    fontFamily: type.bold
  },
  headerIcon: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf:'stretch'
  },
  rightIcon: {

  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  headerLeft: {},
  headerRight: {},
  headerMiddle: {
  },

  image: {
    resizeMode: 'contain'
  },

  imageIcon: {
    alignItems: 'center',
    alignSelf: 'stretch',
    maxHeight: 40,
    maxWidth: 40    
  },

  centerImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },  
  centerText: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  centerIcon: {
    alignSelf: 'center'
  },

  centerContentLeft: {
    justifyContent: 'center', 
    alignItems: 'flex-start'
  },
  spacerBottom: {
    marginBottom: 10
  },
  p: {
    fontSize: 14 * MULT,
    lineHeight: 22,
    color: Colors.darkGray,
    fontFamily: 'Open Sans',
    paddingTop: 12,
    paddingBottom: 15,
  },
  emptyStateP: {
    fontSize: 14 * MULT,
    lineHeight: 22,
    color: Colors.darkGray,
    fontFamily: 'Open Sans',
    paddingTop: 12,
  },
  emptyStateBold: {
    fontSize: 14 * MULT,
    lineHeight: 22,
    color: Colors.darkGray,
    fontFamily: 'Open Sans',
    fontWeight: '700',
    paddingBottom: 15,
  },
  finePrint: {
    fontSize: 12 * MULT,
    color: Colors.midGray
  },
  infoMsg: {

  },
  iconButton: {
    borderRadius: 10,
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  date: {
    textAlign: 'center',
    padding: 10
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    padding: 10,
  },
  emptyContent: {
    padding: 25,
  },
  textContent: {
    borderColor: '#D7D6D7',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  topOffset: {
    paddingTop: 30    
  },

  alert: {
    padding: 10,
    backgroundColor: 'rgba(255,0,0,.5)',
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  // button: {
  //   marginTop: 13,
  //   marginBottom: 8,
  //   backgroundColor: "#3b7cec",
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   borderWidth: 0.5,
  //   borderColor: '#ebebeb',
  //   paddingTop: 14,
  //   paddingBottom: 14,
  //   paddingLeft: 18,
  //   paddingRight: 18,
  // },
  button: {
    backgroundColor: Colors.darkPurple,
    borderColor: Colors.darkPurple,
    borderRadius: 30,
    marginBottom: 12,
    height: 40 * MULT,
  },
  invButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.darkPurple,
    borderRadius: 30,
    marginBottom: 12,
    height: 40 * MULT,
  },
  greenButton: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
    borderRadius: 30,
    marginBottom: 12,
    height: 40 * MULT,
  },
  redButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.red,
    borderRadius: 30,
    marginBottom: 12,
    height: 40 * MULT,
  },
  lightMidGrayButton: {
    backgroundColor: Colors.lightMidGray,
    borderColor: Colors.lightMidGray,
    borderRadius: 30,
    marginBottom: 12,
    height: 40 * MULT,
  },
  disabledButton: {
    backgroundColor: Colors.midGray,

  }, 
  whiteText: {
    color: '#FFFFFF',
  },
  textCenter: {
    textAlign: "center",
  },

  roundedThirty: {
    borderRadius: 30,
  },

  inverseButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.darkPurple,
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    paddingRight: 18,

  },
  FBButton: {
    backgroundColor: '#4469b0',
    borderRadius: 30,
    marginBottom: 7,
    height: 40 * MULT,
  },
  FBButtonOn: {
    backgroundColor: '#304878',
    borderRadius: 30,
    marginBottom: 12,
    height: 40 * MULT,
  },
  thicc: {
    fontWeight: '600',
    fontSize: 18
  },
  text: {
    // color:"#FFFFFF",
    fontFamily: 'Open Sans',
    fontSize: 10 * MULT,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: '500',
    fontSize: 17 * MULT,
    fontFamily: type.title,
  },
  FBText: {
    color: "#FFFFFF",
    fontWeight: '500',
    fontSize: 18 * MULT
  },

  payment: {


    // backgroundColor: "rgba(210, 223, 242, .5)",
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1,
    // borderTopColor: "#ebebeb",
    // borderTopWidth: 1
  },
  paymentInner: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  paymentListItem: {
    justifyContent: "space-between",
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 8 * MULT
  },
  paymentLine: {
    borderWidth: 0.5,
    borderColor: '#ebebeb',
    marginTop: 5,
    marginBottom: 15,
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.blue,
    marginBottom: 10,
  },
  alignBottom: {
    alignItems: 'flex-end',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5
  },
  activeListItem: {
    backgroundColor: Colors.green
  },

  blue: {
    color: Colors.blue
  },
  darkBlue: {
    color: Colors.darkPurple
  },
  darkPurple: {
    color: Colors.darkPurple
  },
  white: { color: "#FFFFFF" },
  red: {color: Colors.red},
  lightGray: { color: Colors.lightGray},
  darkGray: { color: Colors.darkGray},
  midGray: { color: Colors.midGray },
  link: {
    color: Colors.darkPurple
  },
  name: {
    marginRight: 5,
    marginTop: 3,
    fontSize: 16 * MULT,
    color: Colors.darkPurple,
    backgroundColor: 'rgba(0,0,0,0)'
  },

  source: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: "column",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: "#ebebeb",
    marginBottom: 5
  },


  input: {
    fontSize: 14 * MULT,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 11,
    marginBottom: 10,
    color: Colors.darkPurple,
    lineHeight: 18 * MULT,
    backgroundColor: 'rgba(0,0,0,0)',
    height: 'auto',
    fontFamily: 'Open Sans',
    minWidth: 20,
    alignSelf: "stretch" // or stretch
  },
  inputBorderRound: {
    borderRadius: 10,
    borderColor: Colors.blue,
    borderWidth: 1
  },

  borderGray: {
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: "#FFFFFF",
    // minHeight: 40,
  },
  inputWrap: {
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    // borderBottomColor: Colors.lightGray,
    // backgroundColor: 'rgba(80,80,80,.07)',
    // backgroundColor: Colors.lightGray,
    height: 'auto',
    // borderBottomWidth: 1,
    borderRadius: 0,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color:"#FFFFFF",
  },

  label: {
    fontSize: 12 * MULT,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#3b7cec",
  },

  inline: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  inlineCenter: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },  
  center: {
    textAlign: 'center'
  },

  fileButton: {
    borderRightWidth:.5, 
    borderRightColor: '#bbbbbb', 
    marginRight: 10
  },
  fileButtonImage: {
    height: 60, 
    resizeMode: 'contain', 
    width: 60
  },
  fileButtonText: {
    fontWeight:'500',
    color:"#777777",
    fontSize:14
  },
  fileList: {
    paddingBottom: 4,
    paddingTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb"
  },


  EMPTYSPACE: {
    height: 220
  },

  lottie: {
    width: 200,
    height: 200,
  },

  listItemTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '800',
    color: Colors.darkGray
  },
  listItemummary: {
    fontSize: 12,
    color: Colors.darkGray
  },

});

module.exports = styles
