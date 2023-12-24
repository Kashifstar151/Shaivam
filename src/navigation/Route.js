import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Alert, AppState, PermissionsAndroid, } from 'react-native'
import { attachDb, connectDataBaseToFolder, initDatabase, offlineDataBAse, StoreData } from '../Screens/Database'
import HomeScreen from '../Screens/Home/HomeScreen'
import ThrimuraiHeadingPage from '../Screens/Thrimurai/ThrimuraiHeadingPage/ThrimuraiHeadingPage'
import ThrimuraiList from '../Screens/Thrimurai/ThrimuraiList/ThrimuraiList'
import ThrimuraiSong from '../Screens/Thrimurai/ThrimuraiSong/ThrimuraiSong'
import { RouteTexts } from './RouteText'
import SQLite from 'react-native-sqlite-storage';
import * as RNFS from 'react-native-fs'
import { useNetInfo } from '@react-native-community/netinfo';
import SearchScreen from '../Screens/Thrimurai/ThrimuraiSong/SearchScreen'

const Route = () => {
    const Stack = createNativeStackNavigator()
    const database = SQLite.openDatabase({ name: 'songData.db', createFromLocation: 1 });
    const netInfo = useNetInfo();
    const databaseName = 'main.db';
    // const database = SQLite.openDatabase({ name: databaseName, });
    useEffect(() => {
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                database.close();
            }
        });
        requestFilePermissions()
        // offlineDataBAse()
        // checkConnection()
        // checkFileExist()
        // attachDb()
        // connectDataBaseToFolder()
    }, [])
    const checkConnection = () => {
        if (netInfo.isConnected) {
            Alert.alert('New Update Available', "Click ok to sync latest data", [

                {
                    text: 'Cancel',
                    onPress: () => console.log(true)
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
    const checkFileExist = () => {
        RNFS.exists(`${RNFS.ExternalDirectoryPath}/Thrimurai/thirumurai.db`).then((res) => {
            // console.log("🚀 ~ file: route.js:51 ~ RNFS.xists ~ res:", res)
            if (res == true) {
                // InitializeDatabase()
            } else {
                attachDb()
            }
        }).catch((error) => {
            // console.log("🚀 ~ file: route.js:52 ~ RNFS.exists ~ error:", error)

        })
    }
    const InitializeDatabase = () => {
        RNFS.readDir(`${RNFS.ExternalDirectoryPath}/Thrimurai`)
            .then((files) => {
                console.log("🚀 ~ file: route.js:50 ~ unzipDownloadFile ~ files:", files)
                const fileNames = files.map(fileInfo => fileInfo.name);
                console.log('File names in the directory:', fileNames);

                try {
                    database.transaction(async (tx) => {
                        await tx.executeSql(
                            'ATTACH DATABASE ? AS Updated_db',
                            [`${RNFS.ExternalDirectoryPath}/Thrimurai/thirumuraiData.db`],
                            (tx, results) => {
                                console.log("🚀 ~ file: Database.js:49 ~ database.transaction ~ results:", tx, results)
                            }
                        );
                        tx.executeSql('COMMIT;');
                    }, (error) => {
                        console.log("🚀 ~ file: route.js:101 ~ database.transaction ~ error:", error)
                    });
                    // database.transaction(async (tx) => {
                    //     await tx.executeSql(
                    //         'ATTACH DATABASE ? AS Updated_db',
                    //         [`${RNFS.ExternalDirectoryPath}/Thrimurai/thirumuraiSecond.db`],
                    //         (tx, results) => {
                    //             console.log("🚀 ~ file: Database.js:49 ~ database.transaction ~ results:", tx, results)
                    //         }
                    //     );
                    //     tx.executeSql('COMMIT;');
                    // });
                } catch (error) {
                    console.log("🚀 ~ file: route.js:53 ~ unzipDownloadFile ~ error:", error)
                }
                // You can now use the file names for further processing
            })
            .catch(error => console.error('Error reading directory:', error));
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                <Stack.Screen name="Thrimurai" component={ThrimuraiList} />
                <Stack.Screen name={RouteTexts.SEARCH_SCREEN} component={SearchScreen} />
                <Stack.Screen name={RouteTexts.THIRIMURAI_HEADING} component={ThrimuraiHeadingPage} />
                <Stack.Screen name={RouteTexts.THRIMURAI_SONG} component={ThrimuraiSong} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route