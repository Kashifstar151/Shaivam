import React from 'react'
import { Platform, StatusBar, Text, View } from 'react-native'
import NandiLogo from "../assets/Images/NandiLogo.svg"

const ConstantHeader = () => {
    return (
        <View style={{ paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 20, paddingHorizontal: 15, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
                <Text style={{ fontSize: 24, fontFamily: 'Lora-SemiBold', color: '#FFFFFF' }}>More options</Text>
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Bold', color: '#FFFFFF' }}>You customize your app settings here</Text>
            </View>
            <NandiLogo />
        </View>
    )
}

export default ConstantHeader