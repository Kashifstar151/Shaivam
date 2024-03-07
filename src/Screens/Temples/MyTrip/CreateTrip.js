import React from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import Background from "../../../components/Background";
import { colors } from "../../../Helpers";
import TextInputCom from "../Common/TextInputCom";
import LocationIcon from "../../../assets/Images/Group 14100.svg"
// import Slider from "@react-native-community/slider";
import Slider from "@kashifum8299/react-native-slider";
import Button from "../Common/Button";
// import { gStyles } from "../../../Helpers";

const CreateTrip = ({ navigation }) => {
    const data = [
        { name: 'Jyotirlingas/Thirumurai Temples', color: '#E62828' },
        { name: 'Vaippu Sthalam', color: '#D700C1' },
        { name: 'Nayanmar birth/mukti sthalam', color: '#D700C1' },
        { name: '108 Parashurama Temples', color: '#D700C1' },
        { name: 'Popular Temples', color: '#007DE6' },
        { name: 'Temples', color: '#6EDB00' },
        { name: 'Unclear Temples', color: '#A5A5A5' },
    ]
    return (
        <View style={{ flex: 1 }}>

            <ScrollView style={{ flex: 1, }}>
                <Background>
                    <View style={styles.mainCom}>
                        <View>
                            <Text style={styles.mainHeading}>Create a New Trip</Text>
                            <Text style={styles.subHeadingText}>Follow these steps and make a trip</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name='x' color='black' size={24} />
                        </TouchableOpacity>
                        {/* <View>
                    <Text style={{ color: '#C1554E' }}>STEP 1</Text>
                </View> */}
                    </View>
                </Background>
                <View style={styles.containers}>
                    <Text style={styles.steptext}>STEP 1</Text>
                    <Text style={{ color: 'black', fontFamily: 'Mulish-Bold', fontSize: 16, marginTop: 10, fontWeight: '700', lineHeight: 17 }}>Enter your starting point & end point</Text>
                    <Text style={{ marginTop: 10, fontFamily: 'Mulish', lineHeight: 17 }}>In the absence of an end point, we will suggest 20 Temples around your starting point</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <LocationIcon />
                        <View style={{ paddingHorizontal: 20 }}>
                            <TextInputCom headinText={'Starting Location*'} insiderText={'Current Location'} />
                            <TextInputCom headinText={'End Point'} insiderText={'Enter here'} />
                        </View>
                    </View>
                </View>
                <View style={styles.containers}>
                    <Text style={styles.steptext}>STEP 2</Text>
                    <Text style={{ color: 'black', fontFamily: 'Mulish-Bold', fontSize: 16, marginTop: 10, fontWeight: '700', lineHeight: 17 }}>Select the type of temple</Text>
                    <FlatList data={data} renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.lisItem}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ backgroundColor: item?.color, height: 20, width: 20, marginHorizontal: 10 }}>
                                </View>
                                <Text style={{ color: '#222222', fontFamily: 'Mulish-Bold' }}>{item.name}</Text>
                            </View>
                            <View style={{ height: 24, width: 24, borderRadius: 12, backgroundColor: '#C1554E', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='check' size={18} color='white' />
                            </View>
                        </TouchableOpacity>
                    )} />
                </View>
                <View style={styles.containers}>
                    <Text style={styles.steptext}>STEP 3</Text>
                    <Text style={{ color: 'black', fontFamily: 'Mulish-Bold', fontSize: 16, marginTop: 10, fontWeight: '700', lineHeight: 17 }}>Set Zone Limit</Text>
                    <Text style={{ marginTop: 10, fontFamily: 'Mulish', lineHeight: 17 }}>Move the slider around and select temple search diameter</Text>
                    <View style={styles.kmContainer}>
                        <Text style={styles.kmtext}>5 Km</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={10}
                            thumbTintColor='#FFB500'
                            style={{ width: Dimensions.get('window').width - 70 }}
                            minimumTrackTintColor='#FFB500'
                            maximumTrackTintColor="#F3DAA0"
                            thumbStyle={{ height: 36, width: 36, borderRadius: 18, borderWidth: 2, borderColor: '#C79112' }}
                        />
                    </View>
                </View>
                <View style={[styles.containers, { paddingBottom: 100, paddingTop: 20 }]}>
                    <Text style={styles.steptext}>STEP 4</Text>
                    <Text style={{ color: 'black', fontFamily: 'Mulish-Bold', fontSize: 16, marginTop: 10, fontWeight: '700', lineHeight: 17 }}>Give your trip a name</Text>
                    <TextInputCom headinText={'Trip name'} insiderText={'Type here'} width={Dimensions.get('window').width - 40} />
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0 }}>
                <Button buttonText={'Preview trip'} />
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    mainCom: { paddingBottom: 10, alignItems: 'center', marginTop: 30, paddingTop: 10, backgroundColor: '#fff', borderTopEndRadius: 15, borderTopLeftRadius: 15, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', },
    mainHeading: { fontFamily: 'Lora-Bold', fontSize: 16, color: 'black' },
    subHeadingText: { fontFamily: 'Mulish-Regular', fontSize: 12, color: 'black' },
    lisItem: { height: 30, flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between' },
    kmtext: { fontSize: 32, fontFamily: 'Mulish-Bold', color: '#222222' },
    kmContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    steptext: { color: '#C1554E', fontFamily: 'Mulish-Bold', fontWeight: '700' },
    containers: { paddingHorizontal: 20, paddingTop: 10, backgroundColor: '#fff', }
})
export default CreateTrip;
