import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../Context/ThemeContext";
import { colors } from "../../Helpers";
import { setInputValue } from "../../store/features/Calender/FormSlice";

const SelectWeek = ({ setSelectedWeek, selectedWeek, closeBottomSheet }) => {
    const theme = useContext(ThemeContext)
    const dispatch = useDispatch()
    const inputKey = 'Days'
    const weekData = [
        { name: 'one', id: 1 },
        { name: 'two', id: 2 },
        { name: 'three', id: 3 },
        { name: 'four', id: 4 },
        { name: 'Last', id: 5 },
        { name: 'None', id: 5 },

        // { name: 'Sat', id: 6 },
        // { name: 'Sun', id: 7 },

    ]
    const selectionHandler = (item) => {
        setSelectedWeek(item)
        dispatch(setInputValue({ inputKey, inputValue: item?.name }))
        closeBottomSheet
    }
    return (
        <View style={{ paddingHorizontal: 20, marginTop: 20, paddingBottom: 50 }}>
            <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'black', marginVertical: 10 }}>Select freuency of event</Text>
            <FlatList data={weekData} renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => selectionHandler(item)}
                    style={styles.dropDown}
                >
                    <Text style={{ fontFamily: 'Mulish-Regular', color: theme.textColor }}>
                        {item?.name}
                    </Text>
                    <View
                        style={selectedWeek?.name == item?.name ? [styles.iconContainer, { backgroundColor: colors.commonColor }] : styles.iconContainer}
                    >
                        <Feather name="check" size={14} color={theme.textColor} />
                    </View>
                    {/* <View style={{ height: 2, width: Dimensions.get('window').width - 20, backgroundColor: '#fff' }} /> */}
                </TouchableOpacity>
            )} />
        </View>
    );
};
export const styles = StyleSheet.create({
    dropDown: {
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomColor: colors.grey3,
        borderBottomWidth: 1
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 20,
        height: 20,
        borderColor: 'black',
        borderWidth: 1,
    }
})
export default SelectWeek;
