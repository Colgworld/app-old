import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, Modal, View, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProjectActions from 'App/Redux/ProjectRedux'

const {
  DROPBOX_TYPE,
  GOOGLE_DRIVE_TYPE,
  IMAGE_TYPE,
  DROPBOX_APP_ID,
} = require('App/Config/Constants')

import FormButton from 'App/Components/FormButton'
import Dimensions from "Dimensions"

import GoogleDriveButton from 'App/Components/Common/GoogleDrive'
import DropboxButton from 'App/Components/Common/Dropbox'

import Icon from 'react-native-vector-icons/Feather'
import { Col, Row, Grid } from 'react-native-easy-grid';

var ImagePicker = require('react-native-image-picker');

// Styles
import styles from './Styles/ProjectFilesScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import { getActiveProject } from 'App/Lib/Util'

const messages = {
  [DROPBOX_TYPE]: "Dropbox Files",
  [GOOGLE_DRIVE_TYPE]: "Google Drive Files" }

const icons = {
  [DROPBOX_TYPE]: <Image source={require('App/Images/dropbox-icon.png')} style={{width:20,resizeMode:'contain',maxHeight:25}} />,
  [GOOGLE_DRIVE_TYPE]: <Image source={require('App/Images/google-drive-icon.png')} style={{width:20,resizeMode:'contain',maxHeight:25}} />,
  [IMAGE_TYPE]: <Icon name="image" color={Colors.darkPurple} size={25} /> }


class ProjectFilesScreen extends Component {

  state = {
    access_token: null,
    modalTitle: "",
    canGoBack: false,
    modalVisible: false,
    activeFile: ""
  }


  componentDidMount() {
  }

  addFile(f) {
    var files = this.props.files
    files.push(f)
    this.props.updateValue(['payload', this.props.activeProjectKey, 'files'], files)
    this.props.updateValue(['activeProject', 'files'], files)
  }

  viewFile(f) {
    let imgPath = "files/users/"+f.owner_id+"/"
    switch(f.type) {
      case IMAGE_TYPE:
        imgPath = "images/projects/original/"
    }
    this.setState({
      activeFile: "https://s3.amazonaws.com/workspace-app/"+imgPath+f.filename,
      modalVisible: true
    })


  }

  onBack() {
    // this.refs["WEBVIEW_REF"].goBack();

    this.setState({modalVisible:false})
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }


