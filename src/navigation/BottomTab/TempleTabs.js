import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Temples from '../../Screens/Temples/Temples';
import { RouteTexts } from '../RouteText';

import IndicatorIcon from '../../assets/Images/Indicator.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';

import ActiveHome from '../../assets/Images/InactiveHome.svg';
import ActiveTrip from '../../assets/Images/ActiveTrip.svg';
import InActiveTrip from '../../assets/Images/InactiveTrip.svg';
import ActiveLocation from '../../assets/Images/ActiveLocation.svg';
import InActiveLocation from '../../assets/Images/UnActiveLocation.svg';
import ActiveAddTrip from '../../assets/Images/InActiveAddTemple.svg';
import InActiveAddTrip from '../../assets/Images/Vector (4).svg';
import MyTrip from '../../Screens/Temples/MyTrip/MyTrip';
import Addtemple from '../../Screens/Temples/AddTemple/Addtemple';
import { createStackNavigator } from '@react-navigation/stack';
import NearByPage from '../../Screens/Temples/NearByPage';

const NullComponent = () => <></>;

// const ExploreStack = createStackNavigator();

// const ExploreTempleStack = () => {
//     return (
//         <ExploreStack.Navigator>
//             <ExploreStack.Screen
//                 name={'explore'}
//                 component={Temples}
//                 options={{ headerShown: false }}
//             />
//             <ExploreStack.Screen
//                 name={'nearBy'}
//                 component={NearByPage}
//                 options={{
//                     headerShown: false,
//                     presentation: 'modal',
//                     animationEnabled: true,
//                     animationTypeForReplace: 'push',
//                 }}
//             />
//         </ExploreStack.Navigator>
//     );
// };
const Tab = createBottomTabNavigator();
const TempleTab = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <Tab.Navigator
            initialRouteName="Temples"
            screenOptions={{
                tabBarStyle: [
                    styles.tabContainer,
                    {},
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
                    tabBarVisible: false,
                    tabBarShowLabel: false,

                    // tabBarLabelStyle: {
                    //     color: '#FFAAA5',
                    //     fontSize: 10,
                    //     fontWeight: '600',
                    //     fontFamily: 'Mulish-Regular'
                    // },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View
                            // onPress={() =>
                            //     navigation.navigate(RouteTexts.BOTTOM_TABS, {
                            //         screen: 'Home',
                            //     })
                            // }
                            style={{
                                paddingHorizontal: 10,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ActiveHome />
                                    <Text style={[styles.tabBarLable]}>Go to Home</Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ActiveHome />
                                    <Text style={[styles.tabBarLable]}>Go to Home</Text>
                                </View>
                            )}
                            <View
                                style={{
                                    marginHorizontal: 10,
                                    height: '100%',
                                    width: 1,
                                    elevation: 2.5,
                                    backgroundColor: '#C1554E',
                                }}
                            ></View>
                        </View>
                    ),
                }}
                name="Exit Temple"
                component={NullComponent}
                listeners={() => ({
                    focus: (e) => {
                        navigation.navigate('BottomTabs', {
                            screen: 'Home',
                        });
                    },
                    tabPress: (e) => {
                        navigation.navigate(RouteTexts.BOTTOM_TABS, {
                            screen: 'Home',
                        });
                    },
                })}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.IconStyles}>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveTeample /> */}
                                    <ActiveLocation />
                                    <Text style={[styles.tabBarLable]}>Explore</Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveTeample /> */}
                                    <InActiveLocation />

                                    <Text style={[styles.tabBarLable]}>Explore</Text>
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
                                            // backgroundColor: 'black',
                                        }}
                                    ></View>
                                )}
                            </View>
                        </View>
                    ),
                }}
                name="Temples"
                component={Temples}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarShowLabel: false,

                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.IconStyles}>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveTeample /> */}
                                    <ActiveTrip />
                                    <Text style={[styles.tabBarLable]}>My Trip</Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <ActiveTeample /> */}
                                    <InActiveTrip />

                                    <Text style={[styles.tabBarLable]}>My Trip</Text>
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
                                            // backgroundColor: 'black',
                                        }}
                                    ></View>
                                )}
                            </View>
                        </View>
                    ),
                }}
                name={RouteTexts.MY_TRIP}
                component={MyTrip}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.IconStyles}>
                            {focused ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <InActiveAddTrip />

                                    <Text style={[styles.tabBarLable]}>Add Temple</Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ActiveAddTrip />
                                    <Text style={[styles.tabBarLable]}>Add Temple</Text>
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
                                        }}
                                    ></View>
                                )}
                            </View>
                        </View>
                    ),
                }}
                name={RouteTexts.ADD_TEMPLE}
                component={Addtemple}
            />
        </Tab.Navigator>
    );
};

export default TempleTab;
export const styles = StyleSheet.create({
    tabContainer: {
        paddingTop: 5,
        // overflow: 'hidden',
        // height: 65,
        alignItems: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#C2514A',
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
