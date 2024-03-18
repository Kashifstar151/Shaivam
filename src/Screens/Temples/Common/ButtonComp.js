import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonComp = ({ text, navigation, color }) => {
    return (
        <TouchableOpacity onPress={navigation} style={color ? styles.buttton : [styles.buttton, { backgroundColor: '#777777' }]}>
            <Text style={color ? styles.text : [styles.text, { color: '#ffffff' }]}>{text}</Text>
        </TouchableOpacity>
    );
};
export const styles = StyleSheet.create({
    buttton: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCB300', height: 50, width: Dimensions.get('window').width - 30, borderRadius: 10 },
    text: { fontSize: 14, fontFamily: 'Mulish-Bold', color: '#4C3600' }
})
export default ButtonComp;
