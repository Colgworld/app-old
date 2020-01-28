import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProjectActions from 'App/Redux/ProjectRedux'
import Header from 'App/Components/Header'

import ContactForm from 'App/Components/Common/Help'
import { Col, Row, Grid } from 'react-native-easy-grid';

// Styles
import styles from './Styles/SendFeedbackScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'

class SendFeedbackScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Get Help",
    header: null
  })

  state = {
    opacity: 1
  }


  render () {
    return (
      <Grid style={styles.container}>
        <Row size={15}>
        <Header title={'Get Help'} titleStyle={globalStyles.smallHeaderTitle} leftIcon={'arrow-left'} onPressLeft={ ()=> this.props.navigation.goBack()}/>
        </Row>
        <Row size={85}>
          <WebView
            onLoadStart={() => console.log("start lottie anim")}
            onLoadEnd={() => console.log("fade in webview")}
            style={{opacity:this.state.opacity}}
            source={{uri: 'https://help.tryworkspace.com'}}
          />
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFeedback: (data) => dispatch(ProjectActions.sendFeedbackRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedbackScreen)
