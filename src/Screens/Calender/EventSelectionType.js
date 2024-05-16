import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import ButtonComp from "../Temples/Common/ButtonComp";

const EventSelectionType = ({ category, setCategory, bottomSheetRef }) => {
    console.log("🚀 ~ EventSelectionType ~ eventCaetgory:", category)
    const [eventCaetgory, setEventCategory] = useState(null)
    const data = [
        { name: 'Festival' },
        { name: 'Concert' },
        { name: 'Discource' },
        { name: 'Pranayam / Recitation' },
        { name: 'Uzhavarappani' },
        { name: 'Others' },
    ]
    const rednerItem = (item, index) => (
        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'rgba(34, 34, 34, 1)', fontFamily: 'Mulish-Regular' }}>{item?.name}</Text>

            <TouchableOpacity onPress={() => {
                setEventCategory(item?.name)
                setCategory(item?.name)
                bottomSheetRef?.current?.close()
            }}
                style={eventCaetgory == item?.name ? [styles.texIContContainer, { backgroundColor: '#C1554E' }] : styles.texIContContainer}>
                <Icon name='check' size={16} color={'#FFFFFF'} />
            </TouchableOpacity>
        </View>
    )
    return (
        <View style={{ paddingHorizontal: 0 }}>
            <Text style={styles.headingText}>Select Event Category</Text>
            <FlatList contentContainerStyle={{ paddingHorizontal: 20 }} data={data} renderItem={({ item, index }) => (
                rednerItem(item, index)
            )} />

        </View>
    );
};
export const styles = StyleSheet.create({
    texIContContainer: { justifyContent: 'center', alignItems: 'center', height: 24, width: 24, borderColor: 'rgba(119, 119, 119, 1)', borderWidth: 1, borderRadius: 12 },
    headingText: { marginHorizontal: 20, fontFamily: 'Lora-Bold', color: 'rgba(34, 34, 34, 1)', marginVertical: 15, fontSize: 16 }
})

export default EventSelectionType;
