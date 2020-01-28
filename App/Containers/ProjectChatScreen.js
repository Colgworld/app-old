import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Keyboard, Image, View, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import MessageActions from '../Redux/MessageRedux'
import ProjectActions from '../Redux/ProjectRedux'
import _ from 'underscore'

import Colors from 'App/Themes/Colors'

import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import { Grid, Row, Col } from 'react-native-easy-grid'

import SlackMessage from 'App/Components/Chat/SlackMessage'
import InputToolbar from 'App/Components/Chat/InputToolbar'
import IconButton from 'App/Components/Common/IconButton'
// Styles
import styles from './Styles/ProjectChatScreenStyle'
import ChatCustomActions from 'App/Components/Chat/ChatCustomActions'
import Header from 'App/Components/Header'
import AppConfig from 'App/Config/AppConfig'

import { getActiveProject } from 'App/Lib/Util'

class ProjectChatScreen extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    interval: null,
    formData: null,
    text: '',
    isNew: false
    // minInputToolbarHeight: 45,
  }

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidMount() {
    let state = this.props.navigation.state
    let isNew = (!_.isUndefined(state.params) && 
                    !_.isUndefined(state.params.isNew) &&
                    state.params.isNew) ? true : false

    this.setState({isNew: isNew})
  }

  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    // if (currText && emojiUtils.isPureEmojiString(currText)) {
    //   messageTextStyle = {
    //     fontSize: 28,
    //     // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
    //     lineHeight: Platform.OS === 'android' ? 34 : 30,
    //   };
    // }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  // renderCustomActions(props) {
  //   if (this.props.project && !_.isNull(this.props.project.members)) {
  //     return (
  //       <ChatCustomActions 
  //         {...props} 
  //         setImage={(f) => this.setState({ formData: f })}
  //         account={this.props.account}
  //         project={this.props.project}
  //         toUserID={this.props.project.members[0].ID}
  //       />
  //     );
  //   }
  // }

  renderInputToolbar(props) {
    let state = this.props.navigation.state

    // if it's a new message thread
    const isNew = this.state.isNew


    if (this.props.project && !_.isNull(this.props.project.members)) {

      to_user_ids = []
      if (isNew) {
        state.params.users.forEach((isSel,uid) => {
          if (isSel) {
            to_user_ids.push(uid)
          }
        })
      }

      let messagePayload = { 
        text: props.text,
        user: props.user,
        _id: Math.round(Math.random() * 1000000),
        is_new: isNew,
        project_id: this.props.project.project.ID,
        to_user_ids: to_user_ids,
        from_user_id: this.props.account.profile.ID
      }

      return (
        <InputToolbar 
          {...props}
          onActionsPress={(data) => this.setState({ formData: data })}
          onSend={() => {
            this.setState({ isNew: false })
            props.onSend([messagePayload], true )
          }} />
      )
    }
  }

  // Image Preview
  renderChatFooter(props) {
    let imagePreview
    let maxHeight = 0
    if (!_.isNull(this.state.formData)) {
      let image = "data:image/png;base64," + this.state.formData["_parts"][0][1].data

      maxHeight = 140
      imagePreview = <Row style={styles.imagePreview}>
                        <Col size={40}>
                          <IconButton 
                              onPress={() => this.setState({formData:null})} 
                              icon={AppConfig.closeIcon} 
                              iconStyle={styles.imgPrevIcon} 
                              iconBtnStyle={styles.imgPreviewCloseBtn}
                              iconSize={16}
                              containerStyle={styles.imgPrevContainer} />
                          <Image source={{ uri: image }} style={{ height: 120, width: 120 }} />
                        </Col>
                        <Col size={60}>
                          <Text>Add an optional message and tap 'Send'</Text>
                        </Col>
                    </Row>

    }    
    return (
      <Grid style={{maxHeight: maxHeight}}>
        {imagePreview}
      </Grid>
    )
  }

  // renderMessage(props) {
  //   return (
  //     <View>
  //       <Text>{props.currentMessage.text}</Text>
  //     </View>
  //   )
  // }

  // renderBubble(props) {
  //   return (
  //     <Bubble
  //       {...props}
  //       wrapperStyle={{
  //         left: {
  //           backgroundColor: Colors.lightGray,
  //         },
  //         right: {
  //           backgroundColor: Colors.darkPurple2,
  //         }
  //       }}
  //     />
  //   );
  // }  

  onSend(messages) {

    messages[0].thread_id = this.props.activeChat

    if (messages[0].isNew) {
      this.props.navigation.setParams({ isNew: false })
    }

    if (!_.isNull(this.state.formData) || messages[0].text.trim().length > 0) {
      if (!_.isNull(this.state.formData)) {
        this.props.createMessage({
          image: this.state.formData,
          message: messages[0]
        })
        this.setState({ formData: null })
      } else {
        members = []
        this.props.project.members.map((m,k) => {
          if (messages[0].to_user_ids.indexOf(m.ID) != -1) {
            members.push(m)
          }
        })
        this.props.createMessage({message: messages[0]}, members)
      }
    }

  }

  renderTitle() {
    let params = this.props.navigation.state.params
    let chatTitleValue = (!_.isUndefined(this.props.members[0])) ? this.props.members[0].firstname : ""
    chatTitleValue = (this.props.members.length > 1) ? "You & " + this.props.members.length + " Others" : chatTitleValue
    let chatTitle = (!_.isUndefined(params) && !_.isUndefined(params.users) && params.isNew) ? "New message" : chatTitleValue

    return (
      chatTitle
    )
  }

  render () {

    logged_in_user_id = this.props.account.profile.ID
    logged_in_user_name = this.props.account.profile.firstname


    user = {
      _id: logged_in_user_id,
      name: logged_in_user_name,
      firstname: this.props.account.profile.firstname,
      lastname: this.props.account.profile.lastname,
    }

    let messages
    if (!_.isNull(this.props.messages) && !_.isNull(this.props.project.members) && !_.isUndefined(this.props.messages)) {
      
      messages = this.props.messages.map((m, k) => {

        let from_user_name
        let from_user_id
        // @TODO support multiple members
        if (m.from_user_id == this.props.account.profile.ID) {
          from_user_name = this.props.account.profile.firstname + " " + this.props.account.profile.lastname
          from_user_id = this.props.account.profile.ID          
        } else {
          this.props.members.map((mem, i) => {
            if (mem.ID == m.from_user_id) {
              from_user_name = mem.firstname + " " + mem.lastname
            }
          })
          from_user_id = m.from_user_id
        }
        let imageProps = (m.attachment.ID != 0) ? {image: m.attachment.filename} : {}
        return {
            _id: k,
            text: m.text,
            createdAt: m.CreatedAt,
            user: {
              _id: from_user_id,
              name: from_user_name,
            },
            ...imageProps
          }
      })
    }

    let title = this.renderTitle()

    return (
        <Grid style={styles.container}>
          <Row size={15}>
            <Header 
              title={title} 
              titleStyle={styles.title} 
              leftIcon={AppConfig.backIcon} 
              onPressLeft={() => this.props.navigation.goBack()} 
              rightIcon={null} />
            </Row>
            <Row size={85}>
            <GiftedChat
              style={{}}
              messages={messages}
              inverted={true}
              showUserAvatar={true}
              minInputToolbarHeight={65}
              renderInputToolbar={this.renderInputToolbar.bind(this)}
              renderChatFooter={this.renderChatFooter.bind(this)}
              onSend={(messages) => this.onSend(messages)}
              user={user}
            />
            </Row>
        </Grid>

    )
  }
}

const mapStateToProps = (state) => {
  let activeProject = getActiveProject(state)
  let messages = (!_.isUndefined(activeProject.message_threads[state.projects.activeChat])) ? activeProject.message_threads[state.projects.activeChat].messages : []
  let members = (!_.isUndefined(activeProject.message_threads[state.projects.activeChat])) ? activeProject.message_threads[state.projects.activeChat].members : []
  return {
    messages: messages,
    activeChat: state.projects.activeChat,
    members: members,
    project: activeProject,
    account: state.account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (data, members) => dispatch(ProjectActions.createMessageRequest(data, members)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectChatScreen)
