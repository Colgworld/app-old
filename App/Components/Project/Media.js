import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/MediaStyle'
import Feather from 'react-native-vector-icons/Feather'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'

export default class Media extends Component {
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

  render () {
    
    let imageData = [
      { name: "https://s3.amazon.com/nuts", favorited: false },
      { name: "https://s3.amazon.com/someotherimage.jpg", favorited: true },
      { name: "https://s3.amazon.com/someotherimage.jpg", favorited: true },
      { name: "https://s3.amazon.com/someotherimage.jpg", favorited: true },
      { name: "https://s3.amazon.com/someotherimage.jpg", favorited: true }
    ]

    // let images = imageData.map((image, key) =>  {
    //   return (
    //       <View key={key} style={styles.gridPad}>
    //         <Image style={styles.gridItem} source={{ uri: imageData.name }} />
    //       </View>
    //   )
    // })

    return (
      <View style={styles.container}>
        <Grid style={styles.grid}>
          <Row>
            {/*images*/}
          </Row>
        </Grid>
      </View>
    )
  
  }
}
