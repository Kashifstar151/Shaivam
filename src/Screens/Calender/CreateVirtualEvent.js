import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import Icon from "react-native-vector-icons/dist/Feather";
import ReminderSnackBar from "./ReminderSnackBar";
import { colors } from "../../Helpers";
import TextInputCom from "../Temples/Common/TextInputCom";
import LocationLogo from "../../components/SVGs/LocationLogo";
const CreateVirtualEvent = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
            <Background>
                <View style={styles.mainCom}>
                    <View>
                        <Text style={styles.mainHeading}>Add events</Text>
                        <Text style={styles.subHeadingText}>You can add events items directly to the Shaivam.org News listing now. (They will be published after moderation.)</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='x' color='black' size={24} />
                    </TouchableOpacity>
                </View>

            </Background>
            {/* <View style={{ backgroundColor: '#F3F3F3', height: 2, width: Dimensions.get('window').width, marginVertical: 10 }} /> */}
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ReminderSnackBar hidebell={true} />
                <View >
                    <TextInputCom insiderText={'Enter event title'} headinText={'Event title*'} width={Dimensions.get('window').width - 40} />
                    <TextInputCom insiderText={'Enter event category'} headinText={'Event category'} width={Dimensions.get('window').width - 40} />
                    <View style={{ marginVertical: 10 }}>
                        <Text>{'Brief Description of the Event'}</Text>
                        <TouchableOpacity style={{ width: Dimensions.get('window').width - 30 }}>
                            <TextInput style={styles.inputComp} />
                            {/* <Text>{insiderText}</Text> */}
                        </TouchableOpacity>
                    </View>
                    <TextInputCom locationIcon={true} insiderText={'Search event location'} headinText={'location'} width={Dimensions.get('window').width - 40} />
                    <TextInputCom insiderText={'Enter event Url'} headinText={'URL'} width={Dimensions.get('window').width - 40} />
                    <View style={{ marginVertical: 10 }}>
                        <Text>{'Upload Images (You can upload multiple images)'}</Text>
                        <TouchableOpacity style={styles.uploadContainer}>
                            <Icon name="image" size={24} color="#777777" />
                            <Text
                                style={[
                                    styles.descriptionText,
                                    { fontSize: 14, marginHorizontal: 10 },
                                ]}
                            >
                                Click here to upload photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <ReminderSnackBar />
                    </View>
                    <TextInputCom />
                    <TextInputCom />
                    <TextInputCom />
                    <TextInputCom />

                </View>
            </View>
        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    mainCom: { paddingBottom: 10, alignItems: 'center', marginTop: 40, paddingTop: 10, backgroundColor: '#fff', borderTopEndRadius: 15, borderTopLeftRadius: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', },
    mainHeading: { fontFamily: 'Lora-Bold', fontSize: 16, color: 'black' },
    subHeadingText: { fontFamily: 'Mulish-Regular', fontSize: 12, color: colors.grey7 },
    inputComp: { backgroundColor: '#F3F3F3', height: 120, width: Dimensions.get('window').width - 30, borderRadius: 10, justifyContent: 'center', paddingHorizontal: 20 },
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },
    uploadContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        borderStyle: 'dashed',
        height: 55,
        width: '98%',
        borderColor: '#777777',
        borderRadius: 10,
        borderWidth: 1,
    },

})
export default CreateVirtualEvent;
