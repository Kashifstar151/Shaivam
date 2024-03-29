import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { CustomMarker, DraggableMarker } from './CustomMarker';
import {
    clearGetCurrentLocationWatcher,
    getCurrentLocation,
    getCurrentLocationWatcher,
    getTheLocationName,
    locationPermission,
    onRegionChangeCompleteCallback,
} from '../../Helpers/GeolocationFunc';
import { CustomButton, CustomLongBtn } from '../../components/Buttons';
import TrackBackToLocSVG from '../../components/SVGs/TrackBackToLocSVG';
import LocationLogo from '../../components/SVGs/LocationLogo';

const PinTheLocation = ({ setDescription, close }) => {
    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });

    const [userLocation, setUserLocation] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    const [padState, setPadState] = useState(1);
    const dragCoor = useRef({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });
    const [userLocName, setUserLocName] = useState({
        name: '',
        displayName: '',
    });

    const fetchTheName = useCallback(
        async (coors) => {
            // console.log('the location fetch enters  ');
            if (coors?.latitude && coors?.longitude) {
                // console.log('the location is fetching  ');
                const locationDetail = await getTheLocationName({ ...dragCoor.current });
                // console.log('the location  fetching  is done', locationDetail);
                setUserLocName((prev) => {
                    return {
                        ...prev,
                        name: locationDetail?.address?.village || locationDetail?.name,
                        displayName: locationDetail?.display_name,
                    };
                });
            }
        },
        [dragCoor.current]
    );
    const [btnState, setBtnState] = useState(false);

    const onMapReadyCallback = async () => {
        const state = await locationPermission();
        console.log('🚀 ~ onMapReadyCallback ~ state:', state);

        if (state.status) {
            // console.log("the fetch of the user's location");
            getCurrentLocation((val) => {
                fetchTheName(val);
                setUserLocation((prev) => ({ ...prev, ...val }));
            });
            getCurrentLocationWatcher((val) => {
                fetchTheName(val);
                setUserLocation((prev) => ({ ...prev, ...val }));
            });
        }
    };

    useEffect(() => {
        (async () => {
            console.log('the initial call');
            await onMapReadyCallback();
        })();

        return () => {
            clearGetCurrentLocationWatcher();
        };
    }, []);

    return (
        <View style={styles.mainContainer}>
            <MapView
                onMapReady={() =>
                    setTimeout(() => {
                        console.log('setting the pad');
                        setPadState(!padState);
                    }, 5000)
                }
                provider={PROVIDER_GOOGLE}
                initialRegion={regionCoordinate}
                style={styles.map}
                onRegionChangeComplete={(args, gesture) => {
                    if (gesture.isGesture) {
                        onRegionChangeCompleteCallback(args, (input) => {
                            setRegionCoordinate(input);
                        });
                    }
                }}
                region={regionCoordinate}
            >
                <CustomMarker
                    setPadState={setPadState}
                    flag={8}
                    coordinate={userLocation}
                    keyName={'USER_LOCATION_MARKER'}
                />

                <DraggableMarker
                    callback={(e) => {
                        dragCoor.current = e;
                        fetchTheName(e);
                    }}
                    flag={7}
                    coordinate={dragCoor.current}
                    keyName={'COORDINATE2'}
                />
            </MapView>

            <View style={styles.overlayHeight}>
                <View>
                    <CustomButton
                        svg={<TrackBackToLocSVG width={16} height={16} fill={'#fff'} />}
                        onPress={() => {
                            // write the function that we have used in the temple module to get the current location and set the name of the location in the near by place name
                            dragCoor.current = { ...userLocation };
                            fetchTheName(dragCoor.current);
                            setRegionCoordinate((prev) => ({ ...prev, ...userLocation }));
                        }}
                        style={{
                            margin: 10,
                            elevation: 3,
                            shadowColor: 'black',
                            alignSelf: 'center',
                            borderRadius: 20,
                        }}
                        text={'Locate me'}
                        backgroundColor={'#C1554E'}
                        textColor={'#fff'}
                    />
                </View>

                <View style={styles.lowerContainer}>
                    <Text
                        style={{
                            fontFamily: 'Lora-Bold',
                            fontSize: 16,
                            lineHeight: 21,
                            color: '#777777',
                        }}
                    >
                        Place the marker on the temple location
                    </Text>
                    {userLocName?.name && (
                        <View style={styles.boldLocationNameConatiner}>
                            <LocationLogo fill={'#C1554E'} />
                            <Text style={styles.boldTextLocation}>
                                {userLocName.name ?? 'Dinesh Nagar'}
                            </Text>
                        </View>
                    )}

                    {userLocName?.displayName && (
                        <Text style={styles.largeFormName}>
                            {userLocName?.displayName ??
                                '1234 421 - B Block, Dinesh nagar, Koramangala, Bangalore, Karnataka, India'}
                        </Text>
                    )}

                    <CustomLongBtn
                        onPress={() => {
                            setBtnState(!btnState);
                            setDescription((prev) => {
                                return userLocName.displayName;
                            });
                            close();
                        }}
                        text={'Pin Location'}
                        textStyle={{
                            color: '#4C3600',
                            fontFamily: 'Mulish-Bold',
                        }}
                        containerStyle={{
                            backgroundColor: '#FCB300',
                        }}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: { flex: 1, ...StyleSheet.absoluteFillObject },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    boldLocationNameConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 10,
    },
    largeFormName: {
        color: '#777777',
        fontFamily: 'Mulish-Regular',
        paddingBottom: 10,
    },
    boldTextLocation: {
        fontFamily: 'Mulish-Bold',
        fontSize: 18,
        color: 'black',
        lineHeight: 22,
    },

    lowerContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
    },

    overlayHeight: {
        width: '100%',
        minHeight: Dimensions.get('screen').height * 0.25,
        position: 'absolute',
        bottom: 0,
    },
});
export default PinTheLocation;