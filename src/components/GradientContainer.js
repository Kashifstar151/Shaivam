import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';

const GradientContainer = ({ Icon, LeftImage, RightImage, colors, name }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1.2, y: 0 }}
            style={{
                height: 70,
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
                overflow: 'hidden',
            }}
            colors={colors}
        >
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '25%',
                }}
            >
                {LeftImage}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                {Icon}
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontFamily: 'mulish-regular', fontWeight: '600', fontSize: 14 }}>
                        {name}
                    </Text>
                    <Text style={{ fontFamily: 'mulish-regular', fontWeight: '600', fontSize: 14 }}>
                        1.001 - 1.136
                    </Text>
                </View>
            </View>
            <View style={{ position: 'absolute', right: 0, top: 0 }}>{RightImage}</View>
        </LinearGradient>
    );
}

export default GradientContainer