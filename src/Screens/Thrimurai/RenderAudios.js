import React, { useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import MusicIcon1 from "../../assets/Images/music 1.svg"
import { RouteTexts } from '../../navigation/RouteText'
import SQLite from 'react-native-sqlite-storage';

const RenderAudios = ({ navigation, songs, data }) => {
    const database = SQLite.openDatabase({ name: 'main.db', });
    console.log("🚀 ~ file: RenderAudios.js:7 ~ RenderAudios ~ data:", data)
    const [audioData, setAudioData] = useState([])
    useEffect(() => {
        getDtataFromSql()
    }, [])
    const getDtataFromSql = async () => {
        const query = 'SELECT * FROM thirumurai_songs WHERE refId=1311';
        await database.transaction(tx => {

            tx.executeSql(query, [], (_, results) => {
                let arr = []
                if (results?.rows?.length > 0) {
                    for (let i = 0; i < results?.rows?.length; i++) {
                        const tableName = results.rows.item(i);
                        console.log("Row data", tableName);
                        arr.push(tableName)
                        setAudioData(arr)
                    }
                } else {
                    console.log('No tables found.');
                }
            })
        }, (error) => {
            console.error("error occured in fetching data", error);
        })
    }
    const renderAudios = (item, index) => (
        <Pressable style={{ alignItems: 'center', marginVertical: 5, width: '100%', paddingHorizontal: 20, flexDirection: 'row' }}
            onPress={() => navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                data: item
            })}>
            <View style={{ backgroundColor: '#F2F0F8', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                <MusicIcon1 />
            </View>
            <Text style={{ marginHorizontal: 10, fontSize: 12, fontFamily: 'AnekTamil-Regular', fontWeight: '500' }}>{item.attributes?.title}</Text>
        </Pressable>
    )
    return (
        <View>
            <FlatList renderItem={({ item, index }) => renderAudios(item, index)} data={audioData} />
        </View>
    )
}

export default RenderAudios