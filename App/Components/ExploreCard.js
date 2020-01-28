import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

import Metrics, { carouselPadding } from 'App/Themes/Metrics'
import styles from './Styles/ExploreCardStyle'
import globalStyles from 'App/Themes/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'


export default class ExploreCard extends Component {

  static propTypes = {
    // numProjects: PropTypes.integer
  }

  static defaultProps = {
    exploreCard: {
      type: "",
      site_name: "",
      title: "",
      image: "",
      description: "",
      url: ""
    },
    onPress: () => {}
  }

  render() {
    let width = Metrics.projectCardWidth

    return (
        <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
          <View style={{flex: 1}}>
              <Image source={{uri:this.props.exploreCard.image}} style={[styles.image, styles.overlay]} />
              <Text style={styles.via}>{'via ' + this.props.exploreCard.site_name}</Text>
              <View style={[styles.textWrap]}>
                <Text style={[styles.title, styles.twoThirds]} numberOfLines={2}>{this.props.exploreCard.title}</Text>
                <Text style={[styles.desc]} numberOfLines={2}>{this.props.exploreCard.description}</Text>
              </View>
          </View>
        </TouchableOpacity>
    );
  }
}
