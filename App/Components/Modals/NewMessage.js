import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'
import styles from './Styles/NewMessageStyle'
import Header from 'App/Components/Header'
import HeaderIcon from 'App/Components/HeaderIcon'
import AppConfig from 'App/Config/AppConfig'
import Icon from 'react-native-vector-icons/Feather';
import ListItem from 'App/Components/Project/ListItem'
import IconButton from 'App/Components/Common/IconButton'
import FormButton from 'App/Components/FormButton'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'
import { GiftedAvatar } from 'react-native-gifted-chat'

import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

const { PENDING } = require('App/Config/Constants').default

let titleAlign = "left"
let title = "New Message"
let leftIcon = null
let rightIcon = AppConfig.closeIcon
let tStyle = null
let onPressLeft = () => this.onPress()


export default class NewMessage extends Component {
  // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  
  // Defaults for props
  static defaultProps = {
    visible: false,
    members: [],
    close: () => {},
    onButtonPress: () => {}
  }

  state = {
    selected: (new Map(): Map<string, boolean>)
  };

  _onPressItem(i) {
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(i.item.ID, !selected.get(i.item.ID)); // toggle
      return {selected};
    });

  }

  renderItem(i) {
    const { item, index } = i
    let onPress = () => this._onPressItem(i)
    let is_selected = !!this.state.selected.get(item.ID)
    let leftComponent = (!is_selected) ? <GiftedAvatar user={{name:item.firstname + " " + item.lastname}} /> : <IconButton icon={AppConfig.checkIcon} iconBtnStyle={{backgroundColor: Colors.green}} iconStyle={{color: Colors.white}} />

    if (item.type != PENDING) {
      return (
          <ListItem 
            key={index}
            leftComponent={leftComponent}
            selected={is_selected}
            title={item.firstname + " " + item.lastname}
            summary={item.type}
            rightComponent={null}
            onPress={onPress} />
      )
    }
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

                  <Row size={15} style={styles.helpTextWrap}>
                    <Text style={[globalStyles.centerText, styles.helpText]}>Select a project member to send a new message to from the list below.</Text>
                  </Row>
                  <Row size={65}>
                    <Col>
                      <FlatList 
                        data={this.props.members} 
                        renderItem={(i) => this.renderItem(i)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()} />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row size={20}>
                <Col style={globalStyles.content}>
                  <FormButton buttonText="Start Message" onPress={() => this.props.onButtonPress(this.state.selected)} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Modal>
    )
  }
}
