'use strict'

var DropboxClient = require('dropbox');
import { Linking } from 'react-native';

import AppConfig from 'App/Config/AppConfig'

export const listFiles = (path = "", accessToken: "", callback) => {

    // let deleteToken = () => this.props.deleteToken()
    var state = Math.random() + ''
    let doDropbox = () => {
        // this.props.setTokenState(state)
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

    var dbx = new DropboxClient({ accessToken: accessToken });
    var fileList = []
    var mv = false

    dbx.filesListFolder({path: path})
        .then(function(response) {
            callback({
                fileList: response.entries,
                modalVisible: true
            })
            // f.setState({ fileList: response.entries, modalVisible: true })
        })
        .catch(function(error) {

            doDropbox()

            if (error.status == 401) {
                return false
              // deleteToken()
            }
        }) 



}