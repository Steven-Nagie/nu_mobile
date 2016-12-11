package com.nu.world;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.mybigday.rns3.RNS3TransferUtility;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "nu";
    }
    public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    RNS3TransferUtility.nativeCredentialsOptions.put("region", "eu-west-1");
    RNS3TransferUtility.nativeCredentialsOptions.put("type", RNS3TransferUtility.CredentialType.BASIC);
    RNS3TransferUtility.nativeCredentialsOptions.put("access_key", "your_access_key_here");
    RNS3TransferUtility.nativeCredentialsOptions.put("secret_key", "your_secret_key_here");
  }
}
