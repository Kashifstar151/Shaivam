import React from 'react';
import { Pressable, Text, View } from 'react-native';
import DirectionSVG from './SVGs/DirectionSVG';

const CustomButton = ({ svg, style, onPress, text, backgroundColor, textColor }) => {
    return (
        <Pressable
            style={[
                {
                    borderRadius: 8,
                    overflow: 'hidden',
                },
                style,
            ]}
            onPress={onPress}
        >
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: backgroundColor,
                    gap: 6,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                }}
            >
                {svg}
                <Text
                    style={{
                        fontFamily: 'Mulish-ExtraBold',
                        fontSize: 12,
                        lineHeight: 16,
                        color: textColor,
                    }}
                >
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

export { CustomButton };
