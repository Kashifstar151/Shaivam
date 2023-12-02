import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import SQLite from 'react-native-sqlite-storage';
import { colors } from '../../../Helpers';

const RenderTitle = ({ data }) => {
    let key = true
    const database = SQLite.openDatabase({ name: key ? 'SongsData.db' : 'main.db', createFromLocation: 1 });
    // const database = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: 1 });
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [TitleData, setTitleData] = useState([])

    useEffect(() => {
        getDtataFromSql()
    }, [])
    const getDtataFromSql = async () => {
        const query = `SELECT * FROM thirumurais WHERE fkTrimuria=${data.prevId}`
        await database.transaction(tx => {

            tx.executeSql(query, [], (_, results) => {
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
                setTitleData(arr)
            })
        }, (error) => {
            console.error("error occured in fetching data", error);
        })
    }
    const renderTitle = (item, index) => (
        <>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 25, alignItems: 'center', paddingBottom: 5, borderBottomColor: colors.grey3, borderBottomWidth: 1, }}>
                <View style={{ width: '95%' }}>

                    <Text style={selectedChapter == index ? [styles.titleText, { color: '#C1554E' }] : styles.titleText}>{item?.Thirumurai_title}</Text>
                </View>
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
                    {/* <RenderAudios songs={item.songLyrics} navigation={navigation} /> */}
                </View>
            }

        </>
    )
    return (
        <View style={{ marginTop: 10 }}>
            <FlatList data={TitleData} renderItem={({ item, index }) => renderTitle(item, index)} />
        </View>
    )
}
export const styles = StyleSheet.create({
    titleText: { fontFamily: 'AnekTamil-Regular', fontSize: 14, fontWeight: '500' }
})
export default RenderTitle