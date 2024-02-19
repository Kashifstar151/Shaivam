import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    Switch,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated as AnimatedRN,
    useColorScheme,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import BackButton from '../../../components/BackButton';
import ShareIcon from '../../../assets/Images/share-1.svg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import DownArrow from '../../../assets/Images/Down Arrows (3) 1.svg';
import BottomSheet from '@gorhom/bottom-sheet';
import AudioPlayer from '../../Player/AudioPlayer';
// import RBSheet from 'react-native-raw-bottom-sheet';
import Background from '../../../components/Background';
import SettingIcon from '../../../assets/Images/Settings (1) 1.svg';
import SQLite from 'react-native-sqlite-storage';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { getSqlData } from '../../Database';
import { useIsFocused } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import { ThemeContext } from '../../../Context/ThemeContext';
import { colors } from '../../../Helpers';
import { useTranslation } from 'react-i18next';
import '../../../../localization';
import { changeLanguage } from 'i18next';
import AruliyavarSVG from '../../../components/SVGs/AruliyavarSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import { dark, light } from '../../../Helpers/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MusicContext } from '../../../components/Playbacks/TrackPlayerContext';
import NaduSVG from '../../../components/SVGs/NaduSVG';
import PannSVG from '../../../components/SVGs/PannSVG';
import ThalamSVG from '../../../components/SVGs/ThalamSVG';
import HighlightedText from '../Searchscreen/HighlightedText';
import HighlightText from '@sanar/react-native-highlight-text';

