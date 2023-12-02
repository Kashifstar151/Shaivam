import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BackButton from '../../../components/BackButton'
import ShareIcon from "../../../assets/Images/share-1.svg"
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import AntDesign from "react-native-vector-icons/dist/AntDesign"
import DownArrow from "../../../assets/Images/Down Arrows (3) 1.svg"
import FullScreenIcon from "../../../assets/Images/Clip path group.svg"
import TextIcon from "../../../assets/Images/text 1.svg"
import BottomSheet from '@gorhom/bottom-sheet';
import AudioPlayer from '../../Player/AudioPlayer'
import RBSheet from "react-native-raw-bottom-sheet";

const ThrimuraiSong = ({ route, navigation }) => {
    const { data } = route.params
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['25%', '25%'], []);
    const language = ['Original', 'English', 'Hindi']
    const [selectedLang, setSelectedLang] = useState('Original')

    // useEffect(() => {
    //     bottomSheetRef.current.open()
    // }, [])
    // console.log("🚀 ~ file: ThrimuraiSong.js:7 ~ ThrimuraiSong ~ data:", data)
    return (

        <View style={{ flex: 1 }}>
            <BackButton secondMiddleText={data?.attributes?.title} color={true} middleText={data?.attributes?.author} navigation={navigation} rightIcon={<ShareIcon />} data={data} />
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.textContainer}>
                    <DownArrow />
                    <Text style={styles.headerText}>Thirumurai Details</Text>
                    <DownArrow />
                </TouchableOpacity>
            </View>
            <View style={styles.moreOptionContainer}>
                <Text style={styles.transcriptText}>Transcript</Text>
                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.addMinusIcon}>
                        <AntDesign name='minus' color='white' />
                    </View>
                    <TextIcon />
                    <View style={styles.addMinusIcon}>
                        <Icon name='add' color='white' />
                    </View>
                    <View style={styles.partitionContainer} />
                    <TouchableOpacity>
                        <FullScreenIcon />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 5 }}>
                        <Icon name='content-copy' size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.TranslationContainer}>
                <Text style={styles.translationText}>Tranlation</Text>
                <View style={{ marginHorizontal: 20 }}>
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
            </View>
            <ScrollView style={styles.lyricsContainer}>
                <View style={{ paddingBottom: 300 }}>

                    <Text style={styles.lyricsText}>
                        {data?.attributes?.rawSong}

                    </Text>
                </View>
            </ScrollView>
            <BottomSheet
                //    style={{}}
                handleIndicatorStyle={{ backgroundColor: '#FFF7E6', }}
                handleStyle={{ backgroundColor: '#222222', borderTopEndRadius: 20, borderTopLeftRadius: 20 }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={1} >
                <AudioPlayer />
            </BottomSheet>
            {/* <View> */}
            {/* </View> */}
        </View >


    )
}
export const styles = StyleSheet.create({
    headerContainer: { backgroundColor: '#FFF7E6', width: Dimensions.get('window').width, height: 50, justifyContent: 'center', alignItems: 'center' },
    headerText: { fontSize: 14, fontFamily: 'Mulish-Regular', fontWeight: '700', paddingHorizontal: 5 },
    textContainer: { flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' },
    moreOptionContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10 },
    addMinusIcon: { marginHorizontal: 5, alignSelf: 'center', backgroundColor: '#777777', height: 20, width: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    partitionContainer: { width: 2, backgroundColor: '#CFCFCF', margin: 2, marginHorizontal: 10 },
    transcriptText: { fontSize: 16, fontWeight: '700', fontFamily: 'Lora-Regular' },
    translationText: { fontSize: 12, fontWeight: '700', fontFamily: 'Mulish-Regular', color: '#777777' },
    TranslationContainer: { alignItems: 'center', paddingHorizontal: 20, marginVertical: 10, flexDirection: 'row' },
    languageBox: { alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30, width: 60, borderColor: '#D9D9D9', borderWidth: 2, marginHorizontal: 5 },
    languageOptionText: { fontSize: 12, fontWeight: '500', fontFamily: 'Mulish-Regular', color: '#777777' },
    lyricsContainer: { flexGrow: 1, paddingHorizontal: 20, marginTop: 10, },
    lyricsText: { color: "#222222", fontSize: 16, fontWeight: '500', fontFamily: 'AnekTamil-Regular', lineHeight: 30 }
})
export default ThrimuraiSong