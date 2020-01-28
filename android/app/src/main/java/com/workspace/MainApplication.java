package com.workspace;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.branch.rnbranch.RNBranchPackage;
import io.branch.referral.Branch;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
// import com.meedan.ShareMenuPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
// import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.magus.fblogin.FacebookLoginPackage;
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNBranchPackage(),
            new FacebookLoginPackage(),
            new VectorIconsPackage(),
            new RSSignatureCapturePackage(),
            // new ShareMenuPackage(),
            new ImagePickerPackage(),
            new ReactNativeI18n(),
            // new RNGoogleSigninPackage(),
            new RNFSPackage(),
            new RNDeviceInfo(),
            new ReactNativeContacts(),
            new RCTCameraPackage(),
            new LinearGradientPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativePushNotificationPackage(),
            new FabricPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    Branch.getAutoInstance(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
