'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './Styles/ProjectListItemStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment'

import _ from 'underscore'


class ProjectListItem extends Component {



  render() {
    

    let iconColor = Colors.lightGray
    if (this.props.project.hasNotification) {
      iconColor = HOT_ORANGE
    }

    let projectImage = this.props.defaultProjectImage
    if (!_.isUndefined(this.props.project.image)) {
      projectImage = this.props.project.image
    }

    let startDate = moment(this.props.project.project.startDate).format('MMM Do YYYY');
    let endDate = moment(this.props.project.project.endDate).format('MMM Do YYYY');
    let address = this.props.project.project.address1 + ", " + this.props.project.project.city + ", " + this.props.project.project.state + " " + this.props.project.project.zip

    return (
      <Grid>
        <Row style={styles.container}>
          <Col>
            <TouchableOpacity  style={[this.props.projectStyle]} onPress={() => this.props.onPress()} >

              <Row size={20} style={styles.headerWrap} >
                <Col size={85} style={globalStyles.centerContentLeft}>
                  <Text style={[globalStyles.H3, globalStyles.bold]}>{this.props.project.project.name}</Text>
                </Col>
                <Col size={15} style={globalStyles.centerContent}>
                  <Feather name="bell" size={20} color={iconColor} />
                </Col>   
              </Row>        

              <Row size={80} style={globalStyles.spacerBottom}>
                <Col>
                  <Image source={{uri: projectImage}} style={styles.image} />
                </Col>
              </Row> 

              <Row>
                <Col size={85}>
                  <Row>
                    <Col size={5}></Col>
                    <Col size={90}><Text style={[globalStyles.tag, globalStyles.kindaBold]}>{startDate + " - " + endDate}</Text></Col>
                  </Row>
                  <Row>
                    <Col size={5}></Col>
                    <Col size={90}><Text style={[globalStyles.tag, globalStyles.kindaBold, styles.address]}>{address}</Text></Col>
                  </Row>
                </Col>
              </Row>

            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ProjectListItem.defaultProps = {
  // defaultProjectImage: "https://s3.amazonaws.com/workspace-app/images/assets/default_project/default_no_image.jpg",
  // defaultProjectImage: "https://s3.amazonaws.com/workspace-app/images/assets/default_project/deck-remodel.jpg",
  defaultProjectImage: "https://s3.amazonaws.com/workspace-app/images/assets/default_project/unacceptable-cleanup.jpg",
  project: {
    location: {
      formatted_address: ''
    }
  }
}

ProjectListItem.propTypes = {
  children: PropTypes.element
};

export default ProjectListItem;