import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/MemberListStyle'
import { Grid, Row, Col } from 'react-native-easy-grid'
import globalStyles from 'App/Themes/GlobalStyles'
import ListItem from 'App/Components/Project/ListItem'
import _ from 'underscore'

export default class MemberList extends Component {
  // // Prop type warnings
  static propTypes = {
    members: PropTypes.array,
    onSelectChange: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    members: [],
    onSelectChange: () => {},
    helpText: null
  }

  state = {
    selected: (new Map(): Map<string, boolean>)
  };

  _onPressItem(i) {

    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);

      selected.set(i.item.ID, !selected.get(i.item.ID)); // toggle
      this.props.onSelectChange(selected)
      return {selected};
    });
  }

  renderItem(i) {
    const { item, index } = i
    let onPress = () => this._onPressItem(i)
    return (
      <ListItem 
          key={index}
          selected={!!this.state.selected.get(item.ID)}
          title={item.firstname + " " + item.lastname}
          summary={item.type}
          rightComponent={<Text></Text>}
          onPress={onPress} />
    )
  }

  render () {
    let helpText = (!_.isNull(this.props.helpText)) ? <Text style={[styles.helpText, globalStyles.centerText]}>{this.props.helpText}</Text> : null
    return (
      <Grid style={styles.container}>
        <Row>
          <Col>
            {helpText}
            <FlatList 
              data={this.props.members} 
              renderItem={(i) => this.renderItem(i)}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
