import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeScreen from '../../Screens/Home/HomeScreen';
import Temples from '../../Screens/Temples/Temples';
import { RouteTexts } from '../RouteText';
import Calender from '../../Screens/Calender/Calender';
import Fav from '../../Screens/Favourite/Fav';
import MoreOption from '../../Screens/MoreOption/MoreOption';
import IndicatorIcon from '../../assets/Images/Indicator.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import HomeSVG from '../../components/SVGs/HomeSVG';
import TempleSVG from '../../components/SVGs/TempleSVG';
import CalendarSVG from '../../components/SVGs/CalendarSVG';
import FavouriteSVG from '../../components/SVGs/FavouriteSVG';
import MoreSVG from '../../components/SVGs/MoreSVG';
import BottomTabs from './BottomTabs';
import ExitTemple from '../../Screens/Temples/ExitTemple';
const Tab = createBottomTabNavigator();
export default TempleTab = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    // const exitTabs = ()=>{
    //  return(
    //     <TouchableOpacity onPress={()=>navigator}>
    //         <Text></Text>
    //     </TouchableOpacity>
    //  )
    // }
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: [
                    styles.tabContainer,
                    {
                        backgroundColor:
                            theme.colorscheme === 'dark' ? theme.backgroundColor : '#C2514A',
                    },
                ],
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarVisible: false,
                    // tabBarLabelStyle: {
                    //     color: '#FFAAA5',
                    //     fontSize: 10,
                    //     fontWeight: '600',
                    //     fontFamily: 'Mulish-Regular'
                    // },
                    tabBarIcon: ({ color, size, focused }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(RouteTexts.BOTTOM_TABS, {
                                    screen: 'Home',
                                })
                            }
                            style={{
                                paddingHorizontal: 6,
                                borderRightWidth: 1,
                                borderRightColor: 'black',
                            }}
                        >
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {/* <ActiveTeample /> */}
                                <TempleSVG fill={theme.bottomTabItemColor.unSelected} />
                                <Text
                                    style={[
                                        styles.tabBarLable,
                                        { color: theme.bottomTabItemColor.unSelected },
                                    ]}
                                >
                                    Go to Home
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
                name="Exit Temple"
                component={Temples}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarVisible: false,
                    // tabBarLabelStyle: {
                    //     color: '#FFAAA5',
                    //     fontSize: 10,
                    //     fontWeight: '600',
                    //     fontFamily: 'Mulish-Regular'
                    // },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveHome /> */}

                                    <HomeSVG fill={theme.bottomTabItemColor.selected} />
                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.selected },
                                        ]}
                                    >
                                        Explore
                                    </Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <InactiveHome /> */}
                                    <HomeSVG fill={theme.bottomTabItemColor.unSelected} />

                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.unSelected },
                                        ]}
                                    >
                                        Explore
                                    </Text>
                                </View>
                            )}
                            {/* <View style={{ marginTop: 6 }}>
                                {focused ? (
                                    <IndicatorIcon />
                                ) : (
                                    <View
                                        style={{
                                            height: 10,
                                            width: '100%',
                                            backgroundColor: 'black',
                                        }}
                                    ></View>
                                )}
                            </View> */}
                        </View>
                    ),
                }}
                name="Templess"
                component={Temples}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarShowLabel: false,
                    // tabBarLabelStyle: {
                    //     color: '#FFAAA5',
                    //     fontSize: 10,
                    //     fontWeight: '600',
                    //     fontFamily: 'Mulish-Regular'
                    // },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveTeample /> */}
                                    <TempleSVG fill={theme.bottomTabItemColor.selected} />
                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.selected },
                                        ]}
                                    >
                                        My Trip
                                    </Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveTeample /> */}
                                    <TempleSVG fill={theme.bottomTabItemColor.unSelected} />

                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.unSelected },
                                        ]}
                                    >
                                        My Trip
                                    </Text>
                                </View>
                            )}
                            {/* <View style={{ marginTop: 6 }}>
                                {focused ? (
                                    <IndicatorIcon />
                                ) : (
                                    <View
                                        style={{
                                            height: 10,
                                            width: '100%',
                                            backgroundColor: 'black',
                                        }}
                                    ></View>
                                )}
                            </View> */}
                        </View>
                    ),
                }}
                name={RouteTexts.TEMPLE}
                component={BottomTabs}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: 'white',
                    // tabBarLabelStyle: {
                    //     // color: '#EDCB76',
                    //     color: '#FFAAA5',
                    //     fontSize: 10,
                    //     fontWeight: '600',
                    //     fontFamily: 'Mulish-Regular'
                    // },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ marginBottom: 7 }}>
                                        {/* <ActiveMore /> */}
                                        <MoreSVG fill={theme.bottomTabItemColor.selected} />
                                    </View>

                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.selected },
                                        ]}
                                    >
                                        Add Temple
                                    </Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ marginBottom: 7 }}>
                                        {/* <InActiveMore /> */}
                                        <MoreSVG fill={theme.bottomTabItemColor.unSelected} />
                                    </View>
                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.unSelected },
                                        ]}
                                    >
                                        Add Temple
                                    </Text>
                                </View>
                            )}
                            {/* <View style={{ marginTop: 10 }}>
                                {focused ? (
                                    <IndicatorIcon />
                                ) : (
                                    <View
                                        style={{
                                            height: 6,
                                            width: '100%',
                                            backgroundColor: 'black',
                                        }}
                                    ></View>
                                )}
                            </View> */}
                        </View>
                    ),
                }}
                name={RouteTexts.MORE_OPTION}
                component={MoreOption}
            />
        </Tab.Navigator>
    );
};
export const styles = StyleSheet.create({
    tabContainer: {
        paddingTop: 5,
        height: 65,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        position: 'absolute',
        bottom: 0,
    },
    IconStyles: {
        paddingTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    tabBarLable: {
        color: '#FFAAA5',
        fontSize: 10,
        // fontWeight: '600',
        fontFamily: 'Mulish-Regular',
    },
});
