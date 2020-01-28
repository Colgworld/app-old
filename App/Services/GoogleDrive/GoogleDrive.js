/**
 * # WorkspaceApi.js
 *
 * This class interfaces with WorkspaceApi.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 * Singleton module see: https://k94n.com/es6-modules-single-instance-pattern
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from 'App/Lib/config'
import _ from 'underscore'
import Backend from 'App/Lib/Backend'

export class GoogleDriveService extends Backend {

  /**
   * ## WorkspaceApi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize (token) {


    if (!_.isNull(token) && _.isUndefined(token)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token

    this.API_BASE_URL = "https://www.googleapis.com/drive/v3"

  }

  


  async listFiles() {

      return await this._fetch({
        method: 'GET',
        url: '/files?q=',
      }).then((res) => {

        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })  
    }


  async downloadFile(fileID) {

      return await this._fetch({
        method: 'GET',
        url: '/files/'+fileID+"?q=&alt=media",
      }).then((res) => {

        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })  
    }    






  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {}
    }

    if (this._sessionToken) {
      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }        
    
    // reqOpts.headers['Content-Type'] = "application/x-www-form-urlencoded"

    let url = this.API_BASE_URL + opts.url + "&key=AIzaSyBM6XloXtEL1yCKHA-wMU335V7sgzQwWYg"


    let res = {}


    let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json()
      .then((json) => {
        res.json = json
        return res
      })
  }


}
// The singleton variable
export let service = new GoogleDriveService()
