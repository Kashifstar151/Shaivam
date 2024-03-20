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
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import NearByTemples from './NearByTemples';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
import { categoryBtnClbk, markerPressClbk } from './CallBacksForClick.js';
import SearchTemple from './SearchTemple.js';
import { CustomMarker } from './CustomMarker.js';
import { ThemeContext } from '../../Context/ThemeContext.js';
import { RESULTS } from 'react-native-permissions';
import { BlurView } from '@react-native-community/blur';
import { CustomLongBtn } from '../../components/Buttons.js';
import AlertmapSVG from '../../../assets/Images/AlertmapSVG.svg';
import getDimension from '../../Helpers/getDimension.js';

export const Temples = ({ navigation, route }) => {
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
    const { theme } = useContext(ThemeContext);
    const { screenHeight, screenWidth } = getDimension();
    const [showModal, setShowModal] = useState(false);
    const [padState, setPadState] = useState(1);
    const [permissionGranted, setPermissionGranted] = useState(null);
    const onMapReadyCallback = async () => {
        const state = await locationPermission();
        console.log('🚀 ~ onMapReadyCallback ~ state:', state);

        if (state.status) {
            getCurrentLocationWatcher((val) => {
                setUserLocation((prev) => ({ ...prev, ...val }));
                setPermissionGranted(state.permissionType);
            });
        } else {
            setShowModal(true);
            setPermissionGranted(state.permissionType);
        }
    };

    useEffect(() => {
        (async () => {
            await onMapReadyCallback();
        })();

        return () => {
            clearGetCurrentLocationWatcher();
        };
    }, []);

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
        <>
            <View
                style={{ flex: 1, position: 'relative', marginTop: Platform.OS == 'ios' ? 15 : 0 }}
            >
                {userLocation?.latitude ? (
                    <MapView
                        onMapReady={() =>
                            setTimeout(() => {
                                console.log('setting the pad');
                                setPadState(!padState);
                            }, 5000)
                        }
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
                        region={regionCoordinate}
                    >
                        {permissionGranted === RESULTS.GRANTED && (
                            <>
                                <CustomMarker
                                    setPadState={setPadState}
                                    flag={8}
                                    coordinate={userLocation}
                                    keyName={'USER_LOCATION_MARKER'}
                                />
                                <CustomMarker
                                    setPadState={setPadState}
                                    callback={() => {
                                        // setting the type of the marker you pressed
                                        // callback function for naving to page which has the temple details
                                        markerPressClbk(navigation, 7);
                                    }}
                                    flag={7}
                                    coordinate={regionCoordinate}
                                    keyName={'COORDINATE'}
                                />
                            </>
                        )}
                    </MapView>
                ) : null}

                <View style={styles.topBarWrapper}>
                    <SearchContainerWithIcon>
                        <SearchTemple route={route.name} value={null} isNavigable={true} />
                    </SearchContainerWithIcon>

                    <View style={styles.colorContWrapper}>
                        {Object.entries(assetMapWithTempleType).map(([key, value], indx) =>
                            key !== '8' ? (
                                <Pressable
                                    style={styles.contWrapper}
                                    onPress={() => {
                                        // adding callback on the category btn press and navigating to the filter page
                                        categoryBtnClbk(navigation, key);
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
                        setUserLocation((prev) => ({
                            ...prev,
                            latitude: 28.5002,
                            longitude: 77.381,
                        }));
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
                        <NearByTemples
                            locationName={userLocName}
                            data={nearByTempleList}
                            snapIndex={snapIndex}
                            navigation={navigation}
                            close={() => bottomSheetRef.current.snapToIndex(0)}
                        />
                    </BottomSheet>
                ) : null}

                <Modal visible={showModal} animationType="fade" transparent>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <BlurView
                            blurType="dark"
                            blurAmount={1}
                            blurRadius={10}
                            style={styles.contentWrap}
                        ></BlurView>
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
                                onPress={() => {
                                    setShowModal(!showModal);
                                }}
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
        flex: 1,
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
