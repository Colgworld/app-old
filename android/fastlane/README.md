fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android test
```
fastlane android test
```
Runs all the tests
### android upload_beta
```
fastlane android upload_beta
```

### android beta
```
fastlane android beta
```
Submit a new Beta Build to Crashlytics Beta
### android build
```
fastlane android build
```

### android release
```
fastlane android release
```
Deploy a new version to the Google Play
### android sign
```
fastlane android sign
```

### android upload
```
fastlane android upload
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
