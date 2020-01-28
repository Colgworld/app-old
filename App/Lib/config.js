import Config from 'react-native-config'

module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  ONBOARDING_KEY: "USER_ONBOARDED",
  USER_ID_KEY: "USER_ID",
  USER_KEY: "USER",
  ONBOARD_KEY: "ONBOARD",
  DEVTOKEN: "DEVTOKEN",
  ROUTE_KEY: "ROUTE",
  PUSH_KEY: "PUSH_ENABLED",

  // https://s3.amazonaws.com/workspace-app/images/projects/original/bb32d4e5-379c-c91b-9c11-7ecd648efc5d.jpg
  AWS: {
    baseUrl: "https://s3.amazonaws.com/",
    bucket: "workspace-app",
  },

  WEBSOCKET_URL: 'ws://localhost:8280/ws'
  // WEBSOCKET_URL: 'ws://beast.bluecheeseapi.com/ws'
}
