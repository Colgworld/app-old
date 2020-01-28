import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal, ScrollView } from 'react-native'
import styles from './Styles/ProjectDateStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import moment from 'moment';
import 'moment-range';
import { CalendarList } from 'react-native-calendars'
// Components
import DatePicker from 'App/Components/DatePicker'
import FormButton from 'App/Components/FormButton'
import Header from 'App/Components/Header'
import _ from 'underscore'
import Colors from 'App/Themes/Colors'

import AppConfig from 'App/Config/AppConfig'

export default class ProjectDate extends Component {
  // // Prop type warnings
  static propTypes = {
    isModalVisible: PropTypes.bool,
    onChange: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    isModalVisible: false,
    onChange: (data) => {},
    close: () => {},
  }

  state = {
    startDate: null,
    endDate: null
  }

  onChange(day) {
    const _start_null = (_.isNull(this.state.startDate)) ? true : false
    const _end_null = (_.isNull(this.state.endDate)) ? true : false    
    if (_start_null) {
      this.setState({startDate: day, endDate: null})
    }
    else if ((!_start_null && (day.timestamp < this.state.startDate.timestamp)) || (!_end_null && day.timestamp < this.state.endDate.timestamp)) {
      this.setState({startDate: day, endDate: null})
    }
    else {
      this.setState({endDate: day})
    }
    // this.setState({day:day})
  }

  getMarkedDates() {
    let markedDates = {}
    const _start_null = (_.isNull(this.state.startDate)) ? true : false
    const _end_null = (_.isNull(this.state.endDate)) ? true : false
    const selectedStyle = {
      color: Colors.green, 
      textColor: Colors.white
    }

    if (!_start_null && _end_null) {
      markedDates[this.state.startDate.dateString] = {...selectedStyle, startingDay: true}
    } else if (!_start_null && !_end_null) {

      var range = moment.range(this.state.startDate.dateString, this.state.endDate.dateString);
      // var diff = range.diff('days');
      for (let day of range.by('day')) {
        let d = day.format('YYYY-MM-DD')
        let startProps = (d == this.state.startDate.dateString) ? { startingDay: true } : null
        let endProps = (d == this.state.endDate.dateString) ? { endingDay: true } : null
        markedDates[d] = {...selectedStyle, ...startProps, ...endProps}
      }

    }



  
    // {
    //  [today]: {startingDay: true, ...selectedStyle},
    //  '2018-06-27': selectedStyle,
    //  '2018-06-28': selectedStyle,
    //  '2018-06-29': {selected: true, endingDay: true, ...selectedStyle},
    // }  
    return markedDates
  }

  render () {
    const currentDate = new Date
    const today = moment(currentDate).format("YYYY-MM-DD")
    const maxDate = moment(currentDate).add(6, 'M').format("YYYY-MM-DD")

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        onRequestClose={() => this.props.close()}
        visible={this.props.isModalVisible}

        >
        <Grid>
          <Row size={15}>
            <Header title="Select Dates" leftIcon={null} titleAlign="left" rightIcon={AppConfig.closeIcon}  onPressRight={() => this.props.close()}  />
          </Row>
          <Row size={85}>
            <Col style={globalStyles.content} >
              <Row size={65}>
                  <Col style={{justifyContent: "center"}}>
                    <Row>
                      <Col>
                        <Row size={25}>
                          <Col>
                            <Text style={[globalStyles.p, {textAlign: 'center', alignSelf:'stretch'}]}>Set your project's timeline by tapping a start and end date below</Text>
                          </Col>
                        </Row>
                        <Row size={75}>
                          <Col>

                            <CalendarList
                              current={today}
                              minDate={today}
                              maxDate={maxDate}
                              theme={{
                                backgroundColor: '#000000'
                              }}
                              markedDates={this.getMarkedDates()}
                              markingType={'period'}
                              onDayPress={(day) => this.onChange(day)}
                              onDayLongPress={(day) => this.props.onChange(day)}
                              monthFormat={'MMMM yyyy'}
                              onMonthChange={(month) => {}}
                              hideArrows={true}
                              renderArrow={(direction) => (<Arrow />)}
                              hideExtraDays={true}
                              disableMonthChange={true}
                              firstDay={1}
                              hideDayNames={true}
                              showWeekNumbers={false}
                              onPressArrowLeft={substractMonth => substractMonth()}
                              onPressArrowRight={addMonth => addMonth()}                            
                              onVisibleMonthsChange={(months) => {}}
                              pastScrollRange={50}
                              futureScrollRange={50}
                              scrollEnabled={true}
                              showScrollIndicator={true}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
              </Row>
              <Row size={25}>
                <Col style={{justifyContent: "center"}}>
                    <FormButton 
                      buttonText="OK" 
                      onPress={() => this.props.onPress(this.state)}
                       />
                </Col>
              </Row>                    
            </Col>
          </Row>
        </Grid>
      </Modal>
    )
  }
}
