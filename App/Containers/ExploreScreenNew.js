import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import Header from 'App/Components/Header'
import Config from 'react-native-config'
import ExploreCard from 'App/Components/ExploreCard'
import _ from 'underscore'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import ExploreActions from 'App/Redux/ExploreRedux'

// Styles
import styles from './Styles/ExploreScreenStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import Metrics from 'App/Themes/Metrics'

class ExploreScreen extends Component {

  static defaultProps = {
    explore: []
  }

  state = {
    showWebView: false,
    active: {
      url: null
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Explore",
    tabBarLabel: "EXPLORE",
    header: null,
    tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
      const { route, index, focused} = scene;
      
      if(focused){
      }
      navigation.state.params.getExplore()
      jumpToIndex(index)
    },
    tabBarIcon: ({ tintColor }) => (
      <Feather name="search" size={Metrics.tabIconSize} color={tintColor} />
    )
  })

  componentDidMount() {
    this.props.navigation.setParams({
      getExplore: this._getExplore.bind(this)
    })
  }

  _getExplore() {
    this.props.getExplore()
  }

  renderWebView() {
    if (this.state.showWebView) {
     return (
       <WebView
          source={{uri: this.state.active.url}}
          onNavigationStateChange={this.onNavigationStateChange}
          style={{marginTop: 0}}
          onLoadStart={() => console.log("start placeholder anim")}
          onLoadEnd={() => console.log("load webview")}
       />
     );      
    }
   }
 
   renderCards() {
    let cards

    if (!_.isNull(this.props.explore)) {
      cards = this.props.explore.articles.map((c,k) => {
        return (
          <ExploreCard key={k} onPress={() => this.setState({showWebView: true, active: c})} exploreCard={c} />
        )
      })
    }
    return (
      <ScrollView style={[styles.container, {padding: 20, maxHeight: Metrics.height - Metrics.navBarHeight - Metrics.headerHeight}]}>
        {cards}
      </ScrollView>
    )
   }


  render () {
    return (
      <View style={styles.container}>
        <Header title={'Explore'} leftIcon={null} titleAlign="left" rightIcon={"x"} onPressRight={() => this.setState({showWebView:false})} />
          {this.renderWebView()}   
          {!this.state.showWebView && this.renderCards()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    explore: state.explore.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExplore: () => dispatch(ExploreActions.getExploreRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

