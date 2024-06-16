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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
// import '../../../../localization';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import HeartSVG from '../../../components/SVGs/HeartSVG.js';
import { AddSongToDatabase, listfavAudios } from '../../../Databases/AudioPlayerDatabase';
import ListAudios from './ListAudios';

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
    const isFocuced = useIsFocused();
    // const selectedLngCode = i18n.language;
    // const setLng = (lngCode) => i18n.changeLanguage(lngCode);

    const [searchText, setSearchText] = useState(null);
    const [thrimurais, setThrimurais] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const [recentPlayed, setRecentPlayed] = useState([]);
    const [listFav, setListFav] = useState([]);
    // const database = SQLite.openDatabase({ name: '/storage/emulated/0/Android/data/com.shaivam/files/Thrimurai/thirumuraiData.db', createFromLocation: 1 });
    // const database = SQLite.openDatabase({
    //     name: 'SongsData.db',
    //     createFromLocation: 1,
    // });
    // const [favList, setFavlist] = useState([])
    useEffect(() => {
        getRecentPlaylist();
        listfavAudios((callbacks) => {
            setListFav(callbacks);
            console.log('🚀 ~ useEffect ~ callbacks:', callbacks);
        });
    }, [isFocuced]);
    const getRecentPlaylist = async () => {
        const songs = await AsyncStorage.getItem('recentTrack');
        if (songs?.length > 0) {
            setRecentPlayed(JSON.parse(songs));
            // console.log('data', songs?.length)
        } else {
            setRecentPlayed([]);
        }
    };
    // const [favSong, setFavSong] = useState(false)
    // const FavouriteAudios = (res) => {
    //     // TrackPlayer.getActiveTrack()
    //     //     .then((res) => {
    //     AddSongToDatabase(
    //         'sf',
    //         [
    //             res?.id,
    //             res?.url,
    //             res?.title,
    //             res?.artist,
    //             res?.categoryName,
    //             res?.thalamOdhuvarTamilname,
    //             res?.thirumariasiriyar,
    //         ],
    //         (callbacks) => {

    //             if (callbacks?.message == 'Success') {
    //                 setFavSong(true)
    //             }
    //         }
    //     );
    //     // })
    //     // .catch((err) => {
    //     // });
    // };

    useEffect(() => {
        retrieveData();
    }, []);
    const retrieveData = async () => {
        getSqlData('SELECT * FROM category', (callbacks) => {
            setThrimurais(callbacks);
        });
    };
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
                    <BackButton
                        color={true}
                        middleText={t('Thirumurais')}
                        navigation={navigation}
                    />
                    <View
                        style={[
                            styles.inputcontainer,
                            {
                                backgroundColor: theme.searchBox.bgColor,
                                overflow: 'hidden',
                                paddingRight: 10,
                            },
                        ]}
                    >
                        <Icon name="search" size={28} color={colors.grey1} />
                        <TextInput
                            // onBlur={() => setOnFocus(false)}
                            onFocus={() => {
                                if (thrimurais?.length) {
                                    navigation.navigate(RouteTexts.SEARCH_SCREEN, {
                                        thrimurais: thrimurais,
                                        allThirumirai: true,
                                        query1: `SELECT * FROM thirumurais WHERE search_thirumurai_title LIKE`,
                                        query2: `ORDER BY Thirumurai_title  ASC LIMIT 10 OFFSET 0;`,
                                    });
                                }
                            }}
                            placeholder={`${t('Search for any Thirumurai here')}`}
                            onChangeText={(e) => setSearchText(e)}
                            placeholderTextColor={theme.searchBox.textColor}
                            value={searchText}
                            style={{
                                fontSize: 12,
                                paddingHorizontal: 5,
                                color: '#FF9D9D',
                            }}
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
                    {onFocus ? t('Recent searches') : t('Thirumurais')}
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
                                name: `${t('(2nd bar pink)')}`,
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
                                name: `${t('(3rd bar Green)')}`,
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
                                prevId: ' IN (10,11)',
                                flagShowAudio: false,
                                name: `${t('(4th bar yellow)')}`,
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
                                prevId: '=12',
                                flagShowAudio: true,
                                name: `${t('(5th bar pink)')}`,
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
                                prevId: '=13',
                                flagShowAudio: true,
                                name: `${t('(6th bar Green)')}`,
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
                                prevId: '=14',
                                flagShowAudio: true,
                                name: `${t('(7th bar yellow)')}`,
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
                        <Text style={styles.playlistHeading}>{t('Recently Played')}</Text>
                        <FlatList
                            key={(item) => item?.id}
                            data={recentPlayed}
                            renderItem={({ item, index }) => (
                                <>
                                    {item?.thalamOdhuvarTamilname && item?.id && (
                                        <ListAudios
                                            listFav={listFav}
                                            colorSet={{
                                                textColor: theme.textColor,
                                            }}
                                            item={item}
                                            navigation={navigation}
                                        />
                                    )}
                                </>
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
        flex: 1,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
});
export default ThrimuraiList;
