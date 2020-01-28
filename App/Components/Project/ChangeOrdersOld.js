import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, Text, TouchableOpacity, Modal, Animated } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'
import Feather from 'react-native-vector-icons/Feather'

import styles from './Styles/ChangeOrdersStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'

const { HOMEOWNER } = require("App/Config/Constants").default

import ChangeOrderForm from 'App/Components/ProjectViewer/ChangeOrderForm'

const { PRO } = require('App/Config/Constants').default

export default class ChangeOrders extends Component {

  state = {
    editableCO: null,
    editModalVisible: false,
    modalVisible: false
  }

  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  // 

  onChangeOrderDone(vals) {
    this.props.onPress(vals)
    this.setState({
      editModalVisible: false,
      modalVisible: false,
    })
  }

  render () {

    let coBtn = <TouchableOpacity onPress={() => this.setState({modalVisible: true})} >
                                  <Feather name="plus-circle" 
                                    size={40} 
                                    color="#3b7cec"
                                    style={{ textAlign: 'center', marginTop: 15 }}/>
                                </TouchableOpacity> 
    let AddChangeOrderButton = (this.props.type == HOMEOWNER) ? null : coBtn


    let changeOrders = this.props.changeOrders.map((co, i) => {

      let height = 0
      let opacity = 0
      buttonSize = 25
      let icon = "chevron-right"
      if (i == this.state.coDetailsKey) {
        height = 250 
        opacity = 1
        icon = "chevron-down"
      }


      let editCO = null
      if (this.props.type == PRO) {
        editCO = () => this.setState({editModalVisible: true, editableCO: co})
      }

      return (
        <TouchableOpacity key={i} onPress={editCO}>
          <Row>
            <Col>
              <Row style={{paddingTop: 10, paddingBottom: 10}}>
                <Col size={15} style={{alignItems: 'center'}} >
                  <Feather name="clipboard" size={buttonSize} style={styles.icon} color={Colors.darkPurple}  />
                </Col>
                <Col size={60}>
                  <Text style={[globalStyles.buttonText, globalStyles.darkPurple]}>{co.title} - {"$"+co.cost}</Text>
                  <Text style={[styles.btnText, globalStyles.buttonText, globalStyles.darkPurple]}>{co.status}</Text>
                </Col>
                <Col size={15}>
                  <Feather name={icon} size={25} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row >
            <Col fullWidth>
             <Animated.View
              style={{ height: height, opacity: opacity }} >
                <Row >
                  <Col fullWidth>
                    <Text style={globalStyles.buttonText}>{"+"+co.days+" day increase | "+" +$"+co.cost+" increase"}</Text>
                    <Text style={{ paddingLeft: 15 }}>{co.description}</Text>
                  </Col>
                </Row>
              </Animated.View>
            </Col>
          </Row>
        </TouchableOpacity>
      )      
    })  /* End changeorder map */ 

    let createChangeOrder = (vals) => this.onChangeOrderDone(vals)
    let updateChangeOrder = (co) => this.onChangeOrderDone(co)    

    return (
        <ScrollView style={styles.container}>  
          <Row>
            <Col fullWidth hAlign="center">
            
            <Text style={[globalStyles.headerText]}>Change Orders</Text>

            {changeOrders}

            <Modal
              animationType={"slide"}
              onRequestClose={() => this.setState({ modalVisible:false })}
              transparent={false}
              visible={this.state.modalVisible} >
                <ChangeOrderForm
                  title="Create Change Order"
                  cancel={() => this.setState({modalVisible: false})}
                  co={this.state.editableCO}
                  createChangeOrder={createChangeOrder}
                  editable={false} />
            </Modal>
            <Modal
              animationType={"slide"}
              transparent={false}
              onRequestClose={() => this.setState({ editModalVisible:false })}
              visible={this.state.editModalVisible} >
                <ChangeOrderForm
                  title="Edit Change Order"
                  cancel={() => this.setState({editModalVisible: false})}
                  co={this.state.editableCO}
                  updateChangeOrder={updateChangeOrder}
                  editable={true} />
            </Modal> 

            {AddChangeOrderButton}
            </Col>
          </Row>

        </ScrollView>
    )
  }
}
