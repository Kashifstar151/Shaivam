import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LocationLogo from "../../../components/SVGs/LocationLogo";
import LocationSVG from "../../../components/SVGs/LocationSVG";

const TextInputCom = ({ headinText, insiderText, width, navigation, locationIcon }) => {
    // console.log("🚀 ~ TextInputCom ~ headinText:", headinText)
    return (
        <View style={{ marginVertical: 10 }}>
            <Text>{headinText}</Text>
            <TouchableOpacity style={width ? [styles.inputComp, { width: width }] : styles.inputComp}>
                {locationIcon && <LocationLogo fill={'#C1554E'} />}
                <TextInput onFocus={navigation} style={{ paddingHorizontal: 10, }} placeholder={insiderText} />
                {/* <Text>{insiderText}</Text> */}
            </TouchableOpacity>
        </View>
    );
};
export const styles = StyleSheet.create({
    inputComp: { flexDirection: 'row', backgroundColor: '#F3F3F3', height: 55, width: Dimensions.get('window').width - 90, alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, }
})
export default TextInputCom;
