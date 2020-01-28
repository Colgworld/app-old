import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

import Metrics, { carouselPadding } from 'App/Themes/Metrics'
import styles from './Styles/ProjectCardStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import IconButton from 'App/Components/Common/IconButton'
import Badge from 'App/Components/Common/Badge'

import _ from 'underscore'

const { WORKING, COMPLETE, PENDING, ARCHIVED } = require("App/Config/Constants").default
const defaultHeight = 260

class ProjectCard extends Component {

  static propTypes = {
    // numProjects: PropTypes.integer
  }

  static defaultProps = {
    numProjects: 1,
    defaultProjectImage: "https://s3.amazonaws.com/workspace-app/images/assets/default_project/unacceptable-cleanup.jpg",
    height: defaultHeight,
    onPress: () => {},
    gradientColors: ['transparent', 'rgba(000,000,000,0.7)'],
    gradientStyle: [styles.linearGradient, {zIndex: 2, position: 'absolute', right: 0, left: 0, height: defaultHeight}],
    disabled: false, 
    showFavorites: false,
    showSettings: false,
    project: {
      project: {
        startDate: null,
        endDate: null,
        image: null,
        state: null,
        city: null,
        zip: null,
        address1: null,
        status: null
      }
    }
  }

  getBadgeText() {
    let text = "Pending"
    let style = {color: Colors.white}
    switch(this.props.project.project.status) {
      case WORKING:
        text = "In Progress"
        break
      case COMPLETE:
        text = "Complete"
        break
      case ARCHIVED:
        text = "Arhived"
        break
    }
    return {text: text, style: style}
  }
  getBadgeStyle() {
    let color = Colors.lightMidGray
    switch(this.props.project.project.status) {
      case WORKING:
        color = Colors.orange
        break
      case COMPLETE:
        color = Colors.green
        break
    }

    return {backgroundColor: color}
  }

  render() {

    let iconColor = Colors.lightGray
    if (this.props.project.hasNotification) {
      iconColor = HOT_ORANGE
    }

    // WIll be null until we add support for changing project image
    let projectImage = this.props.defaultProjectImage
    if (this.props.project.project.attachment.ID != 0) {
      projectImage = this.props.project.project.attachment.filename
    }

    let startDate = moment(this.props.project.project.startDate).format('MMM Do YYYY');
    let endDate = moment(this.props.project.project.endDate).format('MMM Do YYYY');
    let address = this.props.project.project.address1 + ", " + this.props.project.project.city + ", " + this.props.project.project.state + " " + this.props.project.project.zip
    // let width = (this.props.numProjects > 1) ? Metrics.projectCardWidth : Metrics.windowWidth - (carouselPadding / 3)
    let width = 'auto'

    let badgeText = this.getBadgeText()
    let badgeStyle = this.getBadgeStyle() 
    let homeownerName = (this.props.project.members > 0) ? <Text style={[globalStyles.H3, globalStyles.white, {marginBottom: 0,marginTop:0}]}>{this.props.project.members[0].firstname + " " + this.props.project.members[0].lastname}</Text> : null

    let favoriteIcon = (this.props.showFavorites) ? <IconButton iconSize={20} icon="heart" 
                            iconBtnStyle={{backgroundColor: Colors.red}} 
                            iconStyle={{color:Colors.white}} /> : null

    let settingsIcon = (this.props.showSettings) ? <IconButton iconSize={20} icon="settings" 
                            iconBtnStyle={{backgroundColor: Colors.lightMidGray}} 
                            iconStyle={{color:Colors.black}} /> : null

    return (
        <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()}>
        <View style={[styles.container]}>
            <Image 
              source={{uri: projectImage}} 
              style={[this.props.imageStyle, styles.image, {alignSelf:"stretch", height: this.props.height, width: width }]} ></Image>            
            <LinearGradient colors={this.props.gradientColors} style={[styles.linearGradient, {zIndex: 2, position: 'absolute', right: 0, left: 0, bottom: 0}, this.props.gradientStyle]}>
              <Row style={{maxHeight: 120, bottom:0,right:0,left:0,position:'absolute'}}>
                <Col style={globalStyles.content}>
                  <Row>
                    <Col style={{paddingBottom: 10}}>
                      <Text style={[globalStyles.H2, globalStyles.kindaBold, globalStyles.white, {marginBottom: 0,marginTop:0}]}>{this.props.project.project.name}</Text>
                      {homeownerName}
                    </Col>
                  </Row>
                  <Row>
                    <Col size={80}>
                      <Badge text={badgeText.text} containerStyle={badgeStyle} textStyle={badgeText.style} />
                    </Col>
                    <Col size={20}>
                      <Row>
                        {favoriteIcon}
                        {settingsIcon}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </LinearGradient>
        </View>
        </TouchableOpacity>
    );
  }
}

export default ProjectCard;