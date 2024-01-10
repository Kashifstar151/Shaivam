
import React from 'react'
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import { colors } from "../Helpers"
import NotificationIcon from "../assets/Images/NotificationIcon.svg"
import DarModeEnableIcon from "../assets/Images/DarkModeon.svg"
import DarkModeDisableIcon from "../assets/Images/DarkModeOff.svg"

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: 'https://shaivam.org/assests/icons/logo.png' }} style={{ height: 50, width: 50 }} />
                <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 11, color: colors.grey2 }}>
                        Welcome to
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.grey2 }}>
                        Shaivam.org
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={styles.notificationContainer}>
                    <DarkModeDisableIcon />
                    {/* <Icon name="notifications" size={24} color='white' /> */}

                </Pressable>
                <Pressable style={styles.notificationContainer}>
                    <NotificationIcon />
                    {/* <Icon name="notifications" size={24} color='white' /> */}

                </Pressable>
            </View>

        </View>
    )
}
export const styles = StyleSheet.create({
    headerContainer: { paddingHorizontal: 10, paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 40 : 20, justifyContent: 'space-between', flexDirection: 'row' },
    notificationContainer: { marginLeft: 10, height: 40, width: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
})
export default Header