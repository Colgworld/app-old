import React, { Component } from 'react'
import { Image, View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import Header from 'App/Components/Header'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Grid, Row, Col } from 'react-native-easy-grid'

// Styles
import styles from './Styles/FavoritesScreenStyle'
import Metrics from 'App/Themes/Metrics'
import globalStyles from 'App/Themes/GlobalStyles'


class FavoritesScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Favorites",
    tabBarLabel: "FAVORITES",
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Feather name="heart" size={Metrics.tabIconSize} color={tintColor} />
    )
  })

  render () {
    return (
      <Grid style={styles.container}>
        <Row size={15}>
          <Header title={'Favorites'} leftIcon={null} titleAlign="left" />
        </Row>
        <Row size={85}>
          <Col>
          <View style={[globalStyles.centerImage, styles.container, {padding: 20}]}>
            <Image style={[globalStyles.image, styles.image, {maxWidth: 100, maxHeight: 100}]} source={require('App/Images/favorites_box.png')} />
            <Text style={styles.text}>Easily keep a collection of your best work. You'll see favorited photos appear here.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)
