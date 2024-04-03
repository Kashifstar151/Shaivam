import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { colors } from '../../Helpers';
console.log('🚀 ~ colors:', colors?.dark.bottomTabItemColor.selected);
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation, theme, ...restProps }) => {
    const SVGMap = {
        Home: {
            selected: <HomeSVG fill={theme?.bottomTabItemColor.selected} />,
            unSelected: <HomeSVG fill={theme?.bottomTabItemColor.unSelected} />,
        },
        Temple: {
            selected: <TempleSVG fill={theme?.bottomTabItemColor.selected} />,
            unSelected: <TempleSVG fill={theme?.bottomTabItemColor.unSelected} />,
        },
        Calender: {
            selected: <CalendarSVG fill={theme?.bottomTabItemColor.selected} />,
            unSelected: <CalendarSVG fill={theme?.bottomTabItemColor.unSelected} />,
        },
        Favourite: {
            selected: <FavouriteSVG fill={theme?.bottomTabItemColor.selected} />,
            unSelected: <FavouriteSVG fill={theme?.bottomTabItemColor.unSelected} />,
        },
        More: {
            selected: <MoreSVG fill={theme?.bottomTabItemColor.selected} width={18} height={24} />,
            unSelected: (
                <MoreSVG fill={theme?.bottomTabItemColor.unSelected} width={18} height={24} />
            ),
        },
    };
    return (
        <View
            style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                paddingTop: 8,
                overflow: 'hidden',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: theme.colorscheme === 'dark' ? '#111111' : '#C2514A',
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const { params: parameter } = route;

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        if (label === 'Temple') {
                            navigation.navigate(RouteTexts.TEMPLE_TABS_NAVIGATE, {});
                        } else {
                            navigation.navigate(route.name);
                        }
                    }
                };

                return (
                    <>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                {parameter?.svg && isFocused
                                    ? SVGMap[parameter?.svg]?.selected
                                    : SVGMap[parameter?.svg]?.unSelected}
                                <Text
                                    style={[
                                        styles.tabBarLable,
                                        {
                                            color: isFocused
                                                ? theme.bottomTabItemColor.selected
                                                : theme.bottomTabItemColor.unSelected,
                                        },
                                    ]}
                                >
                                    {label}
                                </Text>
                                {isFocused ? (
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
                            {state.routes[index + 1] ? (
                                <View
                                    style={
                                        isFocused
                                            ? styles.seperatonIcon
                                            : [styles.seperatonIcon, { backgroundColor: '#AD4A44' }]
                                    }
                                />
                            ) : null}
                        </TouchableOpacity>
                    </>
                );
            })}
        </View>
    );
};

export default BottomTab = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <BottomSheetModalProvider>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: [
                        styles.tabContainer,
                        Platform.OS !== 'ios'
                            ? {
                                  height: 65,
                              }
                            : {},
                    ],
                    tabBarHideOnKeyboard: true,
                }}
                tabBar={(props) => <MyTabBar {...props} theme={theme} />}
            >
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Home',
                        tabBarActiveTintColor: 'white',
                        tabBarShowLabel: false,
                    }}
                    initialParams={{
                        svg: 'Home',
                    }}
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Temple',
                        tabBarActiveTintColor: 'white',
                        tabBarShowLabel: false,
                    }}
                    initialParams={{
                        svg: 'Temple',
                    }}
                    name={RouteTexts.TEMPLE_TABS_NAVIGATE}
                    component={TempleTabsNavigate}
                />
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Calender',
                        tabBarActiveTintColor: 'white',
                        tabBarShowLabel: false,
                    }}
                    initialParams={{
                        svg: 'Calender',
                    }}
                    name={RouteTexts.CALENDER}
                    component={Calender}
                />
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Favourite',
                        tabBarActiveTintColor: 'white',
                        tabBarShowLabel: false,
                    }}
                    initialParams={{
                        svg: 'Favourite',
                    }}
                    name={RouteTexts.FAVOURITE}
                    component={Fav}
                ></Tab.Screen>
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarLabel: 'More',
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: 'white',
                    }}
                    initialParams={{
                        svg: 'More',
                    }}
                    name={RouteTexts.MORE_OPTION}
                    component={MoreOption}
                />
            </Tab.Navigator>
        </BottomSheetModalProvider>
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
        // alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'red',
        width: Dimensions.get('screen').width / 5,
        // position: 'absolute',
        // bottom: 0,
    },
    tabBarLable: {
        color: '#FFAAA5',
        fontSize: 10,
        // fontWeight: '600',
        fontFamily: 'Mulish-Regular',
        paddingBottom: 5,
    },
    seperatonIcon: {
        height: 20,
        width: 1,
        backgroundColor: 'white',
        marginHorizontal: 12,
        marginVertical: 5,
    },
});
