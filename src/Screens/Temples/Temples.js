import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    ImageBackground,
    Platform,
    Modal,
    AppState,
    ActivityIndicator,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import NearByTemples from './NearByTemples';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    checkPermissionAccess,
    clearGetCurrentLocationWatcher,
    getCurrentLocation,
    getCurrentLocationWatcher,
    getTheLocationName,
    getTheLocationPermissionToStorage,
    onRegionChangeCompleteCallback,
    requestThePermission,
} from '../../Helpers/GeolocationFunc';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import TrackBackToLocSVG from '../../components/SVGs/TrackBackToLocSVG';
import AnimatedRightSideView from '../../components/AnimatedRightSideView';
import assetMapWithTempleType from './AssetMapWithTempleType.js';
import InnerContextOfAnimatedSideBox from './InnerContextOfAnimatedSideBox.js';
import MapIconSVG from '../../components/SVGs/MapIconSVG.js';
import { categoryBtnClbk, markerPressClbk } from './CallBacksForClick.js';
import SearchTemple from './SearchTemple.js';
import { CustomMarker, MarkerCallOut } from './CustomMarker.js';
import { ThemeContext } from '../../Context/ThemeContext.js';
import { openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { BlurView } from '@react-native-community/blur';
import { CustomLongBtn } from '../../components/Buttons.js';
import AlertmapSVG from '../../../assets/Images/AlertmapSVG.svg';
import getDimension from '../../Helpers/getDimension.js';
import {
    // useGetNearByTemplesQuery,
    useLazyGetNearByTemplesQuery,
} from '../../store/features/Temple/TemplApiSlice';
import { useTranslation } from 'react-i18next';
import RefreshSVG from '../../components/SVGs/RefreshSVG.js';

// setting the delta

export const Temples = ({ navigation, route }) => {
    const bottomSheetRef = useRef(null);
    const [
        getNearByTemples,
        { data, isSuccess, isFetching, isLoading, isError, isUninitialized, error, status },
        lastPromiseInfo,
    ] = useLazyGetNearByTemplesQuery();
    // console.log('🚀 ~ Temples ~ data:', JSON.stringify(data, null, 2));

    const { screenHeight, screenWidth } = getDimension();

    const LATITUDE_DELTA = 0.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (screenWidth / screenHeight);

    const [userLocation, setUserLocation] = useState({});

    const [regionCoordinate, setRegionCoordinate] = useState({});

    const [snapIndex, setSnapIndex] = useState(0);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
        setSnapIndex(index);
    }, []);

    const { theme } = useContext(ThemeContext);
    const [showModal, setShowModal] = useState(false);
    const [padState, setPadState] = useState(1);
    const [permissionGranted, setPermissionGranted] = useState(null);

    const [userLocName, setUserLocName] = useState({
        name: '',
        showName: 'false',
    });

    const permissionTypeRef = useRef(
        Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        })
    );

    // Alert.alert('the render');

    const onMapReadyCallback = async () => {
        let state = await checkPermissionAccess(permissionTypeRef.current);
        let isPermissionExist = await getTheLocationPermissionToStorage();
        setPermissionGranted(() => state);

        if (
            state !== RESULTS.GRANTED &&
            (isPermissionExist === 'undefined' || isPermissionExist === null)
        ) {
            let requestedVal = await requestThePermission(permissionTypeRef.current);
            setPermissionGranted(() => requestedVal.permissionType);
            if (requestedVal.permissionType === RESULTS.GRANTED) {
                fetchTheCurrentLocation();
            }
        } else if (state === RESULTS.DENIED) {
            let requestedVal = await requestThePermission(permissionTypeRef.current);
            setPermissionGranted(() => requestedVal.permissionType);
        } else if (state === RESULTS.BLOCKED) {
            setShowModal(!showModal);
        } else if (state === RESULTS.GRANTED) {
            fetchTheCurrentLocation();

            getCurrentLocationWatcher((val) => {
                setUserLocation((prev) => ({ ...prev, ...val }));
            });
        } else {
            setShowModal(true);
        }
    };
    const fetchTheCurrentLocation = () => {
        getCurrentLocation((val) => {
            mapRef.current?.animateCamera({ center: val }, { duration: 1000 });
            setUserLocation((prev) => ({
                ...prev,
                ...val,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }));
            setRegionCoordinate((prev) => {
                getNearByTemples({ ...prev, ...val });
                return {
                    ...prev,
                    ...val,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };
            });
        });
    };

    const handleTrackBack = async () => {
        let theCurrentPermission = await checkPermissionAccess(permissionTypeRef.current);
        if (theCurrentPermission === RESULTS.GRANTED) {
            setPermissionGranted(() => RESULTS.GRANTED);
            mapRef.current?.animateCamera({ center: userLocation }, { duration: 1000 });
            setRegionCoordinate((prev) => ({
                ...prev,
                // latitude: 28.5002,
                // longitude: 77.381,
                ...userLocation,
            }));
        } else {
            requestThePermission(permissionTypeRef.current).then((finalState) => {
                grantState = finalState.permissionType;
                setPermissionGranted(() => grantState);
                if (finalState.permissionType === RESULTS.BLOCKED) {
                    setShowModal(!showModal);
                }
            });
        }
    };

    // extra code
    const subcriptionEventListner = useRef();

    const unmountTheListner = () => {
        if (subcriptionEventListner.current) {
            subcriptionEventListner.current.remove();
        }
    };
    const handleFocusEvent = async () => {
        // console.log('the mounting of the listner confirmed ');
        let grantState = '';
        let theCurrentPermission = await checkPermissionAccess(permissionTypeRef.current);
        if (theCurrentPermission !== RESULTS.GRANTED) {
            requestThePermission(permissionTypeRef.current).then((finalState) => {
                grantState = finalState.permissionType;
                setPermissionGranted(() => finalState.permissionType);
                if (finalState.permissionType === RESULTS.BLOCKED) {
                    setShowModal(!showModal);
                }
            });
        } else {
            setPermissionGranted(() => RESULTS.GRANTED);
        }
        // // todos: we have commented THE above code because its breaking in  condition when the permission is removed
        // if (theCurrentPermission === RESULTS.GRANTED) {
        //     setPermissionGranted(() => RESULTS.GRANTED);
        // }
        unmountTheListner();
        return;
    };
    // end

    const handleModalAction = async () => {
        subcriptionEventListner.current = AppState.addEventListener('focus', handleFocusEvent);
        openSettings();
        setShowModal(!showModal);
    };

    useEffect(() => {
        onMapReadyCallback();
        return () => {
            clearGetCurrentLocationWatcher();
        };
    }, []);

    const fetchTheLocationName = useCallback(async () => {
        const locationDetail = await getTheLocationName({ ...regionCoordinate });
        if (locationDetail?.status === 'SUCCESS') {
            setUserLocName((prev) => {
                return {
                    name:
                        locationDetail?.data?.address?.village ||
                        locationDetail?.data?.name ||
                        locationDetail?.data?.display_name,
                    showName: true,
                };
            });
        } else if (locationDetail.status === 'FAILED') {
            console.log('the error has occured ===>', locationDetail?.err);
        }
    }, [regionCoordinate]);

    useEffect(() => {
        if (regionCoordinate?.latitude && regionCoordinate?.longitude) {
            fetchTheLocationName();
        }
    }, [regionCoordinate]);

    const { t } = useTranslation();
    const mapRef = useRef();
    const [mapInteractivityState, setMapInteractivityState] = useState(true);
    const setSearchParams = (item) => {
        mapRef.current?.animateCamera(
            {
                center: {
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lon),
                },
            },
            { duration: 1000 }
        );
        setRegionCoordinate((prev) => {
            getNearByTemples({
                ...prev,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
            });
            return {
                ...prev,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
            };
        });
    };

    return (
        <>
            <View
                style={{ flex: 1, position: 'relative', marginTop: Platform.OS == 'ios' ? 15 : 0 }}
            >
                {/* {userLocation?.latitude ? ( */}
                <MapView
                    onMapReady={() =>
                        setTimeout(() => {
                            console.log('setting the pad');
                            setPadState(!padState);
                        }, 5000)
                    }
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        longitude: 77.40369287235171,
                        latitude: 28.49488467262243,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={styles.map}
                    onRegionChangeComplete={(args, gesture) => {
                        if (gesture.isGesture) {
                            onRegionChangeCompleteCallback(args, (input) => {
                                console.log('the gesture is true');
                                mapRef.current?.animateCamera({ center: input }, { duration: 500 });
                                setRegionCoordinate(() => input);
                            });
                        }
                    }}
                    // region={regionCoordinate}
                    // zoomEnabled
                    zoomEnabled={mapInteractivityState}
                    scrollEnabled={mapInteractivityState}
                    ref={mapRef}
                >
                    {permissionGranted === RESULTS.GRANTED && (
                        <View>
                            {userLocation?.latitude && userLocation?.longitude && (
                                <MarkerCallOut
                                    setPadState={setPadState}
                                    flag={8}
                                    coordinate={userLocation}
                                    keyName={'USER_LOCATION_MARKER'}
                                    description={"User's location"}
                                />
                            )}
                            {/* <MarkerCallOut
                                    setPadState={setPadState}
                                    flag={7}
                                    coordinate={regionCoordinate}
                                    keyName={'COORDINATE'}
                                    description={"Region's location"}
                                /> */}
                        </View>
                    )}
                    {data?.temples?.map((item, index) => (
                        <>
                            {item?.latitude && item?.longitude && (
                                <>
                                    {/* <Marker
                                        tracksViewChanges={false}
                                        coordinate={{
                                            longitude: item?.longitude,
                                            latitude: item?.latitude,
                                        }}
                                        description={item?.name}
                                        // image={assetMapWithTempleType[item?.flag].path}
                                        style={{
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    ></Marker> */}
                                    <MarkerCallOut
                                        setPadState={setPadState}
                                        callback={() => {
                                            //   setting the type of the marker you pressed
                                            //   callback function for naving to page which has the temple details
                                            markerPressClbk(
                                                navigation,
                                                item?.flag,
                                                item,
                                                userLocation
                                            );
                                        }}
                                        flag={item?.flag}
                                        templeId={item?.id}
                                        coordinate={{
                                            longitude: item?.longitude,
                                            latitude: item?.latitude,
                                        }}
                                        keyName={'COORDINATE'}
                                        description={item?.name}
                                    />
                                </>
                            )}
                        </>
                    ))}
                </MapView>
                {/* ) : null} */}

                <Pressable
                    style={[
                        styles.floatingBtn,
                        {
                            bottom: Dimensions.get('window').height * 0.275,
                        },
                    ]}
                    onPress={() => {
                        // setSkip(() => false);
                        getNearByTemples(regionCoordinate);
                    }}
                    disabled={isFetching}
                >
                    {/* bring user's location into view */}
                    <RefreshSVG
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        fill={!isFetching ? '#777' : '#bababa'}
                    />
                </Pressable>

                {/* floating side btn */}
                <Pressable
                    style={[
                        styles.floatingBtn,
                        {
                            bottom: Dimensions.get('window').height * 0.2,
                        },
                    ]}
                    onPress={handleTrackBack}
                >
                    {/* bring user's location into view */}
                    <TrackBackToLocSVG fill={'#777'} />
                </Pressable>

                {/* for test purpose  */}
                {/* <View style={{ position: 'absolute', backgroundColor: 'red', top: 10 }}>
                <Text>{JSON.stringify(userLocation)}</Text>
            </View> */}

                <AnimatedRightSideView heading={t('Map Legend')} RightIcon={<MapIconSVG />}>
                    <InnerContextOfAnimatedSideBox
                        navigation={navigation}
                        regionCoordinate={regionCoordinate}
                    />
                </AnimatedRightSideView>

                <View style={styles.topBarWrapper}>
                    <View style={styles.colorContWrapper}>
                        {Object.entries(assetMapWithTempleType)
                            .reverse()
                            .map(([key, value], indx) =>
                                !(key == 8 || key == 9) ? (
                                    <Pressable
                                        style={styles.contWrapper}
                                        onPress={() => {
                                            // adding callback on the category btn press and navigating to the filter page
                                            if (permissionGranted === RESULTS.GRANTED) {
                                                categoryBtnClbk(navigation, key, regionCoordinate);
                                            } else {
                                                setShowModal(!showModal);
                                            }
                                        }}
                                        key={indx}
                                    >
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
                                    </Pressable>
                                ) : null
                            )}
                    </View>

                    <SearchContainerWithIcon>
                        <SearchTemple
                            route={route.name}
                            value={null}
                            isNavigable={false}
                            isDisable={false}
                            isAutoComplete={true}
                            setRegionCoordinate={(val) => setSearchParams(val)}
                            setMapInteractivityState={setMapInteractivityState}
                        />
                    </SearchContainerWithIcon>
                </View>

                {permissionGranted === 'granted' ? (
                    <BottomSheet
                        ref={bottomSheetRef}
                        onChange={handleSheetChanges}
                        snapPoints={['15%', '95%']}
                        backdropComponent={(props) => (
                            <BottomSheetBackdrop
                                opacity={1}
                                appearsOnIndex={1}
                                disappearsOnIndex={0}
                                pressBehavior={'collapse'}
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
                                ></ImageBackground>
                            </BottomSheetBackdrop>
                        )}
                    >
                        {userLocName?.showName ? (
                            <NearByTemples
                                userLocation={userLocation}
                                route={route}
                                setRegionCoordinate={(val) => setSearchParams(val)}
                                locationName={userLocName?.name}
                                data={data?.temples}
                                snapIndex={snapIndex}
                                navigation={navigation}
                                close={() => bottomSheetRef.current.snapToIndex(0)}
                            />
                        ) : (
                            <ActivityIndicator />
                        )}
                    </BottomSheet>
                ) : null}

                <Modal visible={showModal} animationType="fade" transparent>
                    <BlurView
                        blurType="dark"
                        blurAmount={1}
                        blurRadius={10}
                        style={styles.contentWrap}
                    ></BlurView>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <View
                            style={[
                                {
                                    backgroundColor: '#FFFFFF',
                                    overflow: 'hidden',
                                    borderRadius: 10,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 20,
                                    width: screenWidth * 0.85,
                                    height: screenHeight * 0.3,
                                },
                            ]}
                        >
                            <AlertmapSVG />
                            <Text
                                style={{
                                    color: 'black',
                                    fontFamily: 'Mulish-Bold',
                                    fontSize: 18,
                                }}
                            >
                                Uh oh, We can't locate you!
                            </Text>
                            <Text
                                style={{
                                    color: '#777777',
                                    textAlign: 'center',
                                    fontFamily: 'Mulish-Regular',
                                    fontSize: 14,
                                    lineHeight: 18,
                                }}
                            >
                                Your location services need to be turned on for Shaivam Temples to
                                work
                            </Text>
                            <CustomLongBtn
                                // onPress={handleModalAction}
                                text={'Enable location access'}
                                textStyle={{
                                    color: '#4C3600',
                                    fontFamily: 'Mulish-Bold',
                                    paddingHorizontal: 15,
                                }}
                                containerStyle={{
                                    backgroundColor: '#FCB300',
                                    alignSelf: 'center',
                                    marginBottom: 5,
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
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
    contentWrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    floatingBtn: {
        position: 'absolute',
        backgroundColor: 'white',
        right: 20,
        borderRadius: 100,
        padding: 10,
        elevation: 2,
        shadowOffset: {
            width: 10,
            height: 8,
        },
    },
    svgWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '55%',
        aspectRatio: 1,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        // paddingTop: 15,
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'column-reverse',
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
