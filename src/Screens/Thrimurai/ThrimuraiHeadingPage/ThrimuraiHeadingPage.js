import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BackButton from '../../../components/BackButton'
import SearchInput from '../../../components/SearchInput'
import MusicIcon from "../../../assets/Images/music.svg"
import Icon2 from "../../../assets/Images/Frame 204.svg"
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import MusicIcon1 from "../../../assets/Images/music 1.svg"
import { RouteTexts } from '../../../navigation/RouteText'
import RenderAudios from '../RenderAudios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Varakatrimurai from '../Varakatrimurai'
import * as RNFS from 'react-native-fs'
import SQLite from 'react-native-sqlite-storage';
import { decode } from 'react-native-base64';
import { useIsFocused } from '@react-navigation/native'
import RenderTitle from "./RenderTitle"

const ThrimuraiHeadingPage = ({ route, navigation }) => {
    const isFocuced = useIsFocused
    const { page, list } = route.params;
    // console.log("🚀 ~ file: ThrimuraiHeadingPage.js:22 ~ ThrimuraiHeadingPage ~ page:", page)
    const [selectedHeader, setSelectedheader] = useState(false)
    const [selectedTitle, setSelectedTitle] = useState(null)
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [data, setData] = useState(ThrimuraisListData);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Loading ...');
    // const updatedDBPath = '/storage/emulated/0/Android/data/com.shaivam/files/Thrimurai/thirumuraiData.db';
    // const secondUpdatedDBPath = '/storage/emulated/0/Android/data/com.shaivam/files/Thrimurai/thirumuraiSecond.db';
    // const database = SQLite.openDatabase({ name: updatedDBPath, createFromLocation: 1 });
    const database = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: 1 });
    const ThrimuraisListData = [
        {
            name: 'முதல்-திருமுறை1',
            chapters: '1.001 - 1.134',
            title: [
                {
                    name: 'நட்டபாடை',
                    songLyrics: [
                        {
                            "id": 70920,
                            "attributes": {
                                "titleNo": "136",
                                "title": "01.136 மாதர் மடப்பிடி",
                                "pann": "யாழ்மூரி",
                                "audioUrl": "http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                                "thirumuraiId": 1327,
                                "refId": 1327,
                                "songNo": 1,
                                "thalam": "தருமபுரம்",
                                "country": "சோழநாடு காவிரித் தென்கரை",
                                "author": "திருஞானசம்பந்தர்",
                                "url": "https://shaivam.org/thirumurai/first-thirumurai/1327/thirugnanasambandhar-thevaram-thirudharmapuram-madar-madapidi",
                                "centerNo": "51",
                                "addon": "",
                                "createdAt": "2023-11-08T04:29:45.491Z",
                                "updatedAt": "2023-11-08T10:17:41.500Z",
                                "publishedAt": "2023-11-08T08:19:30.000Z",
                                "prevId": 1642,
                                "rawSong": "மாதர் மடப்பிடி யும்மட வன்னமு மன்னதோர்\n  நடை யுடைம் மலை மகள் துணையென மகிழ்வர்\nபூதவி னப்படை நின்றிசை பாடவு மாடுவர்\n  அவர் படர் சடை நெடு முடியதொர் புனலர்\nவேதமொ டேழிசை பாடுவ ராழ்கடல் வெண்டிரை \n  இரைந் நுரை கரை பொரு துவிம்மி நின்றயலே\nதாதவிழ் புன்னை தயங்கு மலர்ச்சிறை வண்டறை\n  எழில் பொழில் குயில் பயில் தருமபு ரம்பதியே.",
                                "type": null,
                                "searchRawSong": "\"மாதர்மடப்பிடியும்மடவன்னமுமன்னதோர்\\nநடையுடைம்மலைமகள்துணையெனமகிழ்வர்\\nபூதவினப்படைநின்றிசைபாடவுமாடுவர்\\nஅவர்படர்சடைநெடுமுடியதொர்புனலர்\\nவேதமொடேழிசைபாடுவராழ்கடல்வெண்டிரை\\nஇரைந்நுரைகரைபொருதுவிம்மிநின்றயலே\\nதாதவிழ்புன்னைதயங்குமலர்ச்சிறைவண்டறை\\nஎழில்பொழில்குயில்பயில்தருமபுரம்பதியே.\"",
                                "locale": "en"
                            }
                        },
                        {
                            "id": 70921,
                            "attributes": {
                                "titleNo": "136",
                                "title": "01.136 மாதர் மடப்பிடி",
                                "pann": "யாழ்மூரி",
                                "audioUrl": "http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                                "thirumuraiId": 1327,
                                "refId": 1327,
                                "songNo": 2,
                                "thalam": "தருமபுரம்",
                                "country": "சோழநாடு காவிரித் தென்கரை",
                                "author": "திருஞானசம்பந்தர்",
                                "url": "https://shaivam.org/thirumurai/first-thirumurai/1327/thirugnanasambandhar-thevaram-thirudharmapuram-madar-madapidi",
                                "centerNo": "51",
                                "addon": "",
                                "createdAt": "2023-11-08T04:29:46.193Z",
                                "updatedAt": "2023-11-08T10:17:41.811Z",
                                "publishedAt": "2023-11-08T08:19:30.000Z",
                                "prevId": 1643,
                                "rawSong": "பொங்கு நடைப்புக லில்விடை யாமவ ரூர்திவெண்\n  பொடி யணி தடங் கொள்மார் புபூண நூல்புரள\nமங்குலி டைத்தவ ழும்மதி சூடுவ ராடுவர் \n  வளங் கிளர் புன லரவம் வைகிய சடையர்\nசங்கு கடற்றிரை யாலுதை யுண்டுச ரிந்திரிந் \n  தொசிந் தசைந் திசைந்து சேரும் வெண்மணற் குவைமேல்\nதங்கு கதிர்மணி நித்தில மெல்லிரு ளொல்கநின்\n  றிலங் கொளிந் நலங் கெழிற் றருமபு ரம்பதியே.",
                                "type": null,
                                "searchRawSong": "\"பொங்குநடைப்புகலில்விடையாமவரூர்திவெண்\\nபொடியணிதடங்கொள்மார்புபூணநூல்புரள\\nமங்குலிடைத்தவழும்மதிசூடுவராடுவர்\\nவளங்கிளர்புனலரவம்வைகியசடையர்\\nசங்குகடற்றிரையாலுதையுண்டுசரிந்திரிந்\\nதொசிந்தசைந்திசைந்துசேரும்வெண்மணற்குவைமேல்\\nதங்குகதிர்மணிநித்திலமெல்லிருளொல்கநின்\\nறிலங்கொளிந்நலங்கெழிற்றருமபுரம்பதியே.\"",
                                "locale": "en"
                            }
                        },
                        {
                            "id": 70922,
                            "attributes": {
                                "titleNo": "136",
                                "title": "01.137 மாதர் மடப்பிடி",
                                "pann": "யாழ்மூரி",
                                "audioUrl": "http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                                "thirumuraiId": 1327,
                                "refId": 1327,
                                "songNo": 3,
                                "thalam": "தருமபுரம்",
                                "country": "சோழநாடு காவிரித் தென்கரை",
                                "author": "திருஞானசம்பந்தர்",
                                "url": "https://shaivam.org/thirumurai/first-thirumurai/1327/thirugnanasambandhar-thevaram-thirudharmapuram-madar-madapidi",
                                "centerNo": "51",
                                "addon": "",
                                "createdAt": "2023-11-08T04:29:47.122Z",
                                "updatedAt": "2023-11-08T10:17:42.097Z",
                                "publishedAt": "2023-11-08T08:19:30.000Z",
                                "prevId": 1644,
                                "rawSong": "விண்ணுறு மால்வரை போல்விடை யேறுவர் ஆறுசூ\n  டுவர் விரி சுரி யொளிகொள் தோடுநின் றிலங்கக்\nகண்ணுற நின்றொளி ருங்கதிர் வெண்மதிக் கண்ணியர்\n  கழிந் தவ ரிழிந் திடும் முடைதலை கலனாப்\nபெண்ணுற நின்றவர் தம்முரு வம்மயன் மால்தொழவ் \n  வரி வையைப் பிணைந் திணைந் தணைந்ததும் பிரியார்\nதண்ணிதழ் முல்லையொ டெண்ணிதழ் மௌவல் மருங்கலர்\n  கருங் கழிந் நெருங் குநற் றரும புரம்பதியே.",
                                "type": null,
                                "searchRawSong": "\"விண்ணுறுமால்வரைபோல்விடையேறுவர்ஆறுசூ\\nடுவர்விரிசுரியொளிகொள்தோடுநின்றிலங்கக்\\nகண்ணுறநின்றொளிருங்கதிர்வெண்மதிக்கண்ணியர்\\nகழிந்தவரிழிந்திடும்முடைதலைகலனாப்\\nபெண்ணுறநின்றவர்தம்முருவம்மயன்மால்தொழவ்\\nவரிவையைப்பிணைந்திணைந்தணைந்ததும்பிரியார்\\nதண்ணிதழ்முல்லையொடெண்ணிதழ்மௌவல்மருங்கலர்\\nகருங்கழிந்நெருங்குநற்றருமபுரம்பதியே.\"",
                                "locale": "en"
                            }
                        },
                        {
                            "id": 70923,
                            "attributes": {
                                "titleNo": "136",
                                "title": "01.136 மாதர் மடப்பிடி",
                                "pann": "யாழ்மூரி",
                                "audioUrl": "http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                                "thirumuraiId": 1327,
                                "refId": 1327,
                                "songNo": 4,
                                "thalam": "தருமபுரம்",
                                "country": "சோழநாடு காவிரித் தென்கரை",
                                "author": "திருஞானசம்பந்தர்",
                                "url": "https://shaivam.org/thirumurai/first-thirumurai/1327/thirugnanasambandhar-thevaram-thirudharmapuram-madar-madapidi",
                                "centerNo": "51",
                                "addon": "",
                                "createdAt": "2023-11-08T04:29:47.811Z",
                                "updatedAt": "2023-11-08T10:17:42.396Z",
                                "publishedAt": "2023-11-08T08:19:30.000Z",
                                "prevId": 1645,
                                "rawSong": "வாருறு மென்முலை நன்னுதல் ஏழையொ டாடுவர் \n  வளங் கிளர் விளங் குதிங் கள்வைகிய சடையர்\nகாருற நின்றல ரும்மலர்க் கொன்றை யங்கண்ணியர் \n  கடு விடை கொடி வெடிகொள் காடுறை பதியர்\nபாருற விண்ணுல கம்பர வப்படு வோரவர் \n  படு தலைப் பலி கொளல் பரிபவந் நினையார்\nதாருறு நல்லர வம்மலர் துன்னிய தாதுதிர் \n  தழை பொழின் மழைந் நுழை தருமபு ரம்பதியே.",
                                "type": null,
                                "searchRawSong": "\"வாருறுமென்முலைநன்னுதல்ஏழையொடாடுவர்\\nவளங்கிளர்விளங்குதிங்கள்வைகியசடையர்\\nகாருறநின்றலரும்மலர்க்கொன்றையங்கண்ணியர்\\nகடுவிடைகொடிவெடிகொள்காடுறைபதியர்\\nபாருறவிண்ணுலகம்பரவப்படுவோரவர்\\nபடுதலைப்பலிகொளல்பரிபவந்நினையார்\\nதாருறுநல்லரவம்மலர்துன்னியதாதுதிர்\\nதழைபொழின்மழைந்நுழைதருமபுரம்பதியே.\"",
                                "locale": "en"
                            }
                        },
                        {
                            "id": 70924,
                            "attributes": {
                                "titleNo": "136",
                                "title": "01.136 மாதர் மடப்பிடி",
                                "pann": "யாழ்மூரி",
                                "audioUrl": "http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                                "thirumuraiId": 1327,
                                "refId": 1327,
                                "songNo": 5,
                                "thalam": "தருமபுரம்",
                                "country": "சோழநாடு காவிரித் தென்கரை",
                                "author": "திருஞானசம்பந்தர்",
                                "url": "https://shaivam.org/thirumurai/first-thirumurai/1327/thirugnanasambandhar-thevaram-thirudharmapuram-madar-madapidi",
                                "centerNo": "51",
                                "addon": "",
                                "createdAt": "2023-11-08T04:29:48.427Z",
                                "updatedAt": "2023-11-08T10:17:42.686Z",
                                "publishedAt": "2023-11-08T08:19:30.000Z",
                                "prevId": 1646,
                                "rawSong": "நேரும வர்க்குண ரப்புகி லில்லைநெ டுஞ்சடைக் \n  கடும் புனல் படர்ந் திடம் படுவதொர் நிலையர்\nபேரும வர்க்கெனை யாயிரம் முன்னைப்பி றப்பிறப் \n  பிலா தவ ருடற் றடர்த்த பெற்றி யாரறிவார்\nஆரம வர்க்கழல் வாயதொர் நாகம ழஃகுறவ் \n  வெழுஃ கொழும் மலர் கொள்பொன் னிதழிநல் லலங்கல்\nதாரம வர்க்கிம வான்மகள் ஊர்வது போர்விடை\n  கடி படு செடி பொழிற் றருமபு ரம்பதியே.",
                                "type": null,
                                "searchRawSong": "\"நேருமவர்க்குணரப்புகிலில்லைநெடுஞ்சடைக்\\nகடும்புனல்படர்ந்திடம்படுவதொர்நிலையர்\\nபேருமவர்க்கெனையாயிரம்முன்னைப்பிறப்பிறப்\\nபிலாதவருடற்றடர்த்தபெற்றியாரறிவார்\\nஆரமவர்க்கழல்வாயதொர்நாகமழஃகுறவ்\\nவெழுஃகொழும்மலர்கொள்பொன்னிதழிநல்லலங்கல்\\nதாரமவர்க்கிமவான்மகள்ஊர்வதுபோர்விடை\\nகடிபடுசெடிபொழிற்றருமபுரம்பதியே.\"",
                                "locale": "en"
                            }
                        },
                    ]
                },
                { name: 'தக்கராகம்', songs: [] },
                { name: 'பழந்தக்கராகம்', songs: [] },
                { name: 'தக்கேசி', songs: [] },
                { name: 'குறிஞ்சி', songs: [] },
                { name: 'வியாழக்குறிஞ்சி', songs: [] },

            ]
        },
        {
            name: 'முதல்-திருமுறை2', chapters: '1.001 - 1.134',
            title: [
                { name: 'நட்டபாட2', songs: [] },
                { name: 'தக்கராகம2', songs: [] },
                { name: 'பழந்தக்கராகம2', songs: [] },
                { name: 'தக்கேசி2', songs: [] },
                { name: 'குறிஞ்சி2', songs: [] },
                { name: 'வியாழக்குறிஞ்சி2', songs: [] },

            ]
        },
        { name: 'முதல்-திருமுறை3', chapters: '1.001 - 1.134' },
        { name: 'முதல்-திருமுறை4', chapters: '1.001 - 1.134' },
        { name: 'முதல்-திருமுறை5', chapters: '1.001 - 1.134' },
        { name: 'முதல்-திருமுறை6', chapters: '1.001 - 1.134' },
        { name: 'முதல்-திருமுறை7', chapters: '1.001 - 1.134' },
    ]
    /* Get latest DB from the disk */
    const getSavedVersion = async () => {
        const savedData = await AsyncStorage.getItem('latestDB');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    };
    const [thrimurais, setThrimurais] = useState(list)
    const retrieveData = async () => {
        const databaselistquery = 'PRAGMA database_list'
        const categoryList = "SELECT * FROM category"
        const query = 'SELECT * FROM thirumurai_songs WHERE refId=1311';
        await database.transaction(tx => {
            tx.executeSql(categoryList, [], (_, results) => {
                let arr = []
                if (results?.rows?.length > 0) {
                    for (let i = 0; i < results?.rows?.length; i++) {
                        const tableName = results.rows.item(i);
                        console.log("Row data", tableName);
                        arr.push(tableName)
                    }
                } else {
                    console.log('No tables found.');
                }

                setThrimurais(arr)
                console.log("🚀 ~ file: ThrimuraiHeadingPage.js:221 ~ tx.executeSql ~ arr:", arr)
            })
        }, (error) => {
            console.error("error occured in fetching data", error);
        })
    };

    /* Get latest DB from the server */
    const getLatestVersion = async () => {
        const res = await fetch('http://192.168.1.2:3000/api/latest-db');
        const { data } = await res.json();
        /* Refresh the UI */
        setData(data);

        /* Save the data */
        console.log('Saving latest version...');
        await AsyncStorage.setItem('latestDB', JSON.stringify(data));
        console.log('Saved latest version.');
    };

    /* To compare two versions */
    const compareStr = (a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    };

    /* Callback for the update button */
    const handleFetchUpdate = async () => {
        setLoading(true);
        let updateAvailable = false;

        /* Check the latest version */
        const res = await fetch('http://192.168.1.2:3000/api/latest-version');
        const { version } = await res.json();

        /* Check existing version */
        const savedVersion = await AsyncStorage.getItem('version');
        if (savedVersion) {
            console.log('Saved Version:', savedVersion);
            console.log('Latest Version:', version);
            setLoadingText(`Latest: ${version}, Saved: ${savedVersion}`);
            /* Check if a later version is available */
            if (compareStr(savedVersion, version) === -1) {
                updateAvailable = true;
            }
        } else {
            console.log('There is no saved version');
            updateAvailable = true;
        }

        if (updateAvailable) {
            setLoadingText('Fetching latest version ...');
            await getLatestVersion();
            await AsyncStorage.setItem('version', version);
        }
        setLoading(false);
        setLoadingText('Loading ...');
    };
    const headerData = [
        { name: 'Panmurai', Icon: <MusicIcon /> },
        { name: 'Thalamurai', Icon: <Icon2 /> },
        { name: 'Akarathi', Icon: <Icon2 /> },
        { name: 'Varalatrumurai', Icon: <Icon2 /> },
    ]

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
    const renderCategories = (item, index) => {
        return (
            <>
                {
                    selectedHeader.name == item.name ?
                        <TouchableOpacity style={styles.selectedHeaderBox} onPress={() => setSelectedheader(item)}>
                            {item.Icon}
                            <Text style={[styles.headerText, { color: 'white', fontWeight: '700' }]}>{item.name}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.headerBox} onPress={() => setSelectedheader(item)}>
                            {item.Icon}
                            <Text style={styles.headerText}>{item.name}</Text>
                        </TouchableOpacity>
                }
            </>
        )
    }
    const renderContents = (item, index) => {
        // console.log("🚀 ~ file: ThrimuraiHeadingPage.js:325 ~ renderContents ~ item:", thrimurais)
        return (
            <>
                <View style={styles.chapterBox}>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={styles.chapterNameTexts}>{item.name}</Text>
                        <Text style={styles.chapterTexts}>{item.chapters}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedTitle(index)}>
                        <Icon name='add' size={24} />
                    </TouchableOpacity>
                </View>
                {
                    selectedTitle == index &&
                    <RenderTitle data={item} />

                    //    <View style={{ marginTop: 10 }}>
                    //        <FlatList data={item?.title} renderItem={({ item, index }) => renderTitle(item, index)} />
                    //    </View>
                }

            </>
        )
    }
    const renderTitle = (item, index) => (
        <>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 25, height: 40, alignItems: 'center' }}>
                <Text style={selectedChapter == index ? [styles.titleText, { color: '#C1554E' }] : styles.titleText}>{item.name}</Text>
                <TouchableOpacity onPress={() => setSelectedChapter(index)}>
                    {

                        <Icon name={selectedChapter == index ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} size={24} />
                    }
                </TouchableOpacity>
            </View>
            {
                selectedChapter == index &&
                <View style={{ marginBottom: 10 }}>
                    {/* <FlatList renderItem={({ item, index }) => renderAudios(item, index)} data={item.songLyrics} /> */}
                    <RenderAudios songs={item.songLyrics} navigation={navigation} />
                </View>
            }

        </>
    )
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
            {/* <View> */}
            <BackButton navigation={navigation} color={true} middleText={'தோடுடைய செவியன்'} />
            <View style={styles.mainContainer}>
            </View>
            <View>
                <SearchInput color={true} placeholder={'Search for anything (Eg - தோடுடைய செவியன்) '} />
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 10, height: 50 }}
                    data={headerData}
                    renderItem={({ item, index }) => renderCategories(item, index)}
                    horizontal />
                {
                    selectedHeader.name == 'Akarathi' ?
                        <View style={{ marginTop: 10 }}>
                            <RenderAudios songs={ThrimuraisListData[0]?.title[0]?.songLyrics} navigation={navigation} />
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
    main: { backgroundColor: 'white', flex: 1 },
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