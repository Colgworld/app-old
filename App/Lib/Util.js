'use strict';
var shittyQs = require('shitty-qs')
import _ from 'underscore'

export const guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

export const parseQS = (url) => {
    var [, query_string] = url.match(/\#(.*)/)
    const query = shittyQs(query_string)
    return query
}


export const selectItem = (value, callback) => {

    // this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);

      selected.set(value, !selected.get(value)); // toggle
      callback(selected)
      return {selected};
    // });
  }


export const getActiveProject = (state) => {
  return (!_.isNull(state.projects.activeProjectKey) && !_.isNull(state.projects.payload)) ? state.projects.payload[state.projects.activeProjectKey] : null
}