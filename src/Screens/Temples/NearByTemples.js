import React, { useState } from 'react';
import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import Slider from '@react-native-community/slider';
import SearchInput from '../../components/SearchInput';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
const NearByTemples = ({ close, data, locationName, snapIndex }) => {
    const { snapToIndex, snapToPosition } = useBottomSheet();

    return (
        <View
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: '100%',
            }}
        >
            {/* <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={close}>
                    <Icon name={'more-vert'} size={24} />
                </TouchableOpacity>
            </View> */}

            <TouchableWithoutFeedback
                onPress={() => {
                    if (!snapIndex) {
                        snapToIndex(1);
                    }
                }}
            >
                <View style={{ width: '100%', fontFamily: 'Lora-Bold' }}>
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
