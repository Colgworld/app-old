import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, Dimensions, TouchableOpacity, Modal, Animated, PushNotificationIOS, SafeAreaView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import _ from 'underscore'
import Feather from 'react-native-vector-icons/Feather'
import { Grid, Row, Col } from 'react-native-easy-grid'
// import LottieView from 'lottie-react-native';
var PushNotification = require('react-native-push-notification');
import LinearGradient from 'react-native-linear-gradient'

// Actions
import ProjectActions from 'App/Redux/ProjectRedux'
import AccountActions from 'App/Redux/AccountRedux'
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'
import DeviceActions from 'App/Redux/DeviceRedux'
import { NavigationActions } from 'react-navigation'

// Components
import ProjectCard from 'App/Components/Project/ProjectCard'
import Messages from 'App/Components/Project/Messages'
// import Media from 'App/Components/Project/Media'
import Files from 'App/Components/Project/Files'
import Milestones from 'App/Components/Project/Milestones'
import ChangeOrders from 'App/Components/Project/ChangeOrders'
import Members from 'App/Components/Project/Members'
import Header from 'App/Components/Header'
import EmptyState from 'App/Components/Common/EmptyState'
import IconButton from 'App/Components/Common/IconButton'

import { guid, getActiveProject } from 'App/Lib/Util'

// Styles
import styles from './Styles/ProjectDashboardScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'

import AppConfig from 'App/Config/AppConfig'
import Metrics from 'App/Themes/Metrics'
import Colors from 'App/Themes/Colors'

const { MESSAGE, FILE, PAYMENT, WORKING, COMPLETE, PENDING } = require("App/Config/Constants").default

const { PRO, HOMEOWNER } = require("App/Config/Constants").default

const subNav = [
    {
      key: "messages",
      title: 'Messages'
    },
    {
      key: "milestones",
      title: 'Milestones'
    },        
    {
      key: "files",
      title: 'Project Files'
    },
    {
      key: "change_orders",
      title: 'Change Orders'
    },
    {
      key: "members",
      title: 'Members'
    },
]

class ProjectDashboardScreen extends Component {

