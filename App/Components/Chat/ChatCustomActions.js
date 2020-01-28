'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

var ImagePicker = require('react-native-image-picker');

import Icon from 'react-native-vector-icons/Feather';
import { guid } from 'App/Lib/Util'

const { MESSAGE } = require("App/Config/Constants").default

import Colors from 'App/Themes/Colors'
import AppConfig from 'App/Config/AppConfig'

class ChatCustomActions extends Component {

  // state = {
  //   project_id: this.props.project.project.ID,
  //   from_user_id: '',
  //   to_user_id: this.props.project.collaborator.ID
  // }


  onPress() {
    var options = {
      title: null,
      takePhotoButtonTitle: 'Take Photo',
      mediaType: 'photo',
      chooseFromLibraryButtonTitle: 'Choose Photo',
      storageOptions: {
        skipBackup: false,
        path: 'images'
      }
    };
      // customButtons: [
      //   {name: 'co', title: 'Create Change Order'},
      // ],    

    // Open Image Library:
    ImagePicker.showImagePicker(options, (response)  => {

      if (response.didCancel) {

      }
      else if (response.error) {

      }
      else if (response.customButton) {


      }
      else {
        var uuid = guid()
        var ext = "jpg"
        if (response.fileName) {
          var ext = response.fileName.split('.').pop();
        }
        var filename = uuid + "." + ext.toLowerCase()
        response['name'] = filename
        response['type'] = 'image/jpg'

        const form = new FormData()
        form.append('image', response)
        this.props.onActionsPress(form)   

      }
    });
  }

  render() {
    return (
      <TouchableOpacity style={{ padding: 5, marginLeft: 10 }} onPress={() => this.onPress()}>
          <Icon name={AppConfig.addIcon} size={25} style={{textAlign:'center'}} color={Colors.red} />
      </TouchableOpacity>
    )
  }
}



export default ChatCustomActions;


