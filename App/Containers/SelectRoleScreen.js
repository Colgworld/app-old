import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'

import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from 'App/Redux/AccountRedux'

// Styles
import styles from './Styles/SelectRoleScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'

const selected = require("App/Images/check_green3x.png")
const unselected = require("App/Images/check_light.png")
import AppConfig from 'App/Config/AppConfig'

const { PRO, HOMEOWNER } = require('App/Config/Constants').default

class SelectRoleScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  
    this.state = {
      role: PRO
    };
  }

  onSubmit(type) {
    var data = {
      ...this.props.navigation.state.params,
      type: this.state.role
    }
    this.props.register(data)
  }

  componentDidMount() {
    if (!_.isNull(this.props.navigation.state.params)) {
      this.setState({ role: this.props.navigation.state.params.role })
    }
  }

  render () {
    proImg = (this.state.role == PRO) ? selected : unselected
    hoImg = (this.state.role == HOMEOWNER) ? selected : unselected
    return (
      <Grid style={[styles.container, globalStyles.content]}>
        <Row size={10}>
        <Header title="Select Role" titleAlign="left"  rightIcon={AppConfig.backIcon} onPressRight={() => this.props.navigation.goBack()}/>
        </Row>
        <Row size={75} style={globalStyles.topOffset}>
          <Col style={{flex: 1}}>
            <Row style={styles.buttonWrap}>
              <TouchableOpacity onPress={() => this.setState({ role: PRO})} style={{flex: 1 }}>
                <Col >
                  <Row >
                    <Col size={20} style={[styles.imageWrap, ]}>
                      <Image source={proImg} style={[globalStyles.image, styles.image]} />
                    </Col>
                    <Col size={80}>
                      <Text style={styles.title}>Professional</Text>
                      <Text style={styles.p}>Create projects, set payment milestones, create change orders and receive payments.</Text>
                    </Col>
                  </Row>
                </Col>
              </TouchableOpacity>
            </Row>

            <Row style={styles.buttonWrap}>
              <TouchableOpacity onPress={() => this.setState({ role: HOMEOWNER})} style={{flex: 1}}>
                <Col>
                  <Row>
                    <Col size={20} style={styles.imageWrap}>
                      <Image source={hoImg} style={[globalStyles.image, styles.image]} />
                    </Col>
                    <Col size={80}>
                      <Text style={styles.title}>Homeowner</Text>
                      <Text style={styles.p}>Join projects, chat with your Pro, send project payments and manage change orders.</Text>              
                    </Col>
                  </Row>
                </Col>
              </TouchableOpacity>
            </Row>
          </Col>
        </Row>

        <Row size={15} style={globalStyles.topOffset}>
          <Col>
            <FormButton buttonText="Finished" onPress={() => this.onSubmit()} />
            <FormButton buttonText="Go Back" btnStyle={globalStyles.invButton} textStyle={globalStyles.darkPurple} onPress={() => this.props.navigation.goBack()} />
          </Col>
        </Row>

      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(AccountActions.register(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoleScreen)
