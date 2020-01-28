import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import styles from './Styles/MilestonesStyle'
import ListItem from 'App/Components/Project/ListItem'
import IconButton from 'App/Components/Common/IconButton'
import AppConfig from 'App/Config/AppConfig'
import Colors from 'App/Themes/Colors'
import EmptyState from 'App/Components/Common/EmptyState'
import CircleBtn from 'App/Components/CircleBtn'

import _ from 'underscore'
import SendPayment from 'App/Components/Modals/SendPayment'

const { 
  PRO, 
  HOMEOWNER, 
  WORKING, 
  REQUESTED, 
  PENDING, 
  PAID,
  SUCCEEDED } = require("App/Config/Constants").default

export default class Milestones extends Component {
  // Prop type warnings
  static propTypes = {
    messages: PropTypes.object,
  }
  
  // Defaults for props
  static defaultProps = {
    messages: {
      verifyPaymentSource: null
    },
    members: [],
    milestones: [],
    account: {
      profile: {
        type: null
      }
    },
  }

  state = {
    payment: {},
    isModalVisible: false
  }

  // componentDidUpdate(the) {
  //   this.autoStartMilestone()
  // }

  componentDidMount() {
    this.autoStartMilestone()
  }

  autoStartMilestone() {
    let milestones = this.props.activeProject.payments
    if (this.props.account.profile.type == PRO && !_.isNull(milestones)) {
      var done = false

      for (var i = 0; i <= milestones.length - 1; i++) {
        if (milestones[i].status == "" && !done) {
          done = true
          this.props.onPressMilestone(milestones[i])
        } else if (milestones[i].status == WORKING && !done) {
          done = true
        } else if (milestones[i].status == REQUESTED && !done) {
          done = true
        } else if (milestones[i].status == PAID && !done && !_.isUndefined(milestones[i])) {
          this.props.onPressMilestone(milestones[i] + 1)
          done = true
        }
      }
    }    
  }

  getDisabled(m, k) {
    r = true
    switch (this.props.account.profile.type) {
      case PRO:
        var a = k-1
        switch (k) {
          case 0:
            r =  false
            break;
          case a:
            break;
          default:
            if (this.props.activeProject.payments[k-1].status == SUCCEEDED) {
              r = false 
            }
            break;
        }
        break
      case HOMEOWNER:
        switch (k) {
          case 0:
            if (m.status == REQUESTED) {
              r =  false
            }
            break;
          case a:
            break;
        }      
        break
    }
    return r
  }

  renderItem(i) {
    const { item, index } = i
    return (
          <ListItem 
            key={index}
            leftComponent={<IconButton icon={item.icon} iconStyle={{color: item.iconColor}} iconBtnStyle={item.iconBtnStyle} disabled={true} />}
            isDisabled ={item.isDisabled}
            title={item.title}
            summary={item.summary}
            rightComponent={item.rightComponent}
            onPress={item.onPress} />
    )
  }

  renderMilestones() {
    let Milestones
    if (!_.isNull(this.props.activeProject.payments) && this.props.activeProject.payments.length > 0) {
      let isDisabled = true
      let data = this.props.activeProject.payments.map((m, k) => {
        isDisabled = this.getDisabled(m, k)
        let rightComponent = <View style={styles.badgeWrap}><Text style={styles.cost}>{"$" + m.amount}</Text></View>
        let icon = AppConfig.lockIcon
        let iconColor = Colors.midGray
        let iconBtnStyle
        let title = "Milestone " + (k + 1)
        let onPress = () => this.props.onPress(m)
        const accType = this.props.account.profile.type

        switch(m.status) {
          case REQUESTED:
            isDisabled = (accType == PRO) ? true : false
            onPress = (accType == PRO) ? null : () => this.setState({ isModalVisible: true, payment: {...m, milestoneName: title} })
            rightComponent = <View style={[styles.badgeWrap, styles.reqWrap]}><Text style={[styles.badge, styles.requested]}>{"Payment\nRequested"}</Text></View>
            icon = AppConfig.loaderIcon
            iconColor = Colors.orange
            break
          case PENDING:
            isDisabled = (accType == PRO) ? false : true
            icon = AppConfig.loaderIcon
            iconColor = Colors.green
            break
          case SUCCEEDED:
            onPress = () => {}
            isDisabled = true
            icon = AppConfig.checkIcon
            iconColor = Colors.white
            iconBtnStyle = {backgroundColor: Colors.green}
            break
          case WORKING:
            isDisabled = (accType == PRO) ? false : true
            onPress = (accType == PRO) ? () => this.props.onPress(m) : null 
            rightMsg = (accType == PRO && m.amount != 0) ? "Request\nPayment" : "In\nProgress"
            rightComponent = <View style={[styles.badgeWrap, styles.workWrap]}><Text style={[styles.badge, styles.working]}>{rightMsg}</Text></View>
            icon = AppConfig.moreIcon
            iconColor = Colors.lightMidGray
            break
          default:

        }
        return ({
          icon: icon,
          iconColor: iconColor,
          iconBtnStyle: iconBtnStyle,
          title: title,
          summary: m.title,
          rightComponent: rightComponent,
          isDisabled: isDisabled,
          onPress: onPress
        })
      })

      Milestones = <FlatList 
                    data={data} 
                    renderItem={(i) => this.renderItem(i)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()} />  

    
    } else {
      let boldText = (this.props.account.profile.type == PRO) ? "Setup your Payment Milestones now" : "Your Pro will set these up"
      let buttonText = (this.props.account.profile.type == PRO) ? "Setup Payment Milestones Now" : null
      Milestones = <EmptyState text="Hmm.. we're not seeing anything here yet."
                      boldText={boldText}
                      onPress={() => this.props.navigation.navigate("ProjectWizardScreen", {setup_payment:true})}
                      buttonText={buttonText} />
    }

    return (
      Milestones
    )
  }

  render () {

    // @TODO 
    let payees = []
    if (!_.isNull(this.props.activeProject.members)) {
      this.props.activeProject.members.map((m, k) => {
        if (m.type != HOMEOWNER) {
          payees.push({...m, key: k})
        }
      })
    }
    let to_user_id = (payees.length > 0) ? payees[0].ID : 0

    return (
      <View style={styles.container}>
        <SendPayment 
          visible={this.state.isModalVisible} 
          payees={payees}
          onPress={(sourceID) => this.setState({isModalVisible:false}, () => {
            this.props.sendPayment({ 
              project_id: this.props.activeProject.project.ID,
              source_id: sourceID, 
              payment_id: this.state.payment.ID,
              to_user_id: to_user_id 
            })

          })}
          close={() => this.setState({isModalVisible:false})}
          payment={this.state.payment}
          verifyPaymentSource={(d) => this.props.verifyPaymentSource(d)}
          verifyPaymentSourceMsg={this.props.messages.verifyPaymentSource}
          paymentSources={this.props.paymentSources} />

        {this.renderMilestones()}

      </View>
    )
  }
}
