'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity
} from 'react-native';


const {
    HEADER_HEIGHT
} = require("App/Config/Constants")

import Dimensions from "Dimensions"

class KeyboardOptionButton extends Component {

    state = {
        offsetTop: Dimensions.get("window").height,
        opacity: 1
    }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow (e) {

    let newSize = Dimensions.get('window').height - e.endCoordinates.height - this.props.btnHeight - HEADER_HEIGHT

    this.setState({
        offsetTop: newSize  // e.endCoordinates.screenY - this.props.btnHeight // 
    })
    // let newSize = Dimensions.get('window').height - e.endCoordinates.height
    // this.setState({
    //   visibleHeight: newSize,
    //   topLogo: {width: 100, height: 70}
    // })
  }
  
  keyboardDidHide (e) {

    this.setState({
        offsetTop: e.endCoordinates.screenY
    })
    // this.setState({
    //   visibleHeight: Dimensions.get('window').height,
    //   topLogo: {width: Dimensions.get('window').width}
    // })
  }  


  onPress() {
    this.setState({ opacity: 0 })
    this.props.onPress()
  }  

  render() {



    return (
        <TouchableOpacity onPress={this.onPress} style={{ opacity: this.state.opacity}} >
          <View 
                style={{ position: 'absolute', 
                            top: 0, 
                            right: 0, 
                            left: 0, 
                            zIndex: 100, 
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'flex-end',
                            backgroundColor: '#000000',
                            height: this.props.btnHeight }}>

              <Text style={{ color: "#3b7cec" }}>{this.props.btnText}</Text>
          </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

});


export default KeyboardOptionButton;