const ThrimuraiSong = ({ route, navigation }) => {
    const colorScheme = useColorScheme();
    let key = true;
    const database = SQLite.openDatabase({
        name: key ? 'SongsData.db' : 'main.db',
        createFromLocation: 1,
    });
    const isFocused = useIsFocused;
    const { data, downloaded, searchedword, searchScreen } = route.params || {};
    // console.log('🚀 ~ ThrimuraiSong ~ data:', JSON.stringify(data), downloaded);
    const translateX = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 1) }],
    }));
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '25%'], []);
    const [showSetting, setShowSetting] = useState(false);
    const language = ['Original', 'Tamil', 'English', 'Hindi'];
    const [selectedLang, setSelectedLang] = useState('Original');
    const [fontSizeCount, setFontSizeCount] = useState(null);

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
    const [orientation, setOrientation] = useState('PORTRAIT');
    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation('PORTRAIT');
            } else {
                setOrientation('LANDSCAPE');
            }
        });
    }, []);

    const { musicState, dispatchMusic } = useContext(MusicContext);
    const [darkMode, setDarkMode] = useState(colorScheme === 'dark' ? true : false);
    const [tamilSplit, setTamilSplit] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);
    const [fullScreenMode, setFullScreenMode] = useState(false)
    const { t, i18n } = useTranslation();
    const [selectedLngCode, setSelectedLngCode] = useState(i18n.language);
    const langMap = {
        'en-IN': 'RoI',
        English: 'en-IN',
        Hindi: 'hi-t',
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

    useEffect(() => {
        getSOngData();
    }, [selectedLngCode]);

    useEffect(() => {
        setTheme(darkMode ? dark : light);
        // AsyncStorage.setItem('theme', colorScheme);
    }, [darkMode]);

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
    useEffect(() => {
        if (isFocused) {
            changeTranlation('Original');
            getSOngData();
        }
        return () => {
            TrackPlayer.stop();
            TrackPlayer.reset();
        };
    }, [isFocused]);

    const getSOngData = () => {
        const detailQuery = `SELECT rawSong, tamilExplanation, tamilSplit , songNo , title from thirumurai_songs where prevId=${data?.prevId} and title NOTNULL and locale='${langMap[selectedLngCode]}' ORDER BY songNo ASC`;
        const titleQuery = `SELECT title from thirumurai_songs where prevId=${data?.prevId} and title  NOTNULL and title!='' GROUP BY title`;
        getSqlData(titleQuery, (data) => {
            dispatchMusic({ type: 'SET_TITLE', payload: data[0].title });
            getSqlData(detailQuery, (callbacks) => {
                dispatchMusic({ type: 'SONG_DETAILS', payload: callbacks });
                const query2 = `SELECT * FROM odhuvars WHERE title='${data[0].title}'`;
                getSqlData(query2, (callbacks) => {
                    dispatchMusic({ type: 'SET_SONG', payload: callbacks });
                });
            });
        });
    };
    const [showDetail, setShowDetail] = useState(false);
    const makeTheViewVisible = () => {
        setShowDetail(!showDetail);
        // console.log('the log for the opacity of the view', visibilityVal);
        // if (!showDetail) {
        //     AnimatedRN.timing(visibilityVal, {
        //         toValue: 1,
        //         duration: 3000,
        //         useNativeDriver: true,
        //     }).start(() => {
        //         setShowDetail(true);
        //     });
        // } else {
        //     AnimatedRN.timing(visibilityVal, {
        //         toValue: 0,
        //         duration: 3000,
        //         useNativeDriver: true,
        //     }).start(() => {
        //         setShowDetail(false);
        //     });
        // }
    };
    useEffect(() => {
        if (data?.prevId) {
            dispatchMusic({ type: 'PREV_ID', payload: data?.prevId });
            getSqlData(
                `SELECT author,thalam,country,pann from thirumurais WHERE prevId=${data?.prevId}`,
                (cb) => {
                    const { author, country, thalam, pann } = cb[0];
                    dispatchMusic({
                        type: 'META_DATA',
                        payload: { author, country, thalam, pann },
                    });
                }
            );
        }
    }, [data]);

    const toggleSwitch = (value, callbacks) => {
        callbacks(!value);
    };
    const renderResult = (item) => {
        const parts = item?.rawSong.split('\r\n');
        // const data = parts?.split(' ')
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <HighlightText
                    style={{
                        fontFamily: 'AnekTamil-Bold',
                        fontSize: 14,
                        color: theme.textColor,
                        fontWeight: '400',
                    }}
                    highlightStyle={{ backgroundColor: theme.colorscheme === 'dark' ? '#A47300' : '#F8E3B2', }}
                    searchWords={[`${searchedword}`]}
                    textToHighlight={item?.rawSong}
                />
                {/* {parts?.map((word) => (
                    word?.split(' ')?.map((res) => (
                        <HighlightedText highlight={searchedword} text={res} lyrics={true} />
                    ))
                ))} */}
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => alert(true)}>


            <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
                <Background>
                    <BackButton
                        secondMiddleText={data?.title}
                        color={true}
                        // middleText={data}
                        navigation={navigation}
                        rightIcon={<ShareIcon />}
                        data={data}
                    />
                </Background>
                <View
                    style={[
                        styles.headerContainer,
                        { backgroundColor: theme.colorscheme === 'dark' ? '#333333' : '#F1DBDA' },
                    ]}
                >
                    <View
                        style={[
                            styles.detailsSection,
                            {
                                display: showDetail ? 'flex' : 'none',
                                // opacity: visibilityVal,
                                // transform: [{ translateY: 10 }],
                            },
                        ]}
                    >
                        <>
                            <View style={styles.container}>
                                <View
                                    style={[
                                        styles.iconContainer,
                                        {
                                            backgroundColor:
                                                theme.colorscheme === 'dark' ? '#2B2B2B' : '#E0AAA7',
                                        },
                                    ]}
                                >
                                    <AruliyavarSVG
                                        fill={theme.colorscheme === 'dark' ? '#787878' : '#3A1917'}
                                    />
                                </View>
                                <View style={styles.textSectionDD}>
                                    <Text style={styles.titleDropDown}>{`${t('Aruliyavar')}`}</Text>
                                    <Text style={styles.valueDropDown}>
                                        {t(musicState?.metaData?.author) ||
                                            'Text currently not available'}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.container}>
                                <View
                                    style={[
                                        styles.iconContainer,
                                        {
                                            backgroundColor:
                                                theme.colorscheme === 'dark' ? '#2B2B2B' : '#E0AAA7',
                                        },
                                    ]}
                                >
                                    <NaduSVG
                                        fill={theme.colorscheme === 'dark' ? '#787878' : '#3A1917'}
                                    />
                                </View>
                                <View style={styles.textSectionDD}>
                                    <Text style={styles.titleDropDown}>{`${t('Nadu')}`}</Text>
                                    <Text style={styles.valueDropDown}>
                                        {t(musicState?.metaData?.country) ||
                                            'Text currently not available '}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.container}>
                                <View
                                    style={[
                                        styles.iconContainer,
                                        {
                                            backgroundColor:
                                                theme.colorscheme === 'dark' ? '#2B2B2B' : '#E0AAA7',
                                        },
                                    ]}
                                >
                                    <PannSVG
                                        fill={theme.colorscheme === 'dark' ? '#787878' : '#3A1917'}
                                    />
                                </View>
                                <View style={styles.textSectionDD}>
                                    <Text style={styles.titleDropDown}>{`${t('Pann')}`}</Text>
                                    <Text style={styles.valueDropDown}>
                                        {t(musicState?.metaData?.pann)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.container}>
                                <View
                                    style={[
                                        styles.iconContainer,
                                        {
                                            backgroundColor:
                                                theme.colorscheme === 'dark' ? '#2B2B2B' : '#E0AAA7',
                                        },
                                    ]}
                                >
                                    <ThalamSVG
                                        fill={theme.colorscheme === 'dark' ? '#787878' : '#3A1917'}
                                    />
                                </View>
                                <View style={styles.textSectionDD}>
                                    <Text style={styles.titleDropDown}>{`${t('Thalam')}`}</Text>
                                    <Text style={styles.valueDropDown}>
                                        {t(musicState?.metaData?.thalam)}

                                        {/* {metaData?.thalam === 'சீர்காழி - 06 - பூந்தராய்'
                                        ? 'true'
                                        : 'false'} */}
                                    </Text>
                                </View>
                            </View>
                        </>
                    </View>
                    <TouchableOpacity style={styles.textContainer} onPress={makeTheViewVisible}>
                        <DownArrow />
                        <Text style={styles.headerText}>{t('Thirumurai Details')}</Text>
                        <DownArrow />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        width: '100%',
                        position: 'absolute',
                        right: -3,
                        top: '20%',
                        zIndex: 10,
                    }}
                >
                    {showSetting ? (
                        <Animated.View
                            style={[styles.animatedView, animatedStyles, { ...theme.setting }]}
                        >
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}
                            >
                                <TouchableOpacity style={styles.InsiderSettingButton}>
                                    <SettingIcon />
                                    {/* <Text
                                        style={[
                                            styles.settingText,
                                            { color: theme.settingText.color },
                                        ]}
                                    >
                                        Settings
                                    </Text> */}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.clearIcon}
                                    onPress={() => closeAnimatedView()}
                                >
                                    <Icon
                                        name="clear"
                                        size={24}
                                        color={theme.colorscheme === 'light' ? '#000' : '#fff'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.TranslationContainer}>
                                <Text style={styles.translationText}>Translation</Text>
                                <View style={{ marginHorizontal: 0 }}>
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
                                    <Text style={styles.TextSizeText}>Text Size</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={styles.addMinusIcon}
                                            onPress={() => setFontSizeCount(fontSizeCount - 1)}
                                        >
                                            <AntDesign name="minus" color="white" />
                                        </TouchableOpacity>
                                        <Text style={styles.fontSizeText}>{fontSizeCount}</Text>
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
                                            <Text style={styles.otherOptionText}>Tamil Split</Text>

                                            <Text
                                                style={{
                                                    fontFamily: 'Mulish-Regular',
                                                    color: '#777777',
                                                    fontSize: 10,
                                                    fontWeight: '700',
                                                }}
                                            >
                                                Turn on to view thirumurais as songs
                                            </Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                                            thumbColor={tamilSplit ? '#f5dd4b' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => {
                                                if (i18n.language === 'en') {
                                                    return toggleSwitch(tamilSplit, setTamilSplit);
                                                }
                                            }}
                                            value={tamilSplit}
                                        />
                                    </View>
                                )}
                                <View style={styles.otherOption}>
                                    <View>
                                        <Text style={styles.otherOptionText}>Dark Mode</Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Mulish-Regular',
                                                color: '#777777',
                                                fontSize: 10,
                                                fontWeight: '700',
                                            }}
                                        >
                                            Turn on to view thirumurais as songs
                                        </Text>
                                    </View>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => toggleSwitch(darkMode, setDarkMode)}
                                        value={darkMode}
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.settingButton,
                                { backgroundColor: theme.settingBtn.backgroundColor },
                            ]}
                            onPress={handlePress}
                        >
                            <SettingIcon />
                            <Text style={styles.settingText}>Settings</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView style={styles.lyricsContainer} nestedScrollEnabled>
                    <View style={{ paddingBottom: 300, paddingHorizontal: 20 }}>
                        {musicState?.songDetails?.length > 0 &&
                            musicState?.songDetails?.map((res, index) => (
                                <View
                                    style={{
                                        borderBottomColor: colors.grey3,
                                        borderBottomWidth: 1,
                                        paddingBottom: 7,
                                        flexDirection: 'row',
                                    }}
                                >
                                    {
                                        searchScreen ?
                                            renderResult(res) :
                                            <Text
                                                style={[
                                                    styles.lyricsText,
                                                    { fontSize: fontSizeCount, color: theme.lyricsText.color },
                                                ]}
                                            >
                                                {!(tamilSplit && i18n.language === 'en')
                                                    ? selectedLang !== 'Tamil'
                                                        ? res?.rawSong
                                                        : res?.tamilExplanation ||
                                                        'Text currently not available'
                                                    : res?.tamilSplit || 'Text currently not available'}
                                            </Text>
                                    }
                                    <Text
                                        style={[
                                            styles.lyricsText,
                                            {
                                                fontSize: fontSizeCount,
                                                alignSelf: 'flex-end',
                                                color: theme.lyricsText.color,
                                            },
                                        ]}
                                    >
                                        {res?.songNo}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </ScrollView>
                {/* <BottomSheet
                handleIndicatorStyle={{ backgroundColor: '#FFF7E6' }}
                handleStyle={{
                    backgroundColor: '#222222',
                    borderTopEndRadius: 15,
                    borderTopLeftRadius: 15,
                }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={1}
            > */}
                <View
                    style={{
                        paddingTop: 20,
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#222222',
                        borderTopEndRadius: 15,
                        borderTopLeftRadius: 15,
                        alignSelf: 'flex-end',
                        width:
                            orientation == 'LANDSCAPE'
                                ? Dimensions.get('window').width / 2
                                : Dimensions.get('window').width,
                    }}
                >
                    <AudioPlayer
                        prevId={data?.prevId}
                        songsData={musicState?.song}
                        title={musicState?.title}
                        orientation={orientation}
                        downloaded={downloaded}
                        data={data}
                    />
                </View>
                {/* </BottomSheet> */}
            </View>
        </TouchableWithoutFeedback>
    );
};
export const styles = StyleSheet.create({
    titleDropDown: { fontSize: RFValue(10, 580), color: '#777777' },
    valueDropDown: {
        fontSize: RFValue(12, 580),
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
        fontWeight: '700',
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
        color: 'black',
        marginBottom: 5,
    },
    TranslationContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        flex: 1,
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
        fontWeight: '500',
        fontFamily: 'Mulish-Regular',
        color: '#777777',
    },
    lyricsContainer: { flexGrow: 1, paddingHorizontal: 0, marginTop: 10 },
    lyricsText: {
        fontWeight: '500',
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
    TextSize: { marginTop: 5 },
    TextSizeText: { color: 'black', fontFamily: 'Lora-Bold' },
    fontSizeText: {
        marginHorizontal: 4,
        fontFamily: 'Mulish-Regular',
        color: '#777777',
        fontWeight: '600',
    },
    otherOption: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 6 },
    otherOptionText: { fontFamily: 'Lora-Bold', color: 'black' },
});
export default ThrimuraiSong;
