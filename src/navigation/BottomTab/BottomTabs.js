import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../../Screens/Home/HomeScreen';
import ThrimuraiList from '../../Screens/Thrimurai/ThrimuraiList/ThrimuraiList';
import ActiveHome from "../../assets/Images/ActiveHome.svg"
import InactiveHome from "../../assets/Images/InactiveHome.svg"
import ActiveCalnder from "../../assets/Images/ActiveCalender.svg"
import InActiveCalender from "../../assets/Images/InactiveCalender.svg"
import ActiveFav from "../../assets/Images/ActiveFav.svg"
import InActiveFav from "../../assets/Images/InactiveFav.svg"
import ActiveMore from "../../assets/Images/ActiveMore.svg"
import InActiveMore from "../../assets/Images/InactiveMore.svg"
import ActiveTeample from "../../assets/Images/ActiveTemple.svg"
import Temples from '../../Screens/Temples/Temples';
import { RouteTexts } from '../RouteText';
import Calender from '../../Screens/Calender/Calender';
import Fav from '../../Screens/Favourite/Fav';
import MoreOption from '../../Screens/MoreOption/MoreOption';
import IndicatorIcon from "../../assets/Images/Indicator.svg"
const Tab = createBottomTabNavigator();
export default BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={
            {
                tabBarStyle: styles.tabContainer
            }
        }>
            <Tab.Screen options={{
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
                        {focused ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ActiveHome />
                            <Text style={styles.tabBarLable}>Home</Text>
                        </View> : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <InactiveHome />
                            <Text style={styles.tabBarLable}>Home</Text>
                        </View>}
                        <View style={{ marginTop: 6 }}>
                            {focused ? <IndicatorIcon /> : <View style={{ height: 10, width: '100%', backgroundColor: 'black' }}></View>}
                        </View>
                    </View>
                ),
            }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{
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
                        {focused ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ActiveTeample />
                            <Text style={styles.tabBarLable}>Temples</Text>
                        </View> : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ActiveTeample />
                            <Text style={styles.tabBarLable}>Temples</Text>
                        </View>}
                        <View style={{ marginTop: 6 }}>
                            {focused ? <IndicatorIcon /> : <View style={{ height: 10, width: '100%', backgroundColor: 'black' }}></View>}
                        </View>
                    </View>
                ),
            }} name={RouteTexts.TEMPLE} component={Temples} />
            <Tab.Screen options={{
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
                        {focused ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ActiveCalnder />
                            <Text style={styles.tabBarLable}>More</Text>
                        </View> : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <InActiveCalender />
                            <Text style={styles.tabBarLable}>Calender</Text>
                        </View>}
                        <View style={{ marginTop: 6 }}>
                            {focused ? <IndicatorIcon /> : <View style={{ height: 10, width: '100%', backgroundColor: 'black' }}></View>}
                        </View>
                    </View>
                ),
            }} name={RouteTexts.CALENDER} component={Calender} />
            <Tab.Screen options={{
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
                        {focused ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ActiveFav />
                            <Text style={styles.tabBarLable}>Favourite</Text>
                        </View> :
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {/* <View style={{ marginBottom: 7 }}> */}
                                <InActiveFav />
                                {/* </View> */}
                                <Text style={styles.tabBarLable}>Favourite</Text>
                            </View>}
                        <View style={{ marginTop: 6 }}>
                            {focused ? <IndicatorIcon /> : <View style={{ height: 10, width: '100%', backgroundColor: 'black' }}></View>}
                        </View>
                    </View>
                ),
            }} name={RouteTexts.FAVOURITE} component={Fav} />
            <Tab.Screen options={{
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
                        {focused ?
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginBottom: 7 }}>
                                    <ActiveMore />
                                </View>

                                <Text style={styles.tabBarLable}>More</Text>
                            </View> :
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginBottom: 7 }}>
                                    <InActiveMore />
                                </View>
                                <Text style={[styles.tabBarLable]}>More</Text>
                            </View>}
                        <View style={{ marginTop: 10 }}>
                            {focused ? <IndicatorIcon /> : <View style={{ height: 6, width: '100%', backgroundColor: 'black' }}></View>}
                        </View>
                    </View>
                ),
            }} name={RouteTexts.MORE_OPTION} component={MoreOption} />
        </Tab.Navigator>
    );
}
export const styles = StyleSheet.create({
    tabContainer: { backgroundColor: '#B14942', paddingTop: 5, height: 65, borderTopEndRadius: 10, borderTopStartRadius: 10, position: 'absolute', bottom: 3 },
    IconStyles: { paddingTop: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0 },
    tabBarLable: {
        color: '#FFAAA5',
        fontSize: 10,
        fontWeight: '600',
        fontFamily: 'Mulish-Regular',
    }
})