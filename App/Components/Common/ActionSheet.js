import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/ActionSheetStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
var ImagePicker = require('react-native-image-picker');
import AS from 'react-native-actionsheet'

import AppConfig from 'App/Config/AppConfig'
import { guid } from 'App/Lib/Util'

const { FILE } = require("App/Config/Constants").default

export default class ActionSheet extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    title: 'Set Project Photo',
    callback: () => {}
  }

  state = {
    name: null,
    filename: null,
    activeModal: null,
    image: null,
    data: {},
    fileList: [],
    selected: (new Map(): Map<string, boolean>),
  }

  onActionSheetItemPress(i) {

    switch(i) {
      case 0:
        ImagePicker.launchCamera({
                      title: null,
                      takePhotoButtonTitle: 'Take Photo',
                      mediaType: 'photo',
                      chooseFromLibraryButtonTitle: 'Choose Photo',
                      storageOptions: {
                        skipBackup: false,
                        path: 'images'
                      }
                    }, (response) => {

                      if (response.error) {

                      } else {
                          if (response.didCancel) {
                            return
                          }
                          
                          var uuid = guid()
                          var ext
                          if (response.fileName) {
                            var ext = response.fileName.split('.').pop();
                          } else {
                            ext = "jpg"
                          }
                          var filename = uuid + "." + ext

                          response['name'] = filename.toLowerCase()
                          response['type'] = 'image/jpeg'

                          const form = new FormData()
                          form.append('image', response)
                          form.append('filename', filename.toLowerCase())

                          this.props.callback({
                            name: response.fileName,
                            filename: filename.toLowerCase(),
                            image: form,
                            type: AppConfig.imageType,
                            data: response.data,
                            for: FILE
                          })
                      }

                  })
        break
      case 1:
        ImagePicker.launchImageLibrary({
                        title: 'Select Photo',
                        storageOptions: {
                          skipBackup: true,
                          path: 'images'
                        }
                      }, (response) => {
                      if (response.error) {

                      } else {

                        if (response.didCancel) {
                          return
                        }
                        var uuid = guid()
                        var ext
                        if (response.fileName) {
                          var ext = response.fileName.split('.').pop();
                        } else {
                          ext = "jpg"
                        }
                        var filename = uuid + "." + ext

                        response['name'] = filename.toLowerCase()
                        response['type'] = 'image/jpeg'

                        const form = new FormData()
                        form.append('image', response)
                        form.append('filename', filename.toLowerCase())
                        
                        this.props.callback({
                          name: response.fileName,
                          filename: filename.toLowerCase(),
                          image: form,
                          type: AppConfig.imageType,
                          data: response.data,
                          for: FILE
                        })
                      }
                  })
        break
    }

  }

  render () {
    return (
      <AS
        ref={o => this.ActionSheet = o}
        title={this.props.title}
        options={['Take a Picture', 'Choose a Picture', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => this.onActionSheetItemPress(index)} />
    )
  }
}
