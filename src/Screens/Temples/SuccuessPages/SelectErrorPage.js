import { BlurView } from "@react-native-community/blur";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BackButton from "../../../components/BackButton";

const SelectErrorPage = ({ selectedError }) => {
    console.log("🚀 ~ SelectErrorPage ~ params:", selectedError)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <BlurView blurAmount={5} style={{ position: 'absolute', top: 0, height: Dimensions.get('window').height, width: '100%' }}>
            </BlurView> */}
            <View style={styles.mainContainer}>
                <BackButton nandiLogo={false} />
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    topContainer: { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 25 },
    mainContainer: { height: 200, position: 'absolute', bottom: 0, borderTopStartRadius: 20, borderTopEndRadius: 20, width: '100%', backgroundColor: '#fff' },
    submitText: { fontSize: 16, fontFamily: 'Lora-SemiBold', color: '#222222' },
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },
    // uploadContainer: { paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', marginTop: 5, borderStyle: 'dashed', height: 70, width: '98%', borderColor: '#777777', borderRadius: 10, borderWidth: 1 }
})
export default SelectErrorPage;
