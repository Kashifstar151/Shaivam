import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import NearByTemples from './NearByTemples';
import { RouteTexts } from '../../navigation/RouteText';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image } from 'react-native';

/*

 <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            description={"This is a marker in React Natve"}
            >
      
            <Image source={require('./man_marker.png')} style={{height: 35, width:35 }} />
      
          </Marker>

*/
/*

data type for tha marker ==>
{
    templeType:""
}

*/

const assetMapWithTempleType = {
    pink: {
        size: {},
        path: './ThirumuraiTemple.png',
    },

    userLocation: {
        size: {},
        path: '',
    },

    userLocation: {
        size: {},
        path: '',
    },
    userLocation: {
        size: {},
        path: '',
    },
    userLocation: {
        size: {},
        path: '',
    },
    userLocation: {
        size: {},
        path: '',
    },
};

export const CustomMarker = ({ templeType, coordinate }) => {
    return (
        <Marker
            coordinate={{
                latitude: 28.500271,
                longitude: 77.387901,
            }}
            description={'This is a marker in React Natve'}
        >
            <Image source={require('./ThirumuraiTemple.png')} resizeMode="contain" />
        </Marker>
    );
};
export const Temples = () => {
    const bottomSheetRef = useRef(null);
    const userLocation = {
        latitude: 28.500271,
        longitude: 77.387901,
    };
    const regionCoordinate = {
        latitude: 28.500271,
        longitude: 77.387901,
    };

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // const MorePlaceholderScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsUserLocation
                region={{
                    ...regionCoordinate,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <CustomMarker></CustomMarker>
            </MapView>

            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                // containerHeight={400}
                snapPoints={['15%', '95%']}
            >
                <NearByTemples close={() => bottomSheetRef.current.snapToIndex(0)} />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'green',
    },
});

export default Temples;
