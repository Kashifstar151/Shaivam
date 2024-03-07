import React, { useState } from 'react';
import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import SearchInput from '../../components/SearchInput';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import CardForNearByTemple from './CardForNearByTemple';
const NearByTemples = ({ close, data, locationName, snapIndex }) => {
    // console.log('🚀 ~ NearByTemples ~ data:', data);
    const { snapToIndex, snapToPosition } = useBottomSheet();

    return (
        <View
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: '100%',
            }}
        >
            <View>
                {snapIndex ? (
                    <View>
                        <Text style={{ color: 'red' }}>dhsjhdjs</Text>
                    </View>
                ) : null}
            </View>

            <TouchableWithoutFeedback
                onPress={() => {
                    if (!snapIndex) {
                        snapToIndex(1);
                    }
                }}
                style={{ marginBottom: 10 }}
            >
                <View
                    style={{
                        width: '100%',
                        fontFamily: 'Lora-Bold',
                        paddingBottom: 10,
                        backgroundColor: 'white',
                    }}
                >
                    <Text
                        style={{
                            color: '#222222',
                            fontSize: 18,
                            fontFamily: 'Lora-Bold',
                            paddingHorizontal: 15,
                        }}
                    >
                        {locationName ? `Nearby Temples in ${locationName}` : null}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            <ScrollView style={{ zIndex: -20 }}>
                {data.map((item, indx) => (
                    <View key={indx}>
                        <CardForNearByTemple item={item} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'green',
    },
});

export default NearByTemples;
