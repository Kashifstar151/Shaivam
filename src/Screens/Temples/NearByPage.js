import { StackActions, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
    Dimensions,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CardForNearByTemple from './CardForNearByTemple';
import bgImg from '../../../assets/Images/Background.png';
import bgImgDark from '../../../assets/Images/BackgroundCommon.png';
import { ThemeContext } from '../../Context/ThemeContext';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import DownArrowSVG from '../../components/SVGs/DownArrowSVG';

const NearByPage = ({ navigation }) => {
    const route = useRoute();
    const { data, locationName } = route?.params;
    const { theme } = useContext(ThemeContext);
    console.log('🚀 ~ NearByPage ~ state:', data);
    const popAction = StackActions.pop(1);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
                resizeMode="cover"
                style={{ width: '100%', height: 50 }}
            />

            <View
                style={[
                    styles.wholeContainerWrapper,
                    {
                        backgroundColor: 'white',
                    },
                ]}
            >
                <View style={styles.topBarWrapper}>
                    <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
                        <Pressable
                            style={{ justifyContent: 'center' }}
                            onPress={() => {
                                navigation.dispatch(popAction);
                            }}
                        >
                            <DownArrowSVG fill="#777" />
                        </Pressable>
                        <View style={{ flex: 1 }}>
                            <SearchContainerWithIcon />
                        </View>
                    </View>
                    {/* <SearchContainerWithIcon /> */}

                    {/* <View style={styles.colorContWrapper}>
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
                    </View> */}
                </View>
                <View
                    style={{
                        width: '100%',
                        fontFamily: 'Lora-Bold',
                        paddingVertical: 10,
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
                        {locationName ? `Nearby Temples in ${locationName}` : null}
                    </Text>
                </View>
                <ScrollView style={{ zIndex: -20 }}>
                    {data.map((item, indx) => (
                        <View key={indx}>
                            <CardForNearByTemple item={item} />
                        </View>
                    ))}
                </ScrollView>
            </View>
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

export default NearByPage;
