import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import I18n from 'App/I18n/I18n'
import { Madoka } from 'react-native-textinput-effects'
import Feather from 'react-native-vector-icons/Feather'
import _ from 'underscore'

// components
var t = require('tcomb-form-native');
var Form = t.form.Form;

// Styles
import styles from './Styles/InviteStyle'
import Colors from 'App/Themes/Colors'
import globalStyles from 'App/Themes/GlobalStyles'


function FieldTemplate(locals) {

  let height = 30
  if (locals.numberOfLines != null) {
    height = height * locals.numberOfLines * 1.5
  }

  let label = <Row style={{marginBottom:5}}>
                <Col>
                  <Text style={[globalStyles.label, {marginTop: 12}]}>{locals.label}</Text>
                </Col>
              </Row>

  if (locals.path[0] == 'country') {
    return locals
  }
  return (
          <Madoka
            ref={locals.path[0]}
            label={locals.placeholder}
            labelStyle={{
              color: Colors.midGray
            }}
            borderColor={Colors.darkPurple}
            inputStyle={{
              color: Colors.darkPurple,
            }}
            keyboardType={locals.keyboardType}
            autoCapitalize={locals.autoCapitalize}
            returnKeyType={locals.returnKeyType}
            value={locals.value}
            onSubmitEditing={locals.onSubmitEditing}
            onChangeText={(t) => locals.onChangeNative(locals.path[0], t)} 
          />
  );  
}


function PositionTemplate(locals) {
  return (
    <Grid>
      <Row style={{paddingTop: 25}}>
        <Col size={90}>
          <Text style={globalStyles.H3}>{I18n.t("projectInvite")}</Text>
        </Col>  
      </Row>

      <Row>
        <Col style={styles.inline}>{locals.inputs.firstname}</Col>
        <Col style={styles.inline}>{locals.inputs.lastname}</Col>
      </Row>
      <Row>
        <Col>{locals.inputs.phone}</Col></Row>
      
    </Grid>
  )
}

function LocationTemplate(locals) {
  return (
    <Grid>

      <Row style={{paddingTop: 50}}>
        <Col size={90}>
          <Text style={globalStyles.H3}>{I18n.t("projectLocation")}</Text>
        </Col>  
      </Row>
      <Row><Col>{locals.inputs.address1}</Col></Row>
      <Row><Col>{locals.inputs.address2}</Col></Row>

      <Row>
        <Col style={styles.inline}>{locals.inputs.city}</Col>
        <Col style={styles.inline}>{locals.inputs.state}</Col>
        <Col style={styles.inline}>{locals.inputs.zip}</Col>
      </Row>

    </Grid>
  )
}

export default class Invite extends Component {
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

  render () {

    var Countries = t.enums({
      US: 'United States',
      MX: "Mexico",
      CA: "Canada"
    });

    var Invite = t.struct({
      firstname: t.String,
      lastname: t.String,
      phone: t.Number,
    })

    var Location = t.struct({
      address1: t.String,
      address2: t.String,
      city: t.String,
      zip: t.String,
      state: t.String,
      country: Countries
    })

    var inviteOptions = {
      template: PositionTemplate,
      fields: {
        firstname: {
          placeholder: I18n.t('firstname'),
          autoCapitalize: 'words',
          maxLength: 45,
          template: FieldTemplate,
          returnKeyType: 'next',
          onSubmitEditing: () => this.refs.invite.refs.input.refs.lastname.refs.lastname.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'members', 0, f], v) // 0 = only 1 invite @TODO
        },
        lastname: {
          placeholder: I18n.t('lastname'),
          autoCapitalize: 'words',
          template: FieldTemplate,
          returnKeyType: 'next',
          onSubmitEditing: () => this.refs.invite.refs.input.refs.phone.refs.phone.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'members', 0, f], v)
        },
        phone: {
          keyboardType: "phone-pad",
          placeholder: I18n.t('phone'),
          template: FieldTemplate,
          returnKeyType: 'next',
          maxLength: 11,
          onSubmitEditing: () => this.refs.location.refs.input.refs.address1.refs.address1.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'members', 0, f], v)
          }        
      }      
    }

    var locationOptions = {
      template: LocationTemplate,
      fields: {
        address1: {
          placeholder: I18n.t('address1'),
          autoCapitalize: 'words',
          template: FieldTemplate,
          returnKeyType: 'next',
          onSubmitEditing: () => this.refs.location.refs.input.refs.address2.refs.address2.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'project', f], v)
        },
        address2: {
          placeholder: I18n.t('address2'),
          template: FieldTemplate,
          returnKeyType: 'next',
          onSubmitEditing: () => this.refs.location.refs.input.refs.city.refs.city.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'project', f], v)
        },
        city: {
          placeholder: I18n.t('city'),
          template: FieldTemplate,
          returnKeyType: 'next',
          onSubmitEditing: () => this.refs.location.refs.input.refs.state.refs.state.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'project', f], v)
        },
        state: {
          placeholder: I18n.t('state'),
          template: FieldTemplate,
          returnKeyType: 'next',
          autoCapitalize: 'characters',
          onSubmitEditing: () => this.refs.location.refs.input.refs.zip.refs.zip.focus(),
          onChange: (f, v) => this.props.updateForm(['form', 'project', f], v)
        },
        zip: {
          placeholder: I18n.t('zip'),
          template: FieldTemplate,
          returnKeyType: 'done',
          onChange: (f, v) => this.props.updateForm(['form', 'project', f], v)
        },
        country: {
          placeholder: I18n.t('country'),
          onChange: (f, v) => this.props.updateForm(['form', 'project', f], v)
        },
      }
    };

    return (
      <Grid style={styles.container}>
        <Row>
          <Col>
            <Form
              ref="invite"
              type={Invite}
              options={inviteOptions}
              value={this.props.form.members[0]}
            />

            <Form
              ref="location"
              type={Location}
              options={locationOptions}
              value={this.props.form.project}
            />            
          </Col>
        </Row>
      </Grid>        
    )
  }
}
