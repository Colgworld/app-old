import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'

// Styles
import styles from './Styles/MainStyle'
import globalStyles from 'App/Themes/GlobalStyles'

import ListButton from 'App/Components/Common/ListButton'

const { PRO, HOMEOWNER, OPTIONS, NOTIFICATIONS, PAYMENTS, INVITE, FEEDBACK, ACCOUNT, LOGOUT } = require('App/Config/Constants').default

export default class Main extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  renderItem({item}) {
    return (
      <ListButton item={item} onPress={(item) => this.props.onPress(item)} />
    )
  }

  render () {
    let data = [
      {key: PAYMENTS, title: 'Payment Methods', icon: 'dollar-sign'},
      {key: NOTIFICATIONS, title: 'Notification Settings', icon: 'bell'},
      {key: INVITE, title: 'Invite Friends', icon: 'user-plus'},
      {key: FEEDBACK, title: 'Get Help', icon: 'life-buoy'},
      {key: ACCOUNT, title: 'Account', icon: 'user'},
      {key: LOGOUT, title: 'Logout', icon: 'log-out'}

    ]
    let role = (this.props.profile.type == PRO) ? "Pro" : "Homeowner"
    let image = (this.props.profile.image != "") ? {uri: this.props.profile.image} : require('App/Images/default_profile.png')

    return (
      <Grid style={styles.container}>
        <Row style={{ height: 80, alignItems: 'center'  }}>
          <Col size={20} style={globalStyles.centerImage}>
            <Image source={image} style={styles.image}  />
          </Col>
          <Col size={80}>
            <Text style={globalStyles.darkGray}>{this.props.profile.firstname + " " + this.props.profile.lastname}</Text>
            <Text>{role}</Text>
          </Col>
        </Row>
        <Row size={3}>
          <FlatList
            data={data}
            renderItem={(obj) => this.renderItem(obj)}
            keyExtractor={(item, index) => index.toString()}
          />
        </Row>
      </Grid>
    )
  }
}
