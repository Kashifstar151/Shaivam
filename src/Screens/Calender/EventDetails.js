import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import BackButton from '../../components/BackButton';
import Background from '../../components/Background';
import ShareIcon from '../../assets/Images/share-1.svg';
import { CustomButton } from '../../components/Buttons';
import DirectionSVG from '../../components/SVGs/DirectionSVG';
import CameraSVG from '../../components/SVGs/CameraSVG';
import LinkIcon from '../../components/SVGs/LinkIcon';
import { gStyles } from '../../Helpers/GlobalStyles';
import ReminderSnackBar from './ReminderSnackBar';
import { RouteTexts } from '../../navigation/RouteText';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const EventDetails = ({ navigation, route }) => {
    const { item } = route?.params;
    console.log('🚀 ~ EventDetails ~ item:', JSON.stringify(item, 0, 2));
    const keys = [
        {
            name: 'Start date',
            value: moment(item?.attributes?.start_date).format('ddd,MMMM DD , YYYY'),
        },
        {
            name: 'End date',
            value: moment(item?.attributes?.end_date).format('ddd,MMMM DD , YYYY'),
        },
        { name: 'Location', value: item?.attributes?.Location },
        { name: 'Presenter', value: item?.attributes?.name },
        { name: 'Contact No', value: '+91-9876710234' },
        { name: 'Url', value: item?.attributes?.Url },
    ];
    const [selectedHeader, setSelectedHeader] = useState('Direction');
    const selectionHandler = (name) => {
        if (name == 'Virtual event link') {
            navigation.navigate(RouteTexts.VIRTUAL_EVENT_CREATE);
        }
    };
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Background>
                <BackButton
                    navigation={navigation}
                    firstRightIcon={true}
                    middleText={'முதல்-திருமுறை - Pradhs...'}
                    rightIcon={true}
                />
            </Background>
            <View style={styles.main}>
                <Text style={styles.headingText}>{item?.attributes?.title}</Text>
                <Text
                    style={{ color: '#777777', fontFamily: 'Mulish-Regular', marginHorizontal: 10 }}
                >
                    {item?.attributes?.category}
                </Text>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <CustomButton
                        svg={<DirectionSVG fill={'#fff'} />}
                        onPress={() => {
                            const sourceLatitude = 37.7749; // Example source latitude
                            const sourceLongitude = -122.4194; // Example source longitude
                            const destinationLatitude = 34.0522; // Example destination latitude
                            const destinationLongitude = -118.2437; // Example destination longitude
                            // const googleMapsUrl = `geo:${sourceLatitude},${sourceLongitude}?q=${destinationLatitude},${destinationLongitude}`;
                            // Linking.openURL(googleMapsUrl).catch((err) => {
                            //     console.log('the map is not avialable');
                            //     const googleMapsUrlFallBack = `https://www.google.com/maps/dir/?api=1&origin=${sourceLatitude},${sourceLongitude}&destination=${destinationLatitude},${destinationLongitude}`;
                            //     Linking.openURL(googleMapsUrlFallBack);
                            // });
                        }}
                        style={{
                            margin: 10,
                            elevation: 3,
                            shadowColor: 'black',
                            width: Dimensions.get('window').width / 2.4,
                        }}
                        text={t('Directions')}
                        backgroundColor={'#C1554E'}
                        textColor={'#fff'}
                    />

                    <CustomButton
                        svg={<LinkIcon fill={'#ffffff'} />}
                        // onPress={() => selectionHandler('Virtual event link')}
                        style={{
                            margin: 10,
                        }}
                        text={'Virtual event link'}
                        backgroundColor={'#C1554E'}
                        textColor={'#ffffff'}
                    />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.descriptionText}>{item?.attributes?.description}</Text>
                    <FlatList
                        bounces={false}
                        contentContainerStyle={{ marginTop: 10 }}
                        data={keys}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                    justifyContent: 'space-between',
                                    width: '70%',
                                }}
                            >
                                <View style={{ width: '30%' }}>
                                    <Text
                                        style={{
                                            color: '#777777',
                                            fontFamily: 'Mulish-Regular',
                                            fontSize: 12,
                                        }}
                                    >
                                        {item?.name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: '80%',
                                        marginLeft: 20,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={
                                            item?.name == 'Url'
                                                ? {
                                                      color: '#C1554E',
                                                      fontFamily: 'Mulish-Regular',
                                                      fontSize: 12,
                                                      marginHorizontal: 10,
                                                  }
                                                : {
                                                      color: '#222222',
                                                      fontFamily: 'Mulish-Regular',
                                                      fontSize: 12,
                                                      marginHorizontal: 20,
                                                  }
                                        }
                                    >
                                        {item?.value}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                    <FlatList
                        horizontal
                        contentContainerStyle={{ gap: 10, paddingVertical: 10, marginTop: 10 }}
                        // data={Array.from({ length: 7 }, (_, i) => i)}
                        data={item?.attributes?.Files?.data}
                        renderItem={({ item, index }) => (
                            <Image
                                source={
                                    item?.attributes?.url
                                        ? { url: item?.attributes?.url }
                                        : require('../../assets/Images/Background.png')
                                }
                                style={{ color: 'black', width: 200, height: 130, borderRadius: 8 }}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 30, paddingHorizontal: 20 }}>
                <ReminderSnackBar />
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    main: { paddingHorizontal: 10, paddingTop: 20 },
    headingText: { fontFamily: 'Lora-Bold', fontSize: 18, color: '#222222', marginHorizontal: 10 },
    descriptionText: { fontSize: 14, color: '#222222', fontFamily: 'AnekTamil-Regular' },
});
export default EventDetails;
