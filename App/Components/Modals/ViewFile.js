import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Text, WebView, Image } from 'react-native'
import styles from './Styles/ViewFileStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import Header from 'App/Components/Header'
import FormButton from 'App/Components/FormButton'
import AppConfig from 'App/Config/AppConfig'

export default class ViewFile extends Component {
  // Prop type warnings
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
  }
  
  // Defaults for props
  static defaultProps = {
    visible: false,
    file: {
      filename: null
    },
    close: () => {}
  }


  renderFile() {
    let Content
    switch(this.props.file.type) {
      case "image":
        let f = this.props.file
        Content = <WebView source={{uri: f.filename}} style={[styles.file]} />
    }

    return (
      Content
    )
  }

  render () {
    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.close()}>
      <Grid style={[styles.container, ]}>
        <Row size={15}>
          <Col>
          <Header title="Viewing File" />
          </Col>
        </Row>
        <Row size={85} style={globalStyles.content}>
          <Col>
            <Row size={90}>
              <Col>
                {this.renderFile()}
              </Col>
            </Row>
            <Row size={10}>
              <Col>
                <FormButton buttonText="Close" onPress={() => this.props.close()} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
      </Modal>
    )
  }
}
