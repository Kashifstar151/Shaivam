import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ buttonText }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity activeOpacity={0.4} style={styles.button}>
                <Text style={{ fontSize: 14, fontFamily: 'Mulish-Bold', color: '#FFFFFF' }}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};
export const styles = StyleSheet.create({
    mainContainer: { elevation: 10, backgroundColor: '#FFFFFF', paddingVertical: 10, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0 },
    button: { height: 55, width: Dimensions.get('window').width - 30, backgroundColor: '#777777', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }
})
export default Button;
