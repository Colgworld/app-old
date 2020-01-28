import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Image, Linking, Clipboard, Modal } from 'react-native'
import styles from './Styles/AddMembersStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import ListItem from 'App/Components/Project/ListItem'
import IconButton from 'App/Components/Common/IconButton'
import InviteContacts from 'App/Components/Project/InviteContacts'
import Communications from 'react-native-communications';
import Config from 'react-native-config'
import _ from 'underscore'
import { guid } from 'App/Lib/Util'
import {branchLib} from 'App/Lib/Branch'

const { EMAIL, TEXT, COPY_LINK, FB_INVITE, SHOW_SHARESHEET, INVITE_CONTACTS, PRO, HOMEOWNER, JOIN_PROJECT, JOIN_APP } = require("App/Config/Constants").default
import AppConfig from 'App/Config/AppConfig'
import Colors from 'App/Themes/Colors'

export default class AddMembers extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    project: {
      project: {
        ID: null,
        name: null
      }
    },
    profile: {
      firstname: null,
      type: null
    },
    link: null,
    onPress: () => {},
    close: () => {},
    inviteUser: (data) => {},
    modalEnabled: true
  }

  constructor(props) {
    super(props);
  
    this.state = {
      url: null,
      message: null,
      hasInviteLinkGenerated: false,
      contactModalVisible: false,
      token: null,
      role: null
    };
    this._project = this.props.activeProject
  }

  componentDidMount() {
    let is_project_invite = (!_.isUndefined(this._project)) ? true : false
    let token = guid()
    let identifier = (is_project_invite) ? 'project/'+this._project.project.ID+'/'+token : 'invite-to-app'
    let role = (this.props.profile.type == PRO) ? HOMEOWNER : PRO // @TODO add SUB, select role on link creation
    let imageUrl = (is_project_invite && this._project.project.image != "") ? this._project.project.image : AppConfig.defaultShareImage
    let projectKeys = (is_project_invite) ? {project_id: this._project.project.ID.toString()} : {}
    let route = (is_project_invite) ? JOIN_PROJECT : JOIN_APP
    let title = (is_project_invite) ? this._project.project.name : "You've been invited to Workspace"
    branchLib.getShortURL({
      identifier: identifier,
      metadata: {
        role: role,
        token: token,
        route: route,
        ...projectKeys,
      },
      title: title,
      contentImageUrl: imageUrl,
      contentDescription: "You've been invited to a project on Workspace"
    }).then((r) => {
      this.setState({url:r, token: token, role: role})
      Clipboard.setString(r)
    })
  }

  renderItem(i) {
    const { item, index } = i
    return (
      <ListItem 
        key={index}
        title={item.title}
        onPress={() => item.onPress()}
        leftComponent={item.icon}
        item={item} />
    )
  }

  onPress(type) {

    let is_project_invite = (!_.isUndefined(this._project)) ? true : false
    let saveLink = () => {

      this._getContent()

      let projectKeys = (is_project_invite) ? {project_id: this._project.project.ID} : {}

      if (!this.state.hasInviteLinkGenerated) {
        this.props.onPress({
          token: this.state.token,
          ...projectKeys,
          role: this.state.role,
          url: this.state.url
        })
        this.setState({hasInviteLinkGenerated:true})
      }      
    }

    switch(type) {
      case EMAIL:
        // Linking.openURL('mailto:?subject=&body=')
        // Communications.email(to, cc, bcc, subject, body)
        let subject = (is_project_invite) ? "You've been invited you " + this._project.project.name + " on Workspace" : "You've been invited to Workspace"
        let content = this.props.profile.firstname + " has invited you to collaborate on a project, click the link below to get started!\n\n" + this.state.url
        Communications.email(null, null, null, subject, content)
        saveLink()
        break
      case TEXT:
        // Communications.text()
        break
      case COPY_LINK:
        this.setState({message:"Link Copied"}, () => {
          saveLink()
        })
        break
      case FB_INVITE:
        break
      case SHOW_SHARESHEET:
        break
      case INVITE_CONTACTS:
        if (this.props.modalEnabled) {
          this.setState({contactModalVisible: true})
        } else {
          this.props.close()
          this.props.navigation.navigate("ProjectMembersScreen")
        }
        break
    }

  }

  async _getContent() {
    var url = await Clipboard.getString();
  }

  renderMessage() {
    if (!_.isNull(this.state.message)) {
      return (
        <Text style={globalStyles.helpMessage}>{this.state.message}</Text>
      )      
    }
  }

  render () {

    const data = [
      { 
        icon: <IconButton iconSize={25} icon="mail" iconBtnStyle={{backgroundColor: '#ff0000'}} iconStyle={{color: 'white'}} padding={8} />, 
        title: "Send An Email", 
        onPress: () => this.onPress(EMAIL)
      },
      { 
        icon: <IconButton iconSize={25} icon="copy" iconBtnStyle={{backgroundColor: '#ff0000'}} iconStyle={{color: 'white'}} padding={8} />, 
        title: "Copy a link", 
        onPress: () => this.onPress(COPY_LINK)
      },
      { 
        icon: <IconButton iconSize={25} icon="users" iconBtnStyle={{backgroundColor: '#ff0000'}} iconStyle={{color: 'white'}} padding={8} />, 
        title: "Invite from contacts", 
        onPress: () => this.onPress(INVITE_CONTACTS)
      },
    ]

    return (
      <Grid style={styles.container}>
        <Row>
          <Col>
            <Row size={25} style={globalStyles.centerContent}>
              <Text style={styles.text}>You can easily invite new members to your project using one of the methods below.</Text>
            </Row>

            <Row size={75} style={styles.listWrap}>
              <Col>
                {this.renderMessage()}
                <Modal visible={this.state.contactModalVisible} onRequestClose={() => this.setState({contactModalVisible:false})} animationType={"slide"} transparent={false} >
                  <InviteContacts {...this.props} inviteUser={(data) => {
                    this.setState({contactModalVisible:false})
                    if (!_.isNull(data)) {
                      this.props.inviteUser(data)
                    }
                  }} onCancel={() => this.setState({contactModalVisible:false})} />
                </Modal>

                <FlatList data={data} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}
