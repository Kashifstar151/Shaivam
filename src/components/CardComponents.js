import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'

const CardComponents = () => {
    const data = [
        { text: "Sacred Texts", description: "Listed to all shiva related audios here", id: 1 },
        { text: "Shaivam media", description: "Listed to all shiva related audios here", id: 2 },
        { text: "More Features", description: "Listed to all shiva related audios here", id: 3 },

    ]
    const renderItem = (item, index) => {
        return (
            <View style={{ width: Dimensions.get('window').width - 70, backgroundColor: 'red', height: 200, borderRadius: 10, marginLeft: 10 }}>
                <Text>{item?.text}</Text>
            </View>
        )
    }
    return (
        <View style={{ paddingLeft: 0 }}>
            <FlatList horizontal renderItem={({ item, index }) => renderItem(item, index)} data={data} />
        </View>
    )
}

export default CardComponents