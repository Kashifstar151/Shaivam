import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ buttonText, active, navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={navigation} activeOpacity={0.4} style={active ? [styles.button, { backgroundColor: '#FCB300' }] : styles.button}>
                <Text style={active ? { fontSize: 14, fontFamily: 'Mulish-Bold', color: '#222222' } :
                    { fontSize: 14, fontFamily: 'Mulish-Bold', color: '#FFFFFF' }}>
                    {buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};
export const styles = StyleSheet.create({
    mainContainer: { elevation: 10, backgroundColor: '#FFFFFF', paddingVertical: 10, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0 },
    button: { height: 55, width: Dimensions.get('window').width - 30, backgroundColor: '#777777', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }
})
export default Button;
