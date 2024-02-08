import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import BackButton from '../../components/BackButton'
import Background from '../../components/Background'
import SearchInput from '../../components/SearchInput'
import { ThemeContext } from '../../Context/ThemeContext'
import { listfavAudios } from '../../Databases/AudioPlayerDatabase'
import MusicContainer from '../../../assets/Images/Frame 83.svg';
import { RFValue } from 'react-native-responsive-fontsize'

const Fav = () => {
    const { theme } = useContext(ThemeContext);
    const [selecetedHeader, setSelectedHeader] = useState('Favourites')
    const [favList, setFavList] = useState([])
    const [downloadList, setDownloadList] = useState([])
    useEffect(() => {
        fetchAndDisplayDownloads()
        listfavAudios(callbacks => {
            console.log("🚀 ~ useEffect ~ callbacks:", callbacks)
            setFavList(callbacks)
        })
    }, [])
    const header = [
        { name: 'Favourites', icon: <MaterialIcons name='heart-outline' size={24} color={theme.searchContext.unSelected.textColor} /> },
        { name: 'Special Playlist', icon: <Icon name='bookmark-outline' size={24} color={theme.searchContext.unSelected.textColor} /> },
        { name: 'Offline Downloads', icon: <Icon name='download' size={24} color={theme.searchContext.unSelected.textColor} /> },
    ]
    const fetchAndDisplayDownloads = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const metadataKeys = keys.filter(key => key.startsWith('downloaded:'));
            const metadata = await AsyncStorage.multiGet(metadataKeys);
            const parsedMetadata = metadata.map(([key, value]) => JSON.parse(value));
            console.log("🚀 ~ fetchAndDisplayDownloads ~ parsedMetadata:", parsedMetadata)
            setDownloadList(parsedMetadata)
            // Now `parsedMetadta` contains all of your audio files' metadata
            // You can use this data to render your downloads page
        } catch (e) {
            console.error('Failed to fetch metadata', e);
        }
    };
    const renderSong = (item, index) => (
        <Pressable style={styles.listContainer}>
            <View style={styles.listInnerContainer}>
                <MusicContainer />
                <View style={{ paddingHorizontal: 10, width: '75%', }}>
                    <Text
                        style={{
                            fontSize: RFValue(10),
                            fontWeight: '600',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: RFValue(8),
                            fontWeight: '400',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.title}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginRight: 10 }}>
                    <Icon name="share" size={22} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="delete" size={22} />
                </TouchableOpacity>
            </View>
        </Pressable>
    )
    return (
        <ScrollView>
            <Background>
                <View style={{ marginVertical: 15 }}>
                    <BackButton middleText={'Favourites'} color={true} />
                </View>
                <SearchInput placeholder={'Search for your favourties (Eg - தோடுடைய)'} />
                <FlatList contentContainerStyle={{ marginVertical: 10, }} horizontal data={header} renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => setSelectedHeader(item.name)} style={selecetedHeader == item?.name ? [styles.headerContainer, { backgroundColor: theme.searchContext.selected.bgColor }] : [styles.headerContainer, { backgroundColor: theme.searchContext.unSelected.bgColor }]}>
                        {item?.icon}
                        <Text style={selecetedHeader == item?.name ? [styles.headingText, { color: theme.searchContext.selected.textColor }] : [styles.headingText, { color: theme.searchContext.unSelected.textColor }]}>{item?.name}</Text>
                    </TouchableOpacity>
                )} />
            </Background>
            <FlatList data={selecetedHeader == 'Favourites' ? favList : downloadList} renderItem={({ item, index }) => renderSong(item, index)} />
        </ScrollView>
    )
}
export const styles = StyleSheet.create({
    headingText: { marginHorizontal: 5, fontSize: 12, fontFamily: 'Mulish-Regular' },
    headerContainer: { marginLeft: 10, paddingHorizontal: 12, height: 40, borderRadius: 25, alignItems: 'center', flexDirection: 'row' },
    listContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    listInnerContainer: {
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
    }

})
export default Fav