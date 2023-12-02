import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BackButton from '../../../components/BackButton'
import Background from '../../../components/Background'
import Header from '../../../components/Header'
import SearchInput from '../../../components/SearchInput'
import LinearGradient from 'react-native-linear-gradient';
import YellowCircle from "../../../../assets/Images/Ellipse 2.svg"
import YellowCircle2 from "../../../../assets/Images/Ellipse 4.svg"
import RedCircle from "../../../../assets/Images/Ellipse 2 (1).svg"
import RedCircle2 from "../../../../assets/Images/Ellipse 4 (1).svg"
import GreenCircle from "../../../../assets/Images/Ellipse 2 (2).svg"
import GreenCircle2 from "../../../../assets/Images/Ellipse 4 (2).svg"
import GradientContainer from '../../../components/GradientContainer'
import BookIcon from "../../../../assets/Images/Vector.svg"
import MusicContainer from "../../../../assets/Images/Frame 83.svg"
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import { RouteTexts } from '../../../navigation/RouteText'
import { JSONData } from '../../../../output.js'
import BackgroundService from 'react-native-background-actions';
import { attachDb, StoreData } from '../../Database'
import SQLite from 'react-native-sqlite-storage';

const ThrimuraiList = ({ navigation }) => {
    const [searchText, setSearchText] = useState(null)
    const [thrimurais, setThrimurais] = useState([])
    // const database = SQLite.openDatabase({ name: '/storage/emulated/0/Android/data/com.shaivam/files/Thrimurai/thirumuraiData.db', createFromLocation: 1 });
    const database = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: 1 });
    useEffect(() => {

    }, [])

    useEffect(() => {
        // if (selectedHeader == 'Panmurai') {
        retrieveData()
        // }
    }, []);
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
                // console.log("🚀 ~ file: ThrimuraiHeadingPage.js:221 ~ tx.executeSql ~ arr:", arr)
            })
        }, (error) => {
            console.error("error occured in fetching data at route", error);
        })
    };
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    // You can do anything in your task such as network requests, timers and so on,
    // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
    // React Native will go into "paused" mode (unless there are other tasks running,
    // or there is a foreground app).
    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' + i });
                await sleep(delay);
            }
        });
    };
    const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 1000,
        },
    };

    const startNotification = async () => {

        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' }); // Only Android, iOS will ignore this call
    }
    // iOS will also run everything here in the background until .stop() is called
    const stopNotification = async () => {
        await BackgroundService.stop();
    }

    const data = [
        { id: 1, songName: 'Ashtakam-1 Adhyayam-1', description: 'सम्पूर्ण ऋग्वेद पारायणम् Complete ...' },
        { id: 2, songName: 'Ashtakam-2 Adhyayam-2', description: 'सम्पूर्ण ऋग्वेद पाराणम् Complete ...' },
        { id: 3, songName: 'Ashtakam-2 Adhyayam-2', description: 'सम्पूर्ण ऋग्वेद पाराणम् Complete ...' },
    ]
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <Background>
                <View style={{ flex: 1, marginTop: 0 }}>
                    <BackButton firstText={'Thrimurais'} />
                    <View style={styles.boxCommon}>
                        <SearchInput setState={setSearchText} state={searchText} placeholder={'Search for anything (Eg - தோடுடைய செவியன்) '} />
                    </View>
                </View>
            </Background>
            <View style={{ paddingHorizontal: 10 }}>
                <Pressable style={styles.boxCommon} onPress={() => navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                    page: 1,
                    list: thrimurais.slice(0, 7)
                })}>
                    <GradientContainer Icon={<BookIcon />} name={`முதல்-திருமுறை(1 - 7)`} colors={['#FEE8B3', '#FEE199']} RightImage={<YellowCircle />} LeftImage={<YellowCircle2 />} />
                </Pressable>
                <Pressable style={styles.boxCommon} onPress={() => navigation.navigate(RouteTexts.THIRIMURAI_HEADING, {
                    page: 2,
                    list: thrimurais.slice(7, 14)
                })}>
                    <GradientContainer Icon={<BookIcon />} name={'முதல்-திருமுறை (8-14)'} colors={['#E5B8B5', '#FD9991']} RightImage={<RedCircle />} LeftImage={<RedCircle2 />} />
                </Pressable>
                <Pressable style={styles.boxCommon} onPress={startNotification}>
                    <GradientContainer Icon={<BookIcon />} colors={['#AFD9BB', '#60B278']} RightImage={<GreenCircle />} LeftImage={<GreenCircle2 />} />
                </Pressable>
                <View style={styles.boxCommon}>
                    <Text style={styles.playlistHeading}>Recently Playlist</Text>
                    <FlatList data={data} renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ paddingHorizontal: 0, flexDirection: 'row', alignItems: 'center' }}>
                                <MusicContainer />
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', fontFamily: 'Mulish-Regular' }}>{item.songName}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: 'Mulish-Regular' }}>{item.description}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={stopNotification}>
                                <Icon name='more-vert' size={22} />
                            </TouchableOpacity>
                        </View>
                    )} />
                </View>
            </View>
        </View>

    )
}
export const styles = StyleSheet.create({
    boxCommon: { marginTop: 10 },
    playlistHeading: { fontFamily: 'lora-regular', fontWeight: '700', fontSize: 18 }
})
export default ThrimuraiList