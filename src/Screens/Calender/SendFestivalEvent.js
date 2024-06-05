import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import Background from "../../components/Background";
import { colors } from "../../Helpers";
import Video, { VideoRef } from 'react-native-video';
import TextInputCom from "../Temples/Common/TextInputCom";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import Button from "../Temples/Common/Button";
import Share from 'react-native-share'
import { useSelector } from "react-redux";
import AlertScreen from "../../components/AlertScreen";

const SendFestivalEvent = ({ navigation, route }) => {
    const { params } = route
    console.log("🚀 ~ SendFestivalEvent ~ params:", params)
    const [showModal, setShowModal] = useState(false)
    const [imageData, setImageData] = useState(params?.image)
    const inputValue = useSelector(state => state.form?.inputValues || '');
    const { t } = useTranslation();
    const useSendEmail = async ({ subject, attachments }) => {
        const shareOptions = {
            title: 'Send Festival Video',
            subject: 'Festival Video Submission.',
            message: `Festival Name: ${inputValue['Festival Name']},
Festival Location: ${inputValue['Festival Location']},
Name: ${inputValue['Creator name']}
Phone: ${inputValue['Creator number']}`,
            social: Share.Social.EMAIL,
            email: 'shaivam@shaivam.org',
            url: imageData[0]?.originalPath?.substring(0, 6) == 'file:/' ? imageData[0]?.originalPath : `file://${imageData[0]?.originalPath}`,
        };
        try {
            const ShareResponse = await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing', error);
        }
    };
    return (
        <KeyboardAvoidingView behavior='position'>
            <View style={{ backgroundColor: '#fff', height: Dimensions.get('window').height }} bounces={false}>
                <Background>
                    <View style={styles.mainCom}>
                        <View style={{ width: '95%' }}>
                            <Text style={styles.mainHeading}>{t('Send a festival video') ? t('Send a festival video') : 'Send a festival video'}</Text>
                            <Text style={styles.subHeadingText}>{t('Lorem Ipsum dolor set lorem ipsum dolort set')}</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => navigation.goBack()}>
                            <Icon name='x' color='black' size={24} />
                        </TouchableOpacity>
                    </View>
                </Background>
                <ScrollView style={{ paddingHorizontal: 20, flex: 1 }}>
                    <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12 }}>Upload videos (Video limit: 15mb)</Text>
                    {
                        imageData?.length > 0 &&
                        <View style={{ borderRadius: 20, width: 100, marginTop: 20 }}>
                            <TouchableOpacity style={{ position: 'absolute', top: -10, right: -10, zIndex: 100 }} onPress={() => setShowModal(true)}>
                                <MaterialIcons name='cancel' color='#C1554E' size={22} />
                            </TouchableOpacity>

                            <View style={{ borderRadius: 10 }}>
                                <Video resizeMode='stretch' source={{ uri: params?.image[0]?.uri }} style={{ width: 100, height: 100, borderRadius: 20 }} paused={true} />
                            </View>
                            <Text>video1.mp4</Text>
                        </View>
                    }
                    <TextInputCom inputKey={'Festival Name'} value={inputValue['Festival Name']} insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Festival Name*') ? t('Festival Name*') : 'Festival Name*'} width={Dimensions.get('window').width - 50} />
                    <TextInputCom value={inputValue['Festival Location']} inputKey={'Festival Location'} insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Festival Location*') ? t('Festival Location*') : 'Festival Location*'} width={Dimensions.get('window').width - 50} />
                    <TextInputCom inputKey={'Creator name'} value={inputValue['Creator name']} insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Your Name*') ? t('Your Name*') : 'Your Name*'} width={Dimensions.get('window').width - 50} />
                    <TextInputCom inputKey={'Creator number'} value={inputValue['Creator number']} insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Phone number*') ? t('Phone number*') : 'Phone number*'} width={Dimensions.get('window').width - 50} />
                </ScrollView>
                {
                    showModal &&
                    <Modal transparent>
                        <AlertScreen headingText={'Are you sure you want to delete the recorded video ?'} descriptionText={{ title: 'You will be asked to record again' }} setShowModal={setShowModal} removeFromPlaylist={() => setImageData([])} />
                    </Modal>
                }
                <Button navigation={() => useSendEmail({
                    attachments: params?.image?.map((result) => ({
                        uri: result.uri,
                        type: result.type,
                        name: result.fileName, // optional
                    })), subject: 'jjj'
                })} />
                {/* <View style={{ position: 'absolute', bottom: 20 }}> */}
                {/* </View> */}
            </View>
        </KeyboardAvoidingView>

    );
};
export const styles = StyleSheet.create({
    mainCom: { paddingBottom: 10, alignItems: 'center', marginTop: 40, paddingTop: 10, backgroundColor: '#fff', borderTopEndRadius: 15, borderTopLeftRadius: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', },
    mainHeading: { fontFamily: 'Lora-Bold', fontSize: 16, color: 'black' },
    subHeadingText: { fontFamily: 'Mulish-Regular', fontSize: 12, color: colors.grey7 },

})
export default SendFestivalEvent;
