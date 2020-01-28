import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal, FlatList } from 'react-native'
import styles from './Styles/DropboxFilesStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import ListItem from 'App/Components/Project/ListItem'
import AppConfig from 'App/Config/AppConfig'
import Icon from 'react-native-vector-icons/Feather'

import globalStyles from 'App/Themes/GlobalStyles'

export default class DropboxFiles extends Component {
  // // Prop type warnings
  static propTypes = {
    onPress: PropTypes.func,
  }
  //
  // // Defaults for props
  static defaultProps = {
    onPress: (f) => {},
    close: () => {}
  }

  _renderItem(i) {
    const { item, index } = i

    return (
      <ListItem {...item} 
        onPress={() => item.onPress(i)}
        leftComponent={<Icon name="folder" size={AppConfig.iconSize} />} />
    )
  }

  render () {
    let rightIcon = AppConfig.closeIcon
    let onPress = (f) => this.props.onPress(f)
    let items = this.props.files.map((f, k) => {
      return {
        key: k,
        title: f.name,
        isDisabled: false,
        images: [],
        rightComponent: <Text>></Text>,
        onPress: () => onPress(f),
        summary: f.path_display,
      }
    })

    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.close()}>
        <Grid>
          <Header title={"Dropbox Files"}
                  rightIcon={rightIcon}
                  onPressRight={() => this.props.close()}
          />        
          <Row style={globalStyles.content}>
            <Col>
              <FlatList data={items} renderItem={this._renderItem} />
              <FormButton buttonText="Close" onPress={() => this.props.close()} />
            </Col>        
          </Row>
        </Grid>
      </Modal>
    )
  }
}
