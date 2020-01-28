#!/bin/bash

export CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export APP_DIR="$CURR_DIR/../../app"

adb -d install -r "$APP_DIR/app-release.apk"
