import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, FlatList } from 'react-native'
import styles from './Styles/FilesStyle'
import Feather from 'react-native-vector-icons/Feather'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import ActionSheet from 'react-native-actionsheet'
import _ from 'underscore'
import Dialog from 'react-native-dialog'

import { listFiles } from 'App/Lib/Dropbox'
import { parseQS, guid } from 'App/Lib/Util'

import AppConfig from 'App/Config/AppConfig'

import GoogleDriveButton from 'App/Components/Common/GoogleDrive'
import DropboxButton from 'App/Components/Common/Dropbox'
import DropboxFilesModal from 'App/Components/Modals/DropboxFiles'
import ViewFileModal from 'App/Components/Modals/ViewFile'
import FilePicker from 'App/Components/Common/FilePicker'
import ListItem from 'App/Components/Project/ListItem'
import EmptyState from 'App/Components/Common/EmptyState'
var ImagePicker = require('react-native-image-picker');
import CircleBtn from 'App/Components/CircleBtn'

const { VIEW_FILE_MODAL, FILEPICKER_MODAL, FILE } = require("App/Config/Constants").default

const icons = {
  [AppConfig.dropboxType]: <Image source={require('App/Images/dropbox-icon.png')} style={styles.imgIcon} />,
  [AppConfig.googleDriveType]: <Image source={require('App/Images/google-drive-icon.png')} style={styles.imgIcon} />,
  [AppConfig.imageType]: <Feather name="image" color={Colors.darkPurple} size={35} /> }

// const icons = {
//   [AppConfig.dropboxType]: require('App/Images/dropbox-icon.png')
//   [AppConfig.googleDriveType]: require('App/Images/google-drive-icon.png')
//   [AppConfig.imageType]: <Feather name="image" color={Colors.darkPurple} size={25} /> }  


