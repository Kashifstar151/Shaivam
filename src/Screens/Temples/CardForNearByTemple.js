import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FavSVG from '../../components/SVGs/FavSVG';

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
                                // backgroundColor: `${item?.metadata().color}`,
                                backgroundColor: `red`,

                            },
                        ]}
                    ></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textBold}>{item?.attributes?.Name_of_the_place}</Text>
                        <Text style={{ color: 'black' }}>{item?.attributes?.Swamy_name}</Text>
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
    textContainer: { marginLeft: 5, flex: 1, justifyContent: 'center' },
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
