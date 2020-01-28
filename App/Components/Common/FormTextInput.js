import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/FormTextInputStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Colors from 'App/Themes/Colors'
import { Grid, Row, Col } from 'react-native-easy-grid'

export default class FormTextInput extends Component {
  // // Prop type warnings
  static propTypes = {
    type: PropTypes.string,
  }
  
  // Defaults for props
  static defaultProps = {
    type: "default",
    containerStyle: {},
    placeholderTextColor: Colors.lightGray,
    maxLength: 1000,
    leftIcon: null,
    multiline: false,
    onChange: (data) => {}
  }

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render () {
    let ButtonType
    let multilineStyle = (this.props.multiline) ? styles.multiline : null
    switch(this.props.type) {
      case "boolButton":
        let values = this.props.values.map((v, k) => {
                        return (
                          <Text key={k}>{v}</Text>
                        )
                      })
        ButtonType = <View>
                      {values}
                    </View>
        break
      default:
        ButtonType = <TextInput
                      style={styles.input}
                      ref={ref => (this.refs = { ...this.refs, [this.props.refName]: ref})}
                      style={[this.props.style, styles.input]}
                      onChangeText={(text) => this.props.onChangeText(text)}
                      onSubmitEditing={this.props.onSubmitEditing}
                      onFocus={this.props.onFocus}
                      value={this.props.value}
                      editable={this.props.editable}
                      multiline={this.props.multiline}
                      numberOfLines={this.props.numberOfLines}
                      autoCapitalize={this.props.autoCapitalize}
                      keyboardType={this.props.keyboardType}
                      underlineColorAndroid={'transparent'}
                      returnKeyType={this.props.returnKeyType}
                      maxLength={this.props.maxLength}
                      blurOnSubmit={false}
                      autoCorrect={this.props.autoCorrect}
                      placeholder={this.props.placeholder}
                      placeholderTextColor={this.props.placeholderTextColor}
                      secureTextEntry={this.props.secureTextEntry}
                      selectTextOnFocus={this.props.selectTextOnFocus} />
    }
    return (
        <View style={[styles.row, this.props.containerStyle]} ref={this.props.refName}>
            <Text style={styles.title}>{this.props.label}</Text>
            <View style={[styles.leftIconStyle]}>
              {this.props.leftIcon}
            </View>
            <View style={[styles.indent]}>
              {ButtonType}
            </View>
        </View>
    )
  }
}
