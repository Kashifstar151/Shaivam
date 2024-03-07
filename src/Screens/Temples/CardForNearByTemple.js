import React from 'react';
import { Text, View } from 'react-native';

const CardForNearByTemple = ({ item }) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                marginHorizontal: 15,
                marginTop: 15,
                elevation: 5,
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                borderRadius: 8,
                height: 70,
                padding: 10,
            }}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <View
                        style={{
                            width: 4,
                            backgroundColor: `${item?.metadata().color}`,
                            borderRadius: 5,
                        }}
                    ></View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'red', fontWeight: '' }}>
                            {JSON.stringify(item?.metadata().color)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CardForNearByTemple;
