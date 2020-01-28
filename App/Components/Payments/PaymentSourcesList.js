import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ScrollView, Text } from 'react-native'
import styles from './Styles/PaymentSourcesListStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import ListItem from 'App/Components/Project/ListItem'
import IconButton from 'App/Components/Common/IconButton'
import VerifyBankAccount from 'App/Components/Payments/VerifyBankAccount'
import NewCreditCardModal from 'App/Components/Modals/NewCreditCard'
import NewBankAccountModal from 'App/Components/Modals/NewBankAccount'
const { BANK_ACCOUNT, CREDIT_CARD } = require("App/Config/Constants").default

import _ from 'underscore'

import AppConfig from 'App/Config/AppConfig'

export default class PaymentSourcesList extends Component {
  // Prop type warnings
  static propTypes = {
    paymentSources: PropTypes.object,
    onPress: PropTypes.func,
    verifyPaymentSource: PropTypes.func,
    selectable: PropTypes.bool
  }
  
  // Defaults for props
  static defaultProps = {
    paymentSources: {
      bankAccounts: [],
      creditCards: []
    },
    onPress: (d) => {},
    verifyPaymentSource: (d) => {},
    renderTitle: true,
    selectable: true,
    message: null
  }

  state = {
    selected: null,
    showVerifyForm: false,
    activeModal: null,
    modalVisible: false
  }  

  renderTitle() {
    let Title = (this.props.renderTitle) ? <Text style={globalStyles.H3}>Select Payment</Text> : null
    return (
      Title
    )
  }

  renderVerifyBankAccount() {
    let sourceID = (!_.isNull(this.state.selected)) ? this.state.selected.source_id : null
    let Verify = (this.state.showVerifyForm) ? <VerifyBankAccount 
          sourceID={sourceID}
          message={this.props.message}
          onPress={(amounts) => this.setState({showVerifyForm: false}, () => {
            this.props.verifyPaymentSource({ ...amounts, account_id: this.state.selected.source_id })
          })} /> : null

    return (
      Verify
    ) 
  }

  onPress(source = null) {

    this.setState({selected:source})
    
    if (source.verified) {
        this.props.onPress(source.source_id)
    } else {
      this.setState({ showVerifyForm: true })
    }


  }

  render () {

    const ps = this.props.paymentSources
    const _sel = !_.isNull(this.state.selected)
    let buttonText = (_sel) ? "Pay" : "Select Payment"
    let btnStyle = (_sel) ? globalStyles.greenButton : globalStyles.buttonDisabled
    let isDisabled = (!this.props.selectable) ? true : false
    let sourceID = (!_.isNull(this.state.selected)) ? this.state.selected.source_id : null
    let BankAccounts
    let CreditCards
    if (!_.isNull(ps)) {
      if (!_.isNull(ps.bankAccounts)) {
        BankAccounts = ps.bankAccounts.map((s, k) => {
          sel = (s.source_id == sourceID) ? true : false
          selectProps = (this.props.selectable) ? {selected: sel} : null
          let onPress = () => this.props.onPress({ selected: s })
          let icon = (sel) ? AppConfig.checkIcon : AppConfig.userIcon
          let iconBtnStyle = (sel) ? globalStyles.greenButton : null
          let iconStyle = (sel) ? globalStyles.white : null
          return (
            <ListItem key={k}
              {...selectProps}
              isDisabled={false}
              images={null}
              onPress={() => this.onPress(s)}
              rightComponent={null}
              leftComponent={<IconButton icon={icon} iconBtnStyle={iconBtnStyle} iconStyle={iconStyle} />}
              summary={s.last4}
              title={s.name}
             />
          )
        })
      } else {
        BankAccounts = <ListItem 
                          title="Add a Bank Account" 
                          summary="Tap to view"
                          onPress={() => this.setState({activeModal:BANK_ACCOUNT,modalVisible:true})}
                          leftComponent={<IconButton icon={AppConfig.addIcon} iconBtnStyle={styles.addBtn} iconStyle={styles.addBtnIcon} />} />
      }
      if (!_.isNull(ps.creditCards)) {
        CreditCards = ps.creditCards.map((s, k) => {
          sel = (s.source_id == sourceID) ? true : false
          selectProps = (this.props.selectable) ? {selected: sel} : null
          let onPress = () => this.props.onPress({ selected: s })
          let icon = (sel) ? AppConfig.checkIcon : AppConfig.ccIcon
          let iconBtnStyle = (sel) ? globalStyles.greenButton : null
          let iconStyle = (sel) ? globalStyles.white : null
          return (
            <ListItem key={k}
              {...selectProps}
              isDisabled={false}
              images={null}
              onPress={() => this.onPress(s)}
              rightComponent={null}
              leftComponent={<IconButton icon={icon} iconBtnStyle={iconBtnStyle} iconStyle={iconStyle} />}
              summary={s.last4}
              title={s.name}
             />
          )
        })      
      } else {
        CreditCards = <ListItem 
                          title="Add a Credit Card" 
                          summary="Tap to view"
                          onPress={() => this.setState({activeModal:CREDIT_CARD,modalVisible:true})}
                          leftComponent={<IconButton icon={AppConfig.addIcon} iconBtnStyle={styles.addBtn} iconStyle={styles.addBtnIcon} />} />
      }
    }


      // payload = { type: this.state.type }
      // if (this.state.type == "stripe_ba") {
      //   payload["bank_account"] = data
      // } else {
      //   payload["credit_card"] = data
      // }
      // this.props.createPaymentSource(payload)

    let NewBank = <NewBankAccountModal visible={this.state.modalVisible} 
                      onPress={(data) => this.props.createPaymentSource({
                        type: "stripe_ba",
                        bank_account: data})}
                      cancel={() => this.setState({modalVisible:false})} />
    let NewCC = <NewCreditCardModal visible={this.state.modalVisible} 
                      onPress={(data) => this.props.createPaymentSource({
                        type: "stripe_cc",
                        credit_card: data})}
                      cancel={() => this.setState({modalVisible:false})} />

   let ActiveModal = (this.state.activeModal == BANK_ACCOUNT) ? NewBank : NewCC

    return (
      <ScrollView>
        <Grid style={styles.container}>
          <Row>
            <Col>
              {this.renderTitle()}
              {this.renderVerifyBankAccount()}
              {ActiveModal}
              <Row>
                <Col>
                  <Text style={globalStyles.H4}>Bank Accounts</Text>
                  {BankAccounts}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text style={globalStyles.H4}>Credit Cards</Text>
                  {CreditCards}
                </Col>
              </Row>            
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    )
  }
}
