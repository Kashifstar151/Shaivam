import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const StepTitleContainer = ({ step, title, subtitle }) => {
    return (
        <View
            style={{
                paddingVertical: 15,
                gap: 10,
            }}
        >
            <Text
                style={{
                    color: '#C1554E',
                    fontFamily: 'Mulish-Bold',
                    fontSize: RFValue(14, 850),
                    lineHeight: 18,
                }}
            >
                {`Step ${step}`}
            </Text>
            <View
                style={{
                    gap: 4,
                }}
            >
                <Text
                    style={{
                        color: '#000',
                        fontFamily: 'Mulish-Bold',
                        fontSize: RFValue(16, 850),
                        lineHeight: 21,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        color: '#777777',
                        fontFamily: 'Mulish',
                        fontSize: RFValue(14, 850),
                        lineHeight: 18,
                    }}
                >
                    {subtitle}
                </Text>
            </View>
        </View>
    );
};

export default StepTitleContainer;
