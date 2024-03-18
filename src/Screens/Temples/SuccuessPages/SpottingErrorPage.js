import { BlurView } from "@react-native-community/blur";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import { ThemeContext } from "../../../Context/ThemeContext";
import { RouteTexts } from "../../../navigation/RouteText";
import SelectErrorPage from "./SelectErrorPage";


const SpottingErrorPage = ({ setModalVisible, navigation }) => {
    const [selectedMessage, setSelectedMessage] = useState(null)
    const theme = useColorScheme(ThemeContext)
    const [showSubmitPage, setShowSubmit] = useState(false)
    const errormessages = [
        { id: 1, name: 'Incorrect Temple Details' },
        { id: 2, name: 'Wrong temple locations' },
        { id: 3, name: `Temple Doesn't exist` },
    ]
    const selectionHandler = (item) => {
        setSelectedMessage(item)
        setShowSubmit(true)
        // navigation.navigate(RouteTexts.ERROR_SELECTION_PAGE)
    }
    const RenderItem = (item, index) => (
        <TouchableOpacity onPress={() => selectionHandler(item)} style={{ justifyContent: 'space-between', height: 40, alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Mulish-Regular', color: theme.textColor }}>{item?.name}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: 20, height: 20, borderColor: theme.textColor, borderWidth: 1 }}>
                <Icon name='check' size={14} color={theme.textColor} />
            </View>
        </TouchableOpacity>
    )
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BlurView blurAmount={5} style={{ position: 'absolute', top: 0, height: Dimensions.get('window').height, width: '100%' }}>
            </BlurView>
            {
                showSubmitPage ?
                    <SelectErrorPage setShowSubmit={setShowSubmit} selectedError={selectedMessage} navigation={navigation} /> :
                    <View style={[styles.mainContainer, { backgroundColor: theme == 'light' ? '#fff' : '#333333' }]}>
                        <View style={styles.topContainer}>
                            <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>Bramhalingeshwara</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon name='x' color={theme.textColor} size={22} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={[styles.submitText, { color: theme.textColor }]}>Submit Images</Text>
                            <Text style={[styles.descriptionText, { color: theme.textColor }]}>You can submit images for this temple</Text>
                        </View>
                        <FlatList contentContainerStyle={{ paddingHorizontal: 15, marginVertical: 20 }} data={errormessages} renderItem={({ item, index }) => (
                            RenderItem(item, index)
                        )} />
                        <View style={{ paddingBottom: 50 }} />
                    </View>
            }
        </View>
    );
};
export const styles = StyleSheet.create({
    topContainer: { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 25 },
    mainContainer: { position: 'absolute', bottom: 0, borderTopStartRadius: 20, borderTopEndRadius: 20, width: '100%', },
    submitText: { fontSize: 16, fontFamily: 'Lora-SemiBold', color: '#222222' },
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },
    darkbackgroundColor: "#333333"
    // uploadContainer: { paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', marginTop: 5, borderStyle: 'dashed', height: 70, width: '98%', borderColor: '#777777', borderRadius: 10, borderWidth: 1 }
})
export default SpottingErrorPage;
