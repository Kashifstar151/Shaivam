import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../Helpers';
import NotificationIcon from '../assets/Images/NotificationIcon.svg';
import HalfMoonSVG from './SVGs/HalfMoonSVG';
import { ThemeContext } from '../Context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dark, light } from '../Helpers/GlobalStyles';

const Header = () => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark' ? true : false);
    const { theme, setTheme } = useContext(ThemeContext);
    const onSwitchTheme = async () => {
        await AsyncStorage.setItem('theme', JSON.stringify(isDark ? 'light' : 'dark'));
        // alert(isDark)
        setIsDark(!isDark);
    };
    useEffect(() => {
        getTheme();
    }, []);
    const getTheme = async () => {
        let key = await AsyncStorage.getItem('theme');
        console.log('🚀 ~ getTheme ~ key:', key);
        let k = JSON.parse(key);
        if (k == 'light') {
            setIsDark(false);
            setTheme(light);
        } else {
            setIsDark(true);
            setTheme(dark);
        }
    };
    useEffect(() => {
        // changeTheme()
        setTheme(isDark ? dark : light);
    }, [isDark]);
    // const changeTheme = async () => {
    //     await AsyncStorage.setItem('theme', JSON.stringify(isDark ? 'dark' : 'light'));
    // }
    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: 'https://shaivam.org/assests/icons/logo.png' }}
                    style={{ height: 50, width: 50 }}
                />
                <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 11, color: colors.grey2, fontFamily: 'Lora-Medium' }}>
                        Welcome to
                    </Text>
                    <Text
                        style={{ fontSize: 14, fontFamily: 'Lora-SemiBold', color: colors.grey2 }}
                    >
                        Shaivam.org
                    </Text>
                </View>
            </View>
            <View style={styles.sideBtnContainer}>
                <Pressable onPress={onSwitchTheme}>
                    <View
                        style={[
                            styles.themeSwitch,
                            {
                                backgroundColor:
                                    theme.colorscheme === 'dark' ? '#3A3A3A' : '#99403A',
                            },
                        ]}
                    >
                        {/* {isDark ? (
                            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
                                <HalfMoonSVG
                                    fill={theme.colorscheme === 'dark' ? '#fff' : '#99403A'}
                                />
                                <Text>ON</Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', gap: 2 }}>
                                <HalfMoonSVG fill={'#f00'} />
                                <Text>OFF</Text>
                            </View>
                        )} */}

                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: isDark ? 'row-reverse' : 'row',
                                gap: 2,
                            }}
                        >
                            <HalfMoonSVG fill={theme.colorscheme === 'dark' ? '#fff' : '#E66158'} />
                            <Text>{isDark ? 'ON' : 'OFF'}</Text>
                        </View>
                    </View>
                    {/* <Icon name="notifications" size={24} color='white' /> */}
                </Pressable>
                <Pressable style={styles.notificationContainer}>
                    <NotificationIcon />
                    {/* <Icon name="notifications" size={24} color='white' /> */}
                </Pressable>
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 40 : 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    themeSwitch: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 1000,
    },

    sideBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    notificationContainer: {
        marginLeft: 10,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Header;
