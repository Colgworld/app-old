import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/EmptyStateStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import Header from 'App/Components/Header'
import FormButton from 'App/Components/FormButton'
import _ from 'underscore'

export default class EmptyState extends Component {
  // // Prop type warnings
  static propTypes = {
    // image: PropTypes.object,
    onPress: PropTypes.func,
  }
  
  // Defaults for props
  static defaultProps = {
    image: null,
    text: "Hmm.. we're not seeing anything here yet.",
    boldText: null,
    onPress: () => {},
    buttonText: null,
    imageStyle: {},
    textStyle: {},
    boldTextStyle: {},
    buttonStyle: {},
  }

  renderButton() {
    let Button = (!_.isNull(this.props.buttonText)) ? <FormButton btnStyle={[styles.button, this.props.buttonStyle]} buttonText={this.props.buttonText} onPress={() => this.props.onPress()} /> : null
    return (
      Button
    )
  }

  renderImage() {
    let image = (!_.isNull(this.props.image)) ? <Image source={this.props.image} style={[globalStyles.image, globalStyles.centerImage, this.props.imageStyle]} /> : null

    return (
      image
    )

  }

  render () {
    return (
      <Grid style={styles.container}>
        <Row style={globalStyles.content}>
          <Col style={globalStyles.centerContent}>
            
            {this.renderImage()}

            <Text style={[globalStyles.emptyStateP, this.props.textStyle]}>{this.props.text}</Text>
            <Text style={[globalStyles.emptyStateBold, this.props.boldTextStyle]}>{this.props.boldText}</Text>

            {this.renderButton()}

          </Col>
        </Row>
      </Grid>
    )
  }
}
