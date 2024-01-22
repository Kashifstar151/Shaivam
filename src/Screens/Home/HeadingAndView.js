import React from 'react';
import { View, Text, Pressable } from 'react-native';
import RightDirSVG from '../../components/SVGs/RightDirSVG';

const HeadingAndView = ({ title, onPress, viewBtnColor, theme }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                color: theme?.textColor,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme?.textColor }}>
                {title}
            </Text>

            <Pressable style={{ flexDirection: 'row', rowGap: 8 }} onPress={onPress}>
                <Text style={{ color: viewBtnColor }}>View All</Text>
                <RightDirSVG fill={viewBtnColor} />
            </Pressable>
        </View>
    );
};

export default HeadingAndView;
