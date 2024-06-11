import React, { useContext, useEffect, useState } from "react";
import PushNotification from "react-native-push-notification"
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../components/BackButton";
import ElevatedCard from "../../components/ElevatedCard";
import moment from "moment";
import EventCard from "../../components/EventCard";
import { ThemeContext } from "../../Context/ThemeContext";
import NotificationIcon from "../../assets/Images/notifications 1.svg"
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
const Notification = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

    const [notificationList, setNotificationList] = useState([])
    const [removeAbleItem, setRemoveAbleItem] = useState(null)
    const [showUndoBox, setShowUndoBox] = useState(false)
    const [undo, setUndo] = useState(false)
    useEffect(() => {
        getScheduleNotification()
    }, [])
    const getScheduleNotification = () => {
        PushNotification.getScheduledLocalNotifications(callbacks => {
            console.log("🚀 ~ getScheduleNotification ~ callbacks:", callbacks)
            setNotificationList(callbacks)
        })
    }
    const removeItem = (index, item) => {
        setRemoveAbleItem(item)
        setUndo(false)
        setShowUndoBox(true)
        setNotificationList(currentList => currentList.filter((_, i) => i !== index));
        setTimeout(() => {
            setShowUndoBox(false)
        }, 4000)
    };
    useEffect(() => {
        if (undo) {
            getScheduleNotification()
        } else {
            if (!showUndoBox && removeAbleItem !== null) {
                console.log('🚀 ~ useEffect ~ callbacks:', removeAbleItem?.id)
                PushNotification.cancelLocalNotification(removeAbleItem?.id, callbacks => {
                    console.log("🚀 ~ useEffect ~ callbacks:", callbacks)
                })
            }
        }
    }, [undo, showUndoBox])
    const deviceWidth = Dimensions.get('window').width;
    const threshold = -deviceWidth * 0.4;
    const FlatListItem = ({ item, index }) => {
        const dragX = useSharedValue(0);
        const height = useSharedValue(75);
        const opacity = useSharedValue(1);
        const gestureHander = useAnimatedGestureHandler({
            onActive: (e) => {
                dragX.value = e.translationX;
            },
            onEnd: (e) => {
                if (dragX.value < threshold) {
                    dragX.value = withTiming(-deviceWidth, { duration: 200 }, () => {
                        runOnJS(removeItem)(index, item);
                        height.value = withTiming(0);
                        opacity.value = withTiming(0);
                    });
                } else {
                    dragX.value = withTiming(0);
                }
            }
        });
        const itemContainerStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: dragX.value, }
                ],
                height: height.value,
                opacity: opacity.value,
                marginTop: opacity.value === 1 ? 10 : 0
            }
        })
        return (
            <PanGestureHandler onGestureEvent={gestureHander}>
                <Animated.View style={[styles.itemContainer, itemContainerStyle]}>
                    <View style={styles.iconContainer}>
                    </View>
                    <View style={{ width: '77%', }}>
                        <Text style={styles.itemText}>{item?.message}</Text>
                    </View>
                    <Text style={{ fontSize: 10, fontFamily: 'Lora-Regular', color: '#222222' }}>{moment().format('DD/MM/YYYY') == moment(item?.date).format('DD/MM/YYYY') ? 'today' : moment(item?.date).format('DD,MMMM')}</Text>
                </Animated.View>
            </PanGestureHandler>
        );

    }
    return (
        <View style={{ height: Dimensions.get('window').height }}>
            <BackButton navigation={navigation} />
            <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                    Notification Turned on
                </Text>
            </View>
            {
                showUndoBox &&
                <View style={{ width: Dimensions.get('window').width, backgroundColor: '#FFEBEA', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#222222', fontFamily: 'Mulish-Regular' }}>Notification dismissed</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Lora-Bold', color: '#C1554E' }} onPress={() => setUndo(true)}>Click here to Undo</Text>
                </View>
            }
            {
                notificationList?.length > 0 ?
                    <>
                        <FlatList
                            data={notificationList}
                            key={(item, index) => index}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            renderItem={({ item, index }) => (
                                <FlatListItem item={item} index={index} />
                                // <ElevatedCard
                                //     // navigation={() =>
                                //     //     navigation.navigate(RouteTexts.EVENT_DETAILS, {
                                //     //         item: item,
                                //     //     })
                                //     // }
                                //     theme={{ colorscheme: theme.colorscheme }}
                                // >
                                //     <EventCard
                                //         date={moment(item.date).get('D')}
                                //         dateNo={moment(item?.date).format('DD')}
                                //         day={moment(item?.date).format('ddd')}
                                //         timing={`${moment(item.date).format('MMMM DD YYYY')} - ${moment(item.date).format('MMMM DD YYYY')}`}
                                //         title={item?.message}
                                //         item={item}
                                //         theme={{
                                //             textColor: theme.textColor,
                                //             colorscheme: theme.colorscheme,
                                //         }}
                                //     />
                                // </ElevatedCard>
                            )}
                        />

                    </>
                    :
                    <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <NotificationIcon />
                        <Text style={{ fontFamily: 'Mulish-Bold', color: 'black', fontSize: 18 }}>No new notifications!</Text>
                        <Text style={{ fontFamily: 'Mulish-Regular', color: 'black', fontSize: 14 }}>Get notified for kaala pujas, festivals, radio programs etc. </Text>
                    </View>
            }
            <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                <TouchableOpacity style={{ height: 30, width: 150, borderRadius: 20, borderWidth: 1, borderColor: '#C1554E', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: RFValue(9), color: '#C1554E', fontFamily: 'Mulish-Bold' }}>Dismiss all Notification</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255, 0.8)",
    },
    flatlistStyle: { backgroundColor: "rgba(190,0,90, .2)" },
    itemContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection: "row",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    itemText: {
        padding: 20,
        fontFamily: 'Mulish-Regular',
        fontSize: 12,
        color: '#222222'
    },
    heading: {
        padding: 15,
        fontSize: 26,
    },
    iconContainer: { height: 50, width: 50, borderRadius: 25, backgroundColor: '#F2F0F8', justifyContent: 'center', alignItems: 'center' }

});
export default Notification;
