import React, { Component } from 'react'
import
{
  TouchableOpacity,
  Text, 
  BackHandler, 
  StatusBar, 
  NavigationExperimental, 
  Platform,
  ListView,
  ScrollView,
  Animated,
  Image,
  View,
  RefreshControl,
  KeyboardAvoidingView,
  Keyboard,
  PushNotificationIOS
}
from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProjectActions from 'App/Redux/ProjectRedux'
import AccountActions from 'App/Redux/AccountRedux'
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'
import DeviceActions from 'App/Redux/DeviceRedux'

import _ from 'underscore'

// Styles
import styles from './Styles/ProjectListScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'

import AppConfig from 'App/Config/AppConfig'
import Colors from 'App/Themes/Colors'


// import Animation from 'lottie-react-native';
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/Feather';
import { Col, Row, Grid } from 'react-native-easy-grid';
var PushNotification = require('react-native-push-notification');

import ProjectCard from 'App/Components/Project/ProjectCard'
import FormButton from 'App/Components/FormButton'
import ProjectListItem from 'App/Components/ProjectListItem'
import AppDrawer from 'App/Components/AppDrawer'
import Metrics from 'App/Themes/Metrics'
import Header from 'App/Components/Header'
import EmptyState from 'App/Components/Common/EmptyState'

class ProjectListScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Projects",
    tabBarLabel: "PROJECTS",
    header: null,
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
    StatusBar.setBarStyle('dark-content', true);

    this.state = {
      loaded: false
    }
  }  

  _onRefresh() {
    this.props.getProjects()
  }  

  componentDidMount() {

    Keyboard.dismiss()
    this.props.navigation.setParams({visible: true})

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

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "629653106338",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });

    this.setState({loaded:true})
    //.then((r) => {})
    // this.props.navigation.setParams({ title: "Hi, " + this.props.account.profile.firstname + '!' })
  }

  render () {

    let projects
    let Loader
    if (!_.isNull(this.props.projects)) {
      projects = this.props.projects.map((p,k) => {
        if (p.project.ID != 0) {
          return (
            <ProjectCard key={k} project={p} onPress={() => {
              this.props.setActive(p, k)
            }} />
          )
        }
      })      
    }

    let Content = <ScrollView contentInset={{top: 0, left: 0, bottom: 100, right: 0}} 
                    refreshControl={
                      <RefreshControl
                        enabled={this.state.loaded}
                        refreshing={this.props.fetching}
                        onRefresh={() => this.props.getProjects()}
                      /> }>
                    {projects}
                  </ScrollView>

    if (this.props.fetching) {
      // Loader = <Text>Fetching Projects</Text>
    } else if (_.isNull(this.props.projects)) {
      Content = <EmptyState imageStyle={{maxHeight:100, maxWidth:100}} image={require("App/Images/no-projects.png")} buttonText="Start A Project" onPress={() => this.props.navigation.navigate("ProjectWizardScreen")} />
    }

    return (
      <Grid style={styles.container}>
          <Row size={15}>
            <Header title={'Projects'} leftIcon={null} titleAlign="left" rightIcon={'plus'} onPressRight={() => this.props.navigation.navigate("ProjectWizardScreen")}/>
          </Row>
          <Row size={85} style={globalStyles.content}>
            {Loader}
            {Content}
          </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    projects: state.projects.payload,
    fetching: state.projects.fetching,
    device: state.device
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentSources: () => dispatch(PaymentSourcesActions.getPaymentSourcesRequest()),
    getProfile: () => dispatch(AccountActions.getProfileRequest()),
    getProjects: () => dispatch(ProjectActions.getProjectsRequest()),
    setActive: (p, k) => dispatch(ProjectActions.setActive(p, k)),
    createDevice: (data) => dispatch(DeviceActions.createDeviceRequest(data)),
    // getDevices: () => dispatch(DeviceActions.getDevicesRequest())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListScreen)
