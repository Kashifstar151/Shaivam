import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
    TextInput,
    // TouchableWithoutFeedback,
    // Keyboard,
    // ScrollView,
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
import dynamicLinks from '@react-native-firebase/dynamic-links';
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    useTrackPlayerEvents,
} from 'react-native-track-player';
import Clipboard from '@react-native-clipboard/clipboard';
import { listfavAudios, MostPlayedSongList } from '../../../Databases/AudioPlayerDatabase';
import SettingsSVG from '../../../components/SVGs/SettingsSVG';
import HighlightedText from '../Searchscreen/HighlightedText';
import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import { SelectableText } from '@alentoma/react-native-selectable-text';
import { ThemeContext } from '../../../Context/ThemeContext';

const ThrimuraiSong = ({ route, navigation }) => {
    const isFocused = useIsFocused;
    const { data, downloaded, searchedword, downloadSong, searchScreen, songNo } =
        route.params || {};
    const { isConnected } = useNetInfo();
    const textInputRef = useRef(null)
    const translateX = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 1) }],
    }));
    const [downloadingLoader, setDownloadingLoader] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false)
    const [language, setLang] = useState(['Original', 'Tamil', 'English', 'Hindi']);
    const [selectedLang, setSelectedLang] = useState('Original');
    const [fontSizeCount, setFontSizeCount] = useState(null);
    const [isconnected, setIsConnected] = useState(isConnected);
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
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
    useEffect(() => {
        buildLink();
    }, []);
    useEffect(() => {
        const unsubscribe = addEventListener((state) => {
            if (state.isConnected) {
                setIsConnected(true);
            }
        });
        return unsubscribe();
    }, []);
    useEffect(() => {
        checkConditionForPlayer();
    }, [isConnected]);

    const checkConditionForPlayer = () => {
        TrackPlayer.getActiveTrack()
            .then((res) => {
                if (isConnected) {
                    if (res?.url?.substring(0, 5) == 'https') {
                        setShowAudioPlayer(true);
                    }
                } else if (res?.url?.substring(0, 5) == 'file:') {
                    setShowAudioPlayer(true);
                }
            })
            .catch((err) => {
                console.log('🚀 ~ TrackPlayer.getActiveTrack ~ err:', err);
            });
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
        console.log('🚀 ~ initilizeActiveTrack ~ activeSong:', activeSong);
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

    // useEffect(() => {
    //     if (searchScreen && flatListRef.current) {
    //         scrollToIndexFlatList();
    //     }
    // }, [flatListRef.current, activeTrackState?.url]);
    useEffect(() => {
        initilizeTheTheme();
        firstRender.current = false;
    }, []);
    // const [favList, setFavList] = useState(null);
    async function buildLink() {
        const link = await dynamicLinks().buildShortLink(
            {
                link: `https://shaivaam.page.link/org?prevId=${data?.prevId}`,
                domainUriPrefix: 'https://shaivaam.page.link',
                ios: {
                    appStoreId: '1575138510',
                    bundleId: 'com.Shaivam.shaivam',
                    minimumVersion: '18',
                },
                android: {
                    packageName: 'org.shaivam',
                },
                // optional setup which updates Firebase analytics campaign
                // "banner". This also needs setting up before hand
            },
            dynamicLinks.ShortLinkType.DEFAULT
        );
        // setDeeplink(link);
        return link;
    }
    useEffect(() => {
        fetchAndDisplayDownloads();
        getFavAudios();
        MostPlayedSongList();
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
    // console.log('🚀 ~ ThrimuraiSong ~ musicState:', JSON.stringify(musicState, 0, 2));
    const [darkMode, setDarkMode] = useState();
    const [tamilSplit, setTamilSplit] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);
    console.log("🚀 ~ ThrimuraiSong ~ theme:", theme)
    const { t, i18n } = useTranslation();
    const [selectedLngCode, setSelectedLngCode] = useState(i18n.language);
    const [downloadList, setDownloadList] = useState([]);
    const langMap = {
        'en-IN': 'ro',
        English: 'en',
        Hindi: 'en',
        Tamil: 'en',
        ar: 'ar',
        as: 'as',
        bn: 'bn',
        // hi: 'DV',
        DV: 'hi',
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
    const [isFav, setIsFav] = useState(false);
    const getFavAudios = (songList) => {
        listfavAudios((callbacks) => {
            const updatedArray2 = songList?.map((item2) => {
                const match = callbacks.find((item1) => item1.id === item2.id);
                if (match) {
                    setIsFav(true);
                }
            });
        });
    };

    const fetchAndDisplayDownloads = async () => {
        try {
            const parsedMetadata = await AsyncStorage.getItem('downloaded');
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
            console.log('🚀 ~ getSqlData ~ data:', data);
            dispatchMusic({
                type: 'SET_TITLE',
                payload: data.filter((i) => i.localBased !== null)[0].localeBased,
            });
            getSqlData(detailQuery, (details) => {
                const query2 = `SELECT * FROM odhuvars WHERE title='${data.filter((i) => i.tamil !== null)[0]?.tamil
                    }'`;
                getSqlData(query2, (callbacks) => {
                    dispatchMusic({ type: 'SONG_DETAILS', payload: details });
                    dispatchMusic({ type: 'SET_SONG', payload: callbacks });
                    scrollToIndexFlatList();
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
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <HighlightedText
                    screen={'music-player'}
                    textColor={!darkMode ? '#000' : colors.white}
                    text={item}
                    highlight={searchedword}
                    selectable={true}
                    selectionColor="orange"
                    fontSizeCount={fontSizeCount}
                />
            </View>
        );
    };

    const scrollToIndexFlatList = () => {
        if (songNo) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    // index: index,
                    index: songNo - 1,
                    animated: true,
                });
            }, 1000);
        }
    };

    const getItemLayOut = (item, index) => {
        return { length: 260, offset: 260 * index, index };
    };
    const setUpPlayer = useCallback(
        async (song, from) => {
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
                if (autoPlay) {
                    TrackPlayer.play()
                }
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
                if (autoPlay) {
                    TrackPlayer.play()
                }
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

    const [activeTrackState, setActiveTrackState] = useState({});

    useEffect(() => {
        if (musicState.prevId && selectedLang) {
            getSqlData(
                `SELECT addon,author,thalam,country,pann from thirumurais WHERE prevId=${musicState?.prevId}`,
                (cb) => {
                    const { author, country, thalam, pann, addon } = cb[0];
                    dispatchMusic({
                        type: 'META_DATA',
                        payload: { author, country, thalam, pann, addon },
                    });
                }
            );
            getSOngData();
        }
    }, [musicState.prevId, selectedLang]);

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
        let link = await buildLink();
        if (!initialString.includes('Read more at https://shaivaam.page')) {
            clipBoardStringRef.current = initialString;
            clipBoardStringRef.current += ` Read more at ${link}`;
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
                // console.log("🚀 ~ fetchClipBoardString ~ string:", string)
                setClipBoardString(() => string);
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
    const FilterString = (e, index) => {
        console.log(JSON.stringify(e?.start, e?.end, 0, 2), 'musicState?.songDetails')
        let string = musicState?.songDetails[index]?.rawSong?.substring(e?.start, e?.end)
    }

    const renderText = (item) => {
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
    const RenderLyricsText = memo(
        ({ item, index }) => (
            <View
                key={item => item?.id}
                style={[
                    {
                        paddingBottom: 7,
                        flexDirection: 'row',
                        width: Dimensions.get('window').width - 60,
                    },
                    musicState?.songDetails[index + 1]
                        ? {
                            borderBottomColor: colors.grey3,
                            borderBottomWidth: 1,
                        }
                        : {},
                ]}
            >
                <View key={item => item?.id}>
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
                        renderResult(renderText(item))
                    ) : (
                        <View key={item => item?.id}>
                            {
                                Platform.OS == 'ios' ?
                                    <TextInput key={item => item?.id} ref={textInputRef} onSelectionChange={({ nativeEvent: { selection } }) => FilterString(selection, index)} editable={false} value={renderText(item)} multiline
                                        style={[
                                            styles.lyricsText,
                                            {
                                                fontSize: fontSizeCount,
                                                // alignSelf: 'flex-end',
                                                color: !darkMode || theme?.colorscheme !== 'dark' ? '#000' : colors.white,
                                            },
                                        ]} />
                                    :
                                    <Text
                                        key={item => item?.id}
                                        selectable={true}
                                        selectionColor="orange"
                                        style={[
                                            styles.lyricsText,
                                            {
                                                fontSize: fontSizeCount,
                                                // alignSelf: 'flex-end',
                                                color: !darkMode || theme?.colorscheme !== 'dark' ? '#000' : colors.white,
                                            },
                                        ]}
                                    >
                                        {renderText(item)}
                                    </Text>
                            }
                        </View>

                    )}
                </View>
                <Text
                    style={[
                        styles.lyricsText,
                        {
                            fontSize: fontSizeCount,
                            alignSelf: 'flex-end',
                            color: !darkMode || theme?.colorscheme !== 'dark' ? colors.grey6 : colors.white,
                        },
                    ]}
                >
                    {item?.songNo}
                </Text>
            </View>
        ),
        (prevProps, nextProps) => {
            return prevProps.item?.prevId === nextProps.item?.prevId;
        }
    );

    return (
        <View style={{ flex: 1, backgroundColor: colorSet?.backgroundColor }}>
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
                    <View
                        style={[
                            styles.headerContainer,
                            { backgroundColor: darkMode || theme?.colorscheme == 'dark' ? colors?.faintGrey : colors?.skinColor },
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
                                                    backgroundColor: darkMode || theme?.colorscheme == 'dark'
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <AruliyavarSVG
                                                fill={darkMode || theme?.colorscheme == 'dark' ? '#787878' : '#3A1917'}
                                            />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={[styles.titleDropDown, {
                                                color: darkMode || theme?.colorscheme == 'dark' ? 'white' : 'dark'
                                            }]}>{`${t(
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
                                                    backgroundColor: darkMode || theme?.colorscheme == 'dark'
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <NaduSVG fill={darkMode || theme?.colorscheme == 'dark' ? '#787878' : '#3A1917'} />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={[styles.titleDropDown, {
                                                color: darkMode || theme?.colorscheme == 'dark' ? 'white' : 'dark'
                                            }]}>{`${t(
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
                                                    backgroundColor: darkMode || theme?.colorscheme == 'dark'
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <PannSVG fill={darkMode || theme?.colorscheme == 'dark' ? '#787878' : '#3A1917'} />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={[styles.titleDropDown, {
                                                color: darkMode || theme?.colorscheme == 'dark' ? 'white' : 'dark'
                                            }]}>{`${t(
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
                                                    backgroundColor: darkMode || theme?.colorscheme == 'dark'
                                                        ? '#2B2B2B'
                                                        : '#E0AAA7',
                                                },
                                            ]}
                                        >
                                            <ThalamSVG fill={darkMode || theme?.colorscheme == 'dark' ? '#787878' : '#3A1917'} />
                                        </View>
                                        <View style={styles.textSectionDD}>
                                            <Text style={[styles.titleDropDown, {
                                                color: darkMode || theme?.colorscheme == 'dark' ? 'white' : 'dark'
                                            }]}>{`${t(
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
                                                    color: darkMode || theme?.colorscheme == 'dark' ? colors.white : colors.black,
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
                                                    color: darkMode || theme?.colorscheme == 'dark' ? colors.white : colors.black,
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
                                                        color: darkMode || theme?.colorscheme == 'dark'
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
                                                            color: darkMode || theme?.colorscheme == 'dark'
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
                                                        color: darkMode || theme?.colorscheme == 'dark'
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
            {showSetting ? (
                <TouchableWithoutFeedback onPress={() => setShowSetting(false)}>
                    <View style={styles.lyricsContainer}>
                        <View style={{ paddingHorizontal: 20 }}>
                            {musicState?.songDetails?.length > 0 && (
                                <FlatList
                                    ListHeaderComponent={
                                        <Text
                                            style={[
                                                styles.lyricsText,
                                                {
                                                    fontSize: fontSizeCount,
                                                    color: !darkMode ? colors.grey6 : colors.white,
                                                },
                                            ]}
                                        >
                                            {t('திருச்சிற்றம்பலம்')}
                                        </Text>
                                    }
                                    ListFooterComponent={
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
                                    }
                                    keyExtractor={(item) => item?.id}
                                    ref={flatListRef}
                                    data={musicState?.songDetails}
                                    getItemLayOut={getItemLayOut}
                                    initialScrollIndex={songNo ? songNo - 1 : 0}
                                    removeClippedSubviews={false}
                                    initialNumToRender={songNo ? songNo + 1 : 40}
                                    onScrollToIndexFailed={({
                                        index,
                                        averageItemLength,
                                        highestMeasuredFrameIndex,
                                    }) => {
                                        const wait = new Promise((resolve) =>
                                            setTimeout(resolve, 1000)
                                        );
                                        wait.then(() => {
                                            flatListRef.current?.scrollToIndex({
                                                // index: index,
                                                index: index,
                                                animated: true,
                                            });
                                        });
                                    }}
                                    renderItem={({ item, index }) => (
                                        <RenderLyricsText item={item} index={index} />
                                    )}
                                    windowSize={40}
                                />
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ) : (
                <View style={styles.lyricsContainer}>
                    <View style={{ paddingHorizontal: 20 }}>
                        {musicState?.songDetails?.length > 0 && (
                            <FlatList
                                ListHeaderComponent={
                                    <Text
                                        style={[
                                            styles.lyricsText,
                                            {
                                                fontSize: fontSizeCount,
                                                color: !darkMode ? colors.grey6 : colors.white,
                                            },
                                        ]}
                                    >
                                        {t('திருச்சிற்றம்பலம்')}
                                    </Text>
                                }
                                ListFooterComponent={
                                    <Text
                                        style={[
                                            styles.lyricsText,
                                            {
                                                fontSize: fontSizeCount,
                                                color: !darkMode ? colors.grey6 : colors.white,
                                            },
                                        ]}
                                    >
                                        {t('திருச்சிற்றம்பலம்')}
                                    </Text>
                                }
                                keyExtractor={(item) => item?.id}
                                ref={flatListRef}
                                data={musicState?.songDetails}
                                getItemLayOut={getItemLayOut}
                                removeClippedSubviews={false}
                                initialNumToRender={songNo ? songNo + 1 : 40}
                                onScrollToIndexFailed={({
                                    index,
                                    averageItemLength,
                                    highestMeasuredFrameIndex,
                                }) => {
                                    const wait = new Promise((resolve) =>
                                        setTimeout(resolve, 1000)
                                    );
                                    wait.then(() => {
                                        flatListRef.current?.scrollToIndex({
                                            index: index,
                                            animated: true,
                                        });
                                    });
                                }}
                                renderItem={({ item, index }) => (
                                    <RenderLyricsText item={item} index={index} />
                                )}
                                windowSize={40}
                            />
                        )}
                    </View>
                </View>
            )}
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
                {(activeTrackState?.url && isConnected) ||
                    downloaded ||
                    activeTrackState?.isLocal ? (
                    <AudioPlayer
                        activeTrack={activeTrackState}
                        setAutoPlay={setAutoPlay}
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
                ) : (
                    <></>
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
        fontFamily: 'AnekTamil-Medium',
        lineHeight: 23,
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
