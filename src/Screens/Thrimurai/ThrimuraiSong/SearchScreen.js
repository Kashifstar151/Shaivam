import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Background from '../../../components/Background'
import HeaderWithTextInput from '../../../components/HeaderWithTextInput'
import CenterIcon from "../../../assets/Images/Vector (3).svg"
import { getSqlData } from '../../Database'

const SearchScreen = ({ navigation, route }) => {
    const { thrimurais } = route?.params
    const [searchText, setSearchText] = useState('தேவாரம்')
    const [searchResult, setSearchedResult] = useState([])
    const [onFocus, setOnFocus] = useState(false)
    const [rawSongs, setRawSongs] = useState(null)
    useEffect(() => {
        getDataFromSql()

    }, [])
    const getDataFromSql = (e) => {
        // setSearchText(e)
        getSqlData(`SELECT * FROM thirumurais WHERE search_thirumurai_title LIKE '%${searchText}%' ORDER BY Thirumurai_title  ASC LIMIT 10 OFFSET 0 ; `, callbacks => {
            setSearchedResult(callbacks)
        })
        getSqlData(`SELECT * FROM thirumurai_songs WHERE song_no LIKE '%${searchText}%' LIMIT 10 OFFSET 0;`, callbacks => {
            setRawSongs(callbacks)
        })
    }
    const highlight = (item, index, key) => {
        // console.log("🚀 ~ file: SearchScreen.js:28 ~ highlight ~ item:", item)
        // const regex = new RegExp(`\\b${searchText}\\b`, 'gi');

        const parts = key == 'title' ? item?.Thirumurai_title?.split(' ') : item?.rawSong?.split(' ');
        // console.log("🚀 ~ file: SearchScreen.js:31 ~ highlight ~ regex:", parts)
        // const parts2 = item?.rawSong.split(regex);
        // let parts = key == 'title' ? item?.Thirumurai_title?.split(' ') : item?.rawSong
        return (
            <View style={{ flexDirection: 'row', maxWidth: Dimensions.get('window').width - 30, flexWrap: 'wrap', }}>
                {key == 'title' ?
                    parts?.map((res, i) => (
                        <View style={res == searchText ? { flexDirection: 'row', backgroundColor: 'yellow', } : null}>
                            <Text style={res == searchText ? [styles.titleText, { backgroundColor: 'yellow' }] : [styles.titleText]}>{res}</Text>
                        </View>
                    )
                    ) : parts?.map((res, i) => (
                        <View style={res == searchText ? { flexDirection: 'row', backgroundColor: 'yellow' } : null}>
                            <Text style={res == searchText ? [styles.titleText, { fontWeight: '500', backgroundColor: 'yellow' }] : [styles.titleText, { fontWeight: '500' }]}>{res}</Text>
                        </View>
                    )
                    )}
            </View>
        )
    }


    const renderResult = (item, index, key) => {
        return (
            <Pressable style={{ marginVertical: 10 }} >
                {
                    key == 'title' ? null :
                        <Text>Lyrics</Text>
                }
                {highlight(item, index, key)}
                {
                    key !== 'title' ? null :
                        <Text>सम्पूर्ण ऋग्वेद पारायणम् Complete ...</Text>
                }
                {/* <Text>सम्पूर्ण ऋग्वेद पारायणम् Complete ...</Text> */}
            </Pressable>
        )
    }
    return (
        <View style={styles.main}>
            <Background>
                <HeaderWithTextInput placeholder={'Search for any( முதல்-திருமுறை )'} navigation={navigation} setState={(e) => getDataFromSql(e)} state={searchText} setOnFocus={setOnFocus} />
                <View style={{ paddingHorizontal: 20, height: 50, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ color: 'white' }}>Search In -</Text>
                    <FlatList showsHorizontalScrollIndicator={false} horizontal data={thrimurais} renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ marginLeft: 5, backgroundColor: '#8F3630', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                            <Text style={{ color: '#FF9D9D', fontFamily: 'Mulish-Regular' }}>{`Thrimurai ${index + 1}`}</Text>
                        </TouchableOpacity>
                    )} />
                </View>
            </Background>
            {
                searchResult?.length > 0 ?
                    <ScrollView style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <Text style={styles.searchresult}>Search Result({searchResult?.length})</Text>
                        <FlatList key={item => item?.id} contentContainerStyle={{ marginTop: 10 }} data={searchResult} renderItem={({ item, index }) => renderResult(item, index, 'title')} />
                        <FlatList contentContainerStyle={{ marginTop: 10 }} data={rawSongs} renderItem={({ item, index }) => renderResult(item, index, 'rawSong')} />
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CenterIcon />
                        <Text style={{ color: '#777777', fontFamily: 'Mulish-Regular' }}>Search for any Thirumurai here</Text>
                    </View>
            }
        </View>
    )
}
export const styles = StyleSheet.create({
    main: { flex: 1 },
    titleText: { fontFamily: 'AnekTamil-Bold', fontSize: 14, color: 'black', fontWeight: '700' },
    searchresult: { fontSize: 18, color: '#222222', fontFamily: 'Lora-Bold' }
})

export default SearchScreen