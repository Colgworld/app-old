'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

const {
  GOOGLE_DRIVE_TYPE,
  IMAGE_TYPE,
  DARK_BLUE
} = require('App/Config/Constants')

import {appAuthToken} from 'App/Lib/AppAuthToken'
// import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {Row, Col, Grid} from 'react-native-easy-grid'

import FilePicker from 'App/Components/Common/FilePicker'

const ServiceFactory = require('App/Services/GoogleDrive/index').default

// import {googleDriveService} from 'App/service/GoogleDrive'

import globalStyles from 'App/Themes/GlobalStyles'
class GoogleDrive extends Component {

    state = {
        fileList: [],
        user: {},
        modalVisible: false
    }

    componentDidMount() {
    }


    listFiles(token) {

        ServiceFactory(token).then((r) => {

            r.listFiles().then((files) => {

                this.setState({fileList:files.files, modalVisible:true})
            })
            .catch((error) => {
                // appAuthToken.deleteAuthIntegrationToken(GOOGLE_DRIVE_TYPE)

                this._signOut()
            })                
        })

    }

    async _setupGoogleSignin() {

        // let signIn = () => this._signIn()
        // let saveToken = (user) => this.props.saveToken({
        //                   type: GOOGLE_DRIVE_TYPE, 
        //                   token: user.accessToken,
        //                   json_data: JSON.stringify(user)
        //                 })

        // try {
        //   GoogleSignin.hasPlayServices({ autoResolve: true });
        //   GoogleSignin.configure({
        //     scopes: [
        //         "https://www.googleapis.com/auth/drive",
        //         "https://www.googleapis.com/auth/drive.appdata",
        //         "https://www.googleapis.com/auth/drive.file",
        //         "https://www.googleapis.com/auth/drive.metadata",
        //         "https://www.googleapis.com/auth/drive.metadata.readonly",
        //         "https://www.googleapis.com/auth/drive.readonly",
        //         "https://www.googleapis.com/auth/drive.photos.readonly"
        //     ], // what API you want to access on behalf of the user, default is email and profile
        //     iosClientId: '629653106338-mug5chdff6krcrkqaqis3o65sth39qks.apps.googleusercontent.com',
        //     webClientId: '629653106338-hbaiqrltfc3ojbj65snfnl71m9030fii.apps.googleusercontent.com',
        //     shouldFetchBasicProfile: true,
        //     offlineAccess: true
        //   }).then(() => {
        //     GoogleSignin.currentUserAsync().then((user) => {

        //         if (user == null) {
        //             GoogleSignin.signIn()
        //             .then((user) => {

        //                 saveToken(user)
        //                 this.setState({user: user});
        //             })
        //             .catch((err) => {

        //             })
        //             .done();
        //         } else {
        //             this.listFiles(user.accessToken)
        //         }
        //       this.setState({user: user});
        //     }).done();
        //   })

        //   // this.setState({user});
        // }
        // catch(err) {

        // }
  }

    _signIn() {
        // GoogleSignin.signIn()
        // .then((user) => {

        //   this.setState({user: user});
        // })
        // .catch((err) => {

        // })
        // .done();
    }

    _signOut() {
        // GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        //   this.setState({user: null});
        // })
        // .done();
    }

    render() {

        return (
            <View>
                <FilePicker 
                    title="Google Drive Files"
                    files={this.state.fileList}
                    modalVisible={this.state.modalVisible}
                    setModalActive={(v) => this.setState({modalVisible:v})}
                    onButtonPress={() => this.listFiles("")}
                    onModalFilePress={(f) => this.props.createFile({
                      filename: f.name,
                      file_id: f.id,
                      access_token: this.state.user.accessToken,
                      type: GOOGLE_DRIVE_TYPE,
                      json_data: JSON.stringify(f) 
                    })}
                    onHomePress={() => this.listFiles("")} />
              <Row>
                <TouchableOpacity onPress={() => this._setupGoogleSignin()} >
                  <View style={globalStyles.inlineCenter}>
                      <View style={globalStyles.fileButton}>
                          <Image source={require('App/Images/google_drive.png')} style={globalStyles.fileButtonImage} />
                      </View>
                      <View>
                        <Text style={globalStyles.fileButtonText}>Connect with Google Drive</Text>
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


export default GoogleDrive;