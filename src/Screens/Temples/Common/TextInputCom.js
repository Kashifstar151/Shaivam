import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TextInputCom = ({ headinText, insiderText }) => {
    console.log("🚀 ~ TextInputCom ~ headinText:", headinText)
    return (
        <View style={{ marginVertical: 10 }}>
            <Text>{headinText}</Text>
            <TouchableOpacity style={styles.inputComp}>
                <Text>{insiderText}</Text>
            </TouchableOpacity>
        </View>
    );
};
export const styles = StyleSheet.create({
    inputComp: { backgroundColor: '#F3F3F3', height: 55, width: Dimensions.get('window').width - 90, borderRadius: 10, justifyContent: 'center', paddingHorizontal: 20 }
})
export default TextInputCom;
