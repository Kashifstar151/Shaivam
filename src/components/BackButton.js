import React from 'react'
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import BackIcon from "../../src/assets/Images/BackIcon.svg"
import WhiteBackButton from "../../src/assets/Images/arrow (1) 1.svg"


const BackButton = ({ secondText, firstText, middleText, color, navigation, secondMiddleText, rightIcon }) => {
    return (
        <View style={{ paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 40 : StatusBar.currentHeight - 20, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {color ? <WhiteBackButton /> : <BackIcon />}
                </TouchableOpacity>
                <View>

                    {
                        middleText &&
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500' }}>{middleText}</Text>
                        </View>
                    }
                    {
                        secondMiddleText &&
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#C1554E', fontFamily: 'AnekTamil-Regular' }}>{secondMiddleText}</Text>
                        </View>
                    }
                </View>
                <TouchableOpacity>
                    {rightIcon}
                </TouchableOpacity>
            </View>
            <Text style={{ marginHorizontal: 10, fontFamily: 'Lora-Regular', fontSize: 24, fontWeight: '700', color: 'white' }}>{firstText}</Text>
            {
                secondText &&
                <Text style={{ marginHorizontal: 10, fontFamily: 'mulish-Regular', fontSize: 14, fontWeight: '400', color: 'white' }}>Lorem impsum dolor set lorem impsiun alsjf </Text>
            }
        </View>
    )
}

export default BackButton