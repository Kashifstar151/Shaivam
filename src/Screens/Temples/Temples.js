import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import NearByTemples from './NearByTemples';
import { RouteTexts } from '../../navigation/RouteText';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image } from 'react-native';
import { clearGetCurrentLocationWatcher, getCurrentLocationWatcher, getTheLocationName, locationPermission, onRegionChangeCompleteCallback } from '../../Helpers/GeolocationFunc';

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
        path: require('./ThirumuraiTemple.png'),
        metaData: {
            color: "#E62828"
        }
    },
    2: {
        name: 'Temples',
        size: {},
        metaData: {
            color: "#6EDB00"
        },
        path: require('./Temples.png'),
    },
    3: {
        name: 'Popular Temple',
        size: {},
        metaData: {
            color: "#007DE6"
        },
        path: require('./PopularTemples.png'),
    },

    4: {
        name: 'Parashurama Temple',
        size: {},
        metaData: {
            color: "#D700C1"
        },
        path: require('./ParashuramaTemple.png'),
    },
    5: {
        name: 'Mukti Sthalam Temple',
        size: {},
        metaData: {
            color: "#D700C1"
        },
        path: require('./MuktiSthalamTemple.png'),
    },
    6: {
        name: 'Unknown Temple',
        size: {},
        metaData: {
            color: "#A5A5A5"
        },
        path: require('./UnknownTemple.png'),
    },
    7: {
        name: 'User Location',
        size: {},
        metaData: {
            color: "#f00"
        },
        path: require('./UsersLocation.png'),
    },
    8: {
        name: 'Vaippu Sthalam Temple',
        size: {},
        metaData: {
            color: "#D700C1"
        },
        path: require('./VaippuSthalamTemple.png'),
    },
};

export const CustomMarker = ({ flag, coordinate }) => {
    return (
        <Marker
            coordinate={coordinate}

            description={'This is a marker in React Natve'}
        >
            <Image source={assetMapWithTempleType[flag].path} resizeMode="contain" />

        </Marker>
    );
};

export const Temples = () => {
    const bottomSheetRef = useRef(null);
    const userLocation = {
        latitude: 28.500271,
        longitude: 77.387901,
    };
    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: ""
    })

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [nearByTempleList, setNearByTempleList] = useState([
        {
            name: "Ambey ma temple",
            flag: "",
            metadata: () => {
                return assetMapWithTempleType[flag]
            }
        }
    ])

    const [padState, setPadState] = useState(1)

    useEffect(() => {
        getCurrentLocationWatcher((val) => {
            console.log("the value is set for map ")
            setRegionCoordinate(prev => ({ ...prev, ...val }))
        })
        return () => clearGetCurrentLocationWatcher()
    }, [])

    useEffect(() => {

        (async () => {
            await locationPermission()
        })()


        setTimeout(() => {
            setPadState(0)
        }, 100)


    }, [padState])

    const [userLocName, setUserLocName] = useState("")


    useEffect(() => {
        console.log("the format=jsonv2& and coord==>", regionCoordinate)
        if (regionCoordinate?.latitude && regionCoordinate?.longitude) {
            (async () => {
                const locationDetail = await getTheLocationName({ ...regionCoordinate })

                console.log("the location of the user ==>", locationDetail?.display_name)
                setUserLocName(prev => {
                    return locationDetail?.address?.village || locationDetail?.name || locationDetail?.display_name
                })
            })()
        }
    }, [regionCoordinate])




    const onMapReadyCallback = async () => {
        // console.log("the location permission------------------------------------------------------------------------------")
        const state = await locationPermission()

        if (state.status) {
            getCurrentLocationWatcher((val) => {
                console.log("the value is set for map ")
                setRegionCoordinate(prev => ({ ...prev, ...val }))
            })
        }
    }

    // useEffect(() => {
    //     console.log("the region coors have been changed ==>", viewAreaCoors)
    // }, [viewAreaCoors])

    const [viewAreaCoors, setViewAreaCoors] = useState({
        ...regionCoordinate
    })
    return (
        <View style={{ flex: 1 }}>
            <MapView
                onMapReady={onMapReadyCallback}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onRegionChangeComplete={args => onRegionChangeCompleteCallback(args, setViewAreaCoors)}
                // onRegionChange={onRegionChangeCallback}
                // mapPadding={{ top: 0, right: 0, bottom: 700, left: 0 }}
                region={regionCoordinate}
            >
                <CustomMarker flag={4} coordinate={{
                    latitude: 28.500271,
                    longitude: 77.387901,

                }} />
                <CustomMarker flag={7} coordinate={regionCoordinate} />
            </MapView>

            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                // containerHeight={400}
                snapPoints={['15%', '95%']}
            >
                <NearByTemples locationName={userLocName} data={nearByTempleList} close={() => bottomSheetRef.current.snapToIndex(0)} />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        justifyContent: 'center',
        position: 'absolute',
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
