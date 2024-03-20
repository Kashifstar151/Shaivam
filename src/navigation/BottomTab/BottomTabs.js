import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import TempleTabsNavigate from '../../Screens/Temples/TempleTabsNavigate';
const Tab = createBottomTabNavigator();
export default BottomTab = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <Tab.Navigator
            screenOptions={{
                // headerStatusBarHeight:{},
                tabBarStyle: [
                    styles.tabContainer,
                    {
                        backgroundColor:
                            theme.colorscheme === 'dark' ? theme.backgroundColor : '#C2514A',
                    },
                    Platform.OS !== 'ios'
                        ? {
                            height: 65,
                        }
                        : {},
                ],
            }}
        >
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
                        <View style={styles.IconStyles}>
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
                                        Home
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
                                        Home
                                    </Text>
                                </View>
                            )}
                            <View style={{ marginTop: 6 }}>
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
                            </View>
                        </View>
                    ),
                }}
                name="Home"
                component={HomeScreen}
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
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(RouteTexts.TEMPLE_Tabs, {
                                    screen: 'Temples',
                                })
                            }
                            style={{ marginBottom: 10 }}
                        >
                            {/* <Text>Back</Text>
                             */}
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {/* <ActiveTeample /> */}
                                <TempleSVG fill={theme.bottomTabItemColor.unSelected} />
                                <Text
                                    style={[
                                        styles.tabBarLable,
                                        { color: theme.bottomTabItemColor.unSelected },
                                    ]}
                                >
                                    Temples
                                </Text>
                            </View>
                        </TouchableOpacity>
                        // <View style={styles.IconStyles}>
                        //     {focused ? (
                        //         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        //             {/* <ActiveTeample /> */}
                        //             <TempleSVG fill={theme.bottomTabItemColor.selected} />
                        //             <Text
                        //                 style={[
                        //                     styles.tabBarLable,
                        //                     { color: theme.bottomTabItemColor.selected },
                        //                 ]}
                        //             >
                        //                 Temples
                        //             </Text>
                        //         </View>
                        //     ) : (
                        //         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        //             {/* <ActiveTeample /> */}
                        //             <TempleSVG fill={theme.bottomTabItemColor.unSelected} />

                        //             <Text
                        //                 style={[
                        //                     styles.tabBarLable,
                        //                     { color: theme.bottomTabItemColor.unSelected },
                        //                 ]}
                        //             >
                        //                 Temples
                        //             </Text>
                        //         </View>
                        //     )}
                        //     <View style={{ marginTop: 6 }}>
                        //         {focused ? (
                        //             <IndicatorIcon />
                        //         ) : (
                        //             <View
                        //                 style={{
                        //                     height: 10,
                        //                     width: '100%',
                        //                     backgroundColor: 'black',
                        //                 }}
                        //             ></View>
                        //         )}
                        //     </View>
                        // </View>
                    ),
                }}
                name={RouteTexts.TEMPLE_TABS_NAVIGATE}
                component={TempleTabsNavigate}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarShowLabel: false,
                    // tabBarLabelStyle: {
                    //     color: '#FFAAA5',
                    //     fontFamily: 'Mulish-Regular',
                    //     fontSize: 10,
                    //     fontWeight: '600',
                    // },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.IconStyles}>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveCalnder /> */}
                                    <CalendarSVG fill={theme.bottomTabItemColor.selected} />
                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.selected },
                                        ]}
                                    >
                                        More
                                    </Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <InActiveCalender /> */}
                                    <CalendarSVG fill={theme.bottomTabItemColor.unSelected} />

                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.unSelected },
                                        ]}
                                    >
                                        Calender
                                    </Text>
                                </View>
                            )}
                            <View style={{ marginTop: 6 }}>
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
                            </View>
                        </View>
                    ),
                }}
                name={RouteTexts.CALENDER}
                component={Calender}
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
                        <View style={styles.IconStyles}>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveFav /> */}
                                    <FavouriteSVG fill={theme.bottomTabItemColor.selected} />
                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.selected },
                                        ]}
                                    >
                                        Favourite
                                    </Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <View style={{ marginBottom: 7 }}> */}
                                    {/* <InActiveFav /> */}

                                    <FavouriteSVG fill={theme.bottomTabItemColor.unSelected} />

                                    {/* </View> */}
                                    <Text
                                        style={[
                                            styles.tabBarLable,
                                            { color: theme.bottomTabItemColor.unSelected },
                                        ]}
                                    >
                                        Favourite
                                    </Text>
                                </View>
                            )}
                            <View style={{ marginTop: 6 }}>
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
                            </View>
                        </View>
                    ),
                }}
                name={RouteTexts.FAVOURITE}
                component={Fav}
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
                        <View style={styles.IconStyles}>
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
                                        More
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
                                        More
                                    </Text>
                                </View>
                            )}
                            <View style={{ marginTop: 10 }}>
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
                            </View>
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
        // position: 'absolute',
        // bottom: 0,
    },
    tabBarLable: {
        color: '#FFAAA5',
        fontSize: 10,
        // fontWeight: '600',
        fontFamily: 'Mulish-Regular',
    },
});
