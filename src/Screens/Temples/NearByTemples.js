import React, { useState } from 'react';
import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import SearchInput from '../../components/SearchInput';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
const NearByTemples = ({ close, data, locationName }) => {
    const { snapToIndex, snapToPosition } = useBottomSheet();
    const [position, setPosition] = useState(0);

    return (
        <View style={{ flex: 1, width: Dimensions.get('window').width - 30 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={close}>
                    <Icon name={'more-vert'} size={24} />
                </TouchableOpacity>
                <SearchInput></SearchInput>
            </View>

            <View>
                <Text> Nearby Temples in {locationName}</Text>
            </View>

            <ScrollView scrollIndicatorInsets={true}>
                {data.map((item, _) => (
                    <Text key={_}>{JSON.stringify(item)}</Text>
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
