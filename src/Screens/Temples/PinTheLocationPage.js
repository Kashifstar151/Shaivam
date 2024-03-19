import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { CustomMarker, DraggableMarker, MarkerCallOut } from './CustomMarker';
import { onRegionChangeCompleteCallback } from '../../Helpers/GeolocationFunc';
import { CustomButton, CustomLongBtn } from '../../components/Buttons';
import TrackBackToLocSVG from '../../components/SVGs/TrackBackToLocSVG';
import LocationLogo from '../../components/SVGs/LocationLogo';

const PinTheLocation = ({ navigation }) => {
    console.log('🚀 ~ PinTheLocation ~ navigation:', navigation);
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

    const [btnState, setBtnState] = useState(false);
    console.log('🚀 ~ PinTheLocation ~ dragCoor:', dragCoor.current);
    return (
        <View style={{ backgroundColor: 'red', flex: 1, ...StyleSheet.absoluteFillObject }}>
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
                <CustomMarker
                    setPadState={setPadState}
                    flag={8}
                    coordinate={userLocation}
                    keyName={'USER_LOCATION_MARKER'}
                />

                <DraggableMarker
                    callback={(e) => {
                        dragCoor.current = e;
                    }}
                    flag={7}
                    coordinate={dragCoor.current}
                    keyName={'COORDINATE2'}
                />
            </MapView>

            <View
                style={{
                    width: '100%',
                    minHeight: Dimensions.get('screen').height * 0.25,
                    position: 'absolute',
                    bottom: 0,
                }}
            >
                <View>
                    <CustomButton
                        svg={<TrackBackToLocSVG width={16} height={16} fill={'#fff'} />}
                        onPress={() => {
                            // write the function that we have used in the temple module to get the current location and set the name of the location in the near by place name
                            console.log('the press to locate your position');
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

                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        padding: 15,
                        flex: 1,
                        gap: 10,
                    }}
                >
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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            gap: 10,
                        }}
                    >
                        <LocationLogo fill={'#C1554E'} />
                        <Text
                            style={{
                                fontFamily: 'Mulish-Bold',
                                fontSize: 18,
                                color: 'black',
                                lineHeight: 22,
                            }}
                        >
                            Dinesh Nagar
                        </Text>
                    </View>

                    <Text
                        style={{
                            color: '#777777',
                            fontFamily: 'Mulish-Regular',
                            paddingBottom: 10,
                        }}
                    >
                        1234 421 - B Block, Dinesh nagar, Koramangala, Bangalore, Karnataka, India
                    </Text>

                    <CustomLongBtn
                        onPress={() => {
                            setBtnState(!btnState);
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
    map: {
        ...StyleSheet.absoluteFillObject,
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
export default PinTheLocation;
