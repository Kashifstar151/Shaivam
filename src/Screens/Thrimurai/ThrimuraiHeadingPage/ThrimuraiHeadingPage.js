import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BackButton from '../../../components/BackButton'
import SearchInput from '../../../components/SearchInput'
import MusicIcon from "../../../assets/Images/PanmuraiLogo.svg"
import Icon2 from "../../../assets/Images/ThalamuraiLogo.svg"
import ValarutramuraiLogo from "../../../assets/Images/ValarutramuraiLogo.svg"
import AkarthiLogo from "../../../assets/Images/AkarthiLogo.svg"
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import { RouteTexts } from '../../../navigation/RouteText'
import RenderAudios from '../RenderAudios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Varakatrimurai from '../Varakatrimurai'
import * as RNFS from 'react-native-fs'
import SQLite from 'react-native-sqlite-storage';
import { decode } from 'react-native-base64';
import { useIsFocused } from '@react-navigation/native'
import RenderTitle from "./RenderTitle"
import Background from '../../../components/Background'
import ThrimuraiHeader from './ThrimuraiHeader'
import ActivePanmurai from '../../../assets/Images/ActivePanmurai.svg'
import ActiveThalamurai from '../../../assets/Images/ActiveThalamurai.svg'
import ActiveValamurai from '../../../assets/Images/ActiveValathrimurai.svg'
import ActiveAkarthi from '../../../assets/Images/ActiveAkarthi.svg'
import { getSqlData } from '../../Database'

