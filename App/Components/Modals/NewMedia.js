import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Modal } from 'react-native'
import styles from './Styles/NewMediaStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import AppConfig from 'App/Config/AppConfig'
import globalStyles from 'App/Themes/GlobalStyles'


export default class NewMedia extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    close: () => {}
  }

  render () {
    let rightIcon = AppConfig.closeIcon
    
    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.close()}>
        <Grid style={globalStyles.content}>
          <Header title={"New Change Order"}
                  rightIcon={rightIcon}
                  onPressRight={() => this.props.close()}
          />     
          <Row>
            <Col>        
              <FormButton buttonText="Close" onPress={() => this.props.close()} />
            </Col>        
          </Row>
        </Grid>
      </Modal>        
    )
  }
}
