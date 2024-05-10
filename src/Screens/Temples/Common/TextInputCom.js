import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import LocationLogo from "../../../components/SVGs/LocationLogo";
import LocationSVG from "../../../components/SVGs/LocationSVG";
import { setInputValue } from "../../../store/features/Calender/FormSlice";

const TextInputCom = ({ headinText, insiderText, width, navigation, locationIcon, State, inputKey, value, height, returnType }) => {
    console.log("🚀 ~ TextInputCom ~ State:", inputKey)
    const dispatch = useDispatch()

    // console.log("🚀 ~ TextInputCom ~ headinText:", headinText)
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{ color: '#777777' }}>{headinText}</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F3F3F3', height: height ? height : 55, width: width ? width : Dimensions.get('window').width - 90, alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, }}>
                {locationIcon && <LocationLogo fill={'#C1554E'} />}
                <TextInput returnKeyType={returnType} value={value} onChangeText={(e) => dispatch(setInputValue({ inputKey, inputValue: e }))} onFocus={navigation} style={{ paddingHorizontal: 10, }} placeholder={insiderText} />
                {/* <Text>{insiderText}</Text> */}
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    inputComp: { flexDirection: 'row', backgroundColor: '#F3F3F3', height: 55, width: Dimensions.get('window').width - 90, alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, }
})
export default TextInputCom;
