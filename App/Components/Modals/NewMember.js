import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'
import styles from './Styles/NewMemberStyle'
import Header from 'App/Components/Header'
import AddMembers from 'App/Components/Project/AddMembers'
import AppConfig from 'App/Config/AppConfig'
import Icon from 'react-native-vector-icons/Feather';
import ListItem from 'App/Components/Project/ListItem'
import FormButton from 'App/Components/FormButton'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'

import globalStyles from 'App/Themes/GlobalStyles'
    

let titleAlign = "left"
let title = "New Member"
let leftIcon = null
let rightIcon = AppConfig.closeIcon
let tStyle = null
let onPressLeft = () => this.onPress()



export default class NewMember extends Component {
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
    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.close()}>
        <Grid>
          <Row>
            <Col>
              <Row size={15}>
              <Header title={title}
                      titleAlign={titleAlign}
                      titleStyle={tStyle}
                      leftIcon={leftIcon}
                      rightIcon={rightIcon}
                      onPressRight={() => this.props.close()}
              />
              </Row>
              <Row size={80}>
                <Col style={[globalStyles.content]}>
                  <Row size={65}>
                    <Col>
                      <AddMembers {...this.props} modalEnabled={false} />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row size={20}>
                <Col style={[globalStyles.content, {justifyContent: 'flex-end'}]}>
                  <FormButton buttonText="Done" onPress={() => this.props.close()} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Modal>
    )
  }
}
