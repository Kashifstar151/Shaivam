import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Switch, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BackButton from '../../../components/BackButton'
import ShareIcon from "../../../assets/Images/share-1.svg"
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import AntDesign from "react-native-vector-icons/dist/AntDesign"
import DownArrow from "../../../assets/Images/Down Arrows (3) 1.svg"
import BottomSheet from '@gorhom/bottom-sheet';
import AudioPlayer from '../../Player/AudioPlayer'
import RBSheet from "react-native-raw-bottom-sheet";
import Background from '../../../components/Background'
import SettingIcon from "../../../assets/Images/Settings (1) 1.svg"
import SQLite from 'react-native-sqlite-storage';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { getSqlData } from '../../Database'

const ThrimuraiSong = ({ route, navigation }) => {
    let key = true
    const database = SQLite.openDatabase({ name: key ? 'SongsData.db' : 'main.db', createFromLocation: 1 });
    const { data } = route.params
    // console.log("🚀 ~ file: ThrimuraiSong.js:20 ~ ThrimuraiSong ~ data:", data)
    const translateX = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 1) }],
    }));
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['25%', '25%'], []);
    const [showSetting, setShowSetting] = useState(false)
    const language = ['Original', 'Tamil', 'English', 'Hindi']
    const [selectedLang, setSelectedLang] = useState('Original')
    const [fontSizeCount, setFontSizeCount] = useState(12)
    const [DarkMode, setDarkMode] = useState(true)
    const [WordSplit, setWordSplit] = useState(true)
    const [songDetails, setSongDetails] = useState(null)
    const [songs, setSongs] = useState([])

    const handlePress = () => {
        console.log(true)
        setShowSetting(true)
        translateX.value = 2;
    };
    const closeAnimatedView = () => {
        setShowSetting(false)
        translateX.value = 50;
    }
    useEffect(() => {
        getSOngData()
    }, [])
    const getSOngData = () => {
        const query = `SELECT * from thirumurai_songs where refId=${data?.prevId} and title NOTNULL`;
        getSqlData(query, callbacks => {
            setSongDetails(callbacks)
            const query2 = `SELECT * FROM odhuvars WHERE title='${callbacks?.[0]?.title}'`
            getSqlData(query2, callbacks => {
                console.log("🚀 ~ file: ThrimuraiSong.js:58 ~ getSOngData ~ callbacks:", callbacks)
                setSongs(callbacks)
            })
        })

        // await database.transaction(tx => {
        //     tx.executeSql(query, [], (_, results) => {
        //         let arr = []
        //         if (results?.rows?.length > 0) {
        //             for (let i = 0; i < results?.rows?.length; i++) {
        //                 const tableName = results.rows.item(i);
        //                 console.log("Row data AUDIO details", tableName);
        //                 arr.push(tableName)
        //                 // console.log("🚀 ~ file: ThrimuraiSong.js:57 ~ tx.executeSql ~ arr:", JSON.stringify(arr, 0, 2))
        //             }
        //             setSongDetails(arr)
        //         } else {
        //             console.log('No tables found.');
        //         }
        //     })
        // }, (error) => {
        //     console.error("error occured in fetching data", error);
        // })
    }

    // useEffect(() => {
    //     bottomSheetRef.current.open()
    // }, [])
    // console.log("🚀 ~ file: ThrimuraiSong.js:7 ~ ThrimuraiSong ~ data:", data)
    return (

        <View style={{ flex: 1 }}>
            <Background>
                <BackButton secondMiddleText={'1.001 தோடுடைய செவியன்'} color={true} middleText={'முதல்-திருமுறை'} navigation={navigation} rightIcon={<ShareIcon />} data={data} />
            </Background>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.textContainer}>
                    <DownArrow />
                    <Text style={styles.headerText}>Thirumurai Details</Text>
                    <DownArrow />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.lyricsContainer}>
                <View style={{ paddingBottom: 300, paddingHorizontal: 20 }}>

                    {
                        songDetails?.length > 0 && songDetails?.map((res) => (

                            <Text style={[styles.lyricsText, { fontSize: fontSizeCount, }]}>
                                {res?.rawSong}
                            </Text>

                        ))
                    }
                </View>
                <View style={{ position: 'absolute', right: 0, zIndex: 10 }}>
                    {
                        showSetting ?
                            <Animated.View style={[styles.animatedView, animatedStyles]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.InsiderSettingButton}>
                                        <SettingIcon />
                                        <Text style={styles.settingText}>Setting</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.clearIcon} onPress={() => closeAnimatedView()}>
                                        <Icon name='clear' size={24} color='black' />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.TranslationContainer}>
                                    <Text style={styles.translationText}>Tranlation</Text>
                                    <View style={{ marginHorizontal: 0 }}>
                                        <FlatList horizontal data={language} renderItem={({ item, index }) => (
                                            <>
                                                {
                                                    selectedLang == item ?
                                                        <TouchableOpacity style={[styles.languageBox, { backgroundColor: '#C1554E' }]} onPress={() => setSelectedLang(item)}>
                                                            <Text style={[styles.languageOptionText, { color: 'white', fontWeight: '700' }]}>{item}</Text>
                                                        </TouchableOpacity> :

                                                        <TouchableOpacity style={styles.languageBox} onPress={() => setSelectedLang(item)}>
                                                            <Text style={styles.languageOptionText}>{item}</Text>
                                                        </TouchableOpacity>
                                                }
                                            </>
                                        )} />
                                    </View>
                                    <View style={styles.TextSize}>
                                        <Text style={styles.TextSizeText}>Text Size</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <TouchableOpacity style={styles.addMinusIcon} onPress={() => setFontSizeCount(fontSizeCount - 1)}>
                                                <AntDesign name='minus' color='white' />
                                            </TouchableOpacity>
                                            <Text style={styles.fontSizeText}>{fontSizeCount}</Text>
                                            <TouchableOpacity style={styles.addMinusIcon} onPress={() => setFontSizeCount(fontSizeCount + 1)}>
                                                <Icon name='add' color='white' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.otherOption}>
                                        <View>
                                            <Text style={styles.otherOptionText}>Word Split</Text>
                                            <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777', fontSize: 10, fontWeight: '700' }}>Turn on to view thirumurais as songs</Text>
                                        </View>
                                        <Switch value={WordSplit} />
                                    </View>
                                    <View style={styles.otherOption}>
                                        <View>
                                            <Text style={styles.otherOptionText}>Word Split</Text>
                                            <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777', fontSize: 10, fontWeight: '700' }}>Turn on to view thirumurais as songs</Text>
                                        </View>
                                        <Switch value={DarkMode} />
                                    </View>
                                </View>
                            </Animated.View> :
                            <TouchableOpacity style={styles.settingButton} onPress={handlePress}>
                                <SettingIcon />
                                <Text style={styles.settingText}>Setting</Text>
                            </TouchableOpacity>
                    }
                </View>

            </ScrollView>
            <BottomSheet
                handleIndicatorStyle={{ backgroundColor: '#FFF7E6', }}
                handleStyle={{ backgroundColor: '#222222', borderTopEndRadius: 20, borderTopLeftRadius: 20 }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={1} >
                <AudioPlayer songsData={songs} title={songDetails?.[0]?.title} />
            </BottomSheet>
        </View >
    )
}
export const styles = StyleSheet.create({
    headerContainer: { backgroundColor: '#F3DDDC', width: Dimensions.get('window').width, height: 50, justifyContent: 'center', alignItems: 'center' },
    headerText: { fontSize: 14, fontFamily: 'Mulish-Regular', fontWeight: '700', paddingHorizontal: 5 },
    textContainer: { flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' },
    moreOptionContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10 },
    addMinusIcon: { marginHorizontal: 5, alignSelf: 'center', backgroundColor: '#777777', height: 20, width: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    partitionContainer: { width: 2, backgroundColor: '#CFCFCF', margin: 2, marginHorizontal: 10 },
    transcriptText: { fontSize: 16, fontFamily: 'Lora-Bold' },
    translationText: { fontSize: 12, fontWeight: '700', fontFamily: 'Lora-Bold', color: '#222222' },
    TranslationContainer: { paddingHorizontal: 20, marginVertical: 10, },
    languageBox: { alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30, width: 60, borderColor: '#D9D9D9', borderWidth: 2, marginHorizontal: 2 },
    languageOptionText: { fontSize: 12, fontWeight: '500', fontFamily: 'Mulish-Regular', color: '#777777' },
    lyricsContainer: { flexGrow: 1, paddingHorizontal: 0, marginTop: 10, },
    lyricsText: { color: "#222222", fontWeight: '500', fontFamily: 'AnekTamil-Regular', lineHeight: 30 },
    settingButton: { flexDirection: 'row', alignItems: 'center', padding: 5, position: 'absolute', top: '8%', right: '0%', height: 30, borderRadius: 5, backgroundColor: '#F3DDDC', borderColor: '#C1554E', borderWidth: 1 },
    settingText: { color: '#C1544E', fontSize: 10, fontWeight: '700' },
    animatedView: { backgroundColor: '#F3DDDC', zIndex: 10, alignSelf: 'flex-end', height: 250, borderColor: '#C1554E', borderWidth: 1, borderRadius: 5 },
    InsiderSettingButton: { flexDirection: 'row', alignItems: 'center', padding: 5, },
    clearIcon: { alignItems: 'center', padding: 5, },
    TextSize: { marginTop: 5 },
    TextSizeText: { color: 'black', fontFamily: 'Lora-Bold' },
    fontSizeText: { marginHorizontal: 4, fontFamily: 'Mulish-Regular', color: '#777777', fontWeight: '600' },
    otherOption: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 6 },
    otherOptionText: { fontFamily: 'Lora-Bold', color: 'black' },
})
export default ThrimuraiSong