import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Linking, Modal, Pressable, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DirectionSVG from '../../components/SVGs/DirectionSVG';
import { CustomButton } from '../../components/Buttons';
import CameraSVG from '../../components/SVGs/CameraSVG';
import ErrorSpotSVG from '../../components/SVGs/ErrorSpotSVG';
import FileUplaoder from './FileUplaoder';
import SpottingErrorPage from './SuccuessPages/SpottingErrorPage';

const TempleCard = ({ dataSet, children, showMargin, showButton }) => {
    const nav = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedHeader, setSelectedHeader] = useState('direction')
    const navigator = (name, data) => {
        nav.navigate('');
    };
    const selectionHandler = (item) => {
        setSelectedHeader(item)
        setModalVisible(true)
    }
    return (
        <View style={{ paddingHorizontal: 20 }}>
            {
                modalVisible &&
                <Modal transparent>
                    {
                        selectedHeader == 'Submit Images' ?
                            <FileUplaoder setModalVisible={setModalVisible} /> :
                            selectedHeader == 'Spot an error? Send Corrections' ?
                                <SpottingErrorPage setModalVisible={setModalVisible} navigation={nav} /> : null
                    }
                </Modal>
            }

            <Text style={{ color: 'black', fontFamily: 'Lora-Bold', fontSize: 18 }}>
                {dataSet?.templeName}
            </Text>

            <Text style={{ color: 'black', fontFamily: 'Mulish-Regular' }}>
                {dataSet?.templeType}
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
                            const sourceLatitude = 37.7749; // Example source latitude
                            const sourceLongitude = -122.4194; // Example source longitude
                            const destinationLatitude = 34.0522; // Example destination latitude
                            const destinationLongitude = -118.2437; // Example destination longitude
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
                        text={'Direction'}
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
            <FlatList
                horizontal
                contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
                data={Array.from({ length: 7 }, (_, i) => i)}
                renderItem={({ item, index }) => (
                    <Image
                        source={require('../../../assets/Images/Background.png')}
                        style={{ color: 'black', width: 200, height: 100, borderRadius: 8 }}
                    />
                )}
            />
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
