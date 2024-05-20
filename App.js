import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, View, useColorScheme, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Route from './src/navigation/Route';
import HomeScreen from './src/Screens/Home/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import { ThemeContextProvider } from './src/Context/ThemeContext';
import { enableLatestRenderer } from 'react-native-maps';
import StoreProvider from './src/store/storeProvider';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import NavigationServices from './src/navigation/NavigationServices';
import { RouteTexts } from './src/navigation/RouteText';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";

const App = () => {
    useEffect(() => {
        enableLatestRenderer();
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                console.log("🚀 ~ useEffect ~ link:", link)
                const getId = link?.url?.split('=').pop()
                console.log("🚀 ~ useEffect ~ getId:", getId)
                if (link !== null) {
                    if (link?.url == `https://shaivaam.page.link/org?eventId=${getId}`) {
                        NavigationServices.navigate(RouteTexts.EVENT_DETAILS, {
                            item: getId,
                            external: true
                        });
                    } else {
                        NavigationServices.navigate(RouteTexts.THRIMURAI_SONG, {
                            data: {
                                prevId: getId
                            }
                        });
                    }
                }
            });
    }, []);
    const HandleDynamicLink = link => {
        console.log("🚀 ~ HandleDynamicLink ~ link:", link)
        const getId = link?.url?.split('=').pop()
        console.log("🚀 ~ HandleDynamicLink ~ getId:", getId)
        if (link?.url == `https://shaivaam.page.link/org?eventId=${getId}`) {
            NavigationServices.navigate(RouteTexts.EVENT_DETAILS, {
                data: {
                    prevId: getId
                }
            });
        } else {
            NavigationServices.navigate(RouteTexts.THRIMURAI_SONG, {
                data: {
                    prevId: getId
                }
            });
        }
        // if (link) {
        //     NavigationServices.navigate(RouteTexts.THRIMURAI_SONG, {
        //         data: {
        //             prevId: getId
        //         }
        //     });
        // }
        // Handle dynamic link inside your own application

    };
    useEffect(() => {
        // console.log("🚀 ~ useEffect ~ permission:", permission)

    }, [])



    useEffect(() => {
        checkPermissionAccess()
        const unsubscribe = dynamicLinks().onLink(HandleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();

    }, []);
    const checkPermissionAccess = async () => {
        const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);;
        console.log("🚀 ~ checkPermissionAccess ~ permission:", permission)
    }
    return (
        <StoreProvider>
            <ThemeContextProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>

                        <Route />
                    </GestureHandlerRootView>
                </SafeAreaView>
            </ThemeContextProvider>
        </StoreProvider>
    );
};

export default App;
