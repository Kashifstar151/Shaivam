import React, { useEffect, useState } from "react";
import PushNotification from "react-native-push-notification"
import { View } from "react-native";
const Notification = () => {
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

        </View>
    );
};

export default Notification;
