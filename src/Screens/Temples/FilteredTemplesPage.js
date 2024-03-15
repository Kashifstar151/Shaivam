// filter page on the temple category
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchTemple from './SearchTemple';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { ImageBackground } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';

const FilteredTemplesPage = ({ navigation, route }) => {
    console.log('🚀 ~ TempleDetails ~ route:', route.params?.data?.name);
    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });
    const bottomSheetRef = useRef(null);
    const [snapIndex, setSnapIndex] = useState(0);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        setSnapIndex(index);
    }, []);

    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={null}
                style={styles.map}
                region={regionCoordinate}
            ></MapView>
            <View
                style={{
                    position: 'absolute',
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
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                // containerHeight={400}
                snapPoints={['10%', '50%', '95%']}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        opacity={1}
                        appearsOnIndex={2}
                        disappearsOnIndex={1}
                        // onPress={() => navigation.popToTop()}
                        {...props}
                    >
                        {/* <View style={{ backgroundColor: 'red', flex: 1 }}></View> */}
                        <ImageBackground
                            source={
                                theme.colorscheme === 'light'
                                    ? require('../../../assets/Images/Background.png')
                                    : require('../../../assets/Images/BackgroundCommon.png')
                            }
                            style={{
                                paddingVertical: 0,
                                borderRadius: 10,
                                width: '100%',
                                height: '40%',
                            }}
                        >
                            {/* <View style={{ backgroundColor: '#AA4A44', position: 'absolute', height: 220, width: '100%' }}> */}
                            {props.children}
                            {/* </View> */}
                        </ImageBackground>
                    </BottomSheetBackdrop>
                )}
            >
                <Text style={{ color: 'black' }}>dhshdjksk</Text>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});

export default FilteredTemplesPage;
