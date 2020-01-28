import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/DrawerStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import {NavigationActions} from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather'

export default class Drawer extends Component {
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

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <Col style={{backgroundColor: Colors.darkPurple}}>

              <Row size={10} style={[{paddingTop: 15, backgroundColor: Colors.lightGray}, globalStyles.content, globalStyles.centerContent]}>
                <Col size={15} style={[]}>
                  <Icon name="user" size={45} color={Colors.darkPurple} />
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
                />
              </Row>

              <Row size={35}>


              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    )
  }
}
