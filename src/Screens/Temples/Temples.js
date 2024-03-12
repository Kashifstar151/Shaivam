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
    Alert,
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
import AnimatedRightSideView from '../../components/AnimatedRightSideView';
import assetMapWithTempleType from './AssetMapWithTempleType.js';
import InnerContextOfAnimatedSideBox from './InnerContextOfAnimatedSideBox.js';
import MapIconSVG from '../../components/SVGs/MapIconSVG.js';

export const CustomMarker = ({ flag, coordinate }) => {
    return (
        <Marker
            tracksViewChanges={false}
            coordinate={coordinate}
            description={'This is a marker in React Natve'}
        >
            <Image source={assetMapWithTempleType[flag].path} resizeMode="contain" />
        </Marker>
    );
};

export const Temples = ({ navigation }) => {
    const bottomSheetRef = useRef(null);

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

    // const [userLocation, setUserLocation] = useState();

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
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },

        {
            name: 'Thirumurai Temple',
            flag: 1,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Temples',
            flag: 2,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Popular Temple',
            flag: 3,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Parashurama Temple',
            flag: 4,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Mukti Sthalam Temple',
            flag: 5,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
        {
            name: 'Unknown Temple',
            flag: 6,
            metadata: function () {
                return assetMapWithTempleType[this.flag]?.metaData;
            },
        },
    ]);

    const [padState, setPadState] = useState(1);

    const onMapReadyCallback = async () => {
        const state = await locationPermission();

        if (state.status) {
            // Alert.alert(`the status is ----> ${state.status}`);
            getCurrentLocationWatcher((val) => {
                // console.log('the value is set for map ', val);
                setUserLocation((prev) => ({ ...prev, ...val }));
            });
        }
    };

    useEffect(() => {
        (async () => {
            await onMapReadyCallback();
        })();

        // getCurrentLocationWatcher((val) => {
        //     console.log('the value is set for map ');
        //     setUserLocation((prev) => ({ ...prev, ...val }));
        // });
        return () => {
            // Alert.alert('clearing the watcher ');
            clearGetCurrentLocationWatcher();
        };
    }, []);

    useEffect(() => {
        // (async () => {
        //     await locationPermission();
        // })();

        setTimeout(() => {
            setPadState(0);
        }, 100);
    }, [padState]);

    const [userLocName, setUserLocName] = useState('');

    useEffect(() => {
        if (userLocation?.latitude && userLocation?.longitude) {
            (async () => {
                const locationDetail = await getTheLocationName({ ...regionCoordinate });
                setUserLocName((prev) => {
                    return (
                        locationDetail?.address?.village ||
                        locationDetail?.name ||
                        locationDetail?.display_name
                    );
                });
            })();
        }
    }, [userLocation]);

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            {userLocation?.latitude ? (
                <MapView
                    // onMapReady={onMapReadyCallback}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={null}
                    style={styles.map}
                    onRegionChangeComplete={(args, gesture) => {
                        if (gesture.isGesture) {
                            onRegionChangeCompleteCallback(args, (input) => {
                                setRegionCoordinate(input);
                            });
                        }
                    }}
                    // mapPadding={{ top: 0, right: 0, bottom: 700, left: 0 }}
                    region={regionCoordinate}
                >
                    <CustomMarker flag={8} coordinate={userLocation} />
                    <CustomMarker flag={7} coordinate={regionCoordinate} />
                </MapView>
            ) : null}

            <View style={styles.topBarWrapper}>
                <SearchContainerWithIcon />

                <View style={styles.colorContWrapper}>
                    {Object.entries(assetMapWithTempleType).map(([key, value], indx) =>
                        key !== '8' ? (
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
                        ) : null
                    )}
                </View>
            </View>

            {/* floating side btn */}
            <Pressable
                style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    right: 20,
                    bottom: Dimensions.get('window').height * 0.2,
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
                    setRegionCoordinate((prev) => ({
                        ...prev,
                        latitude: 28.5002,
                        longitude: 77.381,
                    }));
                }}
            >
                {/* bring user's location into view */}
                <TrackBackToLocSVG fill={'#777'} />
            </Pressable>

            {/* for test purpose  */}
            {/* <View style={{ position: 'absolute', backgroundColor: 'red', top: 10 }}>
                <Text>{JSON.stringify(userLocation)}</Text>
            </View> */}

            <AnimatedRightSideView heading={'Map Legend'} RightIcon={<MapIconSVG />}>
                <InnerContextOfAnimatedSideBox />
            </AnimatedRightSideView>
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
        flex: 1,
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
        fontWeight: '800',
        color: 'white',
        lineHeight: 16,
        fontSize: 10,
    },
});

export default Temples;
