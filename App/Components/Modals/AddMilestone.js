import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal, ScrollView, KeyboardAvoidingView } from 'react-native'
import styles from './Styles/ChangeOrderStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import Form from 'App/Components/Common/Form'
import AppConfig from 'App/Config/AppConfig'
import globalStyles from 'App/Themes/GlobalStyles'
import MemberList from 'App/Components/Project/MemberList'
import PaymentSourcesList from 'App/Components/Payments/PaymentSourcesList'
import _ from 'underscore'
import Icon from 'react-native-vector-icons/Feather'

const { PRO, HOMEOWNER, APPROVED, PAID } = require("App/Config/Constants").default

const mStone = {
      title: null,
      amount: 0,
      description: null,
      delta: 0
    }

export default class AddMilestone extends Component {
  // // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    cost: PropTypes.string,
    description: PropTypes.string,
    immediate: PropTypes.bool,
    visible: PropTypes.bool,
    paymentSources: PropTypes.object,
    onPaymentPress: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    visible: false,
    editableFields: true,
    numPayments: 1,
    close: () => {},
    finished: (s) => {},
    milestone: mStone
  }

  state = {
    visible: false,
  }

  close() {
    this.setState({visible:false})
    this.props.close()
  }

  onFinishedPress() {
    this.close()
    this.props.finished()
    this.setState({milestone:mStone})
  }

  render () {
    let rightIcon = AppConfig.closeIcon
    let editable = (this.state.activeStep > 0) ? false : this.props.editableFields
    let form = [
      {
        title: "Milestone Name",
        placeholder: "",
        refName: "title",
        onSubmitEditing: () => this.form.refs.addMilestoneForm.refs.amount.focus(),
        value: this.props.milestone.title,
        returnKeyType: 'next',
        onTextChange: (text) => this.props.updateActivePayment("title", text),
        editable: editable,
        autoCapitalize: "words"
      },
      {
        title: "Milestone Payment",
        placeholder: "",
        refName: "amount",
        value: this.props.milestone.amount.toString(),
        returnKeyType: 'done',
        leftIcon: <Icon name={AppConfig.moneyIcon} />,
        onSubmitEditing: () => this.form.refs.addMilestoneForm.refs.description.focus(),
        keyboardType: 'numeric',
        onTextChange: (text) => this.props.updateActivePayment("amount", Number(text)),
        editable: editable,
        selectTextOnFocus: true
      },
      {
        title: "Milestone Description",
        placeholder: "",
        refName: "description",
        onSubmitEditing: () => this.form.refs.addMilestoneForm.refs.description.blur(),
        value: this.props.milestone.description,
        returnKeyType: 'done',
        multiline: true,
        numberOfLines: 1,
        onTextChange: (text) => this.props.updateActivePayment("description", text),
        editable: editable,
        autoCapitalize: "sentences"
      }
    ]

    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.close()} >
        <Grid>
          <Row size={15}>
          <Header title="Add Milestone"
                  titleStyle={styles.headerTitle}
                  rightIcon={rightIcon}
                  onPressRight={() => this.close()}
          />        
          </Row>
          <Row size={85}>
            <Col style={globalStyles.content}>
              <ScrollView>
                <KeyboardAvoidingView behavior="position">            
                  <Form ref={f => this.form = f} refName="addMilestoneForm" formItems={form} />
                </KeyboardAvoidingView>
              </ScrollView>
              <FormButton buttonText="Add Another" onPress={() => this.props.finished()} btnStyle={globalStyles.invButton} textStyle={globalStyles.darkPurple} />
              <FormButton buttonText="Finished" onPress={() => this.onFinishedPress()} btnStyle={globalStyles.invButton} textStyle={globalStyles.white} btnStyle={globalStyles.greenButton} />
            </Col>        
          </Row>
        </Grid>
      </Modal>
    )
  }
}
