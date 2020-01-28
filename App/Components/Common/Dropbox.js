'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Linking
} from 'react-native';

import AppConfig from 'App/Config/AppConfig'

var DropboxClient = require('dropbox');
var shittyQs = require('shitty-qs')
import {Row, Col, Grid} from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'

import FilePicker from 'App/Components/Common/FilePicker'


class Dropbox extends Component {

    state = {
      state: null,
      fileList: [],
      modalVisible: false
    }   

    componentDidMount() {
      Linking.addEventListener('url', (event) => this.parseQS(event.url))
      let parseQS = (url) => this.parseQS(url)

      const url = Linking.getInitialURL().then(url => {
        if (url) {
          parseQS(url)
        }
      });
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.parseQS)
    }

    parseQS(url) {
      var [, query_string] = url.match(/\#(.*)/)
      const query = shittyQs(query_string)

      if (this.props.state == query.state) {
        this.props.saveToken({ type: AppConfig.dropboxType, token: query.access_token })
      } else {
      }
    }

    dropboxOauth() {
      var state = Math.random() + ''
      this.props.setTokenState(state)
      // this.setState({ state: state })

      let url = [
                'https://www.dropbox.com/oauth2/authorize',
                '?response_type=token',
                '&client_id=' + AppConfig.dropboxAppKey,
                '&redirect_uri=tryworkspace-app://workspace&state=' + state,
                ].join('')

      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));


    }

    listFiles(path = "") {

        let f = this
        let deleteToken = () => this.props.deleteToken()
        let doDropbox = () => this.dropboxOauth()

        var dbx = new DropboxClient({ accessToken: this.props.accessToken });

        dbx.filesListFolder({path: path})
            .then(function(response) {
                f.setState({ fileList: response.entries, modalVisible: true })
            })
            .catch(function(error) {

                doDropbox()

                if (error.status == 401) {
                  deleteToken()
                }
            }) 

    }

    createFile(f) {
      this.setState({ modalVisible: false })
      this.props.createFile({
                      filename: f.path_lower,
                      type: DROPBOX_TYPE,
                      file_id: f.rev,
                      json_data: JSON.stringify(f) 
                    })
    }

    render() {

        return (
            <View>
                <FilePicker 
                    title="Dropbox Files"
                    files={this.state.fileList}
                    modalVisible={this.state.modalVisible}
                    setModalActive={(v) => this.setState({modalVisible:v})}
                    onButtonPress={() => this.listFiles("")}
                    onModalFilePress={(f) => this.createFile(f)}
                    onHomePress={() => this.listFiles("")} />
              <Row>
                <TouchableOpacity onPress={() => this.listFiles("")} >
                  <View style={globalStyles.inlineCenter}>
                      <View style={globalStyles.fileButton}>
                          <Image source={require('App/Images/dropbox.png')} style={globalStyles.fileButtonImage} />
                      </View>
                      <View>
                        <Text style={globalStyles.fileButtonText}>Connect with Dropbox</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              </Row>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});


export default Dropbox;