import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import { ThemeContext } from "../../Context/ThemeContext";
import { colors } from "../../Helpers";
import { RouteTexts } from "../../navigation/RouteText";

const SubmitEnteries = ({ setSelectedEvent, selectedEvent, closeSheet, navigation }) => {
    const theme = useContext(ThemeContext)
    const type = [
        { name: 'Add an event', id: 1 },
        { name: 'Sends a Festival video', id: 2 }
    ]
    const selectionHandler = (item) => {
        setSelectedEvent(item)
        if (item?.name == 'Add an event') {
            navigation.navigate(RouteTexts.VIRTUAL_EVENT_CREATE)
        }
        closeSheet
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
                        style={selectedEvent?.name == item?.name ? [styles.iconContainer, { backgroundColor: colors.commonColor }] : styles.iconContainer}
                    >
                        <Feather name="check" size={14} color={selectedEvent?.name == item?.name ? 'white' : '#222222'} />
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
export default SubmitEnteries;