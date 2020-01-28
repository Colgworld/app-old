#!/bin/bash

export CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export APP_DIR="$CURR_DIR/../../app"
export KEY_ALIAS="workspacekey0"
export KEYSTORE_PASSWORD="Middletown2366!"
export KEY_ALIAS_PASSWORD="Middletown2366!"
export APK_PATH="$APP_DIR/build/outputs/apk/release/app-release-unsigned.apk"

jarsigner -verbose \
    -sigalg SHA1withRSA \
    -digestalg SHA1 \
    -keystore "$APP_DIR/keystores/workspace.jks" "$APK_PATH" $KEY_ALIAS \
    -storepass:env KEYSTORE_PASSWORD \
    -keypass:env KEY_ALIAS_PASSWORD

rm -f "$APP_DIR/app-release.apk"
sh -c "$CURR_DIR/zipalign -v 4 $APK_PATH $APP_DIR/app-release.apk"