export default class Media extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  static defaultProps = {
    tokens: {
      dropbox: '',
      google_drive: ''
    },
    file: null,
    viewFile: false,
    files: []
  }

  state = {
    name: null,
    filename: null,
    activeModal: null,
    project_id: null,
    image: null,
    data: {},
    isModalVisible: false,
    renameModalVisible: false,
    fileList: [],
    selected: (new Map(): Map<string, boolean>),
  }

  componentDidMount() {
    Linking.addEventListener('url', (event) => {
      var res = parseQS(event.url)
      // DROPBOX TOKEN
      this.props.saveAuthIntegrationToken({ type: AppConfig.dropboxType, token: res.access_token })
    })


    const url = Linking.getInitialURL().then(url => {
      if (url) {
        var res = parseQS(url)
        this.props.saveAuthIntegrationToken({ type: AppConfig.dropboxType, token: res.access_token })
      }
    });
  }

  componentWillUnmount() {
      Linking.removeEventListener('url', parseQS)
  }  

  renderRenameFile() {
    return (
      <View>
      <Dialog.Container visible={this.state.renameModalVisible}>
        <Dialog.Title>Add File</Dialog.Title>
        <Dialog.Input defaultValue={this.state.name} onChangeText={(t) => this.setState({ name: t })} selectTextOnFocus={true} >
        </Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => this.setState({renameModalVisible:false})} />
        <Dialog.Button label="Upload" onPress={() => this.setState({renameModalVisible:false}, () => {
          this.props.createFile(this.state)
        })} />
      </Dialog.Container>
      </View>
    )
  }

  onActionSheetItemPress(i) {

    var type = ""

    switch(i) {
      case 0:
        type = AppConfig.dropboxType
        listFiles("", this.props.tokens.dropbox, (r) => {
          this.setState({ isModalVisible: true, fileList: r.fileList })
        })

        break
      // case 1:
      //   type = AppConfig.googleDriveType
      //   break    
      case 1:
        type = AppConfig.imageType
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

                          this.setState({
                            renameModalVisible: true,
                            name: response.fileName,
                            filename: filename.toLowerCase(),
                            project_id: this.props.activeProject.project.ID,
                            image: form,
                            type: AppConfig.imageType,
                            for: FILE
                          })
                      }

                  })
        break
      case 2:
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
                        
                        this.setState({
                          renameModalVisible: true,
                          name: response.fileName,
                          filename: filename.toLowerCase(),
                          project_id: this.props.activeProject.project.ID,
                          image: form,
                          type: AppConfig.imageType,
                          for: FILE
                        })
                      }

                  })
        break
    }


    this.setState({ activeModal: i, type: type })

  }


  onModalFilePress(f) {
    if (f['.tag'] == 'folder') {
      listFiles(f.path_lower, this.props.tokens.dropbox, (r) => {
          this.setState({ isModalVisible: true, fileList: r.fileList })
        })
    } else {
      const data = {
          file_id: f.rev,
          filename: f.path_lower,
          type: this.state.type,
          json_data: JSON.stringify(f)
      }
      this.setState({isModalVisible: false})
      this.props.createFile({
        project_id: this.props.activeProject.project.ID,
        data: {
          project_id: this.props.activeProject.project.ID,
          file_id: d.file_id,
          filename: d.filename,
          type: d.type,
          json_data: d.json_data }
        })      
    }
  }

  viewFile(file) {
    this.setState({isModalVisible: true, file: {...file}, activeModal: VIEW_FILE_MODAL })
  }

  renderActiveModal() {
    let ActiveModal
    switch(this.state.activeModal) {
      case VIEW_FILE_MODAL:
        ActiveModal = <ViewFileModal file={this.state.file} visible={this.state.isModalVisible} close={() => this.setState({isModalVisible:false})} />
        break
      case 0:
        ActiveModal = <FilePicker 
                    title="Dropbox Files"
                    files={this.state.fileList}
                    modalVisible={this.state.isModalVisible}
                    setModalActive={(v) => this.setState({isModalVisible:v})}
                    onButtonPress={() => listFiles("", this.props.tokens.dropbox, (r) => {
                        this.setState({ isModalVisible: true, fileList: r.fileList })
                      })}
                    onHomePress={() => listFiles("", this.props.tokens.dropbox, (r) => {
                        this.setState({ isModalVisible: true, fileList: r.fileList })
                      })}
                    onPress={(f) => this.onModalFilePress(f)} />
        break
    }


    return (
      ActiveModal
    )
  }


  renderItem(i) {
    const { item, index } = i
    let onPress = () => this.viewFile(item)
    let is_selected = !!this.state.selected.get(item.ID)
    // let leftComponent = (!is_selected) ? <GiftedAvatar user={{name:item.firstname + " " + item.lastname}} /> : <IconButton icon={AppConfig.checkIcon} iconBtnStyle={{backgroundColor: Colors.green}} iconStyle={{color: Colors.white}} />
    let title = (item.name == "") ? item.type.toUpperCase() : item.name

    return (
        <ListItem 
          key={index}
          leftComponent={[icons[item.type]]}
          selected={is_selected}
          title={title}
          summary={"Tap to view"}
          rightComponent={null}
          onPress={onPress} />
    )
  }


  renderFiles() {

    let files = <FlatList 
                  data={this.props.activeProject.files} 
                  renderItem={(i) => this.renderItem(i)}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()} />    

    let has_files = (!_.isNull(this.props.activeProject.files) && !_.isUndefined(this.props.activeProject.files) && this.props.activeProject.files.length > 0) ? true : false
    let Files = (!has_files) ? <EmptyState image={null} text="You currently have no files to view." boldText="Add files from Dropbox and more!" buttonText={null} /> : files

    return (
      Files
    )
  }

  render () {

    return (
        <Grid style={styles.grid}>
          <Row>
            <Col>
              {this.renderRenameFile()}
              
              <CircleBtn containerStyle={styles.circleBtnContainerStyle} style={styles.circleBtn} onPress={() => this.ActionSheet.show()} />

              {this.renderActiveModal()}

              {this.renderFiles()}

              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Upload a file'}
                options={['Add From Dropbox', 'Take a Picture', 'Choose a Picture', 'Cancel']}
                cancelButtonIndex={4}
                destructiveButtonIndex={1}
                onPress={(index) => this.onActionSheetItemPress(index)} />

            </Col>
          </Row>
        </Grid>
    )
  }
}
