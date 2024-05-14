import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FavSVG from '../../components/SVGs/FavSVG';
import templeMetaData from './AssetMapWithTempleType';
const CardForNearByTemple = ({ item }) => {
    const [favState, setFavState] = useState(false);
    return (
        <View style={styles.topWrapperForCard}>
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

                <View style={styles.btnWrapper}>
                    <Pressable
                        onPress={() => {
                            setFavState(!favState);
                        }}
                    >
                        <FavSVG fill={'#000'} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

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
