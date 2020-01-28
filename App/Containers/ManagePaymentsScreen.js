import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Animated, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid';
// import Animation from 'lottie-react-native';
import _ from 'underscore'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import PaymentSourcesActions from 'App/Redux/PaymentSourcesRedux'
import { NavigationActions } from 'react-navigation'
import AppConfig from 'App/Config/AppConfig'

// Components
import FormButton from 'App/Components/FormButton'
import TabIcon from 'App/Components/TabIcon'
import VerifyBankAccount from 'App/Components/Payments/VerifyBankAccount'

// Styles
import styles from './Styles/ManagePaymentsScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

const {
  PRO,
  HOMEOWNER
} = require('App/Config/Constants').default

class ManagePaymentsScreen extends Component {

  state = {
    activeModalForm: 'card',
    box: new Animated.Value(0),
    payment: null
  }

  static navigationOptions = ({ navigation }) => {
    headerLeft = <TabIcon name={AppConfig.backIcon} onPress={() => navigation.navigate("ProjectListScreen")} color={Colors.lightGray} />
    headerRight = <TabIcon name={AppConfig.addIcon} onPress={() => navigation.navigate("AddPaymentMethodScreen")} color={Colors.lightGray} />
    title = "Payment Methods"

    return {
      title: `${title}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle: {
        backgroundColor: Colors.darkPurple,
        height: 85,
      },
      headerTitleStyle: {
        color: Colors.lightGray
      },
      headerLeft: headerLeft,
      headerRight: headerRight
    } 
  };

  componentDidMount() {
    this.props.getPaymentSources()
    this.props.setModal(false)
    // this.startAnimation()
    // StatusBar.setBarStyle('dark-content', true);
  }

  componentWillReceiveProps(nextProps) {
  }

  startAnimation() {
      Animated.timing(this.state.box, {
        toValue: 1,
        duration: 2500,
      }).start()    
  }

  onPress(payment) {
    if (payment.type != "stripe_cc") {
      if (!payment.verified) {
        this.setState({ payment }, () => {
          this.props.setModal(true)
        })
      }      
    }

  }

  render () {

    let banks
    let cards
    let payments

    let bankAccountPaymentInfo = (this.props.account.profile.type == PRO) ? "Payments to your bank account cost a flat $5" : ""
    let ccPaymentInfo = (this.props.account.profile.type == PRO) ? "Accepting cards costs the same here as it does anywhere else: A flat rate of 2.9% + 30¢ per successful charge." : ""


    let paymentHelpMessage = (this.props.account.profile.type == PRO) ? "Add a Bank Account to receive payments" : "You can't pay your Pro without setting up a payment method."



    let modal
    if (!_.isNull(this.state.payment)) {
      modal = <Modal visible={this.props.modalVisible} onRequestClose={() => this.props.setModal(false)}>
                    <VerifyBankAccount 
                      source={this.state.payment} 
                      onPress={(amounts) => this.props.verifyPaymentSource(amounts)} 
                      cancel={() => this.props.setModal(false)}
                      message={this.props.verifyMessage} />
                  </Modal>      
    }



    if (!_.isNull(this.props.paymentSources)) {

      let banks
      if (!_.isNull(this.props.paymentSources.bankAccounts)) {
        banks = this.props.paymentSources.bankAccounts.map((p, k) => {
          return (
            <Row key={k} style={styles.payment}>
              <TouchableOpacity onPress={() => this.onPress(p)}>
                <Col>
                  <Text style={[globalStyles.H4, styles.title]}>{p.name + " **" + p.last4}</Text>
                </Col>
              </TouchableOpacity>
            </Row>
          )
        })        
      }

      let cards 
      if (!_.isNull(this.props.paymentSources.creditCards)) {
        cards = this.props.paymentSources.creditCards.map((p, k) => {
          return (
            <Row key={k} style={styles.payment}>
              <TouchableOpacity onPress={() => this.onPress(p)}>
                <Col size={90} offset={5}>
                  <Text style={[globalStyles.H4, styles.title]}>{p.name + " **" + p.last4}</Text>
                </Col>
              </TouchableOpacity>
            </Row>
          )
        })           
      }

      if (_.isUndefined(cards) && _.isUndefined(banks)) {
       payments = <Row style={{paddingTop: 55}}>
              <Col style={globalStyles.centerContent}>
                <Row>
                  <Col>
                    <Text style={[globalStyles.H5, globalStyles.bold, globalStyles.center]}>{"There's nothing here!"}</Text>
                    <Text style={[globalStyles.center]}>{paymentHelpMessage}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>        
          } else {
            payments = <Grid>
                        <Row>
                          <Col>
                            <Row size={100/3}>
                              <Col>
                                <Text style={[globalStyles.H4, globalStyles.bold]}>Bank Accounts</Text>
                                {banks}
                                <Text style={globalStyles.finePrint}>{bankAccountPaymentInfo}</Text>
                              </Col>
                            </Row>
                            <Row size={100/3}>
                              <Col>
                                <Text style={[globalStyles.H4, globalStyles.bold]}>Cards</Text>
                                {cards}
                                <Text style={globalStyles.finePrint}>{ccPaymentInfo}</Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row> 
                      </Grid>
          }
    }


    return (
        <Grid>
          <Row size={90} style={globalStyles.content}>
            <Col>
              <ScrollView>
                {payments}

                {modal}
              </ScrollView>
            </Col>
          </Row>
        </Grid>

    )
  }

}


const mapStateToProps = (state) => {
  return {
    paymentSources: state.paymentSources.payload,
    account: state.account,
    verifyMessage: state.paymentSources.verifyFailureMsg,
    modalVisible: state.paymentSources.modalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentSources: () => dispatch(PaymentSourcesActions.getPaymentSourcesRequest()),
    verifyPaymentSource: (data) => dispatch(PaymentSourcesActions.verifyPaymentSourceRequest(data)),
    setModal: (v) => dispatch(PaymentSourcesActions.setModal(v))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePaymentsScreen)
