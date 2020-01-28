import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import styles from './Styles/InviteFriendsStyle'
import globalStyles from 'App/Themes/GlobalStyles'


export default class InviteFriends extends Component {

  render () {
    return (
        <View style={[globalStyles.centerImage, {padding: 20}]}>
          <Image style={[globalStyles.image, styles.image]} source={require('App/Images/invite_friend.png')} />
          <Text style={styles.text}>Invite a Pro! When they finish their first project you’ll get $20.</Text>
        </View>
    )
  }
}
