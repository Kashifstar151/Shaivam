import React from 'react';
import { Pressable, Text, Touchable, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ type, svg, style, onPress, text, backgroundColor, textColor }) => {
    const { paddingHorizontal, paddingVertical, borderRadius, ...restStyle } = style;
    console.log('🚀 ~ CustomButton ~ style:', style);
    if (type === 'TouchableOpacity') {
        return (
            <TouchableOpacity
                style={[
                    {
                        borderRadius: borderRadius ?? 8,
                        overflow: 'hidden',
                    },
                    restStyle,
                ]}
                onPress={onPress}
            >
                <CommonPartOfBtn
                    svg={svg}
                    textColor={textColor}
                    text={text}
                    backgroundColor={backgroundColor}
                    paddingHorizontal={paddingHorizontal}
                    paddingVertical={paddingVertical}
                    borderRadius={borderRadius}
                />
            </TouchableOpacity>
        );
    }
    return (
        <Pressable
            style={[
                {
                    borderRadius: 8,
                    overflow: 'hidden',
                },
                restStyle,
            ]}
            onPress={onPress}
        >
            <CommonPartOfBtn
                svg={svg}
                textColor={textColor}
                text={text}
                backgroundColor={backgroundColor}
                paddingHorizontal={paddingHorizontal}
                paddingVertical={paddingVertical}
            />
        </Pressable>
    );
};

const CommonPartOfBtn = ({
    paddingHorizontal,
    paddingVertical,
    svg,
    text,
    textColor,
    backgroundColor,
}) => (
    <View
        style={{
            flexDirection: 'row',
            backgroundColor: backgroundColor,
            gap: 6,
            paddingVertical: paddingVertical ?? 8,
            paddingHorizontal: paddingHorizontal ?? 20,
        }}
    >
        {svg ?? null}
        {text ? (
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
        ) : null}
    </View>
);

export { CustomButton };
