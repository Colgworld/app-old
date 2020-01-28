import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from 'App/Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'


class LaunchScreen extends Component {

  static navigationOptions = {
    header: null
  }  

  render () {
    return (
      <View style={styles.mainContainer}>
        {/* <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' /> */}
        <View style={styles.container}>
          <View style={styles.centered}>
            {/*<Image source={Images.launch} style={styles.logo} /> */}
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstRoute: state.startup.firstRoute
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: () => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)

