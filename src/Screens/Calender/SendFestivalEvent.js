import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import Background from "../../components/Background";
import { colors } from "../../Helpers";
import Video, { VideoRef } from 'react-native-video';
import TextInputCom from "../Temples/Common/TextInputCom";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import Button from "../Temples/Common/Button";
import Mailer from "react-native-mail";

const SendFestivalEvent = ({ navigation, route }) => {
    const { params } = route
    const { t } = useTranslation();
    const useSendEmail = ({ subject, attachments }) => {
        console.log("🚀 ~ useSendEmail ~ attachments:", {
            path: params?.image[0]?.originalPath,
            uri: params?.image[0]?.uri,  // The absolute path of the file from which to read data.
            type: params?.image[0]?.type,   // Mime Type: jpg, png, doc, ppt, html, pdf
            name: params?.image[0]?.fileName,   // Optional: Custom filename for attachment
        })
        // const sendEmail = useCallback(
        // () => {
        // return new Promise((resolve, reject) => {
        Mailer.mail(
            {
                subject,
                recipients: ["kashif@bytive.in"], // replace with your email
                body: 'Here are my attachments',
                //   isHTML,
                attachments: [{
                    path: params?.image[0]?.originalPath,
                    uri: params?.image[0]?.uri,  // The absolute path of the file from which to read data.
                    type: params?.image[0]?.type,   // Mime Type: jpg, png, doc, ppt, html, pdf
                    name: params?.image[0]?.fileName,   // Optional: Custom filename for attachment
                }],
            },
            (error, event) => {
                if (error) {
                    console.log("🚀 ~ //returnnewPromise ~ error:", error)
                    // return reject(error);
                }
                console.log("🚀 ~ //returnnewPromise ~ event:", event)

                // resolve(event);
            }
        );
        // });
        // },
        //     []
        // );
    };
    // console.log("🚀 ~ SendFestivalEvent ~ params:", params)
    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }} bounces={false}>
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
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12 }}>Upload videos (Video limit: 15mb)</Text>
                <View style={{ borderRadius: 20, width: 100, marginTop: 20 }}>
                    <TouchableOpacity style={{ position: 'absolute', top: -10, right: -10, zIndex: 100 }}>
                        <MaterialIcons name='cancel' color='#C1554E' size={22} />
                    </TouchableOpacity>
                    <View style={{ borderRadius: 10 }}>
                        <Video resizeMode='stretch' source={{ uri: params?.image[0]?.uri }} style={{ width: 100, height: 100, borderRadius: 20 }} paused={true} />
                    </View>
                    <Text>video1.mp4</Text>
                </View>
                <TextInputCom insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Festival Name*') ? t('Festival Name*') : 'Festival Name*'} width={Dimensions.get('window').width - 50} />
                <TextInputCom insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Festival Location*') ? t('Festival Location*') : 'Festival Location*'} width={Dimensions.get('window').width - 50} />
                <TextInputCom insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Your Name*') ? t('Your Name*') : 'Your Name*'} width={Dimensions.get('window').width - 50} />
                <TextInputCom insiderText={t('Type here') ? t('Type here') : 'Type here'} headinText={t('Phone number*') ? t('Phone number*') : 'Phone number*'} width={Dimensions.get('window').width - 50} />
                <Button navigation={() => useSendEmail({
                    attachments: params?.image?.map((result) => ({
                        uri: result.uri,
                        type: result.type,
                        name: result.fileName, // optional
                    })), subject: 'jjj'
                })} />
            </View>
        </ScrollView>

    );
};
export const styles = StyleSheet.create({
    mainCom: { paddingBottom: 10, alignItems: 'center', marginTop: 40, paddingTop: 10, backgroundColor: '#fff', borderTopEndRadius: 15, borderTopLeftRadius: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', },
    mainHeading: { fontFamily: 'Lora-Bold', fontSize: 16, color: 'black' },
    subHeadingText: { fontFamily: 'Mulish-Regular', fontSize: 12, color: colors.grey7 },

})
export default SendFestivalEvent;
