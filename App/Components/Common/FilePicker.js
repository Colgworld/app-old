'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Text
} from 'react-native';

const {
  IMAGE_TYPE,
} = require('App/Config/Constants')

import { Grid, Row, Col} from 'react-native-easy-grid'
import Feather from 'react-native-vector-icons/Feather'

import Header from 'App/Components/Header'
import ListItem from 'App/Components/Project/ListItem'
import styles from './Styles/FilePickerStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

import AppConfig from 'App/Config/AppConfig'

class FilePicker extends Component {

    state = {
        modalVisible: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modalVisible:nextProps.modalVisible})
    }

    setModalActive(v) {
        this.setState({modalVisible:v})
    }

    render() {

        // let files = this.state.fileList.map((f,i) => {

        //     let closeModal = () => this.setModalActive(false)
        //     let onPress = (f) => this.props.onModalFilePress(f)
        //     let icon = <Icon name="ios-document-outline" size={25} color={Colors.darkPurple}  />
        //     if (f['.tag'] == 'folder') {
        //       onPress = () => this.listFiles(DROPBOX_TYPE, f.path_lower)
        //       icon = <Icon name="ios-folder-outline" color={Colors.darkPurple} size={25} />
        //     }

        //     return (
        //       <TouchableOpacity key={i} onPress={onPress}>
        //         <Row style={globalStyles.fileList}>
        //           <Col size={8} offset={5}>{icon}</Col>
        //           <Col size={85} offset={2}><Text style={globalStyles.label}>{f.name}</Text></Col>
        //         </Row>
        //       </TouchableOpacity>
        //     )
        // })


        let files = this.props.files.map((file,k) => {

            let icon = <Feather name="file" size={25} color={Colors.darkPurple}  />
            let onPress = () => this.props.onPress(file)

            if (file['.tag'] == 'folder') {
              icon = <Feather name="folder" color={Colors.darkPurple} size={25} />
            }

            return (
              <ListItem key={k}
                isDisabled={false}
                images={null}
                onPress={onPress}
                containerStyle={globalStyles.centerText}
                titleStyle={styles.itemTitle}
                rightComponent={null}
                leftComponent={icon}
                summary={file.type}
                title={file.name}
               />

            )
        })


        return (
            <Modal 
              onRequestClose={() => this.setState({ modalVisible:false })}
              visible={this.props.modalVisible}>
                <Grid>
                  <Row size={15}>
                    <Header leftIcon={null} titleAlign="left" title={this.props.title} rightIcon={AppConfig.closeIcon} onPressRight={() => this.props.setModalActive(false)} />
                  </Row>
                  <Row size={85}>
                    <Col>
                      <ScrollView style={[globalStyles.content]}>

                        <ListItem
                          isDisabled={false}
                          images={null}
                          onPress={() => this.props.onHomePress()}
                          rightComponent={null}
                          containerStyle={globalStyles.centerText}
                          titleStyle={styles.itemTitle}
                          leftComponent={<Feather name="folder" color={Colors.darkPurple} size={25} />}
                          title="..."
                         />
                        {files}

                      </ScrollView>

                    </Col>
                    </Row>
                </Grid>
            </Modal>
        );
    }
}



export default FilePicker;