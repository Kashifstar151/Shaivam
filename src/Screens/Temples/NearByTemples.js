// import React, { useState } from 'react';
// import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
// import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
// import Slider from '@react-native-community/slider';
// import SearchInput from '../../components/SearchInput';
// import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// import { ScrollView } from 'react-native-gesture-handler';
// import CardForNearByTemple from './CardForNearByTemple';
// const NearByTemples = ({ close, data, locationName, snapIndex }) => {
//     // console.log('🚀 ~ NearByTemples ~ data:', data);
//     const { snapToIndex, snapToPosition } = useBottomSheet();

//     return (
//         <View
//             style={{
//                 flex: 1,
//                 width: Dimensions.get('window').width,
//                 height: '100%',
//             }}
//         >
//             <View>
//                 {snapIndex ? (
//                     <View>
//                         <Text style={{ color: 'red' }}>dhsjhdjs</Text>
//                     </View>
//                 ) : null}
//             </View>

//             <TouchableWithoutFeedback
//                 onPress={() => {
//                     if (!snapIndex) {
//                         snapToIndex(1);
//                     }
//                 }}
//                 style={{ marginBottom: 10 }}
//             >
//                 <View
//                     style={{
//                         width: '100%',
//                         fontFamily: 'Lora-Bold',
//                         paddingBottom: 10,
//                         backgroundColor: 'white',
//                     }}
//                 >
//                     <Text
//                         style={{
//                             color: '#222222',
//                             fontSize: 18,
//                             fontFamily: 'Lora-Bold',
//                             paddingHorizontal: 15,
//                         }}
//                     >
//                         {locationName ? `Nearby Temples in ${locationName}` : null}
//                     </Text>
//                 </View>
//             </TouchableWithoutFeedback>

//             <ScrollView style={{ zIndex: -20 }}>
//                 {data.map((item, indx) => (
//                     <View key={indx}>
//                         <CardForNearByTemple item={item} />
//                     </View>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: 'grey',
//     },
//     contentContainer: {
//         flex: 1,
//         backgroundColor: 'green',
//     },
// });

// export default NearByTemples;

// new code for page nav

import React, { useState } from 'react';
import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CardForNearByTemple from './CardForNearByTemple';
import { useNavigation } from '@react-navigation/native';
import DownArrowSVG from '../../components/SVGs/DownArrowSVG';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import SearchTemple from './SearchTemple';
import { useTranslation } from 'react-i18next';
const NearByTemples = ({ close, data, locationName, snapIndex, navigation }) => {
    const { snapToIndex, snapToPosition } = useBottomSheet();
    const nav = useNavigation();
    const { t } = useTranslation();
    return (
        <View
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: '100%',
            }}
        >
            {snapIndex ? (
                <View style={styles.topBarWrapper}>
                    <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
                        <Pressable
                            style={{ justifyContent: 'center' }}
                            onPress={() => {
                                // navigation.dispatch(popAction);

                                snapToIndex(0);
                            }}
                        >
                            <DownArrowSVG fill="#777" />
                        </Pressable>
                        <View style={{ flex: 1 }}>
                            <SearchContainerWithIcon>
                                <SearchTemple isNavigable={false} isDisable={false} />
                            </SearchContainerWithIcon>
                        </View>
                    </View>
                </View>
            ) : null}

            <TouchableWithoutFeedback
                onPress={() => {
                    // if (!snapIndex) {
                    //     snapToIndex(1);
                    // }
                    console.log('the print ');
                    // nav.navigate('Temples', {
                    //     screen: 'nearBy',
                    //     data: data,
                    // });
                    // nav.navigate('nearBy', {
                    //     data: data,
                    //     locationName: locationName,
                    // });
                }}
                style={{ marginBottom: 10 }}
            >
                <View
                    style={{
                        width: '100%',
                        fontFamily: 'Lora-Bold',
                        paddingBottom: 10,
                        backgroundColor: 'white',
                    }}
                >
                    <Text
                        style={{
                            color: '#222222',
                            fontSize: 18,
                            fontFamily: 'Lora-Bold',
                            paddingHorizontal: 15,
                        }}
                    >
                        {locationName ? `${t('Nearby Temples in')} ${locationName}` : null}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            <ScrollView style={{ zIndex: -20 }}>
                {data?.map((item, indx) => (
                    <View key={indx}>
                        <CardForNearByTemple item={item} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'green',
    },
    map: {
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    wholeContainerWrapper: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
        marginTop: -12,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
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

export default NearByTemples;
