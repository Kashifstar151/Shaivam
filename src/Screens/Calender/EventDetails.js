import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, PermissionsAndroid, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import PushNotification, { Importance } from 'react-native-push-notification';
import { StackActions, useIsFocused } from '@react-navigation/native';
import { getCurrentLocation } from '../../Helpers/GeolocationFunc';
import { useLazyGetRecurringByIdQuery, useLazyGetRegularByIdQuery } from '../../store/features/Calender/CalenderApiSlice';


const EventDetails = ({ navigation, route }) => {
    const { item, external } = route?.params;
    const isFocus = useIsFocused()
    const [GetReccuringById, { isSuccess: recurringSuccess }] = useLazyGetRecurringByIdQuery();
    const [GetRegularById, { isSuccess: regularSuccess }] = useLazyGetRegularByIdQuery()


    console.log('🚀 ~ EventDetails ~ item:', JSON.stringify(item, 0, 2));
    const [notificationOn, setNotification] = useState(false)
    const [regionCoordinate, setRegionCoordinate] = useState(null)
    const [eventData, setEventData] = useState(item)
    useEffect(() => {
        if (external) {
            callApi()
        }
    }, [])
    const callApi = () => {
        let check = item?.split('_').pop()
        console.log("🚀 ~ callApi ~ check:", item?.split('_')[1])
        if (item?.split('_')[0] == 'recurring') {
            GetReccuringById({ data: item?.split('_')[1] }).then((result) => {
                console.log("🚀 ~ getReccuringById ~ result:", result)
                setEventData(result?.data?.data)
            }).catch((err) => {
                console.log("🚀 ~ getReccuringById ~ err:", err)
                setEventData(result?.data?.data)
            });
        } else {
            GetRegularById({ data: item?.split('_')[1] }).then((result) => {
                console.log("🚀 ~ getRegularById ~ result:", result)

            }).catch((err) => {
                console.log("🚀 ~ getRegularById ~ err:", err)

            });
        }
    }
    const popAction = StackActions.pop(1);
    useEffect(() => {
        getCurrentLocation(callbacks => {
            // console.log("🚀 ~ useEffect ~ callbacks:", callbacks)
            setRegionCoordinate(callbacks)
        })
        checkPermissionAccess()
        createChannel()
    }, [isFocus])
    useEffect(() => {
        if (notificationOn) {
            scheduleNotification()
        }
        getScheduleNotification()


    }, [notificationOn])
    const keys = [
        {
            name: 'Start date',
            value: moment(item?.start_date ? item?.start_date : item?.attributes?.start_date).format('ddd,MMMM DD , YYYY'),
        },
        {
            name: 'End date',
            value: moment(item?.end_date ? item?.end_date : item?.attributes?.end_date).format('ddd,MMMM DD , YYYY'),
        },
        { name: 'Location', value: item?.attributes?.location },
        { name: 'Contact No', value: '+91-9876710234' },
        { name: 'Url', value: item?.attributes?.Url },
        { name: 'Presenter', value: item?.attributes?.name },
    ];
    const [selectedHeader, setSelectedHeader] = useState('Direction');
    const checkPermissionAccess = async () => {
        // alert(true)
        const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);;
        console.log("🚀 ~ checkPermissionAccess ~ permission:", permission)
    }
    const createChannel = () => {
        PushNotification.createChannel({
            channelId: 'Event',
            channelName: "Event_notification"
        })
    }
    const scheduleNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'Event',
            title: item?.title,
            date: new Date(item?.start_date ? item?.start_date : item?.attributes?.start_date + 120 * 1000),
            message: item?.attributes?.title,
            id: item?.id,
            allowWhileIdle: true
        })
    }
    const getScheduleNotification = () => {
        PushNotification.getScheduledLocalNotifications(callbacks => {
            console.log("🚀 ~ getScheduleNotification ~ callbacks:", callbacks)
            callbacks?.map((res) => {
                if (res?.id == item?.id) {
                    setNotification(true)
                }
            })
        })
    }

    // const selectionHandler = (name) => {
    //     if (name == 'Virtual event link') {
    //         navigation.navigate(RouteTexts.VIRTUAL_EVENT_CREATE);
    //     }
    // };
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Background>
                <BackButton
                    navigation={navigation}
                    // firstRightIcon={true}
                    middleText={item?.attributes?.title}
                    rightIcon={true}
                    color={true}
                    eventShare={true}
                    item={item}
                />
            </Background>
            <ScrollView style={styles.main}>
                <Text style={styles.headingText}>{item?.attributes?.title}</Text>
                <Text
                    style={{ color: '#777777', fontFamily: 'Mulish-Regular', marginHorizontal: 10 }}
                >
                    {item?.attributes?.category}
                </Text>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    {
                        item?.attributes?.Latitude && item?.attributes?.Longitude &&
                        <CustomButton
                            svg={<DirectionSVG fill={'#fff'} />}
                            onPress={() => {
                                const sourceLatitude = parseFloat(regionCoordinate?.latitude); // Example source latitude
                                const sourceLongitude = parseFloat(regionCoordinate?.longitude); // Example source longitude
                                const destinationLatitude = parseFloat(eventData?.attributes?.Latitude); // Example destination latitude
                                const destinationLongitude = parseFloat(eventData?.attributes?.Longitude); // Example destination longitude
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
                                width: Dimensions.get('window').width / 2.4,
                            }}
                            text={t('Directions')}
                            backgroundColor={'#C1554E'}
                            textColor={'#fff'}
                        />
                    }
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.descriptionText}>{item?.attributes?.description}</Text>
                    <FlatList
                        bounces={false}
                        contentContainerStyle={{ marginTop: 10 }}
                        data={keys}
                        renderItem={({ item, index }) => (
                            <>
                                {
                                    item?.value &&
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
                                                {t(item?.name)}
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
                                }
                            </>
                        )}
                    />
                    <FlatList
                        horizontal
                        contentContainerStyle={{ gap: 10, paddingVertical: 10, marginTop: 10 }}
                        // data={Array.from({ length: 7 }, (_, i) => i)}
                        data={item?.attributes?.File}
                        renderItem={({ item, index }) => (
                            <Image
                                source={
                                    item?.url
                                        ? { url: item?.url }
                                        : require('../../assets/Images/Background.png')
                                }
                                style={{ color: 'black', width: 200, height: 130, borderRadius: 8 }}
                            />
                        )}
                    />
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 30, paddingHorizontal: 20 }}>
                <ReminderSnackBar setRecurringEvent={setNotification} recurringEvent={notificationOn} />
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
