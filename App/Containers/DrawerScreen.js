import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import {NavigationActions} from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from 'App/Redux/AccountRedux'

// Styles
import styles from './Styles/DrawerScreenStyle'


export class ListItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.item.function}>
          <Row style={{borderBottomColor: Colors.midGray, borderBottomWidth: 1}}>
            <Col style={[globalStyles.content]}>
              <Text style={{color: Colors.darkPurple}}>{this.props.item.title}</Text>
            </Col>
          </Row>
      </TouchableOpacity>      
    )
  }
}



class DrawerScreen extends Component {

  state = {
    data: [
      {
        key: 'pm', 
        title:"Payment Methods",
        function: () => this.props.navigation.navigate("ManagePaymentsScreen"),
      },      
      {
        key: 'help',
        title: "Help",
        function: () => this.props.navigation.navigate("SendFeedbackScreen")
      },
      {
        key: 'l', 
        title:"Logout",
        function: () => this.props.logout(),
      },

    ]
  }

  _renderItem({item}) {
    return (
      <ListItem
        item={item}
      />
    )
  }   

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Grid>
            <Row>
              <Col style={{backgroundColor: Colors.white}}>

                <Row size={10} style={[{borderBottomColor: Colors.midGray, borderBottomWidth: 1, paddingTop: 15, backgroundColor: Colors.white}, globalStyles.content, globalStyles.centerContent]}>
                  <Col size={15}>
                    <Icon name="user" size={45} color={Colors.darkPurple} />
                  </Col>
                  <Col size={85}>
                      <Text style={[{color: Colors.darkPurple, fontSize: 14}, globalStyles.bold]}>{this.props.profile.firstname} {this.props.profile.lastname}
                      {"\n"}
                      {this.props.profile.type}</Text>
                  </Col>                
                </Row>

                <Row size={50}>
                  <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Row>
              </Col>
            </Row>
          </Grid>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AccountActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen)