  static defaultProps = {
    activeNav: 'milestones',
    activeProject: {
      members: []
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Projects",
    tabBarLabel: "PROJECTS",
    header: null,
    // tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) === true,
    tabBarIcon: (props) => {

      let inactive = require('App/Images/lightgrey-logo.png')
      let active = require('App/Images/pink-logo.png')
      let image = (props.focused) ? active : inactive

      return (
      <Image name="home" style={{maxWidth: Metrics.tabIconSize, maxHeight: Metrics.tabIconSize, resizeMode: 'contain'}} source={image} />
      )
    }
  })

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
  }  

  state = {
    maxHeight: 300,
  };

  componentDidMount() {
    this.props.navigation.setParams({visible: false})
    // const setParamsAction = NavigationActions.setParams({hideTabBar: true, visible: false});
    // this.props.navigation.dispatch(setParamsAction);

    PushNotification.configure({
        onRegister: (token) => this.props.createDevice(token),
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            const { foreground, userInteraction, data, message } = notification

            if (foreground) {
              // dont interrupt user
            } else {
              // route to page in app
              switch(data.type) {
                case MESSAGE:
                  break
                case PAYMENT:
                  break
                case FILE:
                  break
                default:
                  break
              }

            }

            // process the notification

            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        senderID: "629653106338",
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },
        popInitialNotification: true,
        requestPermissions: true,
    }); 

  }

  _renderNavItem ({item, index}) {

    let slideStyle = (item.key == this.props.activeNav) ? styles.activeNav : styles.nav

    let onPress = () => {
      if (index < subNav.length-2) {
        // this._cNav.snapToItem(index, true, true)
      }
      this.props.setProjectNav(item.key)
    }

    extraStyle = (this.props.activeNav == item.key) ? styles.active : null
    extraTextStyle = (this.props.activeNav == item.key) ? styles.activeNavText : null

      return (
        <TouchableOpacity onPress={onPress} key={index}>
          <View style={[styles.navItem, extraStyle, globalStyles.centerContent, slideStyle]}>
            <Text style={extraTextStyle}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
  } 

  renderNavigation() {

    let ActiveNav
    if (!_.isNull(this.props.activeProject) && !_.isUndefined(this.props.activeProject)) {

      switch(this.props.activeNav) {
        case "messages":
          ActiveNav = <Messages {...this.props} />
          break;
        case "media":
          // ActiveNav = <Media {...this.props} />
          break;        
        case "milestones":
          ActiveNav = <Milestones {...this.props} />
          break;
        case "files":
          ActiveNav = <Files {...this.props} />
          break;        
        case "change_orders":
          ActiveNav = <ChangeOrders {...this.props} />
          break;
        case "members":
          ActiveNav = <Members {...this.props} />
          break;
      }

    }

    return (
          <Grid style={[styles.navigation]}>
            <Row>
              <Col>
                <Text style={[styles.title]}>Navigation</Text>

                <ScrollView horizontal 
                      showsHorizontalScrollIndicator={false} 
                      snapToAlignment={"end"} 
                      snapToInterval={20} 
                      contentInset={{top: 0, left: 5, bottom: 0, right: 5}} 
                      style={{maxHeight: 40,marginBottom:10}}>

                    {subNav.map((item,index) => this._renderNavItem({item,index}))}

                </ScrollView>

                {ActiveNav}

              </Col>
            </Row>
          </Grid>
    )
  }

  render () {
    const members = (!_.isNull(this.props.activeProject) && !_.isUndefined(this.props.activeProject)) ? this.props.activeProject.members: []

    const data = [
        {
          key: "messages",
          title: 'Messages'
        },
        {
          key: "milestones",
          title: 'Milestones'
        },        
        {
          key: "media",
          title: 'Photo/Video'
        },
        {
          key: "files",
          title: 'Project Files'
        },
        {
          key: "change_orders",
          title: 'Change Orders'
        },
        {
          key: "members",
          title: 'Members'
        },
    ]

    
    let Content = <Row size={85}>
                  <Col>

                    <Row size={40} onLayout={(e) => this.setState({maxHeight: e.nativeEvent.layout.height}) } >
                      <Col>
                        <IconButton icon="x" onPress={() => this.props.navigation.goBack()} 
                            containerStyle={styles.closeIcon} 
                            iconStyle={{color:Colors.white}} />

                        <ProjectCard 
                          project={this.props.activeProject}
                          disabled={true}
                          height={this.state.maxHeight} />

                      </Col>
                    </Row>

                    <Row size={60}>
                      {this.renderNavigation()}
                    </Row>

                  </Col>
                  </Row>


    if (_.isNull(this.props.projects.payload)) {
      Content = <Row size={85}>
                  <Col>
                    <EmptyState imageStyle={{maxHeight:100, maxWidth:100}} image={require("App/Images/no-projects.png")} buttonText="Create Project" onPress={() => this.props.navigation.navigate("ProjectWizardScreen")} />
                  </Col>
                </Row>
    }


    return (
      <Grid style={[styles.container]}>
        <Row>
          <Col>
            {Content}
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  activeProject = getActiveProject(state)
  return {
    projects: state.projects,
    activeProject: activeProject,
    activeProjectKey: state.projects.activeProjectKey,
    activeNav: state.projects.nav,
    account: state.account,
    tokens: state.projects.authTokens,
    fetching: state.projects.fetching,
    paymentSources: state.paymentSources.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentSources: () => dispatch(PaymentSourcesActions.getPaymentSourcesRequest()),
    verifyPaymentSource: (data) => dispatch(PaymentSourcesActions.verifyPaymentSourceRequest(data)),
    getProfile: () => dispatch(AccountActions.getProfileRequest()),
    getProjects: () => dispatch(ProjectActions.getProjectsRequest()),
    setProjectNav: (n) => dispatch(ProjectActions.setProjectNav(n)),
    setActiveChat: (t) => dispatch(ProjectActions.setActiveChat(t)),
    onPressMilestone: (d) => dispatch(ProjectActions.onPressMilestone(d)),
    saveAuthIntegrationToken: (data) => dispatch(ProjectActions.saveAuthIntegrationTokenRequest(data)),
    newMessageThread: (uuid, user) => dispatch(ProjectActions.newMessageThread(uuid, user)),
    createFile: (data) => dispatch(ProjectActions.createFileRequest(data)),
    updateChangeOrder: (data) => dispatch(ProjectActions.updateChangeOrderRequest(data)),
    createChangeOrder: (data) => dispatch(ProjectActions.createChangeOrderRequest(data)),
    sendPayment: (data) => dispatch(ProjectActions.sendPaymentRequest(data)),
    createDevice: (data) => dispatch(DeviceActions.createDeviceRequest(data)),
    saveInviteLink: (data) => dispatch(ProjectActions.saveInviteLinkRequest(data)),
    updateValue: (path, value) => dispatch(ProjectActions.updateValue(path, value)),
    resetChangeOrderForm: () => dispatch(ProjectActions.resetChangeOrderForm()),
    inviteUser: (data) => dispatch(ProjectActions.sendMemberInvitesRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboardScreen)
