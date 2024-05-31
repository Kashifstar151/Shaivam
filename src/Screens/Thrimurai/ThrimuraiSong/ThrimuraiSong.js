import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    Switch,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated as AnimatedRN,
    Platform,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import BackButton from '../../../components/BackButton';
import ShareIcon from '../../../assets/Images/share-1.svg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import DownArrow from '../../../assets/Images/Down Arrows (3) 1.svg';
import AudioPlayer from '../../Player/AudioPlayer';
import Background from '../../../components/Background';
import SettingIcon from '../../../assets/Images/Settings (1) 1.svg';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { getSqlData } from '../../Database';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../../Context/ThemeContext';
import { colors } from '../../../Helpers';
import { useTranslation } from 'react-i18next';
import '../../../../localization';
import AruliyavarSVG from '../../../components/SVGs/AruliyavarSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MusicContext } from '../../../components/Playbacks/TrackPlayerContext';
import NaduSVG from '../../../components/SVGs/NaduSVG';
import PannSVG from '../../../components/SVGs/PannSVG';
import ThalamSVG from '../../../components/SVGs/ThalamSVG';
import DownloadIcon from '../../../assets/Images/download.svg';
import HighlightText from '@sanar/react-native-highlight-text';
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    useTrackPlayerEvents,
} from 'react-native-track-player';
import Clipboard from '@react-native-clipboard/clipboard';
import { listfavAudios } from '../../../Databases/AudioPlayerDatabase';
import SettingsSVG from '../../../components/SVGs/SettingsSVG';

