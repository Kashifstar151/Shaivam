import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from '../../../components/BackButton';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import SearchInput from '../../../components/SearchInput';
import LinearGradient from 'react-native-linear-gradient';
import GradientContainer from '../../../components/GradientContainer';
// import BookIcon from '../../../../assets/Images/Vector.svg';
import MusicContainer from '../../../../assets/Images/Frame 83.svg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { RouteTexts } from '../../../navigation/RouteText';
import { JSONData } from '../../../../output.js';
import BackgroundService from 'react-native-background-actions';
import { attachDb, getSqlData, StoreData } from '../../Database';
import SQLite from 'react-native-sqlite-storage';
import { colors } from '../../../Helpers';
import HeaderWithTextInput from '../../../components/HeaderWithTextInput';
import EllipseSVGRight from '../../../components/SVGs/EllipseSVGRight';
import EllispseSVGLeft from '../../../components/SVGs/EllispseSVGLeft';
import { ThemeContext } from '../../../Context/ThemeContext';
import BookIcon from '../../../components/SVGs/BookIcon';
import { useTranslation } from 'react-i18next';
// import '../../../../localization';

const ThrimuraiList = ({ navigation }) => {
    const LANGS = [
        { lngCode: 'en', label: 'English' },
        { lngCode: 'hi', label: 'हिन्दी' },
        { lngCode: 'ar', label: 'Arabic' },
        { lngCode: 'as', label: 'Assamese' },
        { lngCode: 'gu', label: 'Gujarati' },
        { lngCode: 'he', label: 'Hebrew' },
        { lngCode: 'ja', label: 'Japanese' },
        { lngCode: 'kn', label: 'Kannada' },
        { lngCode: 'ml', label: 'Malayalam' },
        { lngCode: 'od', label: 'Odia' },
        { lngCode: 'pa', label: 'Punjabi' },
        { lngCode: 'si', label: 'Sinhala' },
        { lngCode: 'ta', label: 'Tamil' },
        { lngCode: 'te', label: 'Telugu' },
        { lngCode: 'ur', label: 'Urdu' },
    ];

    const { t, i18n } = useTranslation();
    // const selectedLngCode = i18n.language;
    // const setLng = (lngCode) => i18n.changeLanguage(lngCode);

    const [searchText, setSearchText] = useState(null);
    const [thrimurais, setThrimurais] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    // const database = SQLite.openDatabase({ name: '/storage/emulated/0/Android/data/com.shaivam/files/Thrimurai/thirumuraiData.db', createFromLocation: 1 });
    const database = SQLite.openDatabase({
        name: 'SongsData.db',
        createFromLocation: 1,
    });
    useEffect(() => {}, []);

    useEffect(() => {
        retrieveData();
    }, []);
    const retrieveData = async () => {
        getSqlData('SELECT * FROM category', (callbacks) => {
            setThrimurais(callbacks);
        });
        getSqlData('SELECT * FROM strotras', (callbacks) => {
            // setThrimurais(callbacks)
        });
        // }, (error) => {
        //     console.error("error occured in fetching data at route", error);
        // })
    };
    // const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    // You can do anything in your task such as network requests, timers and so on,
    // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
    // React Native will go into "paused" mode (unless there are other tasks running,
    // or there is a foreground app).
    // const veryIntensiveTask = async (taskDataArguments) => {
    //     // Example of an infinite loop task
    //     const { delay } = taskDataArguments;
    //     await new Promise(async (resolve) => {
    //         for (let i = 0; BackgroundService.isRunning(); i++) {
    //             console.log(i);
    //             await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' + i });
    //             await sleep(delay);
    //         }
    //     });
    // };
    // const options = {
    //     taskName: 'Example',
    //     taskTitle: 'ExampleTask title',
    //     taskDesc: 'ExampleTask description',
    //     taskIcon: {
    //         name: 'ic_launcher',
    //         type: 'mipmap',
    //     },
    //     color: '#ff00ff',
    //     linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    //     parameters: {
    //         delay: 1000,
    //     },
    // };

    // const startNotification = async () => {

    //     await BackgroundService.start(veryIntensiveTask, options);
    //     await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' }); // Only Android, iOS will ignore this call
    // }
    // iOS will also run everything here in the background until .stop() is called
    // const stopNotification = async () => {
    //     await BackgroundService.stop();
    // }

    const data = [
        {
            id: 1,
            songName: 'Ashtakam-1 Adhyayam-1',
            description: 'सम्पूर्ण ऋग्वेद पारायणम् Complete ...',
        },
        {
            id: 2,
            songName: 'Ashtakam-2 Adhyayam-2',
            description: 'सम्पूर्ण ऋग्वेद पाराणम् Complete ...',
        },
        {
            id: 3,
            songName: 'Ashtakam-2 Adhyayam-2',
            description: 'सम्पूर्ण ऋग्वेद पाराणम् Complete ...',
        },
    ];

    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView
            style={{
                backgroundColor: theme.backgroundColor,
                flex: 1,
            }}
        >
            <Background>
                <>
                    <BackButton color={true} middleText={'Thirumurais'} navigation={navigation} />
                    <View
                        style={[
                            styles.inputcontainer,
                            { backgroundColor: theme.searchBox.bgColor },
                        ]}
                    >
                        <Icon name="search" size={28} color={colors.grey1} />
                        <TextInput
                            onBlur={() => setOnFocus(false)}
                            onFocus={() =>
                                navigation.navigate(RouteTexts.SEARCH_SCREEN, {
                                    thrimurais: thrimurais,
                                    allThirumirai: true,
                                    query1: `SELECT * FROM thirumurais WHERE search_thirumurai_title LIKE`,
                                    query2: `ORDER BY Thirumurai_title  ASC LIMIT 10 OFFSET 0;`,
                                })
                            }
                            placeholder={'Search for anything (Eg - தோடுடைய செவியன்)'}
                            onChangeText={(e) => setSearchText(e)}
                            placeholderTextColor={theme.searchBox.textColor}
                            value={searchText}
                            style={{ fontSize: 12, paddingHorizontal: 5, color: '#FF9D9D' }}
                        />
                    </View>
                </>
                {/* } */}
                {/* <View style={styles.boxCommon}>
                    <SearchInput onBlur={onFocus} onFocus={onFocus} setOnFocus={setOnFocus} setState={setSearchText} state={searchText} placeholder={'Search for anything (Eg - தோடுடைய செவியன்) '} />
                </View> */}
            </Background>
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <Text
                    style={{
                        color: theme.textColor,
                        fontFamily: 'Lora-Bold',
                        fontSize: 18,
                    }}
                >
                    {onFocus ? 'Recent searches' : 'Thirumurais'}
                </Text>
            </View>
            {!onFocus && (
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 1,
                                list: thrimurais.slice(0, 7),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId<=7',
                                prevId: '<=7',
                                flagShowAudio: false,
                                name: `${t('(1st bar Yellow)')}`,
                            })
                        }
                    >
                        <GradientContainer
                            textColor={theme.textColor}
                            Icon={<BookIcon fill={theme.textColor} />}
                            name={`${t('(1st bar Yellow)')}`}
                            // name={`${thrimurais[0]?.name}(1-7)`}
                            colors={theme.yellowGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.yellowGradBallRight.startColor}
                                    stopColor={theme.yellowGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.yellowGradBallRight.startColor}
                                    stopColor={theme.yellowGradBallRight.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 2,
                                list: thrimurais.slice(7, 14),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=8',
                                prevId: '=8',
                                flagShowAudio: true,
                            })
                        }
                    >
                        {/* red */}
                        <GradientContainer
                            textColor={theme.textColor}
                            Icon={<BookIcon fill={theme.textColor} />}
                            name={t('(2nd bar pink)')}
                            // name={thrimurais[8]?.name}
                            colors={theme.redGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.redGradBallRight.startColor}
                                    stopColor={theme.redGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.redGradBallLeft.startColor}
                                    stopColor={theme.redGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 1,
                                list: thrimurais.slice(0, 7),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=9',
                                prevId: '=9',
                                flagShowAudio: true,
                            })
                        }
                    >
                        {/* green */}
                        <GradientContainer
                            textColor={theme.textColor}
                            name={t('(3rd bar Green)')}
                            // name={thrimurais[9]?.name}
                            Icon={<BookIcon fill={theme.textColor} />}
                            colors={theme.greenGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.greenGradBallRight.startColor}
                                    stopColor={theme.greenGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.greenGradBallLeft.startColor}
                                    stopColor={theme.greenGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 1,
                                list: thrimurais.slice(0, 7),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=10',
                                prevId: '=10',
                                flagShowAudio: true,
                            })
                        }
                    >
                        <GradientContainer
                            textColor={theme.textColor}
                            Icon={<BookIcon fill={theme.textColor} />}
                            name={t('(4th bar yellow)')}
                            // name={thrimurais[9]?.name}
                            colors={theme.yellowGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.yellowGradBallRight.startColor}
                                    stopColor={theme.yellowGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.yellowGradBallLeft.startColor}
                                    stopColor={theme.yellowGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 2,
                                list: thrimurais.slice(7, 14),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=11',
                                prevId: '=11',
                                flagShowAudio: true,
                            })
                        }
                    >
                        <GradientContainer
                            textColor={theme.textColor}
                            Icon={<BookIcon fill={theme.textColor} />}
                            name={t('(5th bar pink)')}
                            // name={thrimurais[10]?.name}
                            colors={theme.redGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.redGradBallRight.startColor}
                                    stopColor={theme.redGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.redGradBallLeft.startColor}
                                    stopColor={theme.redGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 1,
                                list: thrimurais.slice(0, 7),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=12',
                                prevId: '=12',
                                flagShowAudio: true,
                            })
                        }
                    >
                        <GradientContainer
                            textColor={theme.textColor}
                            name={t('(6th bar Green)')}
                            // name={thrimurais[11]?.name}
                            Icon={<BookIcon fill={theme.textColor} />}
                            colors={theme.greenGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.greenGradBallRight.startColor}
                                    stopColor={theme.greenGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.greenGradBallLeft.startColor}
                                    stopColor={theme.greenGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 1,
                                list: thrimurais.slice(0, 7),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=13',
                                prevId: '=13',
                                flagShowAudio: true,
                            })
                        }
                    >
                        <GradientContainer
                            textColor={theme.textColor}
                            name={t('(7th bar yellow)')}
                            // name={thrimurais[12]?.name}
                            Icon={<BookIcon fill={theme.textColor} />}
                            colors={theme.yellowGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.yellowGradBallRight.startColor}
                                    stopColor={theme.yellowGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.yellowGradBallLeft.startColor}
                                    stopColor={theme.yellowGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable>
                    {/* <Pressable
                        style={styles.boxCommon}
                        onPress={() =>
                            navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                                page: 1,
                                list: thrimurais.slice(0, 7),
                                query: 'SELECT name ,prevId FROM  category WHERE prevId=14',
                            })
                        }
                    >
                        <GradientContainer
                            textColor={theme.textColor}
                            name={t('(3rd bar Green)')}
                            // name={thrimurais[13]?.name}
                            Icon={<BookIcon fill={theme.textColor} />}
                            colors={theme.redGradcolors}
                            RightImage={
                                <EllipseSVGRight
                                    startColor={theme.redGradBallRight.startColor}
                                    stopColor={theme.redGradBallRight.stopColor}
                                />
                            }
                            LeftImage={
                                <EllispseSVGLeft
                                    startColor={theme.redGradBallLeft.startColor}
                                    stopColor={theme.redGradBallLeft.stopColor}
                                />
                            }
                        />
                    </Pressable> */}
                    <View style={styles.boxCommon}>
                        <Text style={styles.playlistHeading}>Recently Playlist</Text>
                        <FlatList
                            key={(item) => item?.id}
                            data={data}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        margin: 10,
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            paddingHorizontal: 0,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <MusicContainer />
                                        <View style={{ paddingHorizontal: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                    fontFamily: 'Mulish-Regular',
                                                    color: theme.textColor,
                                                }}
                                            >
                                                {item.songName}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: '400',
                                                    fontFamily: 'Mulish-Regular',
                                                    color: theme.textColor,
                                                }}
                                            >
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon name="more-vert" size={22} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            )}
        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    boxCommon: { marginTop: 10 },
    playlistHeading: {
        fontFamily: 'lora-regular',
        fontWeight: '700',
        fontSize: 18,
    },
    inputcontainer: {
        marginHorizontal: 15,
        borderRadius: 10,
        paddingHorizontal: 10,

        width: Dimensions.get('window').width - 30,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
});
export default ThrimuraiList;
