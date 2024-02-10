import React from 'react'
import { Text, View } from 'react-native'
import { colors } from '../Helpers'
import NandiLogo from "../assets/Images/NandiLogo.svg"

const HeadingText = ({ text, nandiLogo }) => {
    return (
        <View style={{ paddingHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.grey3, fontSize: 16, fontWeight: '600' }}>{text}</Text>
            {
                nandiLogo &&
                <View>
                    <NandiLogo />
                </View>
            }
        </View>
    )
}

export default HeadingText