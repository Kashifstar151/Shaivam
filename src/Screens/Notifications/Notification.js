import React, { useContext, useEffect, useState } from "react";
import PushNotification from "react-native-push-notification"
import { FlatList, Text, View } from "react-native";
import BackButton from "../../components/BackButton";
import ElevatedCard from "../../components/ElevatedCard";
import moment from "moment";
import EventCard from "../../components/EventCard";
import { ThemeContext } from "../../Context/ThemeContext";
import NotificationIcon from "../../assets/Images/notifications 1.svg"
const Notification = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [notificationList, setNotificationList] = useState([])
    useEffect(() => {
        getScheduleNotification()
    }, [])
    const getScheduleNotification = () => {
        PushNotification.getScheduledLocalNotifications(callbacks => {
            console.log("🚀 ~ getScheduleNotification ~ callbacks:", callbacks)
            setNotificationList(callbacks)
        })
    }
    return (
        <View>
            <BackButton navigation={navigation} />
            <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                    Notification Turned on
                </Text>
            </View>
            {
                notificationList?.length > 0 ?
                    <FlatList
                        data={notificationList}
                        key={(item, index) => index}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        renderItem={({ item, index }) => (
                            <ElevatedCard
                                // navigation={() =>
                                //     navigation.navigate(RouteTexts.EVENT_DETAILS, {
                                //         item: item,
                                //     })
                                // }
                                theme={{ colorscheme: theme.colorscheme }}
                            >
                                <EventCard
                                    date={moment(item.date).get('D')}
                                    dateNo={moment(item?.date).format('DD')}
                                    day={moment(item?.date).format('ddd')}
                                    timing={`${moment(item.date).format('MMMM DD YYYY')} - ${moment(item.date).format('MMMM DD YYYY')}`}
                                    title={item?.message}
                                    item={item}
                                    theme={{
                                        textColor: theme.textColor,
                                        colorscheme: theme.colorscheme,
                                    }}
                                />
                            </ElevatedCard>
                        )}
                    /> :
                    <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <NotificationIcon />
                        <Text style={{ fontFamily: 'Mulish-Bold', color: 'black', fontSize: 18 }}>No new notifications!</Text>
                        <Text style={{ fontFamily: 'Mulish-Regular', color: 'black', fontSize: 14 }}>Get notified for kaala pujas, festivals, radio programs etc. </Text>
                    </View>
            }

        </View>
    );
};

export default Notification;
