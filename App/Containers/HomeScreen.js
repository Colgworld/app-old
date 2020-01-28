import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import Header from 'App/Components/Header'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { Grid, Row, Col } from 'react-native-easy-grid'
// Styles
import styles from './Styles/HomeScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Metrics from 'App/Themes/Metrics'

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    tabBarLabel: "HOME",
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Feather name="home" size={Metrics.tabIconSize} color={tintColor} />
    )
  })

  render () {
    return (
      <Grid style={styles.container}>
        <Row size={15}>
          <Header title={'Home'} leftIcon={null} titleAlign="left" />
        </Row>
        <Row size={85}>
          <Col>
          <View style={[globalStyles.centerImage, styles.container, {padding: 20}]}>
            <Image style={[globalStyles.image, styles.image, {maxWidth: 100, maxHeight: 100}]} source={require('App/Images/home_flag.png')} />
            <Text style={styles.text}>You have no new notifications</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
