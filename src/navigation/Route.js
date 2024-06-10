import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, AppState, LogBox, PermissionsAndroid, Platform, View } from 'react-native';
import { attachDb } from '../Screens/Database';
import HomeScreen from '../Screens/Home/HomeScreen';
import ThrimuraiHeadingPage from '../Screens/Thrimurai/ThrimuraiHeadingPage/ThrimuraiHeadingPage';
import ThrimuraiList from '../Screens/Thrimurai/ThrimuraiList/ThrimuraiList';
import ThrimuraiSong from '../Screens/Thrimurai/ThrimuraiSong/ThrimuraiSong';
import { RouteTexts } from './RouteText';
import SQLite from 'react-native-sqlite-storage';
import * as RNFS from 'react-native-fs';
import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import SearchScreen from '../Screens/Thrimurai/Searchscreen/SearchScreen';
import BottomTabs from './BottomTab/BottomTabs';
import Strotras from '../Screens/Strotras/Strotras';
import { MusicContextProvider } from '../components/Playbacks/TrackPlayerContext';
import TempleTabs from './BottomTab/TempleTabs';
import SongLists from '../Screens/Favourite/SongLists';
import {
    CardStyleInterpolators,
    TransitionSpecs,
    createStackNavigator,
} from '@react-navigation/stack';
import CreateTrip from '../Screens/Temples/MyTrip/CreateTrip';
import TempleSelection from '../Screens/Temples/TempleSelection';
import TempleDetails from '../Screens/Temples/TempleDetails';
import FilteredTemplesPage from '../Screens/Temples/FilteredTemplesPage';
// import ImageSubmitPage from '../Screens/Temples/SuccuessPages/SpottingErrorPage';
import SpottingErrorPage from '../Screens/Temples/SuccuessPages/SpottingErrorPage';
import SelectErrorPage from '../Screens/Temples/SuccuessPages/SelectErrorPage';
// import PinTheLocation from '../Screens/Temples/PinTheLocationPage';
import Onboarding from '../Screens/OnboardingScreen/Onboarding';
import EventDetails from '../Screens/Calender/EventDetails';
import CreateVirtualEvent from '../Screens/Calender/CreateVirtualEvent';
import Success from '../Screens/Success/Success';
import Radios from '../Screens/Radio/Radios';
import OmChanting from '../Screens/Home/OmChanting';
import NavigationServices from './NavigationServices';
import { RESULTS } from 'react-native-permissions';
import { PlayerProvider } from '../Context/PlayerContext';
import DBInfo from '../../DBInfo';
import WebsiteView from '../Screens/Calender/WebsiteView';
import Notification from '../Screens/Notifications/Notification';
import FestivalVideo from '../Screens/Calender/FestivalVideo';
import SendFestivalEvent from '../Screens/Calender/SendFestivalEvent';
// import { ThemeContextProvider } from '../Context/ThemeContext';

