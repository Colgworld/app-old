'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
} from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'underscore'

import FormButton from 'App/Components/FormButton'
import IconButton from 'App/Components/Common/IconButton'
import Form from 'App/Components/Common/Form'
import Colors from 'App/Themes/Colors'

import styles from './Styles/VerifyBankAccountStyle'
import globalStyles from 'App/Themes/GlobalStyles'

class VerifyBankAccount extends Component {

    static defaultProps = {
        sourceID: null
    }

    state = {
        amount1: null,
        amount2: null,
    }

    componentWillReceiveProps(nextProps) {
        // if (!_.isNull(nextProps.source)) {
        //     this.setState({ account_id: nextProps.source.source_id })
        // }
    }


    render() {

        let sourceID = this.props.sourceID
        let message = (!_.isNull(this.props.message)) ? <Text style={globalStyles.content}>{this.props.message}</Text> : null
        let form = [
            {
                title: "Amount 1",
                onTextChange: (t) => this.setState({ amount1: Number(t) }),
                keyboardType: 'numeric',
            },
            {
                title: "Amount 2",
                onTextChange: (t) => this.setState({ amount2: Number(t) }),
                keyboardType: 'numeric',
            }
        ]


        if (!_.isNull(sourceID)) {
            return (
              <Grid style={styles.container}>
                <Row>
                    <Col>
                        <Form formItems={form} />
                        {message}

                        <IconButton onPress={() => this.props.onPress(this.state)} icon="check" iconStyle={{color: Colors.green}} />

                    </Col>
                </Row>
              </Grid>
            );            
        } else {
            return null
        }

    }
}

export default VerifyBankAccount;