/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'

import CONFIG from './config'
// import {parse} from './Parse'
// import {hapi} from './Hapi'
import {workspaceapi} from './WorkspaceAPI'

export default function BackendFactory (token = null) {

  workspaceapi.initialize(token)
  return workspaceapi

}
