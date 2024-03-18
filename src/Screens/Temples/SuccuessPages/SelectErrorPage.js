import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
// import BackButton from "../../../components/BackButton";
import WhiteBackButton from "../../../assets/Images/arrow (1) 1.svg";
import BackIcon from "../../../assets/Images/BackIcon.svg"
import { ThemeContext } from "../../../Context/ThemeContext";
import { colors } from "../../../Helpers";
import ButtonComp from "../Common/ButtonComp";

const SelectErrorPage = ({ setShowSubmit, selectedError, navigation }) => {
    console.log("🚀 ~ SelectErrorPage ~ params:", selectedError)
    const theme = useColorScheme(ThemeContext)
    const [desciption, setDescription] = useState(null)
    const [phoneNumber, setphoneNumber] = useState(null)
    const [disable, setDisable] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    useEffect(() => {
        if (desciption !== null && phoneNumber !== null) {
            setDisable(false)
        }
    }, [desciption, phoneNumber])
    const submitHandle = () => {

    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BlurView blurAmount={5} style={{ position: 'absolute', top: 0, height: Dimensions.get('window').height, width: '100%' }}>
            </BlurView>
            {
                submitted ?
                    <View style={[styles.mainContainer, { height: Dimensions.get('window').height / 2, flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, right: 10 }}>
                            <Icon name='x' color='#222222' size={22} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontFamily: 'Mulish-Bold', color: '#222222' }}>Images submitted!</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Mulish-Regular', color: '#222222' }}>Our team will go through your submission, validate it and update it on to the app.</Text>
                    </View> :
                    <View style={styles.mainContainer} >
                        {/* <BackButton nandiLogo={false} navigation={navigation} /> */}
                        <TouchableOpacity
                            style={{ paddingHorizontal: 20, marginVertical: 20 }}
                            onPress={() => setShowSubmit(false)}
                        >
                            <WhiteBackButton />
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777', marginBottom: 15 }}>Bramhalingeshwara</Text>
                            <Text style={styles.submitText}>Spotted an error?</Text>
                            <Text style={styles.descriptionText}>Select one of the following options</Text>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.errorContainer}>
                                <Text style={{ fontFamily: 'Mulish-Regular', color: '#222222' }}>{selectedError?.name}</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: 20, height: 20, backgroundColor: '#C1554E' }}>
                                    <Icon name='check' size={14} color='#fff' />
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.descriptionText}>Tell us what is incorrect</Text>
                            <TextInput onChangeText={(e) => setDescription(e)} placeholderTextColor={colors.grey5} placeholder="Type here" style={{ color: 'black', backgroundColor: '#F3F3F3', borderRadius: 10, padding: 10, height: 100 }} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.descriptionText}>Your Phone number*</Text>
                            <TextInput onChangeText={(e) => setphoneNumber(e)} placeholderTextColor={colors.grey5} placeholder="Type here" style={{ color: 'black', backgroundColor: '#F3F3F3', borderRadius: 10, padding: 10, height: 50 }} />
                        </View>
                        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                            <ButtonComp text={'Submit'} color={!disable} />
                        </View>
                    </View>
            }

        </View>
    );
};
export const styles = StyleSheet.create({
    topContainer: { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 25 },
    mainContainer: { position: 'absolute', bottom: 0, borderTopStartRadius: 20, borderTopEndRadius: 20, width: '100%', backgroundColor: '#fff' },
    submitText: { fontSize: 16, fontFamily: 'Lora-SemiBold', color: '#222222' },
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },
    errorContainer: { borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20, marginHorizontal: 20, backgroundColor: '#FFF5F5', height: 55, flexDirection: 'row', alignItems: 'center' },
    inputContainer: { marginVertical: 15, paddingHorizontal: 20 }
    // uploadContainer: { paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', marginTop: 5, borderStyle: 'dashed', height: 70, width: '98%', borderColor: '#777777', borderRadius: 10, borderWidth: 1 }
})
export default SelectErrorPage;