const ThrimuraiSong = ({ route, navigation }) => {
    const isFocused = useIsFocused;
    const { data, downloaded, searchedword, downloadSong, searchScreen, songNo } =
        route.params || {};
    console.log('🚀 ~ ThrimuraiSong ~ route.params:', JSON.stringify(route.params, 0, 2));
    const translateX = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 1) }],
    }));
    // const bottomSheetRef = useRef(null);
    const [downloadingLoader, setDownloadingLoader] = useState(false);
    // const snapPoints = useMemo(() => ['25%', '25%'], []);
    const [showSetting, setShowSetting] = useState(false);
    // const language = ['Original', 'Tamil', 'English', 'Hindi'];
    const [language, setLang] = useState(['Original', 'Tamil', 'English', 'Hindi']);
    const [selectedLang, setSelectedLang] = useState('Original');
    const [fontSizeCount, setFontSizeCount] = useState(null);
    // const [refFlatList, setRefFlatList] = useState(null);
    const flatListRef = useRef(null);
    const firstRender = useRef(true);

    const initializeTheFontSize = async () => {
        const value = await AsyncStorage.getItem('@lyricsFontSize');
        if (!value) {
            await AsyncStorage.setItem('@lyricsFontSize', '12');
            setFontSizeCount(12);
        } else {
            setFontSizeCount(parseInt(value));
        }
    };

    const setFontSizeForLyrics = async (fontSizeCount) => {
        await AsyncStorage.setItem('@lyricsFontSize', String(fontSizeCount));
    };

    useEffect(() => {
        if (fontSizeCount) {
            setFontSizeForLyrics(fontSizeCount);
        } else {
            initializeTheFontSize();
        }
    }, [fontSizeCount]);
    const [visibleStatusBar, setVisibleStatusBar] = useState(true);
    const statusBarHeight = useRef(new AnimatedRN.Value(50)).current; // Assume 20 is the normal height of your custom status bar

    const toggleStatusBar = () => {
        AnimatedRN.timing(statusBarHeight, {
            toValue: visibleStatusBar ? 0 : 50, // Animate to 0 to hide, 20 to show
            duration: 200, // Milliseconds it takes to animate
            useNativeDriver: false, // Height is not supported by native driver, set this to false
        }).start();
        setVisibleStatusBar(!visibleStatusBar);
    };
    const [orientation, setOrientation] = useState('PORTRAIT');
    const initilizeTheRepeatState = useCallback(async () => {
        const repeatState = await TrackPlayer.getRepeatMode();
        setRepeatMode(repeatState);
    }, []);

    const initilizeActiveTrack = useCallback(async () => {
        const activeSong = await TrackPlayer.getActiveTrack();
        setActiveTrackState(activeSong);
    }, []);

    const initilizeTheTheme = useCallback(async () => {
        const themeMode = await AsyncStorage.getItem('theme');
        if (themeMode === 'dark') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (searchScreen && firstRender.current) {
            scrollToIndex();
        }
    }, [flatListRef, activeTrackState?.url]);
    useEffect(() => {
        // console.log('🚀 ~ useEffect ~ initilizeTheTheme: 1');
        initilizeTheTheme();
        firstRender.current = false;
    }, []);
    const [favList, setFavList] = useState(null);

    useEffect(() => {
        fetchAndDisplayDownloads();
        getFavAudios();
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation('PORTRAIT');
            } else {
                setOrientation('LANDSCAPE');
            }
        });

        if (isFocused) {
            changeTranlation('Original');
        }
    }, []);
    const [repeatMode, setRepeatMode] = useState();
    const { musicState, dispatchMusic } = useContext(MusicContext);
    console.log('🚀 ~ ThrimuraiSong ~ musicState:', JSON.stringify(musicState, 0, 2));
    const [darkMode, setDarkMode] = useState();
    const [tamilSplit, setTamilSplit] = useState(false);
    // const { theme, setTheme } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const [selectedLngCode, setSelectedLngCode] = useState(i18n.language);
    const [downloadList, setDownloadList] = useState([]);
    const langMap = {
        'en-IN': 'RoI',
        English: 'en',
        Hindi: 'en',
        Tamil: 'en',
        ar: 'ar',
        as: 'as',
        bn: 'bn',
        // hi: 'DV',
        DV: 'DV',
        gu: 'gu',
        he: 'he',
        ja: 'JP-KA',
        'kn-IN': 'kn-IN',
        ml: 'ml',
        or: 'or',
        pa: 'pa',
        si: 'si-LK',
        te: 'te',
        ur: 'ur',
        en: 'en',
    };

    const [colorSet, setColorSet] = useState();

    useEffect(() => {
        if (darkMode) {
            setColorSet((prev) => colors.dark);
        } else {
            setColorSet((prev) => colors.light);
        }
    }, [darkMode]);

    // const activeTrack = useActiveTrack();
    // console.log(
    //     '🚀 ~ ``````````~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~:',
    //     activeTrack
    // );
    const [isFav, setIsFav] = useState(false);
    const getFavAudios = (songList) => {
        // const activeTrack = useActiveTrack();
        listfavAudios((callbacks) => {
            // console.log('🚀 ~ useEffect ~ callbacks:', JSON.stringify(callbacks, 0, 2));
            // setFavList(callbacks)
            const updatedArray2 = songList?.map((item2) => {
                const match = callbacks.find((item1) => item1.id === item2.id);
                if (match) {
                    setIsFav(true);
                }
                // console.log("🚀 ~ updatedArray2 ~ match:", match)
                // console.log("🚀 ~ updatedArray2 ~ match:", match)
                // return match; // Replace with the object from array1 if there's a match
            });
            // console.log("🚀 ~ updatedArray2 ~ updatedArray2:------------", updatedArray2)
        });
    };

    const fetchAndDisplayDownloads = async () => {
        try {
            // const keys = await AsyncStorage.getAllKeys();
            const parsedMetadata = await AsyncStorage.getItem('downloaded');
            // console.log(
            //     '🚀 ~ fetchAndDisplayDownloads ~ parsedMetadata:',
            //     JSON.stringify(JSON.parse(parsedMetadata), 0, 2)
            // );
            // const metadataKeys = keys.filter(key => key.startsWith('downloaded:'));
            // const metadata = await AsyncStorage.multiGet(metadataKeys);
            // const parsedMetadata = metadata.map(([key, value]) => JSON.parse(value));
            setDownloadList(JSON.parse(parsedMetadata));

            // Now `parsedMetadta` contains all of your audio files' metadata
            // You can use this data to render your downloads page
        } catch (e) {
            console.error('Failed to fetch metadata', e);
        }
    };
    const changeTranlation = (item) => {
        switch (item) {
            case 'Tamil':
                setSelectedLang('Tamil');
                setSelectedLngCode(item);
                break;
            case 'English':
                setSelectedLang('English');
                setSelectedLngCode(item);
                break;
            case 'Hindi':
                setSelectedLang('Hindi');
                setSelectedLngCode(item);
                break;
            default:
                setSelectedLang('Original');
                setSelectedLngCode(i18n.language);
                break;
        }
    };
    const handlePress = () => {
        console.log(true);
        setShowSetting(true);
        translateX.value = 2;
    };
    const closeAnimatedView = () => {
        setShowSetting(false);
        translateX.value = 50;
    };

    const getSOngData = (from) => {
        TrackPlayer.reset();
        const detailQuery = `SELECT * from thirumurai_songs where prevId=${musicState?.prevId} and title NOTNULL and locale='${langMap[selectedLngCode]}' ORDER BY songNo ASC`;
        const titleQuery = `SELECT
        MAX(CASE WHEN locale = 'en' THEN titleS END) AS tamil,
    MAX(CASE WHEN locale = '${langMap[selectedLngCode]}' THEN titleS END) AS localeBased FROM thirumurais WHERE prevId =${musicState?.prevId}
    AND titleS IS NOT NULL
    AND titleS != ''
    AND (locale = '${langMap[selectedLngCode]}' OR locale = 'en')
GROUP BY
    title`;

        getSqlData(titleQuery, (data) => {
            dispatchMusic({
                type: 'SET_TITLE',
                payload: data.filter((i) => i.localBased !== null)[0].localeBased,
            });
            getSqlData(detailQuery, (details) => {
                console.log('🚀 ~ getSqlData ~ data:', JSON.stringify(details, 0, 2));

                const query2 = `SELECT * FROM odhuvars WHERE title='${data.filter((i) => i.tamil !== null)[0]?.tamil
                    }'`;
                getSqlData(query2, (callbacks) => {
                    // console.log('🚀 ~ getSqlData ~ callbacks:', JSON.stringify(callbacks, 0, 2));
                    dispatchMusic({ type: 'SONG_DETAILS', payload: details });
                    // if (downloadList.length > 0) {
                    //     alert(true);
                    //     const updatedArray2 = callbacks?.map((item2) => {
                    //         const match = downloadList.find((item1) => {
                    //             if (item1.id === item2.id) {
                    //                 return { ...item1, isLocal: true };
                    //             }
                    //         });
                    //         return match ? { ...match } : item2; // Replace with the object from array1 if there's a match
                    //     });
                    //     // console.log('🚀 ~ arr ~ arr:', updatedArray2);
                    //     console.log(
                    //         'match of the song ---------------==========================---------------------------==============================--------------------------===============================-----------------------------==============================-------------------------------=============================----------------------------==============================-----------------------------------===============================--------------------------==============================-----------------',
                    //         updatedArray2
                    //     );
                    //     dispatchMusic({ type: 'SET_SONG', payload: updatedArray2 });
                    // } else {
                    // }
                    dispatchMusic({ type: 'SET_SONG', payload: callbacks });
                    // scrollToIndex();
                });
            });
        });
    };
    const [showDetail, setShowDetail] = useState(false);
    const makeTheViewVisible = () => {
        setShowDetail(!showDetail);
    };
    useEffect(() => {
        dispatchMusic({ type: 'PREV_ID', payload: data?.prevId });
    }, [data, downloadList]);
    useEffect(() => {
        if (downloaded) {
            checkDownloaded(musicState.song);
        }
    }, [data, downloadList, musicState?.song]);

    const toggleSwitch = (value, callbacks) => {
        callbacks(!value);
    };
    const checkDownloaded = (songList) => {
        if (downloadList?.length > 0) {
            const updatedArray2 = songList?.map((item2) => {
                const match = downloadList?.find((item1) => item1.id === item2.id);
                return match ? { ...match, isLocal: true } : item2; // Replace with the object from array1 if there's a match
            });
            // console.log('🚀 ~ updatedArray2 ~ updatedArray2:', JSON.stringify(updatedArray2, 0, 2));
            setUpPlayer(updatedArray2);
        } else {
            setUpPlayer(songList);
        }
    };

    useEffect(() => {
        if (musicState.song.length && !downloaded) {
            checkDownloaded(musicState.song);
            getFavAudios(musicState.song);
        }
    }, [musicState.song, downloadList]);

    const renderResult = (item) => {
        // console.log("🚀 ~ renderResult ~ item:", item)
        // console.log("🚀 ~ renderResult ~ item:", item)
        // const parts = item?.rawSong.split('\r\n');
        // const data = parts?.split(' ')
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <HighlightText
                    key={Math.random()}
                    selectable={true}
                    selectionColor="orange"
                    style={[
                        styles.lyricsText,
                        {
                            fontSize: fontSizeCount,
                            alignSelf: 'flex-end',
                            color: !darkMode ? '#000000' : colors.white,
                        },
                    ]}
                    highlightStyle={{
                        backgroundColor: darkMode ? '#A47300' : '#F8E3B2',
                    }}
                    searchWords={[`${searchedword}`]}
                    textToHighlight={
                        selectedLang !== 'Tamil' ? item?.rawSong : item?.tamilExplanation
                    }
                />
            </View>
        );
    };

    const scrollToIndex = () => {
        flatListRef?.current?.scrollToIndex({
            animated: true,
            index: songNo - 1,
        });
    };

    const getItemLayOut = (item, index) => {
        // console.log("🚀 ~ getItemLayOut ~ index: 222", index, JSON.stringify(item, 0, 2))
        return { length: 260, offset: 260 * index, index };
    };
    const setUpPlayer = useCallback(
        async (song, from) => {
            // console.log('songs data setup players', JSON.stringify(song, 0, 2))
            try {
                if (!TrackPlayer._initialized) {
                    await TrackPlayer.setupPlayer();
                }
                await TrackPlayer.updateOptions({
                    android: {
                        appKilledPlaybackBehavior:
                            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                    },
                    capabilities: [
                        Capability.Play,
                        Capability.Pause,
                        Capability.SkipToNext,
                        Capability.SkipToPrevious,
                        Capability.SeekTo,
                    ],
                    compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
                    progressUpdateEventInterval: 2,
                    icon: require('../../../assets/Images/Component.png'),
                });
                await TrackPlayer.reset();
                await TrackPlayer.add(song);
            } catch (error) {
                await TrackPlayer.updateOptions({
                    android: {
                        appKilledPlaybackBehavior:
                            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                    },
                    capabilities: [
                        Capability.Play,
                        Capability.Pause,
                        Capability.SkipToNext,
                        Capability.SkipToPrevious,
                        Capability.SeekTo,
                    ],
                    compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
                    progressUpdateEventInterval: 2,
                    icon: require('../../../assets/Images/Component.png'),
                });
                await TrackPlayer.reset();
                await TrackPlayer.add(song);
            } finally {
                initilizeTheRepeatState();
                initilizeActiveTrack();
            }
        },
        [musicState.song]
    );

    const queryForNextPrevId = async () => {
        const query = `SELECT MIN(prevId) AS nextPrevId FROM thirumurai_songs WHERE prevId > ${musicState?.prevId}`;
        await TrackPlayer.reset();

        getSqlData(query, (clb) => {
            console.log('🚀 ~ getSqlData ~ clb:', clb);
            if (clb[0].nextPrevId) {
                dispatchMusic({ type: 'RESET' });
                dispatchMusic({ type: 'PREV_ID', payload: clb[0].nextPrevId });
            }
        });
    };

    const queryForPreviousPrevId = async () => {
        const query = `SELECT max(prevId) AS nextPrevId FROM thirumurai_songs WHERE prevId < ${musicState?.prevId}`;
        await TrackPlayer.reset();

        getSqlData(query, (clb) => {
            // console.log('the prev id ==>', clb);
            if (clb[0].nextPrevId) {
                dispatchMusic({ type: 'RESET' });
                dispatchMusic({ type: 'PREV_ID', payload: clb[0].nextPrevId });
            }
        });
    };

    useTrackPlayerEvents(
        [Event.PlaybackQueueEnded, Event.PlaybackActiveTrackChanged, Event.RemoteSeek],
        async (event) => {
            if (event.type === Event.PlaybackQueueEnded && repeatMode === 0) {
                queryForNextPrevId();
            } else if (event.type === Event.PlaybackActiveTrackChanged) {
                setActiveTrackState(event.track);
            }
            if (event.type === Event.RemoteSeek) {
                TrackPlayer.seekTo(event.position);
            }
        }
    );

    const [activeTrackState, setActiveTrackState] = useState({});

    useEffect(() => {
        if (musicState.prevId && selectedLang) {
            getSqlData(
                `SELECT addon,author,thalam,country,pann from thirumurais WHERE prevId=${musicState?.prevId}`,
                (cb) => {
                    const { author, country, thalam, pann, addon } = cb[0];
                    // console.log("🚀 ~ useEffect ~  cb[0]:", cb[0])
                    dispatchMusic({
                        type: 'META_DATA',
                        payload: { author, country, thalam, pann, addon },
                    });
                }
            );
            getSOngData();
        }
    }, [musicState.prevId, selectedLang]);

    const [clipBoardString, setClipBoardString] = useState('');
    const clipBoardStringRef = useRef('');
    const setIosClipBoard = useCallback(async (initialString) => {
        if (!initialString.includes('Read more at https://shaivam.org/')) {
            clipBoardStringRef.current = initialString.join(' ');
            clipBoardStringRef.current += ' Read more at https://shaivam.org/';
            Clipboard.setStrings(clipBoardStringRef.current);
        }
    });

    const setAndroidClipBoard = useCallback(async (initialString) => {
        if (!initialString.includes('Read more at https://shaivaam.page')) {
            clipBoardStringRef.current = initialString;
            clipBoardStringRef.current += ` Read more at https://shaivaam.page.link/org?prevId=${musicState?.prevId}`;
            Clipboard.setString(clipBoardStringRef.current);
        }
    }, []);

    const fetchClipBoardString = useCallback(async () => {
        return Platform.select({
            ios: Clipboard.getStrings(),
            android: Clipboard.getString(),
        });
    }, []);

    useEffect(() => {
        Clipboard.addListener(async () => {
            fetchClipBoardString().then((string) => {
                setClipBoardString((prev) => string);
            });
        });

        return () => Clipboard.removeAllListeners();
    }, []);

    useEffect(() => {
        if (clipBoardString) {
            Platform.select({
                ios: setIosClipBoard(clipBoardString),
                android: setAndroidClipBoard(clipBoardString),
            });
        }
    }, [clipBoardString]);

    const renderText = (item) => {
        console.log('🚀 ~ renderText ~ item:', JSON.stringify(item, 0, 2));
        if (tamilSplit && i18n.language === 'en' && selectedLang === 'Original') {
            return item?.tamilSplit || 'Text currently not available';
        } else if (selectedLang === 'Tamil') {
            return item?.tamilExplanation || 'Text currently not available';
        } else if (selectedLang === 'English') {
            return item?.englishTranslation || 'Text currently not available';
        } else if (selectedLang === 'Hindi') {
            return item?.hindiTranslation || 'Text currently not available';
        } else {
            return item?.rawSong;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colorSet?.backgroundColor }}>
            {/* the header */}
            <AnimatedRN.View
                style={{
                    height: Platform.OS == 'ios' ? 'auto' : statusBarHeight,
                    paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
                    overflow: 'hidden',
                }}
            >
                <Background>
                    <BackButton
                        prevId={musicState?.prevId}
                        secondMiddleText={musicState?.title}
                        color={true}
                        // middleText={data}
                        navigation={navigation}
                        rightIcon={<ShareIcon />}
                        data={data}
                    />
                </Background>
            </AnimatedRN.View>
            {visibleStatusBar && (
                <>
                    {/* details */}
                    <View
                        style={[
                            styles.headerContainer,
                            { backgroundColor: darkMode ? colors?.faintGrey : colors?.skinColor },
                        ]}
                    >
                        <View
                            style={[
                                styles.detailsSection,
                                { display: showDetail ? 'flex' : 'none' },
                            ]}
                        >
                            <>
                                {musicState?.metaData?.author && (
                                    <View style={styles.container}>
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                {
                                                    backgroundColor: darkMode
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <AruliyavarSVG
                                                fill={darkMode ? '#787878' : '#3A1917'}
                                            />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={styles.titleDropDown}>{`${t(
                                                'Aruliyavar'
                                            )}`}</Text>
                                            <Text style={styles.valueDropDown}>
                                                {t(musicState?.metaData?.author)}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                {musicState?.metaData?.country && (
                                    <View style={styles.container}>
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                {
                                                    backgroundColor: darkMode
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <NaduSVG fill={darkMode ? '#787878' : '#3A1917'} />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={styles.titleDropDown}>{`${t(
                                                'Nadu'
                                            )}`}</Text>
                                            <Text style={styles.valueDropDown}>
                                                {t(musicState?.metaData?.country)}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {musicState?.metaData?.pann && (
                                    <View style={styles.container}>
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                {
                                                    backgroundColor: darkMode
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <PannSVG fill={darkMode ? '#787878' : '#3A1917'} />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={styles.titleDropDown}>{`${t(
                                                'Pann'
                                            )}`}</Text>
                                            <Text style={styles.valueDropDown}>
                                                {t(musicState?.metaData?.pann)}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                {musicState?.metaData?.thalam && (
                                    <View style={styles.container}>
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                {
                                                    backgroundColor: darkMode
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <ThalamSVG fill={darkMode ? '#787878' : '#3A1917'} />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={styles.titleDropDown}>{`${t(
                                                'Thalam'
                                            )}`}</Text>
                                            <Text style={styles.valueDropDown}>
                                                {t(musicState?.metaData?.thalam)}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                {musicState?.songDetails[0]?.addon && (
                                    <View>
                                        <Text style={styles.valueDropDown}>
                                            {t(musicState?.songDetails[0]?.addon)}
                                        </Text>
                                    </View>
                                )}
                            </>
                        </View>
                        <TouchableOpacity style={styles.textContainer} onPress={makeTheViewVisible}>
                            <DownArrow />
                            <Text style={styles.headerText}>{t('Thirumurai Details')}</Text>
                            <DownArrow />
                        </TouchableOpacity>
                    </View>
                    {/* setting */}
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            right: -3,
                            top: '40%',
                            zIndex: 10,
                        }}
                    >
                        {showSetting ? (
                            <Animated.View
                                style={[
                                    styles.animatedView,
                                    animatedStyles,
                                    { ...colorSet?.setting },
                                ]}
                            >
                                <View
                                    style={{
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <TouchableOpacity
                                        // onPress={scrollToIndex}
                                        style={styles.InsiderSettingButton}
                                    >
                                        <SettingIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.clearIcon}
                                        onPress={() => closeAnimatedView()}
                                    >
                                        <Icon
                                            name="clear"
                                            size={24}
                                            color={!darkMode ? '#000' : '#fff'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.TranslationContainer}>
                                    <View style={{ marginHorizontal: 0 }}>
                                        <Text
                                            style={[
                                                styles.translationText,
                                                {
                                                    color: darkMode ? colors.white : colors.black,
                                                },
                                            ]}
                                        >
                                            Translation
                                        </Text>
                                        <FlatList
                                            horizontal
                                            data={language}
                                            renderItem={({ item, index }) => (
                                                <>
                                                    {selectedLang == item ? (
                                                        <TouchableOpacity
                                                            style={[
                                                                styles.languageBox,
                                                                { backgroundColor: '#C1554E' },
                                                            ]}
                                                            onPress={() => changeTranlation(item)}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.languageOptionText,
                                                                    {
                                                                        color: 'white',
                                                                        fontWeight: '700',
                                                                    },
                                                                ]}
                                                            >
                                                                {t(item)}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <TouchableOpacity
                                                            style={styles.languageBox}
                                                            onPress={() => changeTranlation(item)}
                                                        >
                                                            <Text style={styles.languageOptionText}>
                                                                {t(item)}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </View>
                                    <View style={styles.TextSize}>
                                        <Text
                                            style={[
                                                styles.TextSizeText,
                                                {
                                                    color: darkMode ? colors.white : colors.black,
                                                },
                                            ]}
                                        >
                                            Text Size
                                        </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={styles.addMinusIcon}
                                                onPress={() => setFontSizeCount(fontSizeCount - 1)}
                                            >
                                                <AntDesign name="minus" color="white" />
                                            </TouchableOpacity>
                                            <Text
                                                style={[
                                                    styles.fontSizeText,
                                                    {
                                                        color: darkMode
                                                            ? colors.white
                                                            : colors.black,
                                                    },
                                                ]}
                                            >
                                                {fontSizeCount}
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.addMinusIcon}
                                                onPress={() => setFontSizeCount(fontSizeCount + 1)}
                                            >
                                                <Icon name="add" color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {i18n.language === 'en' && (
                                        <View style={styles.otherOption}>
                                            <View>
                                                <Text
                                                    style={[
                                                        styles.otherOptionText,
                                                        {
                                                            color: darkMode
                                                                ? colors.white
                                                                : colors.black,
                                                        },
                                                    ]}
                                                >
                                                    Tamil Split
                                                </Text>

                                                <Text
                                                    style={{
                                                        fontFamily: 'Mulish-Regular',
                                                        color: '#777777',
                                                        fontSize: 10,
                                                        // fontWeight: '700',
                                                    }}
                                                >
                                                    Turn on to view thirumurais as songs
                                                </Text>
                                            </View>
                                            <Switch
                                                trackColor={{ false: '#767577', true: '#000' }}
                                                thumbColor={tamilSplit ? '#f4f3f4' : '#f4f3f4'}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() => {
                                                    if (i18n.language === 'en') {
                                                        return toggleSwitch(
                                                            tamilSplit,
                                                            setTamilSplit
                                                        );
                                                    }
                                                }}
                                                value={tamilSplit}
                                            />
                                        </View>
                                    )}
                                    <View style={styles.otherOption}>
                                        <View>
                                            <Text
                                                style={[
                                                    styles.otherOptionText,
                                                    {
                                                        color: darkMode
                                                            ? colors.white
                                                            : colors.black,
                                                    },
                                                ]}
                                            >
                                                Dark Mode
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Mulish-Regular',
                                                    color: '#777777',
                                                    fontSize: 10,
                                                }}
                                            >
                                                Screen will be easier on the eyes
                                            </Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#000' }}
                                            thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() =>
                                                toggleSwitch(darkMode, setDarkMode)
                                            }
                                            value={darkMode}
                                        />
                                    </View>
                                </View>
                            </Animated.View>
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.settingButton,
                                    { backgroundColor: colorSet?.settingBtn.backgroundColor },
                                ]}
                                onPress={handlePress}
                            >
                                <SettingsSVG />
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
            {/* <TouchableWithoutFeedback onPress={() => setShowSetting(false)}> */}
            <View style={styles.lyricsContainer}>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <Text
                        style={[
                            styles.lyricsText,
                            {
                                fontSize: fontSizeCount,
                                color: !darkMode ? colors.grey6 : colors.white,
                            },
                        ]}
                    >
                        {t('Thiruchirrambalam')}
                    </Text>

                    {musicState?.songDetails?.length > 0 && (
                        <FlatList
                            keyExtractor={(item) => item?.id}
                            getItemLayout={getItemLayOut}
                            ref={flatListRef}
                            data={musicState?.songDetails}
                            initialScrollIndex={songNo ? songNo - 1 : 0}
                            renderItem={({ item, index }) => (
                                // <TouchableWithoutFeedback onPress={() => setShowSetting(false)}>
                                <View
                                    style={{
                                        borderBottomColor: colors.grey3,
                                        borderBottomWidth: 1,
                                        paddingBottom: 7,
                                        flexDirection: 'row',
                                        width: Dimensions.get('window').width - 60,
                                    }}
                                >
                                    <View>
                                        {item?.type !== null && (
                                            <Text
                                                style={{
                                                    color: colors.commonColor,
                                                    fontFamily: 'Mulish-Regular',
                                                }}
                                            >
                                                {item?.type}
                                            </Text>
                                        )}
                                        {searchScreen ? (
                                            renderResult(item)
                                        ) : (
                                            <Text
                                                key={Math.random()}
                                                selectable={true}
                                                selectionColor="orange"
                                                style={[
                                                    styles.lyricsText,
                                                    {
                                                        fontSize: fontSizeCount,
                                                        alignSelf: 'flex-end',
                                                        color: !darkMode
                                                            ? colors.grey6
                                                            : colors.white,
                                                    },
                                                ]}
                                            >
                                                {renderText(item)}
                                            </Text>
                                        )}
                                    </View>
                                    <Text
                                        style={[
                                            styles.lyricsText,
                                            {
                                                fontSize: fontSizeCount,
                                                alignSelf: 'flex-end',
                                                color: !darkMode ? colors.grey6 : colors.white,
                                            },
                                        ]}
                                    >
                                        {item?.songNo}
                                    </Text>
                                </View>
                                // </TouchableWithoutFeedback>
                            )}
                        />
                    )}

                    <Text
                        style={[
                            styles.lyricsText,
                            {
                                fontSize: fontSizeCount,
                                paddingTop: 20,
                                color: !darkMode ? colors.grey6 : colors.white,
                            },
                        ]}
                    >
                        {t('Thiruchirrambalam')}
                    </Text>
                </ScrollView>
            </View>
            {/* </TouchableWithoutFeedback> */}

            <Animated.View
                style={[
                    {
                        backgroundColor: !visibleStatusBar ? '#222222' : 'transparent',
                        borderTopEndRadius: 15,
                        borderTopLeftRadius: 15,
                        alignSelf: 'flex-end',
                    },

                    orientation == 'LANDSCAPE'
                        ? {
                            width: Dimensions.get('window').width / 2,
                            position: 'absolute',
                            bottom: 0,
                        }
                        : {
                            position: 'relative',
                            width: Dimensions.get('window').width,
                        },
                ]}
            >
                {downloadingLoader && (
                    <View
                        style={{
                            marginBottom: 10,
                            alignSelf: 'center',
                            borderRadius: 10,
                            backgroundColor: '#EFF9ED',
                            height: 60,
                            width: Dimensions.get('window').width - 20,
                            borderWidth: 1,
                            borderColor: '#9CCFAB',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                        }}
                    >
                        <DownloadIcon />
                        <Text style={{ marginHorizontal: 10, color: 'black', fontWeight: '600' }}>
                            Downloading Thirumurai
                        </Text>
                    </View>
                )}
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#222222',
                        paddingVertical: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={toggleStatusBar}
                        style={{
                            width: 30,
                            height: 8,
                            backgroundColor: colors.grey6,
                            borderRadius: 10,
                        }}
                    ></TouchableOpacity>
                </View>
                {activeTrackState?.url && (
                    <AudioPlayer
                        activeTrack={activeTrackState}
                        setDownloadingLoader={setDownloadingLoader}
                        visibleStatusBar={visibleStatusBar}
                        prevId={data?.prevId}
                        songsData={musicState?.song}
                        title={musicState?.title}
                        orientation={orientation}
                        downloaded={downloaded}
                        data={data}
                        repeatMode={repeatMode}
                        setRepeatMode={setRepeatMode}
                        queryForNextPrevId={queryForNextPrevId}
                        queryForPreviousPrevId={queryForPreviousPrevId}
                        downloadSong={downloadSong}
                    />
                )}
            </Animated.View>

            {/* </BottomSheet> */}
        </View>
    );
};
export const styles = StyleSheet.create({
    titleDropDown: { fontSize: RFValue(10, 580), color: '#777777' },
    valueDropDown: {
        fontSize: RFValue(10, Dimensions.get('window').height),
        color: '#777777',
    },
    iconContainer: {
        padding: 6,
        borderRadius: 1000,
    },

    textSectionDD: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flexDirection: 'row',
        width: '48%',
        gap: 8,
        alignItems: 'center',
    },
    detailsSection: {
        // position: "absolute",
        padding: 16,
        borderBottomColor: '#E0AAA7',
        borderBottomWidth: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'Mulish-Regular',
        // fontWeight: '700',
        paddingHorizontal: 5,
        color: '#777777',
    },
    textContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 8,
    },
    moreOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    addMinusIcon: {
        marginHorizontal: 5,
        alignSelf: 'center',
        backgroundColor: '#777777',
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    partitionContainer: { width: 2, backgroundColor: '#CFCFCF', margin: 2, marginHorizontal: 10 },
    transcriptText: { fontSize: 16, fontFamily: 'Lora-Bold' },
    translationText: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Lora-Bold',
        marginBottom: 5,
    },
    TranslationContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        flex: 1,
        gap: 10,
    },
    languageBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 30,
        width: 60,
        borderColor: '#D9D9D9',
        borderWidth: 2,
        marginHorizontal: 2,
    },
    languageOptionText: {
        fontSize: 12,
        // fontWeight: '500',
        fontFamily: 'Mulish-Regular',
        color: '#777777',
    },
    lyricsContainer: { flex: 1, paddingHorizontal: 0, marginTop: 10 },
    lyricsText: {
        // fontWeight: '500',
        fontFamily: 'AnekTamil-Regular',
        lineHeight: 30,
    },
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        top: '8%',
        right: '0%',
        height: 30,
        borderRadius: 5,
        borderColor: '#C1554E',
        borderWidth: 1,
    },
    settingText: { fontSize: 10, fontWeight: '700' },
    animatedView: {
        zIndex: 10,
        alignSelf: 'flex-end',
        borderWidth: 1,
        flex: 1,
        borderRadius: 5,
    },
    InsiderSettingButton: { flexDirection: 'row', alignItems: 'center', padding: 5 },
    clearIcon: { alignItems: 'center', padding: 5 },
    TextSize: { marginTop: 5, gap: 5 },
    TextSizeText: { color: 'black', fontFamily: 'Lora-Bold' },
    fontSizeText: {
        marginHorizontal: 4,
        fontFamily: 'Mulish-Regular',
        // fontWeight: '600',
    },
    otherOption: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 6 },
    otherOptionText: { fontFamily: 'Lora-Bold', color: 'black' },
});
export default ThrimuraiSong;
