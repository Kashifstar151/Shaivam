import React from 'react'
import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { colors } from '../../Helpers'

const ChooseLanguage = ({ selected, setSelected }) => {
    const language = [
        { name: 'English', isSelected: false },
        { name: 'Hindi', isSelected: false },
        { name: 'Malayalam', isSelected: false },
        { name: 'Kannada', isSelected: false },
        { name: 'Tamil', isSelected: false },
        { name: 'Marati', isSelected: false },
    ]
    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.headingText}>Select Your Language</Text>
                <Text style={styles.descriptionText}>Changes will be made across the app</Text>
            </View>
            <FlatList contentContainerStyle={{ marginTop: 10 }} data={language} renderItem={({ item, index }) => (
                <Pressable style={styles.list}>
                    <Text style={styles.listText}>{item.name}</Text>
                    <TouchableOpacity style={selected?.name == item.name ? styles.selectView : styles.unSelectedView} onPress={() => setSelected(item)}>
                        <Icon name='check' color={selected?.name == item.name ? 'white' : '#777777'} size={12} />
                    </TouchableOpacity>
                </Pressable>
            )
            } />
        </View >
    )
}
export const styles = StyleSheet.create({
    headingText: { fontFamily: 'Lora-SemiBold', color: '#222222', fontSize: 16 },
    descriptionText: { fontFamily: 'Mulish-Bold', fontSize: 12 },
    list: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.grey3, flexDirection: 'row', justifyContent: 'space-between' },
    listText: { fontFamily: 'Mulish-Bold', fontSize: 14, color: 'black', marginHorizontal: 10 },
    selectView: { marginHorizontal: 10, backgroundColor: '#C1554E', height: 20, width: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    unSelectedView: { marginHorizontal: 10, borderColor: '#777777', borderWidth: 2, height: 20, width: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }
})
export default ChooseLanguage