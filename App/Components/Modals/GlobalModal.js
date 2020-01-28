import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal } from 'react-native'
import styles from './Styles/GlobalModalStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'

// Modal themes
const {
  NOTIFICATION,
} = require("App/Config/Constants").default

// Modal Content
import Notification from 'App/Components/Modals/Notification'



export default class GlobalModal extends Component {
  // Prop type warnings
  static propTypes = {
    modal: PropTypes.object,
  }
  
  // Defaults for props
  static defaultProps = {
    modal: {
      visible: false,
      activeModal: null,
      message: null,
      title: null,
      image: null      
    }
  }

  renderModal() {
    let Modal

    if (this.props.modal.visible) {
      switch (this.props.modal.activeModal) {
        case NOTIFICATION:
          Modal = <Notification {...this.props} />
      }
    }
    return (
      Modal
    )
  }

  render () {
    return (
      <Modal visible={this.props.modal.visible} onRequestClose={() => this.setState({visible: false})} >
        {this.renderModal()}
      </Modal>
    )
  }
}
