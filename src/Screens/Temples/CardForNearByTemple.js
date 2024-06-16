import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import templeMetaData from './AssetMapWithTempleType';
const CardForNearByTemple = React.memo(({ userLocation, item }) => {
    console.log('🚀 ~ CardForNearByTemple ~ item:', item);
    const [favState, setFavState] = useState(false);
    const onPress = () => {
        const sourceLatitude = parseFloat(userLocation?.latitude); // Example source latitude
        const sourceLongitude = parseFloat(userLocation?.longitude); // Example source longitude
        const destinationLatitude = parseFloat(item?.latitude); // Example destination latitude
        const destinationLongitude = parseFloat(item?.longitude); // Example destination longitude

        const googleMapsUrl = `geo:${sourceLatitude},${sourceLongitude}?q=${destinationLatitude},${destinationLongitude}`;
        Linking.openURL(googleMapsUrl).catch((err) => {
            console.log('the map is not avialable');
            const googleMapsUrlFallBack = `https://www.google.com/maps/dir/?api=1&origin=${sourceLatitude},${sourceLongitude}&destination=${destinationLatitude},${destinationLongitude}`;
            Linking.openURL(googleMapsUrlFallBack);
        });
    };
    return (
        <Pressable style={styles.topWrapperForCard} onPress={onPress}>
            <View style={[styles.flexRow, { paddingHorizontal: 5 }]}>
                <View style={[styles.flexRow, { gap: 8 }]}>
                    <View
                        style={[
                            styles.widthForColorBar,
                            {
                                backgroundColor: `${
                                    templeMetaData[item?.flag]?.metaData?.color ?? '#000'
                                }`,
                            },
                        ]}
                    ></View>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textBold}>
                            {item?.name}
                            {/* {item?.attributes?.Name_of_the_place} */}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'black' }}>
                            {templeMetaData[item?.flag]?.fullName}
                        </Text>
                    </View>
                </View>

                {/* <View style={styles.btnWrapper}>
                    <Pressable
                        onPress={() => {
                            setFavState(!favState);
                        }}
                    >
                        <FavSVG fill={'#000'} />
                    </Pressable>
                </View> */}
            </View>
        </Pressable>
    );
});
const styles = StyleSheet.create({
    topWrapperForCard: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: 15,
        elevation: 5,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        borderRadius: 8,
        height: 70,
        padding: 15,
    },

    flexRow: { flex: 1, flexDirection: 'row' },
    widthForColorBar: {
        width: 4,
        borderRadius: 5,
    },
    textContainer: {
        marginHorizontal: 5,
        // flex: 1,
        width: '90%',
        justifyContent: 'center',
    },
    textBold: {
        color: 'black',
        fontFamily: 'Mulish-Bold',
        fontSize: 14,
    },
    btnWrapper: { marginRight: 8, justifyContent: 'center' },
    btn: {
        color: 'red',
        fontSize: 12,
        margin: 10,
    },
});
export default CardForNearByTemple;
