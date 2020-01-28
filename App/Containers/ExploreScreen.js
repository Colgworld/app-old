import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import Header from 'App/Components/Header'
import Config from 'react-native-config'

import { Grid, Row, Col } from 'react-native-easy-grid'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ExploreScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Metrics from 'App/Themes/Metrics'

class ExploreScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Explore",
    tabBarLabel: "EXPLORE",
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Feather name="search" size={Metrics.tabIconSize} color={tintColor} />
    )
  })


  render () {
    return (
      <Grid style={styles.container}>
        <Row size={15}>
          <Header title={'Explore'} leftIcon={null} titleAlign="left" />
        </Row>
        <Row size={85}>
          <Col>
          <View style={[globalStyles.centerImage, styles.container, {padding: 20}]}>
            <Image style={[globalStyles.image, styles.image, {maxWidth: 100, maxHeight: 100}]} source={require('App/Images/explore_switch.png')} />
            <Text style={styles.text}>We’re flipping the switch on our Explore tab soon. Check back later!</Text>
          </View>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
