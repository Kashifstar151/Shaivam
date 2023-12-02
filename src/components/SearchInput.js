import React from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import { colors } from "../Helpers"
const SearchInput = ({ placeholder, setState, state, color }) => {
    return (
        <View style={color ? [styles.inputcontainer, { backgroundColor: '#F3F3F3' }] : styles.inputcontainer}>
            <Icon name='search' size={28} color={color ? '#777777' : colors.grey1} />
            <TextInput placeholder={placeholder} onChangeText={(e) => setState(e)} placeholderTextColor={color ? '#777777' : '#FF9D9D'} value={state} style={{ fontSize: 12, paddingHorizontal: 5 }} />
        </View>
    )
}
export const styles = StyleSheet.create({
    inputcontainer: { marginHorizontal: 15, borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#8F3630', width: Dimensions.get('window').width - 30, height: 50, marginVertical: 15, flexDirection: 'row', alignItems: 'center' }
})
export default SearchInput