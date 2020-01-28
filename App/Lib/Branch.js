'use strict'


/**
 * Branch Deep Linking
 */
import branch, {
  AddToCartEvent,
  AddToWishlistEvent,
  PurchasedEvent,
  PurchaseInitiatedEvent,
  RegisterViewEvent,
  ShareCompletedEvent,
  ShareInitiatedEvent
} from 'react-native-branch'


// const data = {
//   identifier: 'some-id',
//   metadata: {},
//   title: "Some Title",
//   contentImageUrl: "https://s3.amazonaws.com/workspace-app/images/default.png",
//   contentDescription: "This is the project you're invited to"
// }


export class Branch {

    async getShortURL(data) {

      let shortUrl


      let BranchUniversalObject = async () => {

        return await branch.createBranchUniversalObject(data['identifier'], {
            automaticallyListOnSpotlight: true,
            metadata: data['metadata'],
            title: data['title'],
            contentImageUrl: data['contentImageUrl'],
            contentDescription: data['contentDescription']
          })}

      return await BranchUniversalObject().then((branchUniversalObject) => {


        let linkProperties = { 
          feature: 'share', 
          channel: 'WorkspaceApp',
        }

        let controlParams = { 
          $android_deepview: "branch_default",
          $desktop_deepview: "branch_default",
          $ios_deepview: "branch_default",
          $desktop_url: 'branch_default', 
          $ios_url: 'branch_default',
          $android_url: 'branch_default'
        }

        let getURL = async () => {
          return await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
        }

        return getURL().then((shortUrl) => {
          shortUrl = shortUrl                     

          return shortUrl.url       
        })

      }) // end BUO then       
    }
}


export let branchLib = new Branch()