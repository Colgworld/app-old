import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Image } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import styles from './Styles/MessagesStyle'
import _ from 'underscore'
import { GiftedAvatar } from 'react-native-gifted-chat'
import CircleBtn from 'App/Components/CircleBtn'


// Components
import ListItem from './ListItem'
import EmptyState from 'App/Components/Common/EmptyState'
import Colors from 'App/Themes/Colors'
import NewMessage from 'App/Components/Modals/NewMessage'
import NewMember from 'App/Components/Modals/NewMember'

import { guid } from 'App/Lib/Util'

export class MultiAvatar extends Component {

  static defaultProps = {
    avatars: []
  }

  render() {
    let colors = [Colors.red, Colors.orange, Colors.purple, Colors.eggplant, Colors.facebook, Colors.bloodOrange]
    let avatars = null

    if (!_.isNull(this.props.avatars)) {
      avatars = this.props.avatars.map((m,k) => {
          // max 3 overlapping avatars
          if (k > 2) {
            return
          }
          let offset = (k * 3) + 10
          let colorKey = k % 6
          return (
            <Col key={k} style={{position: 'absolute',left:offset}}>
              <GiftedAvatar user={{name:m.firstname + " " + m.lastname}} avatarStyle={{backgroundColor: colors[colorKey]}} />
            </Col>
          )
        })
    }

    return (
      avatars
    )
  }
}

export default class Messages extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  state = {
    isModalVisible: false
  }

  onButtonPress(users) {
    let uuid = guid()
    var usersInThread = []

    users.forEach((isSel, uid) => {
      this.props.activeProject.members.map((m, k) => {
        if (m.ID == uid) {
          usersInThread.push(m)
        }
      })      
    })
    
    this.setState({ isModalVisible: false })
    this.props.newMessageThread(uuid, usersInThread)
    this.props.navigation.navigate("ProjectChatScreen", { users: users, isNew: true })
  }

  renderItem(i) {
    const { item, index } = i
    source = item.images[0]
    let leftComponent = (!_.isNull(item.members) && !_.isUndefined(item.members) && item.members.length == 1) ? <GiftedAvatar user={{name:item.title}} /> : <MultiAvatar avatars={item.members} />
    switch(typeof(item.images[0])) {
      // image object
      case "number":
        source = item.images[0]
        break
      // image url
      case "string":
        source = {uri: item.images[0]}
        break
    }
    return (
      <Row style={styles.container}>
        <ListItem 
          key={index}
          leftComponent={leftComponent}
          title={item.title}
          summary={item.summary}
          rightComponent={<Text style={styles.date}></Text>}
          onPress={item.onPress} /> 
      </Row>     
    )
  }

  onListItemPress(key) {
    this.props.setActiveChat(key)
    this.props.navigation.navigate("ProjectChatScreen")
  }

  renderMessages() {

    message_threads = this.props.activeProject.message_threads
    let threads = []

    let onListItemPress = (k) => this.onListItemPress(k)
    if (!_.isUndefined(message_threads) && !_.isNull(message_threads)) {
      Object.keys(message_threads).map(function(key, index) {

          title = ""
          if (!_.isUndefined(message_threads[key].members) && !_.isNull(message_threads[key].members)) {
            title = (message_threads[key].members.length > 1) ? "You & " + message_threads[key].members.length + " others" : message_threads[key].members[0].firstname + " " + message_threads[key].members[0].lastname
          }

          if (!_.isUndefined(message_threads[key].messages[0])) {
            images = [
                    require("App/Images/default_chat_avatar.png")
                  ]
            let onPress = () => onListItemPress(key)
            threads.push({
                  title: title,
                  summary: message_threads[key].messages[0].text,
                  images: images,
                  date: "",
                  onPress: () => onPress(),
                  members: message_threads[key].members
                })
          }          
        })
    }

    let Messages = (threads.length == 0) ? <EmptyState image={null} text="You currently have no new messages." boldText="Simply start group or direct messages!" buttonText={null} /> : <FlatList data={threads} 
                  renderItem={(i) => this.renderItem(i)}
                  keyExtractor={(item, index) => index.toString()} />

    return (
      Messages
    )
  }

  renderModal() {
    let Modal
    if (_.isNull(this.props.activeProject.members) || this.props.activeProject.members.length == 0) {
      Modal = <NewMember 
                            close={() => this.setState({isModalVisible:false})} 
                            profile={this.props.account.profile}
                            project={this.props.activeProject}
                            onPress={(d) => this.props.saveInviteLink(d)}
                            visible={this.state.isModalVisible} />
    } else {
      Modal = <NewMessage 
                          visible={this.state.isModalVisible} 
                          members={this.props.activeProject.members}
                          close={() => this.setState({isModalVisible:false})} 
                          onButtonPress={(user) => this.onButtonPress(user)}
                          />          
    }

    return (
        Modal
    )
  }

  render () {
    return (
      <Grid>
        <CircleBtn onPress={() => this.setState({isModalVisible:true})} />
        {this.renderModal()}
        {this.renderMessages()}
      </Grid>
    )
  }
}
