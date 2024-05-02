import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchTemple from './SearchTemple';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { ImageBackground } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { CustomMarker } from './CustomMarker';

const BottomSheetTempleTemplate = ({
    navigation,
    regionCoordinate = {
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    },
    showSearchBarWhenFullSize,
    initialIndexOfSize,
    snapPoints = ['10%', '50%', '95%'],
    disappearsOnIndex = 1,
    appearsOnIndex = 2,
    isNavigable,
    routeName, //route.name
    valueToBePreFilled, //route.params?.data?.name ?? route.params?.searchText
    children,
    data
}) => {
    const bottomSheetRef = useRef(null);
    const [padState, setPadState] = useState(null)
    const [snapIndex, setSnapIndex] = useState(0);
    const handleSheetChanges = useCallback((indx) => {
        console.log('handleSheetChanges', indx);
        setSnapIndex(indx);
    }, []);

    const { theme } = useContext(ThemeContext);
    return (
        <View style={{ flex: 1, marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={null}
                style={styles.map}
                region={regionCoordinate}
            >
                <CustomMarker
                    setPadState={setPadState}
                    callback={() => {
                        // setting the type of the marker you pressed
                        // callback function for naving to page which has the temple details
                        markerPressClbk(navigation, 7);
                    }}
                    flag={9}
                    coordinate={{
                        latitude: data?.attributes?.temple?.lat,
                        longitude: data?.attributes?.temple?.long
                    }}
                    keyName={'COORDINATE'}
                />
            </MapView>
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    padding: 20,
                }}
            >
                <SearchContainerWithIcon>
                    <SearchTemple
                        route={routeName}
                        value={valueToBePreFilled}
                        isNavigable={isNavigable}
                    />
                </SearchContainerWithIcon>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoints}
                index={initialIndexOfSize}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        opacity={1}
                        appearsOnIndex={appearsOnIndex}
                        disappearsOnIndex={disappearsOnIndex}
                        pressBehavior={'collapse'}
                        {...props}
                    >
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
                        ></ImageBackground>
                    </BottomSheetBackdrop>
                )}
            >
                {snapIndex === appearsOnIndex && showSearchBarWhenFullSize ? (
                    <View
                        style={{
                            width: '100%',
                            padding: 20,
                        }}
                    >
                        <SearchContainerWithIcon>
                            <SearchTemple
                                route={routeName}
                                value={valueToBePreFilled}
                                isNavigable={isNavigable}
                            />
                        </SearchContainerWithIcon>
                    </View>
                ) : null}
                {children}
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

export default BottomSheetTempleTemplate;
