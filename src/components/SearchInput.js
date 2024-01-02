import React from 'react'
import { Alert, Dimensions, StyleSheet, TextInput, View } from 'react-native'
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import { colors } from "../Helpers"
const SearchInput = ({ placeholder, setState, state, color, setOnFocus }) => {
    return (
        <View
            style={
                color
                    ? [styles.inputcontainer, { backgroundColor: '#F3F3F3' }]
                    : styles.inputcontainer
            }
        >
            <Icon name="search" size={28} color={color ? '#777777' : colors.grey1} />
            <TextInput
                onBlur={() => setOnFocus(false)}
                onFocus={() => setOnFocus()}
                placeholder={placeholder}
                onChangeText={(e) => setState(e)}
                placeholderTextColor={colors.searchBox().textColor}
                value={state}
                style={{ fontSize: 12, paddingHorizontal: 5, color: '#FF9D9D' }}
            />
        </View>
    );
}
export const styles = StyleSheet.create({
    inputcontainer: {
        marginHorizontal: 15,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.searchBox().bgColor,
        width: Dimensions.get('window').width - 30,
        height: 55,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default SearchInput