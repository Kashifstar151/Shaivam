import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "@react-native-community/blur";
import ErrorIcon from "../Screens/Temples/TempleAssets/Vector (5).svg"

const AlertScreen = ({ descriptionText, removeFromPlaylist, setShowModal, headingText }) => {
    // console.log("🚀 ~ AlertScreen ~ descriptionText:", removeFromPlaylist)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <BlurView style={styles.blurView} blurType='dark' blurAmount={2} />
            <View style={styles.alertContainer}>
                <View style={styles.errorContainer}>
                    <ErrorIcon />
                </View>
                <Text style={styles.heading}>{headingText ? headingText : 'Are you sure you want to delete this from offline downloads?'}</Text>
                <Text style={styles.title}>{descriptionText.title}</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={() => removeFromPlaylist(descriptionText)}>
                        <Text style={[styles.text, { color: '#4C3600' }]}>Yes, I’m sure</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};
export const styles = StyleSheet.create({
    blurView: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center', alignItems: 'center'
    },
    alertContainer: { height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width - 20, paddingHorizontal: 10, backgroundColor: '#fff', alignItems: 'center', borderRadius: 10 },
    errorContainer: {
        height: 70, width: 70, borderRadius: 35, backgroundColor: '#C1554E', marginTop: 10, justifyContent: 'center', alignItems: 'center'
    },
    heading: { marginVertical: 10, fontFamily: 'Mulish-Regular', fontSize: 18, color: '#222222' },
    title: { color: '#777777', fontFamily: 'Mulish-Regular' },
    cancelButton: { width: '42%', height: 50, backgroundColor: '#fff', marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' },
    text: { color: '#777777', fontFamily: 'Mulish', fontWeight: '700' },
    submitButton: { borderRadius: 10, backgroundColor: '#FCB300', width: '46%', height: 50, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }
})
export default AlertScreen;
