import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import styles from './Styles/MembersStyle'
import ListItem from 'App/Components/Project/ListItem'
import EmptyState from 'App/Components/Common/EmptyState'
import _ from 'underscore'
import { GiftedAvatar } from 'react-native-gifted-chat'
import { Grid, Row, Col } from 'react-native-easy-grid'
import CircleBtn from 'App/Components/CircleBtn'
import NewMember from 'App/Components/Modals/NewMember'

import globalStyles from 'App/Themes/GlobalStyles'

export default class Members extends Component {

  static defaultProps = {
    members: []
  }

  state = {
    isModalVisible: false
  }

  renderItem(i) {
    const { item, index } = i
    return (
        <ListItem 
          key={index}
          leftComponent={<GiftedAvatar user={{name:item.title}} />}
          isDisabled ={item.isDisabled}
          title={item.title}
          summary={item.summary}
          rightText={item.rightText}
          rightTextStyle={item.rightTextStyle}
          rightComponent={item.rightComponent}
          onPress={item.onPress} />
    )
  }

  renderMembers() {

    let image = require('App/Images/default_profile.png')
    let Members

    if (!_.isNull(this.props.activeProject) && !_.isNull(this.props.activeProject.members) && this.props.activeProject.members.length > 0) {
      members = this.props.activeProject.members.map((m,k) => {
        return {
          key: null,
          image: image,
          isDisabled: true,
          title: m.firstname + " " + m.lastname,
          summary: m.type,
          rightComponent: <Text></Text>,
          onPress: null,
        }
      })       
    
      Members = <FlatList 
                  data={members} 
                  renderItem={(i) => this.renderItem(i)}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()} />

    } else {
      Members = <EmptyState text="Looks like you're the first one here." boldText="Invite collaborators via email and more!" buttonText={null} image={null} />
    }

    return (
      Members
    )
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col>

            <CircleBtn onPress={() => this.setState({isModalVisible:true})} />
            
            <NewMember 
              {...this.props}
              close={() => this.setState({isModalVisible:false})} 
              profile={this.props.account.profile}
              project={this.props.activeProject}
              onPress={(d) => this.props.saveInviteLink(d)}
              visible={this.state.isModalVisible} />

            {this.renderMembers()}
          </Col>
        </Row>
      </Grid>
    )
  }
}
