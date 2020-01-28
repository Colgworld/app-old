import React, { Component } from 'react';

import { Text, Image, View, StyleSheet, Switch, TouchableOpacity, FlatList } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';

import Header from 'App/Components/Header'; // import LinearGradient from 'react-native-linear-gradient';
import Colors from 'App/Themes/Colors';

const {
  HOMEOWNER,
  PRO,
} = require("App/Config/Constants").default

import globalStyles from 'App/Themes/GlobalStyles'
import Feather from 'react-native-vector-icons/Feather'

export class ListItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.item.function}>
          <Row style={{borderBottomColor: Colors.midGray, borderBottomWidth: 1}}>
            <Col style={[globalStyles.content]}>
              <Text style={Colors.white}>{this.props.item.title}</Text>
            </Col>
          </Row>
      </TouchableOpacity>      
    )
  }
}

/**
 * AppDrawer
 */
export class AppDrawer extends Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    data: [
      {
        key: 'pm', 
        title:"Payment Methods",
        function: () => Actions.Payments(),
      },      
      {
        key: 'help',
        title: "Help",
        function: () => Actions.Help()
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

  render() {

    let userType
    switch(this.props.profile.type) {
      case HOMEOWNER:
        userType = "Homeowner"
        break;
      case PRO:
        userType = "Workspace Pro"
        break;
    }

    if (this.props.drawerOpened) {
    return (
      <Grid>
        <Row>
          <Col style={{backgroundColor: Colors.White}}>
            <Row size={10} style={{}}>
              <Header 
                leftIcon={BACK_ICON} 
                leftBtnHandler={() => this.props.close()} 
                leftIconColor="white" />
            </Row>

            <Row size={10} style={[{paddingTop: 15, backgroundColor: Colors.white}, globalStyles.content, globalStyles.centerContent]}>
              <Col size={15} style={[]}>
                <Feather name="user" size={45} color={Colors.white} />
              </Col>
              <Col size={85} >
                  <Text style={[{color: Colors.darkPurple, fontSize: 14}, globalStyles.bold]}>{this.props.profile.firstname} {this.props.profile.lastname}
                  {"\n"}
                  {userType}</Text>
              </Col>                
            </Row>

            <Row size={50}>
              <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </Row>

            <Row size={35}>


            </Row>
          </Col>
        </Row>
      </Grid>
    );
    } else {
      return null
    }

  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems:'flex-start',
    paddingTop: 55,
    backgroundColor: Colors.darkPurple, 
    padding: 10
  },
  header: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent:'flex-start',
  },
});

export default AppDrawer;
