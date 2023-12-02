import React from 'react'
import { Text, View } from 'react-native'
import { colors } from '../Helpers'

const HeadingText = ({ text }) => {
    return (
        <View style={{ paddingHorizontal: 0 }}>
            <Text style={{ color: colors.grey3, fontSize: 16, fontWeight: '600' }}>{text}</Text>
        </View>
    )
}

export default HeadingText