const ThrimuraiHeadingPage = ({ route, navigation }) => {
    const isFocuced = useIsFocused
    const { page, list, query } = route.params;
    const headerData = [
        { name: 'Panmurai', Icon: <MusicIcon />, activeIcon: <ActivePanmurai /> },
        { name: 'Thalamurai', Icon: <Icon2 />, activeIcon: <ActiveThalamurai /> },
        { name: 'Varalatrumurai', Icon: <ValarutramuraiLogo />, activeIcon: <ActiveAkarthi /> },
        { name: 'Akarthi', Icon: <AkarthiLogo />, activeIcon: <ActiveValamurai /> },
    ]
    const [selectedHeader, setSelectedheader] = useState(headerData[0])
    const [selectedTitle, setSelectedTitle] = useState(null)
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [data, setData] = useState();
    const [onFocus, setOnFocus] = useState(false)
    const database = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: 1 });
    const [searchedText, setSearchedText] = useState(null)
    /* Get latest DB from the disk */
    const [thrimurais, setThrimurais] = useState(list)
    useEffect(() => {
        retrieveData()
    }, [])
    const retrieveData = async () => {
        // const query = 'SELECT * FROM thirumurai_songs WHERE refId=1311';
        getSqlData(query, callbacks => {
            setThrimurais(callbacks)
        })
        // await database.transaction(tx => {
        //     tx.executeSql(query, [], (_, results) => {
        //         let arr = []
        //         if (results?.rows?.length > 0) {
        //             for (let i = 0; i < results?.rows?.length; i++) {
        //                 const tableName = results.rows.item(i);
        //                 console.log("Row data", tableName);
        //                 arr.push(tableName)
        //             }
        //         } else {
        //             console.log('No tables found.');
        //         }

        //         setThrimurais(arr)
        //         // console.log("🚀 ~ file: ThrimuraiHeadingPage.js:221 ~ tx.executeSql ~ arr:", arr)
        //     })
        // }, (error) => {
        //     console.error("error occured in fetching data", error);
        // })
    };

    /* Get latest DB from the server */
    // const getLatestVersion = async () => {
    //     const res = await fetch('http://192.168.1.2:3000/api/latest-db');
    //     const { data } = await res.json();
    //     /* Refresh the UI */
    //     setData(data);

    //     /* Save the data */
    //     console.log('Saving latest version...');
    //     await AsyncStorage.setItem('latestDB', JSON.stringify(data));
    //     console.log('Saved latest version.');
    // };

    /* To compare two versions */

    /* Callback for the update button */
    // const handleFetchUpdate = async () => {
    //     setLoading(true);
    //     let updateAvailable = false;

    //     /* Check the latest version */
    //     const res = await fetch('http://192.168.1.2:3000/api/latest-version');
    //     const { version } = await res.json();

    //     /* Check existing version */
    //     const savedVersion = await AsyncStorage.getItem('version');
    //     if (savedVersion) {
    //         console.log('Saved Version:', savedVersion);
    //         console.log('Latest Version:', version);
    //         setLoadingText(`Latest: ${version}, Saved: ${savedVersion}`);
    //         /* Check if a later version is available */
    //         if (compareStr(savedVersion, version) === -1) {
    //             updateAvailable = true;
    //         }
    //     } else {
    //         console.log('There is no saved version');
    //         updateAvailable = true;
    //     }

    //     if (updateAvailable) {
    //         setLoadingText('Fetching latest version ...');
    //         await getLatestVersion();
    //         await AsyncStorage.setItem('version', version);
    //     }
    //     setLoading(false);
    //     setLoadingText('Loading ...');
    // };


    const song = [
        {

            id: '1',
            url: "https://shaivam.org/gallery/audio/satguru/sam-thkkappu-muzhuvathum/tis-sat-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
            title: 'Satgurunatha Odhuvar',
            artist: 'tobylane',
            duration: 120,

        },
        {

            id: '2',
            url: "https://shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
            title: 'Satgurunatha',
            artist: 'tobylane',
            duration: 120,

        },
        {
            id: '3',
            title: "Madurai Muthukkumaran",
            artist: "மதுரை முத்துக்குமரன்",
            url: "https://shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
            duration: 120,
        }
    ]
    // const renderCategories = (item, index) => {
    //     return (
    //         <>
    //             {
    //                 selectedHeader.name == item.name ?
    //                     <TouchableOpacity style={styles.selectedHeaderBox} onPress={() => setSelectedheader(item)}>
    //                         {item.Icon}
    //                         <Text style={[styles.headerText, { color: 'white', fontWeight: '700' }]}>{item.name}</Text>
    //                     </TouchableOpacity> :
    //                     <TouchableOpacity style={styles.headerBox} onPress={() => setSelectedheader(item)}>
    //                         {item.Icon}
    //                         <Text style={styles.headerText}>{item.name}</Text>
    //                     </TouchableOpacity>
    //             }
    //         </>
    //     )
    // }
    const renderContents = (item, index) => {
        return (
            <>
                <View style={styles.chapterBox}>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={styles.chapterNameTexts}>{item.name}</Text>
                        <Text style={styles.chapterTexts}>1.001 - 1.134</Text>
                    </View>
                    {
                        selectedTitle !== null && selectedTitle == index ?
                            <TouchableOpacity onPress={() => setSelectedTitle(null)}>
                                <Icon name='horizontal-rule' size={24} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => setSelectedTitle(index)}>
                                <Icon name='add' size={24} />
                            </TouchableOpacity>
                    }
                </View>
                {
                    selectedTitle == index &&
                    <RenderTitle data={item} navigation={navigation} />
                }

            </>
        )
    }
    // const renderTitle = (item, index) => (
    //     <>
    //         <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 25, height: 40, alignItems: 'center' }}>
    //             <Text style={selectedChapter == index ? [styles.titleText, { color: '#C1554E' }] : styles.titleText}>{item.name}</Text>
    //             <TouchableOpacity onPress={() => setSelectedChapter(index)}>
    //                 {

    //                     <Icon name={selectedChapter == index ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} size={24} />
    //                 }
    //             </TouchableOpacity>
    //         </View>
    //         {
    //             selectedChapter == index &&
    //             <View style={{ marginBottom: 10 }}>
    //                 {/* <FlatList renderItem={({ item, index }) => renderAudios(item, index)} data={item.songLyrics} /> */}
    //                 <RenderAudios songs={item.songLyrics} navigation={navigation} />
    //             </View>
    //         }

    //     </>
    // )
    // const renderAudios = (item, index) => (
    //     <Pressable style={{ alignItems: 'center', marginVertical: 5, width: '100%', paddingHorizontal: 20, flexDirection: 'row' }}
    //         onPress={() => navigation.navigate(RouteTexts.THRIMURAI_SONG, {
    //             data: item
    //         })}>
    //         <View style={{ backgroundColor: '#F2F0F8', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
    //             <MusicIcon1 />
    //         </View>
    //         <Text style={{ marginHorizontal: 10, fontSize: 12, fontFamily: 'AnekTamil-Regular', fontWeight: '500' }}>{item.attributes?.title}</Text>
    //     </Pressable>
    // )
    return (
        <View style={styles.main}>
            <Background>
                <View>
                    <BackButton navigation={navigation} color={true} middleText={'தோடுடைய செவியன்'} />
                    <SearchInput setState={setSearchedText} state={searchedText} setOnFocus={setOnFocus} placeholder={'Search for anything (Eg - தோடுடைய செவியன்) '} />
                </View>
                <FlatList
                    contentContainerStyle={{ marginTop: 10 }}
                    data={headerData}
                    renderItem={({ item, index }) =>
                        <ThrimuraiHeader selectedHeader={selectedHeader} setSelectedheader={setSelectedheader} item={item} />}
                    horizontal />
            </Background>
            <View>
                {
                    selectedHeader.name == 'Akarthi' ?
                        <View style={{ marginTop: 10 }}>
                            <RenderAudios navigation={navigation} />
                        </View>
                        : selectedHeader.name == 'Varalatrumurai' ?
                            <Varakatrimurai navigation={navigation} /> :
                            <FlatList
                                contentContainerStyle={{ marginTop: 10, paddingBottom: 250 }}
                                data={thrimurais}
                                renderItem={({ item, index }) => renderContents(item, index)} />
                }
            </View>
        </View>
    )
}
export const styles = StyleSheet.create({
    main: { flex: 1 },
    mainContainer: { shadowColor: '#FFFFFF', shadowOffset: { height: 8, width: 10 }, shadowOpacity: 0.6, height: 1, width: '100%', backgroundColor: '#F3F3F3' },
    headerBox: { height: 40, paddingHorizontal: 10, backgroundColor: '#EDEDED', borderRadius: 20, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    headerText: { color: '#777777', fontSize: 12, fontFamily: 'Mulish-regular', fontWeight: '500', marginHorizontal: 5 },
    selectedHeaderBox: {
        paddingHorizontal: 10,
        height: 40, backgroundColor: '#C1554E', borderRadius: 20, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        shadowColor: '#72322E',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    chapterBox: { alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9F9F9', height: 60, width: Dimensions.get('window').width, marginBottom: 4, flexDirection: 'row', paddingHorizontal: 20 },
    chapterNameTexts: { color: '#222222', fontSize: 14, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
    titleText: { fontFamily: 'AnekTamil-Regular', fontSize: 14, fontWeight: '500' }

})
export default ThrimuraiHeadingPage