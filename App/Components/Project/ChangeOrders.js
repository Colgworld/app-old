import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import styles from './Styles/ChangeOrdersStyle'
import Colors from 'App/Themes/Colors'
import ListItem from 'App/Components/Project/ListItem'
import ChangeOrderModal from 'App/Components/Modals/ChangeOrder'
import IconButton from 'App/Components/Common/IconButton'
import EmptyState from 'App/Components/Common/EmptyState'
import _ from 'underscore'
import AppConfig from 'App/Config/AppConfig'
import { Grid, Row, Col } from 'react-native-easy-grid'
import CircleBtn from 'App/Components/CircleBtn'

const { 
  PRO, 
  HOMEOWNER, 
  APPROVED,
  AWAITING_APPROVAL,
  PAID,
  DECLINED } = require("App/Config/Constants").default

export default class ChangeOrders extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    changeOrders: []
  }

  state = {
    isModalVisible: false
  }

  componentDidMount() {
    if (this.props.account.profile.type == PRO) {
      this.setState({ editableFields: true })
    }
  }

  getDisabled(m, k) {
    r = true
    if (this.props.account.profile.type == PRO) {
      var a = k-1
      switch (k) {
        case 0:
          r =  false
          break;
        case a:
          break;
        default:
          if (this.props.activeProject.changeOrders[k-1].status == SUCCEEDED) {
            r = false 
          }
          break;
      }    
    }
    return r
  }

  onPress(d) {
    this.setState({ isModalVisible: true })
    this.props.updateValue(['changeOrder'], d)
  }

  renderChangeOrders() {

    let isDisabled = false
    let iconColor = Colors.midGray
    // Map data to proper structure for ListItem
    let data
    if (!_.isNull(this.props.activeProject) && !_.isNull(this.props.activeProject.changeOrders)) {
      data = this.props.activeProject.changeOrders.map((m, k) => {
        let rightComponent = <View style={styles.badgeWrap}><Text style={styles.cost}>{"$" + m.amount}</Text></View>
        let rightText = null
        let rightTextStyle = null
        let icon = AppConfig.moreIcon
        let is_pro = (this.props.account.profile.type == PRO) ? true : false
        let is_free = (m.cost == 0) ? true : false
        let iconBtnStyle

        switch(m.status) {
          case "":
          case AWAITING_APPROVAL:
            rightText = "Pending"
            rightTextStyle = {color: Colors.lightMidGray}
            isDisabled = (this.props.account.profile.type == PRO) ? true : false
            icon = AppConfig.moreIcon
            iconColor = Colors.lightMidGray
            break
          case APPROVED:
            rightText = (is_pro || is_free) ? "Approved" : "Tap to Pay"
            rightTextStyle = (is_pro) ? {color: Colors.orange} : {color: Colors.green}
            iconBtnStyle = {backgroundColor: Colors.green}
            icon = (is_free) ? AppConfig.checkIcon : AppConfig.moneyIcon
            iconColor = Colors.white
            break
          case PAID:
            rightText = "Paid!"
            rightTextStyle = {color: Colors.green}
            iconBtnStyle = {backgroundColor: Colors.green}
            icon = AppConfig.checkIcon
            iconColor = Colors.white
            break
          case DECLINED:
            rightText = "Declined"
            rightTextStyle = {color: Colors.red}
            iconBtnStyle = {backgroundColor: Colors.red}
            icon = AppConfig.closeIcon
            iconColor = Colors.white
            break
        }

        return ({
          icon: icon,
          iconColor: iconColor,
          iconBtnStyle: iconBtnStyle,
          title: m.title,
          summary: m.description,
          rightText: rightText,
          rightTextStyle: rightTextStyle,
          isDisabled: isDisabled,
          onPress: () => this.onPress(m)
        })
      })
    }

    let changeOrders = <FlatList 
                        data={data} 
                        renderItem={(i) => this.renderItem(i)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()} />

    let has_cos = (!_.isNull(this.props.activeProject.changeOrders) && !_.isUndefined(this.props.activeProject.changeOrders) && this.props.activeProject.changeOrders.length > 0) ? true : false
    let ChangeOrders = (!has_cos) ? <EmptyState image={null} text="You currently have no change orders to view." boldText="But you can easily create a new one!" buttonText={null} /> : changeOrders

    return (
      ChangeOrders
    )

  }

  renderItem(i) {
    const { item, index } = i
    return (
        <ListItem 
          key={index}
          leftComponent={<IconButton icon={item.icon} iconStyle={{color: item.iconColor}} iconBtnStyle={item.iconBtnStyle} />}
          isDisabled ={item.isDisabled}
          title={item.title}
          summary={item.summary}
          rightText={item.rightText}
          rightTextStyle={item.rightTextStyle}
          rightComponent={item.rightComponent}
          onPress={item.onPress} />
    )
  }

  renderCircleButton() {
    if (this.props.account.profile.type != HOMEOWNER) {
      return (
        <CircleBtn onPress={() => this.setState({isModalVisible:true})} />
      )
    }
  }

  render () {

    return (
      <Grid>
        <Row>
          <Col>

            {this.renderChangeOrders()}
            {this.renderCircleButton()}
            
            <ChangeOrderModal {...this.props} visible={this.state.isModalVisible} close={() => this.setState({isModalVisible:false})} />

          </Col>
        </Row>
      </Grid>
    )
  }
}
