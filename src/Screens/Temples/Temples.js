import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    PermissionsAndroid,
    Pressable,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import NearByTemples from './NearByTemples';
import { RouteTexts } from '../../navigation/RouteText';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image } from 'react-native';
import {
    clearGetCurrentLocationWatcher,
    getCurrentLocationWatcher,
    getTheLocationName,
    locationPermission,
    onRegionChangeCompleteCallback,
} from '../../Helpers/GeolocationFunc';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import TrackBackToLocSVG from '../../components/SVGs/TrackBackToLocSVG';

/*

1).====> data type for tha marker ==>
            {
                flag:"",
                coordinates:{
                    latitude:"",
                    longitude:"",
                }
            }

*/

const assetMapWithTempleType = {
    1: {
        name: 'Thirumurai Temple',
        size: {},
        path: require('./TempleAssets/ThirumuraiTemple.png'),
        metaData: {
            color: '#E62828',
            letterAssociated: null,
        },
    },
    2: {
        name: 'Temples',
        size: {},
        metaData: {
            color: '#6EDB00',
            letterAssociated: null,
        },
        path: require('./TempleAssets/Temples.png'),
    },
    3: {
        name: 'Popular Temple',
        size: {},
        metaData: {
            color: '#007DE6',
            letterAssociated: null,
        },
        path: require('./TempleAssets/PopularTemples.png'),
    },

    4: {
        name: 'Parashurama Temple',
        size: {},
        metaData: {
            color: '#D700C1',
            letterAssociated: 'C',
        },
        path: require('./TempleAssets/ParashuramaTemple.png'),
    },
    5: {
        name: 'Mukti Sthalam Temple',
        size: {},
        metaData: {
            color: '#D700C1',
            letterAssociated: 'B',
        },
        path: require('./TempleAssets/MuktiSthalamTemple.png'),
    },
    6: {
        name: 'Unknown Temple',
        size: {},
        metaData: {
            color: '#A5A5A5',
            letterAssociated: null,
        },
        path: require('./TempleAssets/UnknownTemple.png'),
    },

    7: {
        name: 'Vaippu Sthalam Temple',
        size: {},
        metaData: {
            color: '#D700C1',
            letterAssociated: 'A',
        },
        path: require('./TempleAssets/VaippuSthalamTemple.png'),
    },
    8: {
        name: 'User Location',
        size: {},
        metaData: {
            color: '#f00',
            letterAssociated: null,
        },
        path: require('./TempleAssets/UsersLocation.png'),
    },
};

export const CustomMarker = ({ flag, coordinate }) => {
    return (
        <Marker coordinate={coordinate} description={'This is a marker in React Natve'}>
            <Image source={assetMapWithTempleType[flag].path} resizeMode="contain" />
        </Marker>
    );
};

export const Temples = () => {
    const bottomSheetRef = useRef(null);

    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });

    const [snapIndex, setSnapIndex] = useState(0);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        setSnapIndex(index);
    }, []);

    const [nearByTempleList, setNearByTempleList] = useState([
        {
            name: 'Vaippu Sthalam Temple',
            flag: 8,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },

        {
            name: 'Thirumurai Temple',
            flag: 1,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Temples',
            flag: 2,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Popular Temple',
            flag: 3,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Parashurama Temple',
            flag: 4,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Mukti Sthalam Temple',
            flag: 5,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                console.log('the flag no is -->', this.flag);

                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
    ]);

    const [padState, setPadState] = useState(1);

    useEffect(() => {
        getCurrentLocationWatcher((val) => {
            console.log('the value is set for map ');
            setRegionCoordinate((prev) => ({ ...prev, ...val }));
        });
        return () => clearGetCurrentLocationWatcher();
    }, []);

    useEffect(() => {
        (async () => {
            await locationPermission();
        })();

        setTimeout(() => {
            setPadState(0);
        }, 100);
    }, [padState]);

    const [userLocName, setUserLocName] = useState('');

    useEffect(() => {
        console.log('the format=jsonv2& and coord==>', regionCoordinate);
        if (regionCoordinate?.latitude && regionCoordinate?.longitude) {
            (async () => {
                const locationDetail = await getTheLocationName({ ...regionCoordinate });

                console.log('the location of the user ==>', locationDetail?.display_name);
                setUserLocName((prev) => {
                    return (
                        locationDetail?.address?.village ||
                        locationDetail?.name ||
                        locationDetail?.display_name
                    );
                });
            })();
        }
    }, [regionCoordinate]);

    const onMapReadyCallback = async () => {
        const state = await locationPermission();

        if (state.status) {
            getCurrentLocationWatcher((val) => {
                console.log('the value is set for map ');
                setRegionCoordinate((prev) => ({ ...prev, ...val }));
            });
        }
    };

    const [viewAreaCoors, setViewAreaCoors] = useState({
        ...regionCoordinate,
    });

    const [userLocation, setUserLocation] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <MapView
                onMapReady={onMapReadyCallback}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onRegionChangeComplete={(args) =>
                    onRegionChangeCompleteCallback(args, setViewAreaCoors)
                }
                // onRegionChange={onRegionChangeCallback}
                // mapPadding={{ top: 0, right: 0, bottom: 700, left: 0 }}
                region={userLocation}
            >
                <CustomMarker
                    flag={8}
                    coordinate={{
                        latitude: 28.5002,
                        longitude: 77.381,
                    }}
                />
                <CustomMarker flag={7} coordinate={regionCoordinate} />
            </MapView>

            <View style={styles.topBarWrapper}>
                <SearchContainerWithIcon />

                {/* <SearchContainerWithIcon /> */}

                <View style={styles.colorContWrapper}>
                    {Object.entries(assetMapWithTempleType).map(([key, value], indx) => (
                        <View style={styles.contWrapper}>
                            <View
                                style={[
                                    styles.textContWrapper,
                                    {
                                        backgroundColor: value.metaData.color,
                                    },
                                ]}
                            >
                                {value.metaData.letterAssociated && (
                                    <Text style={styles.textStyleForCont}>
                                        {value.metaData.letterAssociated}
                                    </Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* floating side btn */}
            <Pressable
                style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    right: 20,
                    bottom: 150,
                    borderRadius: 100,
                    padding: 10,
                    elevation: 2,
                    shadowOffset: {
                        width: 10,
                        height: 8,
                    },
                }}
                onPress={() => {
                    console.log('the uuiuui');
                    setUserLocation((prev) => ({ ...prev, latitude: 28.5002, longitude: 77.381 }));
                }}
            >
                {/* bring user's location into view */}
                <TrackBackToLocSVG fill={'#777'} />
            </Pressable>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                // containerHeight={400}
                snapPoints={['7%', '95%']}
            >
                <NearByTemples
                    locationName={userLocName}
                    data={nearByTempleList}
                    snapIndex={snapIndex}
                    close={() => bottomSheetRef.current.snapToIndex(0)}
                />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    contWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    },
    textContWrapper: {
        height: 14,
        width: 14,
        borderRadius: 2,
        justifyContent: 'center',
    },

    textStyleForCont: {
        alignSelf: 'center',
        paddingVertical: 'auto',
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 16,
    },
});

export default Temples;
