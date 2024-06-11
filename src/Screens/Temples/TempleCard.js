import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Linking,
    Modal,
    Pressable,
    Text,
    TouchableNativeFeedback,
    View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DirectionSVG from '../../components/SVGs/DirectionSVG';
import { CustomButton } from '../../components/Buttons';
import CameraSVG from '../../components/SVGs/CameraSVG';
import ErrorSpotSVG from '../../components/SVGs/ErrorSpotSVG';
import FileUplaoder from './FileUplaoder';
import SpottingErrorPage from './SuccuessPages/SpottingErrorPage';
import { useTranslation } from 'react-i18next';
import templeMetaData from './AssetMapWithTempleType';

//
const TempleCard = ({
    dataSet,
    children,
    regionCoordinate,
    showMargin,
    showButton,
    onTitleClick,
    imageArr = [],
    showImage,
}) => {
    const nav = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHeader, setSelectedHeader] = useState('direction');
    const navigator = (name, data) => {
        nav.navigate('');
    };
    const selectionHandler = (item) => {
        setSelectedHeader(item);
        setModalVisible(true);
    };
    const { t } = useTranslation();
    const route = useRoute();

    return (
        <View style={{ paddingHorizontal: 20 }}>
            {modalVisible && (
                <Modal transparent>
                    {selectedHeader == 'Submit Images' ? (
                        <FileUplaoder
                            setModalVisible={setModalVisible}
                            id={dataSet?.id}
                            dataSet={dataSet}
                        />
                    ) : selectedHeader == 'Spot an error? Send Corrections' ? (
                        <SpottingErrorPage
                            setModalVisible={setModalVisible}
                            navigation={nav}
                            existingTempDetail={{
                                coords: {
                                    latitude: dataSet?.latitude,
                                    longitude: dataSet?.longitude,
                                },

                                templeName: dataSet.templeName,
                            }}
                        />
                    ) : null}
                </Modal>
            )}
            <Pressable
                onPress={() => {
                    if (route.name == 'filteredTemples') {
                        onTitleClick();
                    }
                }}
            >
                <Text style={{ color: 'black', fontFamily: 'Lora-Bold', fontSize: 18 }}>
                    {dataSet?.templeName}
                </Text>
            </Pressable>

            <Text style={{ color: 'black', fontFamily: 'Mulish-Regular', paddingTop: 10 }}>
                {templeMetaData[dataSet.flag]?.name}
            </Text>
            {showButton && (
                <ScrollView
                    horizontal
                    style={{
                        paddingVertical: 10,
                    }}
                >
                    <CustomButton
                        svg={<DirectionSVG fill={'#fff'} />}
                        onPress={() => {
                            const sourceLatitude = parseFloat(regionCoordinate?.latitude); // Example source latitude
                            const sourceLongitude = parseFloat(regionCoordinate?.longitude); // Example source longitude
                            const destinationLatitude = parseFloat(dataSet?.latitude); // Example destination latitude
                            const destinationLongitude = parseFloat(dataSet?.longitude); // Example destination longitude

                            const googleMapsUrl = `geo:${sourceLatitude},${sourceLongitude}?q=${destinationLatitude},${destinationLongitude}`;
                            Linking.openURL(googleMapsUrl).catch((err) => {
                                console.log('the map is not avialable');
                                const googleMapsUrlFallBack = `https://www.google.com/maps/dir/?api=1&origin=${sourceLatitude},${sourceLongitude}&destination=${destinationLatitude},${destinationLongitude}`;
                                Linking.openURL(googleMapsUrlFallBack);
                            });
                        }}
                        style={{
                            margin: 10,
                            elevation: 3,
                            shadowColor: 'black',
                        }}
                        text={t('Directions')}
                        backgroundColor={'#C1554E'}
                        textColor={'#fff'}
                    />

                    <CustomButton
                        svg={<CameraSVG fill={'#777777'} />}
                        onPress={() => selectionHandler('Submit Images')}
                        style={{
                            margin: 10,
                        }}
                        text={'Submit Images'}
                        backgroundColor={'#EDEDED'}
                        textColor={'#777777'}
                    />

                    <CustomButton
                        svg={<ErrorSpotSVG fill={'#777777'} />}
                        onPress={() => selectionHandler('Spot an error? Send Corrections')}
                        style={{
                            margin: 10,
                        }}
                        text={'Spot an error? Send Corrections'}
                        backgroundColor={'#EDEDED'}
                        textColor={'#777777'}
                    />
                </ScrollView>
            )}
            {showImage && imageArr?.length ? (
                <View
                    style={{
                        width: 'auto',
                    }}
                >
                    <FlatList
                        horizontal
                        contentContainerStyle={{
                            gap: 10,
                            paddingVertical: 10,
                        }}
                        style={{
                            alignSelf: 'flex-start',
                        }}
                        data={imageArr}
                        renderItem={({ item, index }) => (
                            <Image
                                source={{
                                    uri: item?.url,
                                }}
                                style={{ color: 'black', width: 200, height: 100, borderRadius: 8 }}
                            />
                        )}
                    />
                </View>
            ) : null}
            {showMargin && (
                <View
                    style={{
                        height: 5,
                        backgroundColor: '#F3F3F3',
                        width: '100%',
                        marginVertical: 10,
                        borderRadius: 5,
                    }}
                ></View>
            )}
        </View>
    );
};

export default TempleCard;
