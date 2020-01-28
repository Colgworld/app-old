Build Icons

http://apetools.webprofusion.com/tools/imagegorilla
http://appiconmaker.co/


# Tools
```
./install_tools # TBC

brew cask install fastlane

```



# To build IOS App for testing
```

# Build app
cd ios/
match appstore # then login with your apple ID
fastlane build

# List devices
instruments -s

# Push to device
ios-deploy -i c89bf82150832a3ee8e080ac335fa8c010d37304 -b ./build/workspace.xcarchive/Products/Applications/Workspace.app
```


# To build Android App for testing

```
cd android/
fastlane add_plugin increment_version_code
fastlane build

# Uninstall installed version (if installed)
adb uninstall com.workspace

# Install to device on Android
adb -d install android/app/build/outputs/apk/debug/app-debug.apk

# Sign the build
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore signingKey.jks app/build/outputs/apk/release/app-release-unsigned.apk workspacekey0
```

https://play.google.com/apps/publish/?account=7849845620223351500#AppDashboardPlace:p=com.workspace



### Random xcodebuild commands (not fully working example)
```

# List code signing identities
security find-identity -v -p codesigning

# Build app
xcodebuild clean build -scheme workspace -workspace workspace.xcworkspace

xcodebuild -workspace workspace.xcworkspace -scheme workspace -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/workspace.xcarchive

# Ensure provisioning certs were installed
xcodebuild -exportArchive -archivePath $PWD/build/workspace.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/build -allowProvisioningUpdates
```
AWS_PROFILE=workspace aws s3 cp workspace.ipa s3://workspace-app/ios.app


xcodebuild -scheme MyiOSApp archive \
    -archivePath /Users/username/Desktop/MyiOSApp.xcarchive

xcodebuild -exportArchive -exportFormat ipa \
    -archivePath "/Users/username/Desktop/MyiOSApp.xcarchive" \
    -exportPath "/Users/username/Desktop/MyiOSApp.ipa" \
    -exportProvisioningProfile "MyCompany Distribution Profile"



# get simulators
instruments -s devices
react-native run-ios --simulator "iPad Pro (10.5-inch)"
react-native run-ios --simulator "iPhone 6s Plus"


Generate Cert for Push Notifications

https://support.clevertap.com/docs/ios/how-to-create-an-ios-apns-certificate.html    
openssl x509 -in aps.cer -inform DER -out aps.pem -outform PEM
openssl pkcs12 -export -out aps.p12 -inkey app.key -in aps.pem




FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD="dsux-ihwb-qvqx-dnnk"




example Branch link data
// console.log(params)

// params = {
//   "+clicked_branch_link": true,
//   "$android_url": "https://play.google.com/app",
//   "$canonical_identifier": "project/2",
//   "$desktop_url": "https://www.tryworkspace.com",
//   "$exp_date": 0,
//   "$identity_id": "425121471120241330",
//   "$ios_url": "https://www.tryworkspace.com/app",
//   "$og_description": "Your contractor has invited you to collaborate on Workspace - undefined",
//   "$one_time_use": false,
//   "$publicly_indexable": 0,
//   "member": {
//     "company": "",
//     "emailAddresses": [{
//       "email": "anna-haro@mac.com",
//       "label": "home"
//     }],
//     "familyName": "Haro",
//     "givenName": "Anna",
//     "hasThumbnail": 0,
//     "jobTitle": "",
//     "middleName": "",
//     "phoneNumbers": [{
//       "label": "home",
//       "number": "555-522-8243"
//     }],
//     "postalAddresses": [{
//     "city": "Sausalito",
//     "country": "USA",
//     "label": "home",
//     "postCode": "94965",
//     "region": "Sausalito",
//     "street": "1001  Leavenworth Street"
//     }],
//     "recordID": "3675FBEB-ECDE-43D1-8CAD-B90177FCC74F",
//     "thumbnailPath": ""
//   },
//   "projectID": 2,
//   "~channel": "RNApp",
//   "~creation_source": 3,
//   "~feature": "share",
//   "~id": "426147700006899184"
//   }