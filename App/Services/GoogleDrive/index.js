/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'
import {appAuthToken} from 'App/Lib/AppAuthToken'

import {service} from './GoogleDrive'

const {GOOGLE_DRIVE_TYPE} = require("App/Config/Constants")

export default function ServiceFactory (token) {

    return appAuthToken.getAuthIntegrationToken(GOOGLE_DRIVE_TYPE).then((t) => {

        service.initialize(token)
        return service
    })


}
