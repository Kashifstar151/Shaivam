// setting the type of the marker you pressed
// callback function for naving to page which has the temple details
import { StackActions, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import DownArrowSVG from '../../components/SVGs/DownArrowSVG';
import FavSVG from '../../components/SVGs/FavSVG';
import SearchSVG from '../../components/SVGs/SearchSVG';
import ShareSVG from '../../components/SVGs/ShareSVG';
import TempleCard from './TempleCard';
import { CustomButton } from '../../components/Buttons';
import { AnimatedToast } from '../../components/Toast';

import BottomSheetTempleTemplate from './BottomSheetTempleTemplate';
import RenderHTML from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import assetMapWithTempleType from './AssetMapWithTempleType';
import { useTranslation } from 'react-i18next';
import { useGetTempleDetailQuery } from '../../store/features/Temple/TemplApiSlice';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { RFValue } from 'react-native-responsive-fontsize';

const TempleDetails = ({ navigation }) => {
    const route = useRoute();
    const { temple, locationName } = route?.params;
    // console.log('🚀 ~ TempleDetails ~ data:', temple);
    const {
        data: templeDetail,
        isSuccess,
        isFetching,
        isError,
        error,
    } = useGetTempleDetailQuery({ id: temple?.templeId });

    useEffect(() => {
        if (isSuccess || isError) {
            console.log(
                'templeDetail=================>',
                templeDetail,
                'error============<',
                error
            );
        }
    }, [isSuccess, templeDetail, isError, error]);
    // console.log('🚀 ~ TempleDetail ~ templeDetail:', templeDetail);

    const popAction = StackActions.pop(1);
    const [fav, setFav] = useState(true);
    const [animateToast, setAnimateToast] = useState();
    const onFavBtnClick = () => {
        setAnimateToast(!fav);
        setFav(!fav);
    };
    const { t } = useTranslation();

    return (
        <>
            <BottomSheetTempleTemplate
                snapPoints={['50%', '95%']}
                showSearchBarWhenFullSize={false}
                data={temple}
                regionCoordinate={{
                    ...temple?.templeCoordinate,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    locationName: '',
                }}
                initialIndexOfSize={0}
                appearsOnIndex={1}
                disappearsOnIndex={0}
                isNavigable={true}
                isSearchFieldDisabled={true}
                isSearchFieldDisabledInFullScreenMode={false}
                routeName={route.name}
                valueToBePreFilled={temple?.templeName}
            >
                <View
                    style={[
                        styles.wholeContainerWrapper,
                        {
                            backgroundColor: 'white',
                            flex: 1,
                        },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 20,
                            paddingHorizontal: 15,
                            alignItems: 'center',
                        }}
                    >
                        <CustomButton
                            svg={<DownArrowSVG fill={'#000'} width={20} height={20} />}
                            style={{
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                            }}
                            onPress={() => {
                                navigation.dispatch(popAction);
                            }}
                            type="TouchableOpacity"
                        />
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                            <CustomButton
                                svg={<SearchSVG fill={'#777777'} width={17} height={17} />}
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={() => {
                                    navigation.dispatch(popAction);
                                }}
                                type="TouchableOpacity"
                            />
                            <CustomButton
                                svg={
                                    <FavSVG
                                        outerfill={fav ? '#C1554E' : '#777777'}
                                        innerfill={fav ? '#C1554E' : '#fff'}
                                        fill={'#777777'}
                                        width={14}
                                        height={20}
                                    />
                                }
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={onFavBtnClick}
                                type="TouchableOpacity"
                            />
                            <CustomButton
                                svg={<ShareSVG fill={'#777777'} width={18} height={18} />}
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={() => {
                                    navigation.dispatch(popAction);
                                }}
                                type="TouchableOpacity"
                            />
                        </View>
                    </View>
                    <ScrollView style={{ marginHorizontal: 0 }}>
                        {/* <WebView
                            originWhitelist={['*']}
                            source={{ html: data?.attributes?.Specialities_Description }}
                            containerStyle={
                                {
                                    // flex: 0,
                                    // height: 200,
                                }
                            }
                            style={
                                {
                                    // flex: 0,
                                    // height: '100%',
                                    // width: '100%',
                                }
                            }
                        /> */}

                        <View>
                            <TempleCard
                                dataSet={{
                                    templeName: temple?.templeName,
                                    flag: temple?.templeFlag,
                                    templeType: assetMapWithTempleType[temple?.templeFlag].name,
                                    coordinate: {
                                        latitude: '26.868851939300207',
                                        longitude: '80.91296407698843',
                                    },
                                }}
                                showButton={false}
                                showMargin={false}
                            />

                            {templeDetail ? (
                                <View style={{ marginHorizontal: 20, marginVertical: 10, gap: 8 }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Mulish-Bold',
                                            fontSize: 18,
                                            paddingVertical: 8,
                                        }}
                                    >
                                        {t('Basic Details')}
                                    </Text>
                                    {Object.entries(templeDetail?.basicDetails ?? []).map(
                                        ([key, value], index) => (
                                            <KeyValueComp key={index} keyVal={key} value={value} />
                                        )
                                    )}

                                    <Text
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Mulish-Bold',
                                            fontSize: 18,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        Temple Description
                                    </Text>

                                    <RenderHTML
                                        contentWidth={Dimensions.get('window').width - 20}
                                        source={{ html: templeDetail?.Sthala_Puranam_Description }}
                                    />

                                    <RenderHTML
                                        contentWidth={Dimensions.get('window').width}
                                        source={{
                                            html: templeDetail?.Specialities_Description,
                                        }}
                                    />
                                </View>
                            ) : (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 40,
                                        gap: 10,
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/Images/no-data.png')}
                                        style={{
                                            width: 100,
                                            height: 100,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#000',
                                            textAlign: 'center',

                                            fontFamily: 'Mulish-Bold',
                                            fontSize: RFValue(16, 850),
                                        }}
                                    >
                                        Temple data is not Available
                                    </Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/* <Toast /> */}
                    {fav && animateToast ? (
                        <AnimatedToast
                            state={animateToast && fav}
                            type={'SUCCESS'}
                            text={'Saved in My Trips > Saved Temples'}
                        />
                    ) : (
                        <AnimatedToast
                            state={animateToast && fav}
                            type={'ERROR'}
                            text={'Temple removed from saved'}
                        />
                    )}
                </View>
            </BottomSheetTempleTemplate>
        </>
    );
};

const KeyValueComp = ({ keyVal, value }) => {
    // console.log('🚀 ~ KeyValueComp ~ keyVal, value :', keyVal, value);
    return (
        <View
            style={{
                gap: 20,
                width: '100%',
                flexDirection: 'row',
            }}
        >
            <View style={{ width: '25%' }}>
                <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>{keyVal}</Text>
            </View>
            <View style={{ width: '75%' }}>
                {keyVal == 'Head tree' ? (
                    <RenderHTML
                        source={{ html: value }}
                        contentWidth={Dimensions.get('window').width - 10}
                    />
                ) : (
                    <Text style={{ color: 'black', fontFamily: 'Mulish-Regular', fontWeight: 600 }}>
                        {value}
                    </Text>
                )}
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

export default TempleDetails;