const Route = () => {
    const Stack = createNativeStackNavigator();
    // const database = SQLite.openDatabase({ name: 'songData.db', createFromLocation: 1 });
    const [showDownloading, setShowDownloading] = useState(false);
    const [isConnected, setIsConnected] = useState();
    const offlineDatabase = SQLite.openDatabase({ name: 'main.db', });

    // const database = SQLite.openDatabase({ name: databaseName, });
    useEffect(() => {
        LogBox.ignoreAllLogs();
        const unsubscribe = addEventListener((state) => {
            if (state.isConnected) {
                setIsConnected(true);
            }
        });
        return unsubscribe();
    }, []);

    useEffect(() => {
        if (isConnected) {
            checkConnection(isConnected);
        }
    }, [isConnected]);

    const checkConnection = async (connected) => {

        let localDBMetaData = JSON.parse(await AsyncStorage.getItem('DB_METADATA'));
        if (!localDBMetaData) {
            AsyncStorage.setItem('DB_METADATA', JSON.stringify(DBInfo));
            localDBMetaData = DBInfo;
        }
        if (connected) {
            fetch(
                'https://qa-admin.shaivam.in/api/app-dump-updates?pagination[pageSize]=1&sort[0]=Version:desc'
            )
                .then((result) => result.json())
                .then(async (response) => {
                    console.log('the api response is ===>', response?.data?.[0]?.attributes);
                    if (
                        localDBMetaData?.Version &&
                        response?.data?.[0]?.attributes.Version !== localDBMetaData?.Version
                    ) {
                        /*
                           *? response?.data?.[0]?.attributes ==> is our metaData whihc will contain  data like 
                           {
                                "DumpName": "thirumuraiSongs", 
                                "FilePath": "https://shaivamfiles.fra1.cdn.digitaloceanspaces.com/sqlitedump/thirumuraiSongs_12.zip", 
                                "Version": "12", 
                                "createdAt": "2024-04-09T10:17:27.323Z", 
                                "publishedAt": "2024-04-09T10:17:28.545Z", 
                                "updatedAt": "2024-04-29T07:08:10.139Z"}
                        */
                        Alert.alert('New Update Available', 'Click ok to sync latest data', [
                            {
                                text: 'Cancel',
                                onPress: () => onCancel(),
                            },
                            {
                                text: 'Ok',
                                onPress: () => checkFileExist(response?.data?.[0]?.attributes),
                            },
                        ]);
                    } else {
                        console.log('fsjdh')
                        let data = await AsyncStorage.getItem('@databse')
                        data = JSON.parse(data)
                        if (data?.name == 'main.db') {
                            offlineDatabase.transaction(
                                async (tx) => {
                                    await tx.executeSql(
                                        'ATTACH DATABASE ? AS Updated_db',
                                        [
                                            `${RNFS.ExternalDirectoryPath}/Thrimurai/thirumuraiSong_${response?.data?.[0]?.attributes.Version}.db`,
                                        ],
                                        async (tx, results) => {
                                            console.log("🚀 ~ results:", results)
                                            resolve(tx);

                                        }
                                    );
                                },
                                async (error) => {
                                    const data = await AsyncStorage.getItem('@database');
                                    reject(error);
                                }
                            )
                        }
                        // checkFileExist(localDBMetaData) 
                    }
                })
                .catch((err) => {
                    console.log('The error occured ==>', err);
                });
        } else {
            Alert.alert('You are offline!');
        }
    };
    const onCancel = () => {
        AsyncStorage.setItem(
            '@database',
            JSON.stringify({ name: 'songData.db', createFromLocation: 1 })
        );
        // setShowDownloading(true)
        // setTimeout(() => {
        //     setShowDownloading(false)
        // }, 2000)
    };

    // async function filePermissionProcess() {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //             // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    //             {
    //                 title: 'File Permission',
    //                 message: 'App needs access to your storage to read and write files.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             }
    //         );
    //         return { permissionType: granted, status: 'SUCCESS', error: null };
    //     } catch (err) {
    //         console.warn(err);
    //         return { permissionType: null, status: 'ERROR', error: err };
    //     }
    // }

    async function requestFilePermissions() {
        let fileAccessRequest = { permissionType: null, status: null, error: null };
        if (
            (!(Platform.constants['Release'] >= 13) && Platform.OS === 'android') ||
            Platform.OS === 'ios'
        ) {
            fileAccessRequest = await filePermissionProcess();
        } else {
            fileAccessRequest = {
                permissionType: RESULTS.GRANTED,
                status: 'SUCCESS',
            };
        }
        if (
            fileAccessRequest?.status === 'SUCCESS' &&
            fileAccessRequest.permissionType === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('File permissions granted');
        } else {
            console.log('File permissions denied', fileAccessRequest);
        }
    }

    const downloadDB = async (metaData) => {
        setShowDownloading(true)
        await requestFilePermissions();
        const promise = await attachDb(metaData);
        setShowDownloading(false);
        promise
            .then((res) => {
                console.log('res', res);
                setShowDownloading(false);
                // setting the metaData once the update is done
                AsyncStorage.setItem('DB_METADATA', JSON.stringify(metaData));
                AsyncStorage.setItem('@database', JSON.stringify({ name: 'main.db' }));
            })
            .catch((error) => {
                console.log('error', error);
                setShowDownloading(false);
                AsyncStorage.setItem('@database', JSON.stringify({ name: 'main.db' }));
            });
    };

    const checkFileExist = async (metaData) => {
        let path =
            Platform.OS == 'android'
                ? `${RNFS.ExternalDirectoryPath}/Thrimurai/thirumuraiSong_${metaData.Version}.db`
                : `${RNFS.DocumentDirectoryPath}/Thrimurai/thirumuraiSong_${metaData.Version}.db`;
        RNFS.exists(path)
            .then(async (res) => {
                if (res == true) {
                    // InitializeDatabase()
                    console.log(true);
                    requestFilePermissions();
                    AsyncStorage.setItem(
                        '@database',
                        JSON.stringify({ name: 'main.db', })
                    );
                    offlineDatabase.transaction(
                        async (tx) => {
                            await tx.executeSql(
                                'ATTACH DATABASE ? AS Updated_db',
                                [
                                    `${RNFS.ExternalDirectoryPath}/Thrimurai/thirumuraiSong_${metaData.Version}.db`,
                                ],
                                async (tx, results) => {
                                    console.log("🚀 ~ results:", results)
                                    resolve(tx);

                                }
                            );
                        },
                        async (error) => {
                            const data = await AsyncStorage.getItem('@database');
                            reject(error);
                        }
                    );
                    // alert(true);
                    setShowDownloading(true);

                    console.log('downloading exist', path)
                    setTimeout(() => {
                        setShowDownloading(false);
                    }, 2000);
                } else {
                    requestFilePermissions();

                    // alert(false);
                    setShowDownloading(true);
                    const promise = await attachDb(metaData);
                    await AsyncStorage.setItem('@database', JSON.stringify({ name: 'main.db' }));
                    setShowDownloading(false);
                    // promise
                    //     .then((res) => {
                    //         console.log('res', res);
                    //         setShowDownloading(false);
                    //     })
                    //     .catch((error) => {
                    //         console.log('error', error);
                    //     });
                }
            })
            .catch((error) => {
                setShowDownloading(false);
                console.log('🚀 ~ file: route.js:99 ~ RNFS.exists ~ error:', error);
            });
        await AsyncStorage.setItem('DB_METADATA', JSON.stringify(metaData));
    };

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
                <NavigationContainer ref={(ref) => NavigationServices.setTopLevelNavigator(ref)}>
                    <Stack.Navigator
                        initialRouteName={RouteTexts.ONBOARDING_SCREEN}
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name={RouteTexts.BOTTOM_TABS} component={BottomTa} />
                        <Stack.Screen name={RouteTexts.TEMPLE_Tabs} component={TempleTabs} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Thirumurais" component={ThrimuraiList} />
                        <Stack.Screen name={RouteTexts.SEARCH_SCREEN} component={SearchScreen} />
                        <Stack.Screen name={RouteTexts.ONBOARDING_SCREEN} component={Onboarding} />
                        <Stack.Screen name={RouteTexts.WEBSIRE_VIEW} component={WebsiteView} />
                        <Stack.Screen name={RouteTexts.NOTIFICATION} component={Notification} />
                        <Stack.Screen
                            name={RouteTexts.VIRTUAL_EVENT_CREATE}
                            component={CreateVirtualEvent}
                        />
                        <Stack.Screen
                            name={RouteTexts.TEMPLE_SELECTION}
                            component={TempleSelection}
                        />
                        <Stack.Screen
                            name={RouteTexts.SPOTTING_ERROR_PAGE}
                            component={SpottingErrorPage}
                        />
                        <Stack.Screen
                            name={RouteTexts.SONGS_LIST}
                            component={SongLists}
                            options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                                gestureEnabled: true,
                            }}
                        />
                        <Stack.Screen
                            name={RouteTexts.CREATE_TRIP}
                            component={CreateTrip}
                            options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                                //  CardStyleInterpolators.forHorizontalIOS,
                                // transitionSpec: {
                                //   open: config,
                                //   close: config,
                                // },
                                // gestureDirection: 'horizontal-inverted',
                                gestureEnabled: true,
                            }}
                        />
                        <Stack.Screen
                            name={RouteTexts.THIRIMURAI_HEADING}
                            component={ThrimuraiHeadingPage}
                        />
                        <Stack.Screen name={RouteTexts.EVENT_DETAILS} component={EventDetails} />
                        <Stack.Screen name={RouteTexts.THRIMURAI_SONG} component={MusicComponent} />
                        <Stack.Screen name={'Stotras'} component={Strotras} />
                        <Stack.Screen name={RouteTexts.SUCCESS} component={Success} />
                        <Stack.Screen
                            name={RouteTexts.ERROR_SELECTION_PAGE}
                            component={SelectErrorPage}
                        />
                        <Stack.Screen
                            name={'templeDetails'}
                            component={TempleDetails}
                            options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                                gestureEnabled: true,
                            }}
                        />
                        <Stack.Screen name={'filteredTemples'} component={FilteredTemplesPage} />
                        <Stack.Screen name={RouteTexts.OM_CHANTING} component={OmChanting} />
                        <Stack.Screen name={RouteTexts.FESTIVAL_VIDEO} component={FestivalVideo} />
                        <Stack.Screen name={RouteTexts.SEND_FESTIVAL_VIDEO} component={SendFestivalEvent} />
                        <Stack.Screen name={RouteTexts.RADIO} component={Radios} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
};

const MusicComponent = (props) => (
    <MusicContextProvider>
        <ThrimuraiSong {...props} />
    </MusicContextProvider>
);
const BottomTa = (props) => {
    console.log("🚀 ~ BottomTa ~ props:", JSON.stringify(props))
    return (
        <PlayerProvider>
            <BottomTabs {...props} />
        </PlayerProvider>
    )
}

export default Route;
