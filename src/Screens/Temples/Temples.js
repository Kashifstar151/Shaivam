import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { RouteTexts } from '../../navigation/RouteText';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export const Temples = () => {
    // const MorePlaceholderScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 28.500271,
                    longitude: 77.387901,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        </View>
    )
}
export const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height, width: Dimensions.get('window').width
    }
})

export default Temples