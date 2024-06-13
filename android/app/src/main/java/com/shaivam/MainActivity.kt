package com.shaivam
import android.os.Bundle
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.app.AlarmManager
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.util.Log
import android.app.AlertDialog
import io.sentry.Sentry

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String = "Shaivam"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        try {
      throw Exception("This is a test.")
       } catch (e: Exception) {
         Sentry.captureException(e)
         }
        // Additional initialization can go here.
    }

    override fun onResume() {
        super.onResume()
        // Check if the app can schedule exact alarms
        Log.d("SDKCheck", "Current SDK Version: ${Build.VERSION.SDK_INT}")
        val alarmManager = getSystemService(Context.ALARM_SERVICE) as AlarmManager
          if (!alarmManager.canScheduleExactAlarms()) {
                showAlertForExactAlarmPermission()
            }
            // If not, request the SCHEDULE_EXACT_ALARM permission

           
        
    }
    private fun showAlertForExactAlarmPermission() {
    AlertDialog.Builder(this)
        .setTitle("Permission Needed")
        .setMessage("Our app needs to schedule exact alarms to function properly. Please enable this permission in the settings.")
        .setPositiveButton("Go to Settings") { dialog, which ->
            val intent = Intent(android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM)
            intent.data = Uri.fromParts("package", packageName, null)
            startActivity(intent)
        }
        .setNegativeButton("Cancel", null)
        .show()
}

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
