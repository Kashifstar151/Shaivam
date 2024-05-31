import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";

const ShareApp = () => {
    const { t } = useTranslation()
    return (
        <View style={{ backgroundColor: '#fff', padding: 10, height: 'auto' }}>
            <Text style={{ color: '#222222', fontFamily: 'Lora-SemiBold', fontSize: 18 }}>{t('Contact info')}</Text>
            <View style={{ paddingHorizontal: 15, marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='email-outline' size={28} color='#777777' />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' }}>{t('Email')}</Text>
                    <Text style={{ fontSize: 15, color: '#222222', fontFamily: 'Mulish-Regular' }} onPress={() => Linking.openURL('mailto:shaivam@shaivam.org')}>shaivam@shaivam.org</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='web' size={28} color='#777777' />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' }}>{('Website')}</Text>
                    <Text style={{ fontSize: 15, color: '#222222', fontFamily: 'Mulish-Regular', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('Http://www.Shaivam.org')}>Http://www.Shaivam.org</Text>
                </View>
            </View>
        </View>
    );
};

export default ShareApp;