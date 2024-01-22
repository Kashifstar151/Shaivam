import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, AppState, LogBox, PermissionsAndroid, View, } from 'react-native'
import { attachDb } from '../Screens/Database'
import HomeScreen from '../Screens/Home/HomeScreen'
import ThrimuraiHeadingPage from '../Screens/Thrimurai/ThrimuraiHeadingPage/ThrimuraiHeadingPage'
import ThrimuraiList from '../Screens/Thrimurai/ThrimuraiList/ThrimuraiList'
import ThrimuraiSong from '../Screens/Thrimurai/ThrimuraiSong/ThrimuraiSong'
import { RouteTexts } from './RouteText'
import SQLite from 'react-native-sqlite-storage';
import * as RNFS from 'react-native-fs'
import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from 'lottie-react-native';
import SearchScreen from '../Screens/Thrimurai/Searchscreen/SearchScreen'
import BottomTabs from './BottomTab/BottomTabs'

const Route = () => {
    const Stack = createNativeStackNavigator()
    const database = SQLite.openDatabase({ name: 'songData.db', createFromLocation: 1 });
    const [showDownloading, setShowDownloading] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    // const database = SQLite.openDatabase({ name: databaseName, });
    useEffect(() => {
        // checkConnection(true)
        AsyncStorage.setItem('@database', JSON.stringify({ name: 'songData.db', createFromLocation: 1 }))
        LogBox.ignoreAllLogs();
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                database.close();
            }
        });
        requestFilePermissions()
        // offlineDataBAse()
        const unsubscribe = addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            if (state.isConnected) {
                setIsConnected(true)
                checkConnection(true)
            } else {
                checkConnection(false)
            }
        });
        unsubscribe();
        // checkFileExist()
        // attachDb()
        // connectDataBaseToFolder()
    }, [])

    const checkConnection = (connected) => {
        if (connected) {
            Alert.alert('New Update Available', "Click ok to sync latest data", [
                {
                    text: 'Cancel',
                    onPress: () => onCancel()
                },
                {
                    text: 'Ok',
                    onPress: () => checkFileExist()
                },
            ]);
        } else {
            Alert.alert('You are offline!');
        }
    };
    const onCancel = () => {
        AsyncStorage.setItem('@database', JSON.stringify({ name: 'songData.db', createFromLocation: 1 }))
        // setShowDownloading(true)
        // setTimeout(() => {
        //     setShowDownloading(false)
        // }, 2000)
    }
    async function requestFilePermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'File Permission',
                    message: 'App needs access to your storage to read and write files.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('File permissions granted');
            } else {
                console.log('File permissions denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const checkFileExist = async () => {
        RNFS.exists(`${RNFS.ExternalDirectoryPath}/Thrimurai/thirumurai_songsData2.db`).then(async (res) => {
            if (res == true) {
                // InitializeDatabase()
                console.log(true)
                AsyncStorage.setItem('@database', JSON.stringify({ name: 'songData.db', createFromLocation: 1 }))
                setShowDownloading(true)
                setTimeout(() => {
                    setShowDownloading(false)
                }, 2000)
            } else {
                setShowDownloading(true)
                console.log(false)
                const promise = attachDb()
                promise.then((res) => {
                    console.log("res", res)
                    setShowDownloading(false)
                }).catch((error) => {
                    console.log("error", error)
                    setShowDownloading(false)
                })
                AsyncStorage.setItem('@database', JSON.stringify({ name: 'main.db' }))
            }
        }).catch((error) => {
            console.log("🚀 ~ file: route.js:99 ~ RNFS.exists ~ error:", error)
        })
    }

    return (
        <>
            {showDownloading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        style={{ height: 200, width: 200 }}
                        source={require('../assets/JSON/Animation - 1704052511281.json')}
                        autoPlay
                        loop
                    />
                </View>
            ) : (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name={RouteTexts.BOTTOM_TABS} component={BottomTabs} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Thrimurai" component={ThrimuraiList} />
                        <Stack.Screen name={RouteTexts.SEARCH_SCREEN} component={SearchScreen} />
                        <Stack.Screen
                            name={RouteTexts.THIRIMURAI_HEADING}
                            component={ThrimuraiHeadingPage}
                        />
                        <Stack.Screen name={RouteTexts.THRIMURAI_SONG} component={ThrimuraiSong} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}

export default Route