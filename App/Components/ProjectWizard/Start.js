import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, Modal, Image, TouchableOpacity } from 'react-native'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Madoka } from 'react-native-textinput-effects'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import _ from 'underscore'
var ImagePicker = require('react-native-image-picker');

// Components
import FormButton from 'App/Components/FormButton'
import Form from 'App/Components/Common/Form'
import FormTextInput from 'App/Components/Common/FormTextInput'
import ProjectDateModal from 'App/Components/Modals/ProjectDate'
import ListItem from 'App/Components/Project/ListItem'
import IconButton from 'App/Components/Common/IconButton'
import ActionSheet from 'App/Components/Common/ActionSheet'

// Styles
import styles from './Styles/StartStyle'
import Colors from 'App/Themes/Colors'
import globalStyles from 'App/Themes/GlobalStyles';
import AppConfig from 'App/Config/AppConfig'

import Icon from 'react-native-vector-icons/Feather'

const { HOMEOWNER, PRO } = require("App/Config/Constants").default

class Start extends Component {

  state = {
    value: {},
    fullname: "brett Porter",
    address: "",
    phone: "123123123",
    email: "sdfsf@aol.com",
    isModalVisible: false,
    date: null,
    startDateFormatted: "Not Set",
    endDateFormatted: null,
    date: null,
    startDate: null,
    endDate: null,
    focus: 'startDate',

  }

  componentDidMount() {
  }

  onContentSizeChange(x, y) {
    this.setState({
      height: x.nativeEvent.contentSize.height
    })
  }

  onProjectDateChange({startDate, endDate}) {
    if (!_.isNull(startDate) && !_.isUndefined(startDate) && focusedInput == "endDate") {
      this.props.updateForm(['form', 'project', "startDate"], startDate)
    }

    if (!_.isNull(endDate) && !_.isUndefined(endDate) && focusedInput == "startDate") {
      this.props.updateForm(['form', 'project', "endDate"], endDate)
    }


    // this.props.updateForm(['form', 'project', "endDate"], text)
  }

  validateAddress() {
    let accountType = this.props.account.profile.type
    if (accountType == PRO) {
      this.form.refs.pw1Form.refs.dates.focus()
    } else {
      this.form.refs.pw1Form.refs.budget.focus()
    }
  }

  onPress(dates) {
    const format = 'YYYY-MM-DDTHH:MM:SSZ00:00'
    const startDate = moment(dates.startDate.dateString).toDate()
    const endDate = moment(dates.endDate.dateString).toDate()

    this.props.updateForm(['form', 'project', "startDate"], startDate)
    this.props.updateForm(['form', 'project', "endDate"], endDate)
    this.setState({isModalVisible:false})
  }

  render() {

    const _sd_null = !_.isNull(this.props.form.project.startDate) && !_.isUndefined(this.props.form.project.startDate)
    const _ed_null = !_.isNull(this.props.form.project.endDate) && !_.isUndefined(this.props.form.project.endDate)

    let startDate = (_sd_null) ? moment(this.props.form.project.startDate).format("MMMM D, YYYY") : null
    let endDate = (_ed_null) ? moment(this.props.form.project.endDate).format("MMMM D, YYYY") : null
    let timelineMsg = (_sd_null) ? startDate + " - " + endDate : ""

    let ProFields = {
        title: "Project Timeline",
        placeholder: "Select Start & End Dates",
        refName: "dates",
        onFocus: () => this.setState({isModalVisible: true}),
        value: timelineMsg,
        returnKeyType: 'done',
        onTextChange: (text) => {
          // this.props.updateForm(['form', 'project', ""], text)
          // this.props.updateForm(['form', 'project', "clientName"], text)
        },
      }

    let HomeownerFields = {
        title: "Project Budget",
        placeholder: "",
        refName: "budget",
        leftIcon: <Icon name={AppConfig.moneyIcon} />,
        value: this.props.form.project.budget,
        onSubmitEditing: () => this.form.refs.pw1Form.refs.budget.blur(),
        returnKeyType: 'done',
        keyboardType: 'numeric',
        onTextChange: (text) => this.props.updateForm(['form', 'project', "budget"], text)        
      }

    let OtherFields = (this.props.account.profile.type == PRO) ? ProFields : HomeownerFields




    let form = [
      {
        title: "Project Name",
        placeholder: "",
        refName: "name",
        autoCapitalize: "words",
        onSubmitEditing: () => this.form.refs.pw1Form.refs.clientAddress.focus(),
        value: this.props.form.project.name,
        returnKeyType: 'next',
        keyboardType: 'email-address',
        onTextChange: (text) => this.props.updateForm(['form', 'project', "name"], text),
      },
      {
        title: "Project Address",
        placeholder: "",
        refName: "clientAddress",
        autoCapitalize: "words",
        onSubmitEditing: () => this.validateAddress(),
        value: this.props.form.project.clientAddress,
        returnKeyType: 'next',
        onTextChange: (text) => this.props.updateForm(['form', 'project', "clientAddress"], text),
      },
      {...OtherFields}
    ]

    let image = (!_.isNull(this.props.image)) ? <TouchableOpacity onPress={() => this.ActionSheet.ActionSheet.show()}><Image style={[globalStyles.image, {width: '100%', height: 230}]} resizeMode='cover' source={{uri: 'data:image/png;base64,'+this.props.image.data }} /></TouchableOpacity> : <ListItem title="Add Project Photo" 
                leftComponent={<IconButton padding={8} icon={AppConfig.imageIcon} iconBtnStyle={{backgroundColor: Colors.midGray}} iconStyle={globalStyles.darkGray} iconSize={25} />} 
                onPress={() => this.ActionSheet.ActionSheet.show()} />

    return (
      <Grid>
          <Row>
            <Col>

              <Form ref={r => this.form = r} refName="pw1Form" formItems={form} />
              {image}
              
              <ActionSheet title="Add Project Photo" ref={o => this.ActionSheet = o} callback={(d) => {
                // this.props.updateForm(['form', 'project', 'image'], d)
                this.props.setImage(d)
              }} />

              <ProjectDateModal isModalVisible={this.state.isModalVisible}
                onChange={(data) => this.onProjectDateChange(data)}
                onPress={(dates) => this.onPress(dates)}
                close={() => this.setState({isModalVisible:false})}
                startDate={this.props.form.startDate}
                endDate={this.props.form.endDate} />
            </Col>
          </Row>
      </Grid>
    )
  }
}

export default Start
