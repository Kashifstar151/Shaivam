import React from 'react';
import { View, Text, Pressable } from 'react-native';
import RightDirSVG from '../../components/SVGs/RightDirSVG';

const HeadingAndView = ({ title, onPress, viewBtnColor }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>

            <Pressable style={{ flexDirection: 'row', rowGap: 8 }} onPress={onPress}>
                <Text style={{ color: viewBtnColor }}>View All</Text>
                <RightDirSVG fill={viewBtnColor} />
            </Pressable>
        </View>
    );
};

export default HeadingAndView;
