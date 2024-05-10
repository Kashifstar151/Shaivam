/*
 ? the value setter over here returns the value like :
    * {"address": {"ISO3166-2-lvl4": "IN-UP", "country": "India", "country_code": "in", "county": "", "postcode": "", "state": "", "state_district": "", "village": ""}, "addresstype": "", "boundingbox": [num,num,num,num], "category": "", "display_name": "", "importance": "", "lat": "", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright", "lon": "", "name": "", "osm_id": "", "osm_type":"", "place_id": , "place_rank": , "type": ""}
*/

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
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
import { ThemeContext } from '../../Context/ThemeContext';
import BackIcon from '../../../src/assets/Images/BackIcon.svg';
import WhiteBackButton from '../../../src/assets/Images/arrow (1) 1.svg';
import SearchTemple from './SearchTemple';
import getDimension from '../../Helpers/getDimension';

const PinTheLocation = ({ setDescription, close, valueSetter }) => {
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

    const { theme } = useContext(ThemeContext);

    const fetchTheName = useCallback(
        async (coors) => {
            // console.log('the location fetch enters  ');
            if (coors?.latitude && coors?.longitude) {
                // console.log('the location is fetching  ');
                const locationDetail = await getTheLocationName({ ...dragCoor.current });
                console.log('the location  fetching  is done', locationDetail);
                if (locationDetail.status === 'SUCCESS') {
                    setUserLocName((prev) => {
                        return {
                            ...prev,
                            name: locationDetail?.data?.address?.village || locationDetail?.name,
                            displayName: locationDetail?.data?.display_name,
                        };
                    });
                    valueSetter(locationDetail?.data);
                } else if (locationDetail.status === 'FAILED') {
                    alert('erorr occured');
                    console.log('The error is ==>', locationDetail?.err);
                }
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

    const { screenWidth } = getDimension();
    const mapRef = useRef();
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
                // onRegionChangeComplete={(args, gesture) => {
                //     if (gesture.isGesture) {
                //         onRegionChangeCompleteCallback(args, (input) => {
                //             setRegionCoordinate(input);
                //         });
                //     }
                // }}
                // region={regionCoordinate}
                ref={mapRef}
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
                    flag={1}
                    coordinate={dragCoor.current}
                    keyName={'COORDINATE2'}
                />
            </MapView>
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    top: 10,
                    gap: 15,
                    alignItems: 'center',
                }}
            >
                <Pressable
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                        backgroundColor: '#F3F3F3',
                        elevation: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => close(1)}
                >
                    {theme.colorscheme !== 'light' ? <WhiteBackButton /> : <BackIcon />}
                </Pressable>
                <SearchTemple
                    isDisable={false}
                    isAutoComplete={true}
                    positionSuggestionBox={{
                        position: 'absolute',
                        top: 60,
                        zIndex: 100,
                        width: screenWidth - 30,
                        marginLeft: -60,
                    }}
                    setRegionCoordinate={(item) => {
                        mapRef.current?.animateCamera(
                            {
                                center: {
                                    latitude: parseFloat(item.lat),
                                    longitude: parseFloat(item.lon),
                                },
                            },
                            { duration: 1000 }
                        );

                        dragCoor.current = {
                            ...item,
                            latitude: parseFloat(item.lat),
                            longitude: parseFloat(item.lon),
                        };
                        fetchTheName(dragCoor.current);
                        setRegionCoordinate((prev) => ({
                            ...prev,
                            latitude: parseFloat(item.lat),
                            longitude: parseFloat(item.lon),
                        }));
                    }}
                />
            </View>

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
                            // setDescription((prev) => {
                            //     return userLocName.displayName;
                            // });
                            // valueSetter(userLocName.displayName);
                            close(1);
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
    mainContainer: { flex: 1, position: 'relative' },
    map: {
        // bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
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
