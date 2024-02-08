import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { View } from 'react-native'

const Fav = () => {

    useEffect(() => {
        fetchAndDisplayDownloads()
    }, [])
    const fetchAndDisplayDownloads = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const metadataKeys = keys.filter(key => key.startsWith('downloaded:'));
            const metadata = await AsyncStorage.multiGet(metadataKeys);
            const parsedMetadata = metadata.map(([key, value]) => JSON.parse(value));
            console.log("🚀 ~ fetchAndDisplayDownloads ~ parsedMetadata:", parsedMetadata)

            // Now `parsedMetadata` contains all of your audio files' metadata
            // You can use this data to render your downloads page
        } catch (e) {
            console.error('Failed to fetch metadata', e);
        }
    };
    return (
        <View>

        </View>
    )
}

export default Fav