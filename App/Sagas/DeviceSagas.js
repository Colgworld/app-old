/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import DeviceActions from '../Redux/DeviceRedux'
var DeviceInfo = require('react-native-device-info');
import { DeviceSelectors } from '../Redux/DeviceRedux'

import FixtureAPI from 'App/Services/FixtureApi'
import API from 'App/Services/API'
import DebugConfig from 'App/Config/DebugConfig'
import _ from 'underscore'

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

export const getDeviceData = DeviceSelectors.getDevices

export function * createDevice (action) {
  const { data } = action
  const doCreateDevice = function*() {
    let uuid = DeviceInfo.getUniqueID()
    let device_model = DeviceInfo.getModel()
    let device_brand = DeviceInfo.getBrand()
    let device_country = DeviceInfo.getDeviceCountry()
    let device_name = DeviceInfo.getDeviceName()
    let device_locale = DeviceInfo.getDeviceLocale()
    let system_version = DeviceInfo.getSystemVersion()
    let system_name = DeviceInfo.getSystemName()
    let bundle_id = DeviceInfo.getBundleId()
    let build_number = DeviceInfo.getBuildNumber()
    let app_version = DeviceInfo.getVersion()
    let user_agent = DeviceInfo.getUserAgent()
    let timezone = DeviceInfo.getTimezone()
    let is_tablet = DeviceInfo.isTablet()

    var deviceData = {
          token: data['token'],
          uuid: uuid,
          device_model: device_model,
          device_brand: device_brand,
          device_country: device_country,
          device_name: device_name,
          device_locale: device_locale,
          timezone: timezone,
          system_version: system_version,
          system_name: system_name,
          bundle_id: bundle_id,
          build_number: build_number,
          app_version: app_version,
          user_agent: user_agent,
          is_tablet: is_tablet
    }

    const response = yield call(api.createDevice, deviceData)
    if (response.ok) {
      yield put(DeviceActions.createDeviceSuccess(response.data))
    } else {
      yield put(DeviceActions.createDeviceFailure())
    }      
  }


  const devices = yield call(api.getDevices)
  if (devices.ok) {
    if (!_.isUndefined(devices.data.token)) {
      if (data["token"] != devices.data.token) {
        yield doCreateDevice()
      }
    } else {
      yield doCreateDevice()
    }
  } else {
    yield put(DeviceActions.getDevicesFailure)
  }

}

// Basically DEPRECATED @TODO
export function * getDevices (action) {
  const response = yield call(api.getDevices)
  if (response.ok) {
    yield put(DeviceActions.getDevicesSuccess(response.data))
  } else {
    yield put(DeviceActions.getDevicesFailure())
  }
}