  render() {

    let ExistingProjectDocuments = this.props.files.map((f,k) => {

      return (
        <TouchableOpacity key={k} onPress={() => this.viewFile(f)}>
          <Row style={globalStyles.fileList} vAlign="middle" height={45}>
              <Col size={8} hAlign="right">
                {icons[f.type]}
              </Col>
              <Col size={85} offset={4}>
                <Text style={{}}>{f.filename}</Text>
              </Col>
          </Row>
        </TouchableOpacity>
      )
    })


    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Grid>
            <Row>

              <Modal onRequestClose={() => this.setState({ modalVisible:false })}
                visible={this.state.modalVisible}
                >

                <View style={styles.container}>
                  <View style={styles.topbar}>
                    <TouchableOpacity
                      onPress={() => this.onBack()}
                      >
                      <Text style={[globalStyles.title, {padding: 10}]}>Go Back</Text>
                    </TouchableOpacity>
                  </View>
                  <WebView
                    ref="WEBVIEW_REF"
                    style={{flex: 1, }}
                    onNavigationStateChange=
                      {() => this.onNavigationStateChange.bind(this)}
                    source={{uri: this.state.activeFile}}
                    /> 
                </View>
              </Modal>

              <ScrollView style={globalStyles.content}>

                <Row>
                  <Col>
                    <Text style={globalStyles.H3}>Your Project Documents</Text>
                    {ExistingProjectDocuments}
                  </Col>
                </Row>


                <Row vAlign="middle" style={{paddingTop:30}}>
                  <Col hAlign="center" fullWidth>
                    <Text style={{fontWeight:'500',color:"#777777",fontSize:16,textAlign:'center',lineHeight:25}}>
                      {"Don't lose track of important project information. Upload receipts, invoices or anything else project related right here."}
                    </Text>
                  </Col>
                </Row>


                <Row style={[{marginTop: 45}, globalStyles.iconButton]}>
                    <DropboxButton 
                      accessToken={this.props.tokens.dropbox}
                      state={this.props.tokens.dbxState}
                      setTokenState={(val) => this.props.updateValue(['authTokens', 'dbxState'], val)}
                      getAuthIntegrationToken={(t) => this.props.getAuthIntegrationToken(t)}
                      createFile={(f) => this.props.createFile({
                        data: {
                          project_id: this.props.project.project.ID,
                          file_id: f.file_id,
                          filename: f.filename,
                          type: f.type,
                          json_data: f.json_data }
                        }
                      )}
                      deleteToken={() => this.props.deleteAuthIntegrationToken(DROPBOX_TYPE)}
                      saveToken={(data) => this.props.saveAuthIntegrationToken(data)} />
                </Row>
                <Row style={[globalStyles.iconButton]}>
                    <GoogleDriveButton 
                      accessToken={this.props.tokens.google}
                      getAuthIntegrationToken={(t) => this.props.getAuthIntegrationToken(t)}
                      createFile={(f) => this.props.createFile({
                        data: {
                          project_id: this.props.project.project.ID,
                          filename: f.filename,
                          type: f.type,
                          access_token: f.access_token,
                          file_id: f.file_id,
                          json_data: f.json_data }
                        })
                    }
                      deleteToken={() => this.props.deleteAuthIntegrationToken(GOOGLE_DRIVE_TYPE)}
                      saveToken={(u) => this.props.saveAuthIntegrationToken(u)} />
                </Row>
                <Row style={[globalStyles.iconButton]}>
                    <TouchableOpacity
                      onPress={() => ImagePicker.launchCamera({
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
                            let guid = () => {
                              function s4() {
                                return Math.floor((1 + Math.random()) * 0x10000)
                                  .toString(16)
                                  .substring(1);
                              }
                              return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                                s4() + '-' + s4() + s4() + s4();
                            }
                            var uuid = guid()
                            var ext
                            if (response.fileName) {
                              var ext = response.fileName.split('.').pop();
                            } else {
                              ext = "jpg"
                            }
                            var filename = uuid + "." + ext

                            response['name'] = filename
                            response['type'] = 'image/jpg'

                            const form = new FormData()
                            form.append('image', response)

                            this.props.createFile({
                              image: form,
                              data: {
                                filename: filename,
                                type: IMAGE_TYPE,
                                project_id: this.props.project.project.ID
                              }
                            })

                          }

                      })} >

                      <View style={globalStyles.inlineCenter}>
                          <View style={globalStyles.fileButton}>
                              <Image source={require('App/Images/camera.png')} style={globalStyles.fileButtonImage} />
                          </View>
                          <View>
                            <Text style={globalStyles.fileButtonText}>Take A Picture</Text>
                          </View>
                      </View>                       
                    </TouchableOpacity>  
                </Row>

              </ScrollView>


            </Row>
          </Grid>
        </KeyboardAvoidingView>
      </ScrollView>      
    );
  }

}

const mapStateToProps = (state) => {
  activeProject = getActiveProject(state)
  return {
    files: activeProject.files,
    activeProjectKey: state.projects.activeProjectKey,
    account: state.account,
    tokens: state.projects.authTokens,
    project: activeProject
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (path, value) => dispatch(ProjectActions.updateValue(path, value)),
    getAuthIntegrationToken: (data) => dispatch(ProjectActions.getAuthIntegrationTokenRequest(data)),
    saveAuthIntegrationToken: (data) => dispatch(ProjectActions.saveAuthIntegrationTokenRequest(data)),
    deleteAuthIntegrationToken: (data) => dispatch(ProjectActions.deleteAuthIntegrationTokenRequest(data)),
    createFile: (data) => dispatch(ProjectActions.createFileRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilesScreen)
