// Simple React Native specific changes

import 'App/I18n/I18n'
import Config from 'react-native-config'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  menuIcon: 'menu',
  addIcon: 'plus',
  backIcon: 'arrow-left',
  downIcon: 'arrow-down',
  closeIcon: 'x',
  infoIcon: 'info',
  moreIcon: 'more-horizontal',
  moneyIcon: 'dollar-sign',
  loaderIcon: 'loader',
  checkIcon: 'check',
  lockIcon: 'lock',
  userIcon: 'user',
  phoneIcon: 'phone',
  ccIcon: 'credit-card',
  imageIcon: 'image',

  defaultShareImage: "https://s3.amazonaws.com/workspace-app/images/assets/LinkImage.png",
  aws: {
    baseUrl: "https://s3.amazonaws.com/",
    bucket: Config.AWS_BUCKET,
  },


  defaultPaymentMilestoneValue: .2,
  paymentMultiplierPercent: 'percent',
  paymentMultiplierCurrency: 'currency',

  // INITIAL_APP_SPLASH_TIMEOUT: 2500

  inviteCode: "70445233",

  dropboxAppKey: 'tpxpgyi5pvf8z0d',
  dropboxType: 'dropbox',

  googleDriveType: 'google_drive',
  imageType: 'image',

}
