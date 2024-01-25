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
} from 'react-native';
import BackButton from '../../../components/BackButton';
import ShareIcon from '../../../assets/Images/share-1.svg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import DownArrow from '../../../assets/Images/Down Arrows (3) 1.svg';
import BottomSheet from '@gorhom/bottom-sheet';
import AudioPlayer from '../../Player/AudioPlayer';
import RBSheet from 'react-native-raw-bottom-sheet';
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

const ThrimuraiSong = ({ route, navigation }) => {
    let key = true;
    const database = SQLite.openDatabase({
        name: key ? 'SongsData.db' : 'main.db',
        createFromLocation: 1,
    });
    const isFocused = useIsFocused;
    const { data } = route.params || {};
    const translateX = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 1) }],
    }));
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '25%'], []);
    const [showSetting, setShowSetting] = useState(false);
    const language = ['Original', 'Tamil', 'English', 'Hindi'];
    const [selectedLang, setSelectedLang] = useState('Original');
    const [fontSizeCount, setFontSizeCount] = useState(12);
    const [DarkMode, setDarkMode] = useState(true);
    const [WordSplit, setWordSplit] = useState(true);
    const [songDetails, setSongDetails] = useState(null);
    const [songs, setSongs] = useState([]);
    const { theme } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const [selectedLngCode, setSelectedLngCode] = useState(i18n.language);
    const langMap = {
        en: 'RoI',
        English: 'en-IN',
        Hindi: 'hi-t',
        Tamil: 'en',
        ar: 'ar',
        as: 'as',
        bn: 'bn',
        hi: 'DV',
        gu: 'gu',
        he: 'he',
        ja: 'JP-KA',
        kn: 'kn-IN',
        ml: 'ml',
        or: 'or',
        pa: 'pa',
        si: 'si-LK',
        te: 'te',
        ur: 'ur',
        ta: 'en',
    };

    useEffect(() => {
        getSOngData();
    }, [selectedLngCode]);


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
    const [metaData, setMetaData] = useState({
        author: '',
        country: '',
        thalam: '',
        pann: '',
    });

    const getSOngData = () => {
        const query = `SELECT pann,thalam,rawSong,author,country,songNo from thirumurai_songs where prevId=${data?.prevId} and title NOTNULL and locale='${langMap[selectedLngCode]}' ORDER BY songNo ASC`;
        getSqlData(query, (callbacks) => {
            setSongDetails(callbacks);
            const query2 = `SELECT * FROM odhuvars WHERE title='${callbacks?.[0]?.title}'`;
            getSqlData(query2, (callbacks) => {
                setSongs(callbacks);
            });
        });
    };
    const [showDetail, setShowDetail] = useState(false);
    // const visibilityVal = useRef(new AnimatedRN.Value(0)).current;
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
            getSqlData(
                `SELECT author,thalam,country,pann from thirumurais WHERE prevId=${data?.prevId}`,
                (cb) => {
                    setMetaData((prev) => {
                        const { author, country, thalam, pann } = cb[0];
                        return { author, country, thalam, pann };
                    });
                }
            );
        }
    }, [data]);
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <Background>
                <BackButton
                    secondMiddleText={data?.titleS}
                    color={true}
                    // middleText={data}
                    navigation={navigation}
                    rightIcon={<ShareIcon />}
                    data={data}
                />
            </Background>
            <View style={styles.headerContainer}>
                {/* <AnimatedRN.View
                    style={[
                        styles.detailsSection,
                        {
                            display: showDetail ? 'flex' : 'none',
                            opacity: visibilityVal,
                            // transform: [{ translateY: 10 }],
                        },
                    ]}
                >
                    <Text>hdfsjfhhjkd</Text>
                </AnimatedRN.View> */}

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
                            <View style={[styles.iconContainer, { backgroundColor: '#E0AAA7' }]}>
                                <AruliyavarSVG fill="#000" />
                            </View>
                            <View style={styles.textSectionDD}>
                                <Text style={styles.titleDropDown}>Aruliyavar</Text>
                                <Text style={styles.valueDropDown}>
                                    {metaData?.author || 'Not Available'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={[styles.iconContainer, { backgroundColor: '#E0AAA7' }]}>
                                <AruliyavarSVG fill="#000" />
                            </View>
                            <View style={styles.textSectionDD}>
                                <Text style={styles.titleDropDown}>Nadu</Text>
                                <Text style={styles.valueDropDown}>
                                    {metaData?.country || 'Not Available'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={[styles.iconContainer, { backgroundColor: '#E0AAA7' }]}>
                                <AruliyavarSVG fill="#000" />
                            </View>
                            <View style={styles.textSectionDD}>
                                <Text style={styles.titleDropDown}>Pann</Text>
                                <Text style={styles.valueDropDown}>{metaData?.pann}</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={[styles.iconContainer, { backgroundColor: '#E0AAA7' }]}>
                                <AruliyavarSVG fill="#000" />
                            </View>
                            <View style={styles.textSectionDD}>
                                <Text style={styles.titleDropDown}>Thalam</Text>
                                <Text style={styles.valueDropDown}>{metaData?.thalam}</Text>
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
            <ScrollView style={styles.lyricsContainer} nestedScrollEnabled>
                <View style={{ paddingBottom: 300, paddingHorizontal: 20 }}>
                    {songDetails?.length > 0 &&
                        songDetails?.map((res, index) => (
                            <View
                                style={{
                                    borderBottomColor: colors.grey3,
                                    borderBottomWidth: 1,
                                    paddingBottom: 7,
                                    flexDirection: 'row',
                                }}
                            >
                                <Text
                                    style={[
                                        styles.lyricsText,
                                        { fontSize: fontSizeCount, color: theme.lyricsText.color },
                                    ]}
                                >
                                    {res?.rawSong}
                                </Text>
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
                <View style={{ position: 'absolute', right: 0, zIndex: 10 }}>
                    {showSetting ? (
                        <Animated.View
                            style={[styles.animatedView, animatedStyles, { ...theme.setting }]}
                        >
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.InsiderSettingButton}>
                                    <SettingIcon />
                                    <Text
                                        style={[
                                            styles.settingText,
                                            { color: theme.settingText.color },
                                        ]}
                                    >
                                        Settings
                                    </Text>
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
                                <Text style={styles.translationText}>Tranlation</Text>
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
                                <View style={styles.otherOption}>
                                    <View>
                                        <Text style={styles.otherOptionText}>Word Split</Text>
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
                                    <Switch value={WordSplit} />
                                </View>
                                <View style={styles.otherOption}>
                                    <View>
                                        <Text style={styles.otherOptionText}>Word Split</Text>
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
                                    <Switch value={DarkMode} />
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
            </ScrollView>
            <BottomSheet
                handleIndicatorStyle={{ backgroundColor: '#FFF7E6' }}
                handleStyle={{
                    backgroundColor: '#222222',
                    borderTopEndRadius: 15,
                    borderTopLeftRadius: 15,
                }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={1}
            >
                <AudioPlayer
                    prevId={data?.prevId}
                    songsData={songs}
                    title={songDetails?.[0]?.title}
                />
            </BottomSheet>
        </View>
    );
};
export const styles = StyleSheet.create({
    titleDropDown: { fontSize: RFValue(10, 580), color: '#777777' },
    valueDropDown: { fontSize: RFValue(12, 580), color: '#777777' },
    iconContainer: {
        padding: 6,
        borderRadius: 1000,
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
        backgroundColor: '#F3DDDC',
        width: Dimensions.get('window').width,
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
    translationText: { fontSize: 12, fontWeight: '700', fontFamily: 'Lora-Bold', color: '#222222' },
    TranslationContainer: { paddingHorizontal: 20, marginVertical: 10 },
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
        height: 250,
        borderWidth: 1,
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
