import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Styles/InviteContactsStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
var Contacts = require('react-native-contacts')
import _ from 'underscore'

import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import AppConfig from 'App/Config/AppConfig'

import FormButton from 'App/Components/FormButton'
import ListItem from 'App/Components/Project/ListItem'
import Icon from 'react-native-vector-icons/Feather'
import IconButton from 'App/Components/Common/IconButton'
import Header from 'App/Components/Header'

import { branchLib } from 'App/Lib/Branch'
import { guid } from 'App/Lib/Util'
const { PRO, HOMEOWNER, JOIN_PROJECT } = require("App/Config/Constants").default

export default class InviteContacts extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  
  // Defaults for props
  static defaultProps = {
    inviteUser: (data) => {},
    onCancel: () => {}
  }

  state = {
    contacts: [],
    members: this.props.members,
    visibleContacts: [],
    checkedContacts: [],
    numSelectContact: null,
  }

  componentDidMount() {
    this.requestContactsPermissions()
  }

  // parseContacts(contacts) {
  //   let newContacts = []

  //   for (var i = 0; i < contacts.length; i++) {
  //     var key = contacts[i].givenName + contacts[i].familyName
  //     newContacts[key] = {
  //       text: contacts[i].givenName + " - " + contacts[i].phoneNumbers[0].number,
  //       contact: contacts[i]
  //     }
  //     newContacts.push()
  //   }

  //   return newContacts
  // }

  onContactPressHandler(c, num) {

    let cc = this.state.checkedContacts

    if ((c.recordID == this.state.numSelectContact) && _.isNull(num)) {
      this.setState({numSelectContact:null})
    } else {

      if (typeof(cc[c.recordID]) != "undefined") {

        delete cc[c.recordID]
        this.setState({checkedContacts: cc, numSelectContact: null})
      } else {

        // if contact with single phone number is clicked
        if (num === null && c.phoneNumbers.length === 1) {

          num = c.phoneNumbers[0].number

          // add to checkedContacts
          cc[c.recordID] = {
            number: num,
            contact: c
          }
          this.setState({checkedContacts: cc, numSelectContact: null})
        } 

        /* number was pressed */
        else if (num !== null && c.phoneNumbers.length > 1) {


          // add to checkedContacts
          cc[c.recordID] = {
            number: num,
            contact: c
          }
          this.setState({checkedContacts: cc, numSelectContact: null})
        }

        /* show numbers for contact */
        else {

          this.setState({numSelectContact: c.recordID})
        }

      }
    }
  }

  sortContacts(cs) {
    cs.sort(function(a,b) {
      if(a.givenName < b.givenName) return -1;
      if(a.givenName > b.givenName) return 1;
      return 0;
    })
    return cs
  }


  requestContactsPermissions() {

      Contacts.checkPermission( (err, permission) => {
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if(permission === 'undefined'){
          Contacts.requestPermission( (err, permission) => {
            Contacts.getAll((err, cs) => {
              if(err === 'denied'){
                // error
              } else {
                var contacts = this.sortContacts(cs)
                this.setState({
                  contacts: contacts,
                  visibleContacts: contacts,
                })
              }
            })            
          })
        }
        if(permission === 'authorized'){
          Contacts.getAll((err, cs) => {
            if(err === 'denied'){
              // error
            } else {
              
              var contacts = this.sortContacts(cs)

              this.setState({
                contacts: contacts,
                visibleContacts: contacts,
                modalVisible: true
              })
            }
          })
        }
        if(permission === 'denied'){

          // x.x
        }
      })        
  }

  onCancel() {
    this.setState({checkedContacts: []})
    this.props.onCancel()
  }

  onDone() {
    let contactKeys = []
    let newMembers = []
    var checkedContacts = this.state.checkedContacts
    let payload = []
    let project = this.props.activeProject
    let profile = this.props.account.profile
    let token = guid()
    let role = (this.props.account.profile.type == PRO) ? HOMEOWNER : PRO // @TODO add SUB, select role on link creation
    let imageUrl = (project.project.image == "") ? AppConfig.defaultShareImage : project.project.image
    let keys = Object.keys(checkedContacts)

    // for (var k in checkedContacts) {
    for (var i = keys.length - 1; i >= 0; i--) {
      let k = keys[i]
      let last_contact = (i == 0) ? true : false
      checkedContacts[k]

      let branchData = {
        identifier: 'project/'+project.project.ID+'/'+token,
        metadata: {
          role: role,
          token: token,
          project_id: this.props.activeProject.project.ID.toString(),
          firstname: checkedContacts[k].contact.givenName,
          lastname: checkedContacts[k].contact.familyName,
          phone: checkedContacts[k].number,
          route: JOIN_PROJECT,
        },
        title: this.props.activeProject.project.name,
        contentImageUrl: imageUrl,
        contentDescription: profile.firstname + " " + profile.lastname + " has invited you to collaborate on Workspace"
      }

      branchLib.getShortURL(branchData).then((url) => {
        var c = {
          contact: checkedContacts[k],
          url: url,
          token: token,
          metadata: {
            project_id: this.props.activeProject.project.ID,
            member: {
              firstname: checkedContacts[k].contact.givenName,
              lastname: checkedContacts[k].contact.familyName,
              phone: checkedContacts[k].number,
            } 
          },
        }
        payload.push(c)
        if (last_contact) {
          this.props.inviteUser(payload)
        }
      })
    }

    this.setState({
      checkedContacts: [],
    })

  }


  render () {

    let contacts = this.state.visibleContacts.map((c, k) => {

      let onContactPress = this.onContactPressHandler.bind(this, c, null)

      if (typeof(c.phoneNumbers) != "undefined") {
        if (c.phoneNumbers.length && c.givenName != "") {

          let iconName = AppConfig.userIcon
          let iconStyle = globalStyles.midGray
          let iconBtnStyle = globalStyles.lightMidGrayButton
          let color = Colors.darkPurple
          let allNums
          let multi_num = (c.phoneNumbers.length > 1) ? true : false
          let multi_num_selected = (!_.isUndefined(this.state.checkedContacts[c.recordID])) ? true : false
          let summary = (multi_num) ? "Tap to select number" : c.phoneNumbers[0].number
          let leftComponent
          let is_selected = (c.recordID === this.state.numSelectContact) ? true : false


          if (multi_num_selected || is_selected) {
            color = Colors.darkPurple
            iconName = AppConfig.checkIcon
            iconStyle = globalStyles.white
            iconBtnStyle = globalStyles.greenButton
            summary = (multi_num_selected) ? this.state.checkedContacts[c.recordID].number : summary
            // contact has more than 1 phoneNumber
            if (c.phoneNumbers.length > 1) {
              
              if (this.state.numSelectContact === c.recordID) {
                iconName = AppConfig.downIcon
                iconBtnStyle = null
                iconStyle = globalStyles.midGray
              }

              if (c.recordID == this.state.numSelectContact) {
                allNums = c.phoneNumbers.map((num, k) => {
                  let onPress = () => this.onContactPressHandler(c, num.number)

                  return (
                      <ListItem 
                        key={k} 
                        title={num.label}
                        summary={num.number}
                        centerComponent={
                          <Grid>
                            <Row>
                              <Col size={20}>
                                <IconButton icon={AppConfig.phoneIcon} iconBtnStyle={iconBtnStyle} iconStyle={iconStyle} iconSize={25} />
                              </Col>
                              <Col size={80}>
                                <Text style={globalStyles.listItemTitle}>{num.number}</Text>
                                <Text style={globalStyles.listItemSummary}>{num.label}</Text>
                              </Col>
                            </Row>
                          </Grid>
                        }
                        hideLeft={true}
                        leftWidth={13}
                        onPress={onPress}
                         />
                  )
                })  

                allNums = <Row>
                            <Col style={globalStyles.content}>
                              {allNums}
                            </Col>
                          </Row>            
              }
            }
          }
          leftComponent = (is_selected && multi_num) ? null : <IconButton icon={iconName} iconBtnStyle={iconBtnStyle} iconStyle={iconStyle} />

          return (
            <ListItem 
              key={k} 
              title={c.givenName + " " + c.familyName}
              summary={summary}
              leftComponent={leftComponent}
              bottomComponent={allNums}
              onPress={onContactPress}
               />
          )           

        }           
      }
    
    })


    let onSearchContactChange = (e) => {
      let searchText = e.nativeEvent.text
      Contacts.getContactsMatchingString(searchText, (err, contacts) => {
        if(err === 'denied'){
          // x.x
        } else {
          // Contains only contacts matching "filter"
          // let newContacts = this.parseContacts(contacts)
          if (searchText == "") {
            this.setState({ visibleContacts: this.state.contacts })
          } else {
            this.setState({ visibleContacts: contacts })
          }
        }
      })
    }


    return (
      <Grid style={styles.container}>
        <Row size={15}>
          <Header title={"Invite Contacts"}
                  leftIcon={null}
                  titleAlign="left"
                  rightIcon={null}
                  onPressRight={() => {}}
          />   
        </Row>
        <Row size={75}>
          <Col style={globalStyles.content}>
            <Row size={30}>
              <Col style={globalStyles.centerContent}>
                <Text style={[globalStyles.p, { textAlign: 'center', color: Colors.darkPurple}]}>{"Invite members from your contacts list and we'll add them as a project member"}</Text>
                <TextInput placeholder="Start typing a name..." 
                          onChange={onSearchContactChange}
                          placeholderTextColor={Colors.darkPurple}
                          returnKeyType="done"
                          style={[globalStyles.input, globalStyles.borderGray]}  />
                
              </Col>
            </Row>
            <Row size={70}>
              <ScrollView style={{ marginBottom: 120, borderWidth: 1, borderColor: "#FFFFFF" }}>
                <Col>
                {contacts}
                </Col>
              </ScrollView>
            </Row>
          </Col>
        </Row>

        <Row size={17} style={[globalStyles.fixedBottom, {backgroundColor: 'rgba(0,0,0,0)'}]}>
          <Col style={globalStyles.content}>
            <FormButton 
                buttonText="Invite Users" 
                onPress={() => this.onDone()} />
            <FormButton 
                buttonText="Cancel" 
                btnStyle={globalStyles.invButton}
                textStyle={globalStyles.darkPurple}
                onPress={() => this.onCancel()} />
          </Col>                        
        </Row>
      </Grid>
    )
  }
}
