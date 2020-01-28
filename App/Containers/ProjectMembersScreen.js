import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProjectActions from 'App/Redux/ProjectRedux'
import _ from 'underscore'

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather'
var Contacts = require('react-native-contacts')
import Communications from 'react-native-communications';
import FormButton from 'App/Components/FormButton'
import InviteContacts from 'App/Components/Project/InviteContacts'

// Styles
import styles from './Styles/ProjectMembersScreenStyle'
import Colors from 'App/Themes/Colors'
import globalStyles from 'App/Themes/GlobalStyles'
import { getActiveProject } from 'App/Lib/Util'

const { GO_BACK } = require("App/Config/Constants").default

class ProjectMembersScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Projects",
    tabBarLabel: "PROJECTS",
    header: null,
  })

  render() {
    return (
          <InviteContacts {...this.props}
            inviteUser={(data) => {
                this.props.inviteUser(data)
                this.props.navigation.goBack()
            }}
            onCancel={() => this.props.navigation.goBack()} />
    );
  }


}

const mapStateToProps = (state) => {
  activeProject = getActiveProject(state)
  return {
    account: state.account,
    project: activeProject,
    activeProject: activeProject,
    members: activeProject.members
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inviteUser: (data) => dispatch(ProjectActions.sendMemberInvitesRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMembersScreen)
