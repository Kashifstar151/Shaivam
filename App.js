import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Route from './src/navigation/Route';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/Context/ThemeContext';
import { enableLatestRenderer } from 'react-native-maps';
import StoreProvider from './src/store/storeProvider';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import NavigationServices from './src/navigation/NavigationServices';
import { RouteTexts } from './src/navigation/RouteText';
import KeepAwake from 'react-native-keep-awake';
import * as Sentry from "@sentry/react-native";

// Sentry.init({
//     dsn: "https://34040ba1caae1102625264b6fe33ba1d@o4505442494971904.ingest.us.sentry.io/4507423552569344",
//     // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
//     // We recommend adjusting this value in production.
//     tracesSampleRate: 1.0,
//     _experiments: {
//         // profilesSampleRate is relative to tracesSampleRate.
//         // Here, we'll capture profiles for 100% of transactions.
//         profilesSampleRate: 1.0,
//     },
// });


const App = () => {
    useEffect(() => {
        enableLatestRenderer();
        // initialUrl()
    }, []);


    useEffect(() => {
        // Activate keep awake when component mounts
        KeepAwake.activate();
        // Deactivate keep awake when component unmounts
        return () => {
            KeepAwake.deactivate();
        };
    }, []);



    const checkPermissionAccess = async () => {
        const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        console.log('🚀 ~ checkPermissionAccess ~ permission:', permission);
    };
    return (
        <StoreProvider>
            <ThemeContextProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <Route />
                        {/* <Radios /> */}
                    </GestureHandlerRootView>
                </SafeAreaView>
            </ThemeContextProvider>
        </StoreProvider>
    );
};

export default Sentry.wrap(App);
