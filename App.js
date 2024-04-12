import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
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
                    NavigationServices.navigate(RouteTexts.THRIMURAI_SONG, {
                        data: {
                            prevId: getId
                        }
                    });
                }
            });
    }, []); 3
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
