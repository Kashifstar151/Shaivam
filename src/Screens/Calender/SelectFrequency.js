import React, { useContext } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import { ThemeContext } from "../../Context/ThemeContext";
import { colors } from "../../Helpers";

const SelectFrequency = ({ selectedFrequecy, setSelectedFrequecy, closeBottomSheet }) => {
    const theme = useContext(ThemeContext)
    const type = [
        { name: 'Weekly', id: 1 },
        { name: 'Monthly', id: 2 }
    ]
    const selectionHandler = (item) => {
        setSelectedFrequecy(item)
        closeBottomSheet
    }
    return (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'black', marginVertical: 10 }}>Select freuency of event</Text>
            <FlatList data={type} renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => selectionHandler(item)}
                    style={styles.dropDown}
                >
                    <Text style={{ fontFamily: 'Mulish-Regular', color: theme.textColor }}>
                        {item?.name}
                    </Text>
                    <View
                        style={selectedFrequecy?.name == item?.name ? [styles.iconContainer, { backgroundColor: colors.commonColor }] : styles.iconContainer}
                    >
                        <Feather name="check" size={14} color={selectedFrequecy?.name == item?.name ? 'white' : '#222222'} />
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
export default SelectFrequency;
