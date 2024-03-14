// filter page on the temple category
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchTemple from './SearchTemple';

const FilteredTemplesPage = ({ navigation, route }) => {
    console.log('🚀 ~ TempleDetails ~ route:', route.params?.data?.name);
    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });

    return (
        <View>
            <View
                style={{
                    position: 'absolute',
                    zIndex: 100,
                    width: '100%',
                    padding: 20,
                }}
            >
                <SearchContainerWithIcon>
                    <SearchTemple
                        route={route.name}
                        value={route.params?.data?.name ? route.params?.data?.name : null}
                        isNavigable={false}
                    />
                </SearchContainerWithIcon>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={null}
                style={styles.map}
                region={regionCoordinate}
            ></MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});

export default FilteredTemplesPage;
