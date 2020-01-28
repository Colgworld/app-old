import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, Image, TouchableOpacity, View } from 'react-native'
import styles from './Styles/ListItemStyle'
import moment from 'moment'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'

import globalStyles from 'App/Themes/GlobalStyles'
import AppConfig from 'App/Config/AppConfig'

import IconButton from 'App/Components/Common/IconButton'

export default class ListItem extends Component {
  // Prop type warnings
  static propTypes = {
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    isDisabled: false,
    onPress: () => {},
    rightComponent: null,
    centerComponent: null,
    rightText: null,
    rightTextStyle: null,
    titleStyle: {},
    leftComponent: null,
    summary: null,
    title: "Title",
    bottomComponent: null,
    leftWidth: 18,
    centerWidth: 70,
    rightWidth: 15,
    hideLeft: false
  }

  render () {

    const summary = (!_.isNull(this.props.summary)) ? <Text style={styles.summary} numberOfLines={1} >{this.props.summary}</Text> : null
    const titleStyle = (!_.isNull(this.props.summary)) ? styles.title : styles.bigTitle

    let icon = AppConfig.userIcon
    let iconBtnStyle = globalStyles.lightMidGrayButton
    let iconStyle = globalStyles.darkPurple
    if (!_.isUndefined(this.props.selected) && this.props.selected) {
      icon = AppConfig.checkIcon
      iconBtnStyle = globalStyles.greenButton
      iconStyle = globalStyles.white
    }

    let defaultIcon = (!this.props.hideLeft) ? <IconButton icon={icon} iconBtnStyle={iconBtnStyle} iconStyle={iconStyle} /> : null
    let left = (!_.isNull(this.props.leftComponent)) ? this.props.leftComponent : defaultIcon

    let rightText = (!_.isNull(this.props.rightText)) ? <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text> : null

    let defaultContent = <Row>
                          <Col>
                            <Text style={[titleStyle, this.props.titleStyle]} numberOfLines={1}>{this.props.title}</Text>
                            {summary}
                          </Col>
                        </Row>
    let centerComponent = (!_.isNull(this.props.centerComponent)) ? this.props.centerComponent : defaultContent

    return (
      <Grid>
        <Row style={[styles.innerContainer, this.props.containerStyle]}>
          <TouchableOpacity onPress={() => this.props.onPress()}
            disabled={this.props.isDisabled} style={[styles.btnStyle]} >
              <Grid>
                <Row>
                  <Col size={this.props.leftWidth} style={[styles.imgWrap]}>
                    {left}
                  </Col>
                  <Col size={this.props.centerWidth}>
                    {centerComponent}
                  </Col>
                  <Col size={this.props.rightWidth}>
                    {this.props.rightComponent}
                  </Col>
                  
                  {rightText}

                </Row>
              </Grid>
          </TouchableOpacity>
        </Row>
        {this.props.bottomComponent}
      </Grid>
    )
  }
}
