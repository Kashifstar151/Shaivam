
import React from 'react'
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/dist/MaterialIcons"
import { colors } from "../Helpers"
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
            <Pressable style={styles.notificationContainer}>
                <Icon name="notifications" size={24} color='white' />
            </Pressable>
        </View>
    )
}
export const styles = StyleSheet.create({
    headerContainer: { paddingTop: StatusBar.currentHeight + 50, justifyContent: 'space-between', flexDirection: 'row' },
    notificationContainer: { height: 40, width: 40, borderRadius: 20, backgroundColor: '#7b1113', justifyContent: 'center', alignItems: 'center' }
})
export default Header