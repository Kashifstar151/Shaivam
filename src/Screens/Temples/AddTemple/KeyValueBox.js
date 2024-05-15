import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import getDimension from '../../../Helpers/getDimension';

const KeyValueBox = ({ keyName, value }) => {
    const { screenWidth } = getDimension();
    const RenderImage = (item) => {
        // console.log('🚀 ~ RenderImage ~ item:', item);
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: item?.uri }}
                    style={{ aspectRatio: 1, width: (screenWidth - 50) / 2, borderRadius: 10 }}
                />
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' }}>
                    {item?.fileName?.slice(-10)}
                </Text>
            </View>
        );
    };

    return (
        <View
            style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
            }}
        >
            <Text style={[style.heading]}>{keyName}</Text>
            {keyName !== 'Images' ? (
                <Text style={style.value}>{value}</Text>
            ) : (
                <View style={style.imageRenderBoxCont}>
                    {value.length > 0 && (
                        <View style={style.imageRenderBox}>
                            {value.map((item, _) => RenderImage(item))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    heading: {
        color: '#777777',
        fontFamily: 'Mulish-SemiBold',
        fontSize: RFValue(12, 850),
        lineHeight: 16,
    },
    value: {
        color: '#000',
        fontFamily: 'Mulish-SemiBold',
        fontSize: RFValue(16, 850),
        lineHeight: 21,
    },
    imageRenderBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },

    imageRenderBoxCont: {
        justifyContent: 'center',
        paddingTop: 10,
    },
});
export default KeyValueBox;
