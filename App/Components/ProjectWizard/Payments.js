import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';
import AppConfig from 'App/Config/AppConfig'
import _ from 'underscore'

// Components
import PaymentEditor from './PaymentEditor'
import FormButton from 'App/Components/FormButton'
import AddMilestoneModal from 'App/Components/Modals/AddMilestone'
import ListItem from 'App/Components/Project/ListItem'
import IconButton from 'App/Components/Common/IconButton'

import styles from './Styles/PaymentsStyle'
import Colors from 'App/Themes/Colors'
import globalStyles from 'App/Themes/GlobalStyles'

export default class Payments extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    form: {
      payments: []
    }
  }


  state = {
    payments: this.props.form.payments,
    editablePayment: null,
    isModalVisible: false
  }

  componentDidMount() {
    if (this.props.form.paymentsHasError) {
      this.setState({ editablePayment: this.props.form.payments.length -1 })
    }
  }

  render () {

    let numPayments = this.props.form.payments.length
    let maxPayments = 5
    
    let payments = this.props.form.payments.map((p,k) => {
      let onPress = () => {
        this.props.updateActivePayment("title", p.title)
        this.props.updateActivePayment("amount", p.amount)
        this.props.updateActivePayment("description", p.description)
        this.props.updateActivePayment("delta", p.delta)
        this.setState({isModalVisible:true})
      }
      return (
        <ListItem 
          key={k}
          title={p.title} 
          summary={p.description} 
          onPress={onPress}
          rightComponent={<Text>{"$ " + p.amount}</Text>}
          leftComponent={<IconButton icon={AppConfig.checkIcon} iconStyle={{color:Colors.white}} iconBtnStyle={{backgroundColor:Colors.green}} iconSize={30} />} />
      )
    })

    let milestoneAmount = 0
    this.props.form.payments.map((p,k) => {
      milestoneAmount = milestoneAmount + p.amount
    })

    return (
      <Grid>
        <Row>
          <Col>

            <Row size={10}>
              <Col>
                <Text style={[globalStyles.p]}>Set project milestones</Text>
              </Col>
            </Row>

            <Row size={70}>
              <Col>
              
                {payments}

                <ListItem  
                  title="Add Milestone" 
                  summary="Add Description" 
                  onPress={() => this.setState({isModalVisible:true})}
                  leftComponent={<IconButton icon={AppConfig.addIcon} iconStyle={{color:Colors.white}} iconBtnStyle={{backgroundColor:Colors.red}} iconSize={30} />}
                  rightComponent={<Text style={{fontSize:12}}>Add Cost</Text>} />
                
                <Row>
                  <Col style={[globalStyles.inline, styles.summary]}>
                    <Text style={globalStyles.bold}>Total Milestone Amount</Text>
                    <Text>{"$ " + milestoneAmount}</Text>
                  </Col>
                </Row>

                <AddMilestoneModal 
                  visible={this.state.isModalVisible} 
                  finished={() => this.props.updatePayment()}
                  updateActivePayment={(f,v) => this.props.updateActivePayment(f,v)}
                  numPayments={this.props.form.payments.length}
                  milestone={this.props.form.activePayment}
                  close={() => this.setState({isModalVisible:false})} />
              </Col>
            </Row>

            <Row size={15}>
              
            </Row>

          </Col>
        </Row>
      </Grid>
    )
  }
}
