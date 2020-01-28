import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal } from 'react-native'
import styles from './Styles/ChangeOrderStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'
import Icon from 'react-native-vector-icons/Feather'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import Form from 'App/Components/Common/Form'
import AppConfig from 'App/Config/AppConfig'
import globalStyles from 'App/Themes/GlobalStyles'
import MemberList from 'App/Components/Project/MemberList'
import PaymentSourcesList from 'App/Components/Payments/PaymentSourcesList'

const { PRO, HOMEOWNER, APPROVED, PAID, DECLINED, AWAITING_APPROVAL, PENDING } = require("App/Config/Constants").default

export default class ChangeOrder extends Component {
  // // Prop type warnings
  static propTypes = {
    visible: PropTypes.bool,
    paymentSources: PropTypes.object,
    onPaymentPress: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    visible: false,
    close: () => {},
    onMemberPress: (s) => {},
    onPaymentPress: (s) => {},
  }

  state = {
    visible: false,
    selected: null,
    activeStep: 0,
    selectedMembers: (new Map(): Map<string, boolean>)
  }

  close() {
    this.setState({visible:false,activeStep:0,selected:null})
    this.props.resetChangeOrderForm()
    this.props.close()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible })
  }

  onPaymentPress(selected) {
    this.setState({selected: selected})
    this.props.onPaymentPress(selected)
  }

  onMemberPress(selected) {
    this.setState({selected})
    this.props.onMemberPress(selected)
  }

  approveAndPay(status = APPROVED) {
    const payload = {
      ...this.props.projects.changeOrder,
      status: status,
      paymentSource: this.state.selected
    }
    this.close()
    this.props.updateChangeOrder(payload)
  }

  getTitle() {
    let step = this.state.activeStep
    let co = this.props.projects.changeOrder

    let reviewTxt = "Review Change Order"
    let editTxt = "Edit Change Order"
    let newTxt = "New Change Order"

    // Guy who created change order
    let is_pro = (this.props.account.profile.type == PRO) ? true : false
    let existingCO = !_.isUndefined(co.ID)
    let title = (is_pro) ? newTxt : reviewTxt
    let is_edit = existingCO && is_pro
    // headerTitle = (!is_pro || !_.isUndefined(this.props.projects.changeOrder.ID)) ? "Review Change Order" : "Review Change Order" // @TODO tmp fix
    switch(step) {
      case 0:
        switch(co.status) {
          case "":
            title = (is_pro) ? newTxt : reviewTxt
            break
          case AWAITING_APPROVAL:
            title = (is_pro) ? editTxt : reviewTxt
            break
          default:
            title = co.title
        }
        break
      case 1:
        title = (is_pro && is_edit) ? editTxt : reviewTxt
        break
      case 2:
        title = (is_pro && is_edit) ? editTxt : reviewTxt
        break

    }
    return title
  }

  renderActionButton() {
    let co = this.props.projects.changeOrder
    let is_pro = (this.props.account.profile.type == PRO) ? true : false
    let is_awaiting_approval = (this.props.projects.changeOrder.status == AWAITING_APPROVAL) ? true : false
    let is_approved = (this.props.projects.changeOrder.status == APPROVED) ? true : false
    let is_declined = (this.props.projects.changeOrder.status == DECLINED) ? true : false
    let is_paid = (this.props.projects.changeOrder.status == PAID) ? true : false
    let is_new = (this.props.projects.changeOrder.status == "") ? true : false
    let existingCO = !_.isUndefined(co.ID)
    let ActionButton = null
    let onActionPress = () => this.setState({ activeStep: this.state.activeStep + 1 })
    let instPmtTxt = (co.immediate) ? " & Pay" : ""
    // VALIDATION
    let isDisabled = (co.title == "" || co.description == "") ? true : false

    switch(this.state.activeStep) {
      case 0:
        let collabText = (is_approved) ? "Select Payment" : "Approve" + instPmtTxt
        actionBtnText = (is_pro) ? "Next" : collabText
        actionBtnStyle = (!is_pro) ? globalStyles.greenButton : globalStyles.button
        onActionPress = (is_pro || (!is_pro && co.status == APPROVED)) ? onActionPress : () => this.approveAndPay()
        ActionButton = <FormButton buttonText={actionBtnText} onPress={onActionPress} btnStyle={actionBtnStyle} isDisabled={isDisabled} />
        if ((is_approved && co.cost == 0) || is_paid || (is_approved && is_pro) || is_declined) {
          ActionButton = null
        }
        break
      case 1:
        actionBtnText = (is_pro) ? "Review Change Order" : "Pay Now"
        actionBtnStyle = (!is_pro) ? globalStyles.greenButton : globalStyles.button
        isDisabled = (!_.isNull(this.state.selected)) ? false : true
        onActionPress = (is_pro) ? onActionPress : () => this.approveAndPay()
        ActionButton = <FormButton buttonText={actionBtnText} onPress={onActionPress} btnStyle={actionBtnStyle} isDisabled={isDisabled} />
        break
      case 2:
        actionBtnText = "Send for Approval"
        actionBtnStyle = globalStyles.greenButton
        ActionButton = <FormButton buttonText={actionBtnText} 
                              onPress={() => {
                                this.close()
                                this.props.createChangeOrder({
                                  project_id: this.props.activeProject.project.ID,
                                  ...this.props.projects.changeOrder,
                                  status: AWAITING_APPROVAL,
                                  cost: Number(this.props.projects.changeOrder.cost)
                                })
                              }} 
                              btnStyle={actionBtnStyle} 
                              isDisabled={isDisabled} />
        break
    }
    
    return ActionButton
  }

  renderSubActionButton() {
    let co = this.props.projects.changeOrder
    let onActionPress = () => this.setState({ activeStep: this.state.activeStep - 1 })
    let actionBtnText = "Cancel"
    let is_pro = (this.props.account.profile.type == PRO) ? true : false
    let is_approved = (this.props.projects.changeOrder.status == APPROVED) ? true : false
    let is_declined = (this.props.projects.changeOrder.status == DECLINED) ? true : false
    let is_paid = (this.props.projects.changeOrder.status == PAID) ? true : false
    let is_new = (this.props.projects.changeOrder.status == "") ? true : false
    let btnStyle = globalStyles.invButton
    let textStyle = globalStyles.darkPurple

    switch(this.state.activeStep) {
      case 0:
        onActionPress = (is_paid || is_approved || is_declined) ? () => this.close() : () => this.approveAndPay(DECLINED)
        let proText = ((is_approved && co.cost == 0) || is_paid || is_approved || is_declined) ? "Done" : "Cancel"
        let collabText = (!is_approved && !is_paid) ? "Decline" : "Done"
        let collabBtnStyle = (!is_approved && !is_paid) ? globalStyles.redButton : btnStyle
        let collabTextStyle = (is_approved || is_paid) ? textStyle : globalStyles.red
        actionBtnText = (is_pro) ? proText : collabText
        btnStyle = (is_pro) ? btnStyle : collabBtnStyle
        textStyle = (is_pro) ? textStyle : collabTextStyle
        break
      case 1:
        actionBtnStyle = (is_pro) ? {} : globalStyles.greenButton
        actionBtnText = "Back"
        break
      case 2:
        actionBtnText = "Back"
    }

    return (
      <FormButton buttonText={actionBtnText} onPress={onActionPress} btnStyle={btnStyle} textStyle={textStyle} />
    )
  }

  renderContent() {

    let co = this.props.projects.changeOrder
    // let is_mine_not_approved = (co.created_by == this.props.account.profile.ID && co.status == AWAITING_APPROVAL) ? true : false
    let editable = (this.state.activeStep > 0 || !_.isUndefined(co.ID)) ? false : true
    let form = [
      {
        title: "Change Order Name",
        placeholder: "Change Order #1",
        refName: "title",
        onSubmitEditing: () => this.form.refs.changeOrderForm.refs.description.focus(),
        value: this.props.projects.changeOrder.title,
        returnKeyType: 'next',
        autoCapitalize: 'words',
        onTextChange: (text) => this.props.updateValue(['changeOrder', 'title'], text),
        editable: editable
      },
      {
        title: "Description of Changes",
        placeholder: "Description of Change Order #1",
        refName: "description",
        value: this.props.projects.changeOrder.description,
        returnKeyType: 'done',
        multiline: true,
        onSubmitEditing: () => this.form.refs.changeOrderForm.refs.cost.focus(),
        numberOfLines: 1,
        autoCapitalize: 'sentences',
        onTextChange: (text) => this.props.updateValue(['changeOrder', 'description'], text),
        editable: editable
      },
      {
        title: "Price Change Increase",
        placeholder: "",
        refName: "cost",
        onSubmitEditing: () => this.form.refs.changeOrderForm.refs.cost.blur(),
        value: this.props.projects.changeOrder.cost.toString(),
        returnKeyType: 'done',
        leftIcon: <Icon name={AppConfig.moneyIcon} />,
        keyboardType: 'numeric',
        selectTextOnFocus: true,
        onTextChange: (text) => this.props.updateValue(['changeOrder', 'cost'], text),
        editable: editable
      }
    ]

    let ChangeOrderForm = <Form ref={r => this.form = r} refName="changeOrderForm" formItems={form} errorMsg={this.props.errorMsg} />


    let Content
    switch(this.state.activeStep) {
      case 0:
        Content = ChangeOrderForm
        break
      case 1:
        let members = []
        this.props.activeProject.members.map((m,k) => {
          if (m.type !== PENDING) {
            members.push(m)
          }
        })
        Content = (this.props.projects.changeOrder.status == "") ? <MemberList helpText="Select the project member primarily responsible for payments" 
                                                              members={members} 
                                                              onSelectChange={(s) => this.onMemberPress({ selected: s })} /> : 
                                                          <PaymentSourcesList {...this.props} onPress={(s) => this.onPaymentPress(s)} />
        break
      case 2:
        Content = ChangeOrderForm
        break
      // case "":
      // case AWAITING_APPROVAL:
      // case APPROVED:
      // case DECLINED:
      // case PAID:

    }

    // switch(this.state.activeStep) {
    //   case 0:
    //     ActiveStep = <Form ref={r => this.form = r} refName="changeOrderForm" formItems={form} errorMsg={this.props.errorMsg} />
    //     break
    //   case 1:
    //     ActiveStep = (is_pro) ? <MemberList helpText="Select the project member primarily responsible for payments" members={this.props.activeProject.members} onSelectChange={(s) => this.onMemberPress({ selected: s })} /> : PaymentSources
    //     break
    //   case 2:
    //     ActiveStep = <Form ref={r => this.form = r} refName="changeOrderForm" formItems={form} errorMsg={this.props.errorMsg} />
    // }

    return (
      Content
    )
  }

  render () {
    
    return (
      <Modal visible={this.state.visible} onRequestClose={() => this.close()}>
        <Grid>
          <Row size={15}>
          <Header title={this.getTitle()}
                  leftIcon={null}
                  titleAlign="left"
                  titleStyle={styles.headerTitle}
                  rightIcon={AppConfig.closeIcon}
                  onPressRight={() => this.close()}
          />        
          </Row>
          <Row size={85}>
            <Col style={globalStyles.content}>
              {this.renderContent()}
              {this.renderActionButton()}
              {this.renderSubActionButton()}
            </Col>        
          </Row>
        </Grid>
      </Modal>
    )
  }
}
