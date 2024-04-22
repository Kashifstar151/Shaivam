import React from 'react';
import { View, Text, Pressable } from 'react-native';
import RightDirSVG from '../../components/SVGs/RightDirSVG';
import { RFValue } from 'react-native-responsive-fontsize';

const HeadingAndView = ({ title, onPress, viewBtnColor, theme }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                color: theme?.textColor,
            }}
        >
            <Text
                style={{
                    fontSize: RFValue(18, 800),
                    fontFamily: 'Lora-Bold',
                    color: theme?.textColor,
                }}
            >
                {title}
            </Text>

            <Pressable
                style={{
                    flexDirection: 'row',
                    rowGap: 8,
                    alignItems: 'center',
                    gap: 4,
                }}
                onPress={onPress}
            >
                <Text style={{ color: viewBtnColor, fontSize: RFValue(14, 800) }}>View All</Text>
                <RightDirSVG viewBox="0 0 16 15" width={16} height={15} fill={viewBtnColor} />
            </Pressable>
        </View>
    );
};

export default HeadingAndView;
