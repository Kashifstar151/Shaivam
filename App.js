import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Route from './src/navigation/Route';
import HomeScreen from './src/Screens/Home/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import { ThemeContextProvider } from './src/Context/ThemeContext';

const App = () => {
    return (
        <ThemeContextProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Route />
                </GestureHandlerRootView>
            </SafeAreaView>
        </ThemeContextProvider>
    );
};

export default App