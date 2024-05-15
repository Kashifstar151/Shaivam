import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import PinTheLocation from '../PinTheLocationPage';
import { useDispatch } from 'react-redux';
import { updateTheLocation } from '../../../store/features/Temple/TempleSlice';

const SelectLocation = ({ setStep, navigation }) => {
    const dispatch = useDispatch();
    return (
        <View
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
            }}
            // keyboardShouldPersistTaps
        >
            <PinTheLocation
                close={(num) => {
                    setStep(num);
                }}
                setDescription={() => {}}
                valueSetter={(value) => {
                    dispatch(
                        updateTheLocation({
                            coordinate: {
                                latitude: value?.lat,
                                longitude: value?.lon,
                            },
                            locationName: value?.display_name,
                        })
                    );
                }}
            />
        </View>
    );
};

export default SelectLocation;
