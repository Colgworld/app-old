import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProjectActions from '../Redux/ProjectRedux'
import { NavigationActions } from 'react-navigation'
import { Grid, Row, Col} from 'react-native-easy-grid'

// Styles
import styles from './Styles/ProjectPaymentsScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

import PaymentMilestones from 'App/Components/Project/PaymentMilestones'
import ChangeOrders from 'App/Components/Project/ChangeOrders'
import PaymentForm from 'App/Components/ProjectViewer/PaymentForm'
import FormButton from 'App/Components/FormButton'
import { getActiveProject } from 'App/Lib/Util'


import _ from 'underscore'
const {
  PRO,
  HOMEOWNER
} = require("App/Config/Constants").default

class ProjectPaymentsScreen extends Component {

  state = {
    modalVisible: false,
    payablePayment: null,
    selectedSource: null,
    hasVerifiedPaymentSource: false,
    mounted: false
  }

  componentDidMount() {
    this.checkPaymentSources()
    this.setState({mounted:true})
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mounted) {
      this.checkPaymentSources()
    }
  }

  checkPaymentSources() {

    if (!_.isNull(this.props.paymentSources)) {
      bas = this.props.paymentSources.bankAccounts
      ccs = this.props.paymentSources.creditCards
      type = this.props.account.profile.type

      // hasPaymentSource = ((!_.isNull(bas) && type == PRO) || ((!_.isNull(ccs) || !_.isNull(bas)) && type != HOMEOWNER)) ? true : false
      hasVerifiedPaymentSource = false
      if (!_.isNull(bas)) {
        for (var i = bas.length - 1; i >= 0; i--) {   
          if (bas[i].verified) {
            hasVerifiedPaymentSource = true
          }
        }      
      }
      if (!_.isNull(ccs)) {
        for (var i = ccs.length - 1; i >= 0; i--) {   
          if (ccs[i].verified) {
            hasVerifiedPaymentSource = true
          }
        }  
      }

      this.setState({hasVerifiedPaymentSource})      
    }

  }

  // Requests payment
  setProgress(payment, status, paymentKey) {

    if (this.state.hasVerifiedPaymentSource) {
      this.props.updateValue(['payload', this.props.activeProjectKey, 'payments', paymentKey, 'status'], status);
      this.props.updateValue(['activeProject', 'payments', paymentKey, 'status'], status);
      
      payment_update = payment.asMutable()
      payment_update.status = status
      this.props.updatePayment(payment_update)         
     
    } else {
      this.props.navigation.navigate("AddPaymentMethodScreen")
    }

  }

  // Update change order after edit
  onChangeOrderDone(vals) {
    if (!_.isUndefined(vals.ID)) {
      this.props.updateChangeOrder(vals)
    } else {
      vals['project_id'] = this.props.project.project.ID
      this.props.createChangeOrder(vals)    
    }
  }

  // When user goes to pay for requested payment
  onPayNowPress(payment) {
    this.setState({
      modalVisible: true,
      payablePayment: payment, 
    })    
  }


  // Sets payment source to be used for payments
  setSelectedPaymentSource(source) {
    this.setState({ selectedSource: source })
  }

  sendPayment() {

    this.setState({ modalVisible: false })
    var payload = {
      project_id: this.props.project.project.ID,
      source_id: this.state.selectedSource.source_id,
      payment_id: this.state.payablePayment.ID,
      to_user_id: this.props.project.members[0].ID
    }

    this.props.sendPayment(payload)
  }


  render () {

    let NoVerify = <Row>
                      <Col>
                        <Text style={globalStyles.content}>You have no verified Payment Methods. You must be verified to send or accept payment</Text>
                        <FormButton buttonText="Manage Payment Methods"
                          onPress={() => this.props.navigation.navigate("ManagePaymentsScreen")} />
                      </Col>
                  </Row>

    noPaymentSourcesMsg = (!this.state.hasVerifiedPaymentSource) ? NoVerify : null

    return (
      <ScrollView style={[styles.container]}>
        <KeyboardAvoidingView behavior='position'>
          <Grid>
            <Row >
              <Col style={{padding: 10}}>
                {noPaymentSourcesMsg}
                <PaymentMilestones 
                  onPaymentPress={(payment, status, key) => this.setProgress(payment, status, key)} 
                  onPayNowPress={(data) => this.onPayNowPress(data)}
                  paymentSources={this.props.paymentSources}
                  type={this.props.account.profile.type} 
                  isDisabled={!this.state.hasVerifiedPaymentSource}
                  payments={this.props.project.payments}  />
              </Col>
            </Row>
            {/*<Row >
              <Col>
                <ChangeOrders
                  onPress={(vals) => this.onChangeOrderDone(vals)}
                  type={this.props.account.profile.type}
                  project_id={this.props.project.project.ID}
                  changeOrders={this.props.project.changeOrders} />
              </Col>
            </Row>*/}
          </Grid>

          <Modal
            animationType={"slide"}
            transparent={false}
            onRequestClose={() => this.setState({ modalVisible: false })}
            visible={this.state.modalVisible}>

            <PaymentForm
              payablePayment={this.state.payablePayment}
              onPaymentSourcePress={(data) => this.setSelectedPaymentSource(data)}
              paymentSources={this.props.paymentSources}
              navigate={(data) => this.props.navigate(data)}
              onPress={() => this.sendPayment()}
              cancel={() => this.setState({ modalVisible: false })}
            />
          </Modal>    

        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  activeProject = getActiveProject(state)
  return {
    account: state.account,
    project: activeProject,
    activeProjectKey: state.projects.activeProjectKey,
    paymentSources: state.paymentSources.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (path, value) => dispatch(ProjectActions.updateValue(path, value)),
    updatePayment: (data) => dispatch(ProjectActions.updatePaymentRequest(data)),
    createChangeOrder: (data) => dispatch(ProjectActions.createChangeOrderRequest(data)),
    updateChangeOrder: (data) => dispatch(ProjectActions.updateChangeOrderRequest(data)),
    sendPayment: (data) => dispatch(ProjectActions.sendPaymentRequest(data)),
    navigate: (data) => dispatch(NavigationActions.navigate(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPaymentsScreen)
