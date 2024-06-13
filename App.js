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

const App = () => {
    useEffect(() => {
        enableLatestRenderer();
        initialUrl();
    }, []);
    const initialUrl = async () => {
        await dynamicLinks()
            .getInitialLink()
            .then((link) => {
                HandleDynamicLink(link);
            });
        const linkingListener = dynamicLinks().onLink(HandleDynamicLink);
        return () => {
            linkingListener();
        };
    };
    const HandleDynamicLink = (link) => {
        console.log('🚀 ~ HandleDynamicLink ~ link:', link);
        const getId = link?.url?.split('=').pop();
        console.log('🚀 ~ HandleDynamicLink ~ getId:', link);
        // if (link !== null) {
        if (link?.url == `https://shaivaam.page.link/org?eventId=${getId}`) {
            setTimeout(() => {
                NavigationServices.navigate(RouteTexts.EVENT_DETAILS, {
                    item: getId,
                    external: true,
                });
            }, 1000);
        } else if (link?.url == `https://shaivaam.page.link/org?prevId=${getId}`) {
            setTimeout(() => {
                NavigationServices.navigate(RouteTexts.THRIMURAI_SONG, {
                    data: {
                        prevId: getId,
                    },
                });
            }, 1000);
        } else if (link?.url == `https://shaivaam.page.link/org?templeId=${getId}`) {
            setTimeout(() => {
                NavigationServices.navigate('templeDetails', {
                    temple: {
                        templeId: getId,
                    },
                    external: true,
                });
            }, 1000);
        }
        // }
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
        // Activate keep awake when component mounts
        KeepAwake.activate();

        // Deactivate keep awake when component unmounts
        return () => {
            KeepAwake.deactivate();
        };
    }, []);

    useEffect(() => {
        checkPermissionAccess();
        const unsubscribe = dynamicLinks().onLink(HandleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
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

export default App;
