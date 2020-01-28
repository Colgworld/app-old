import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProjectWizardActions from 'App/Redux/ProjectWizardRedux'
import ProjectActions from 'App/Redux/ProjectRedux'
import _ from 'underscore'
import moment from 'moment'

// Components
import Start from 'App/Components/ProjectWizard/Start'
import Invite from 'App/Components/ProjectWizard/Invite'
import Payments from 'App/Components/ProjectWizard/Payments'
import FormButton from 'App/Components/FormButton'
import TabBar from 'App/Components/TabBar'
import Header from 'App/Components/Header'
import InProgress from 'App/Components/Common/InProgress'

// Styles
import styles from './Styles/ProjectWizardScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import { getActiveProject } from 'App/Lib/Util'


const { PRO, HOMEOWNER } = require('App/Config/Constants').default
import AppConfig from 'App/Config/AppConfig'

class ProjectWizardScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      setup_payment: false,
      image: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    onPress = (!_.isUndefined(navigation.state.params)) ? navigation.state.params.handleBack : null
    // headerLeft = <TabIcon name={AppConfig.backIcon} onPress={onPress} color={Colors.darkPurple} />
    // title = (!_.isUndefined(navigation.state.params)) ? navigation.state.params.title : "Start New Project"

    return {
      header: null,
    } 
  };

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    this.props.updateForm(["form", "accountType"], nextProps.account.profile.type)
  }

  _keyboardDidShow (e) {
    // this.props.navigation.setParams({ header: null })
    switch (this.props.form.activeStep) {
      case "invite":
      case "start":
      case "payments":
        this.setState({ paddingTop: 80, paddingBottom: 100 })
        break
    }
  }

  _keyboardDidHide () {
    this.setState({ paddingTop: 0, paddingBottom: 0 })
  } 

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    this.props.navigation.setParams({ handleBack: () => this.handleBack(), title: "New Project", buttonText: "Next" })
    
    // Add deposit as default
    if (this.props.account.profile.type == PRO) {
      this.props.updatePayment({
        title: 'Deposit',
        amount: 0,
        description: "Due before work begins",
        delta: 0
      })
    }

    if (!_.isUndefined(this.props.navigation.state.params) && this.props.navigation.state.params.setup_payment) {
      this.props.updateForm(["form", "activeStep"], "payments")
      this.setState({setup_payment:true})
    }

  }


  handleNext() {
    switch(this.props.form.activeStep) {
      case "start":
        if (this.props.account.profile.type == PRO) {
          this.props.updateForm(['form', 'activeStep'], 'payments')
        } else {
          this.props.createProject({...this.props.form, image: this.state.image})
        }
        break;
      // case "invite":
      //   this.props.navigation.setParams({ buttonText: 'Finish' })
      //   this.props.updateForm(['form', 'activeStep'], 'payments')
      //   break;
      case "payments":
        if (this.state.setup_payment && !_.isNull(this.props.activeProject)) {
          this.props.updateProject({
            ...this.props.form, 
            project: this.props.activeProject.project
          })
        } else {
          this.props.createProject({...this.props.form, image: this.state.image })
        }
        // this.props.navigation.navigate("ProjectListScreen")
        break;
    }
    this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: false });

  }



  resetProjectWizard() {
    this.props.navigation.navigate("DashboardScreen")
    this.props.resetProjectWizard()
  }

  handleBack() {
    switch(this.props.form.activeStep) {
      case "start":
        if (this.props.inProgress) {
          Alert.alert(
            'Cancel Project?',
            "You haven't completed setting up your project. If you leave now it'll be deleted forever. Are you sure?",
            [
              {text: 'Delete It', onPress: () => {this.props.resetProjectWizard(); this.props.navigation.goBack()}, style: 'cancel'},
              {text: 'Cancel', onPress: () => {} },
            ],
            { cancelable: false }
          )
        } else {
          // onPress{() => goBack('HomeScreen')}
          this.props.navigation.navigate('ProjectListScreen')
        }
        break;
      // case "invite":
      //   this.props.updateForm(['form', 'activeStep'], 'start')
      //   break;
      case "payments":
        this.props.navigation.setParams({ buttonText: 'Finish' })
        if (!_.isNull(this.props.activeProject) && (!_.isNull(this.props.activeProject.payments) && this.props.activeProject.payments.length == 0)) {
          this.props.navigation.goBack()
        } else {
          this.props.updateForm(['form', 'activeStep'], 'start')
        }
        break;
    }
  }

  getButtonText() {
    
    let text = "Next"
    switch(this.props.form.activeStep) {
      case "start":
        text = (this.props.account.profile.type == PRO) ? text : "Create Project"
        break;
      case "payments":
        text = "Finish"
        break
    }


    return text
  }

  render () {

    let btnStyle = (this.props.error) ? styles.disabledBtn : styles.enabledBtn 
    // let buttonText = "Next"
    let title = "New Project"
    let buttonText = this.getButtonText()
    let rightIcon = AppConfig.backIcon

    let footer = (!this.props.fetching) ? <FormButton 
                  buttonText={buttonText}
                  btnStyle={[btnStyle, {marginTop: 10}]}
                  onPress={() => this.handleNext()}
                  isDisabled={this.props.disabledBtn} /> : <InProgress message={"Please hold while we setup your project\n" + this.props.form.project.name.toUpperCase()} />

    let projectWizard = () => {
        switch (this.props.form.activeStep) {
          case 'start':
            title = "New Project"
            return <Start {...this.props} setImage={image => this.setState({image})} image={this.state.image} />
            break;
          // case 'invite':
          //   return  <Invite 
          //             ref="pws2"
          //             form={this.props.form} 
          //             onMount={() => ProjectWizardActions.projectWizardCheckValidated()}
          //             updateForm={this.props.updateForm} />
          //   break;
          case 'payments':
            title = this.props.form.project.name
            rightIcon = (!this.state.setup_payment) ? rightIcon : AppConfig.closeIcon
            // footer = null
            return <Payments 
                      form={this.props.form} 
                      onMount={() => ProjectWizardActions.projectWizardCheckValidated()}
                      updateForm={this.props.updateForm}
                      updateActivePayment={(f,v) => this.props.updateActivePayment(f,v)}
                      updatePayment={() => this.props.updatePayment(this.props.form.activePayment)} />
            break;
        }
    }

    return (
          <Grid style={styles.container}>
            <Row size={15}>
              <Header 
                  rightIcon={rightIcon} 
                  onPressRight={onPress} 
                  title={title} 
                  titleAlign="left" 
                  titleStyle={{}}/>
            </Row>            
            <Row size={85}>
              <ScrollView ref="scrollView">
                <KeyboardAvoidingView 
                  ref="pwKeyboard" 
                  behavior="padding" 
                  keyboardVerticalOffset={64}
                  >
                  <Col style={globalStyles.content}>
                    {projectWizard()}
                    {footer}

                  </Col>


                </KeyboardAvoidingView>
              </ScrollView>
            </Row>
          </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  activeProject = getActiveProject(state)
  return {
    form: state.projectWizard.form,
    account: state.account,
    disabledBtn: state.projectWizard.disabledBtn,
    inProgress: state.projectWizard.inProgress,
    activeProject: activeProject,
    fetching: state.projectWizard.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (field, value) => dispatch(ProjectWizardActions.projectWizardUpdateForm(field, value)),
    updateActivePayment: (field, value) => dispatch(ProjectWizardActions.projectWizardActivePayment(field, value)),
    updatePayment: (payment) => dispatch(ProjectWizardActions.projectWizardUpdatePayment(payment)),
    createProject: (data) => dispatch(ProjectWizardActions.createProjectRequest(data)),
    updateProject: (data) => dispatch(ProjectActions.updateProjectRequest(data)),
    sendInvite: (data) => dispatch(ProjectWizardActions.sendInviteRequestBySMS(data)),
    resetProjectWizard: () => dispatch(ProjectWizardActions.resetProjectWizard()),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWizardScreen)
