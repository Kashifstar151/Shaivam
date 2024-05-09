import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import PinTheLocation from '../PinTheLocationPage';

const SelectLocation = () => {
    return (
        <View
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
            }}
            // keyboardShouldPersistTaps
        >
            <PinTheLocation
                close={() => {
                    // setPinTheLocation(false);
                }}
                setDescription={() => {}}
            />
        </View>
    );
};

export default SelectLocation;
