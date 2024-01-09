import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../../Screens/Home/HomeScreen';
import ThrimuraiList from '../../Screens/Thrimurai/ThrimuraiList/ThrimuraiList';
import ActiveHome from "../../assets/Images/ActiveHome.svg"
import InactiveHome from "../../assets/Images/InactiveHome.svg"


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
                tabBarLabel: 'Home',
                tabBarActiveTintColor: '#EDCB76',
                tabBarLabelStyle: {
                    // color: '#EDCB76',
                    fontSize: 10,
                    fontWeight: '600',
                },
                tabBarIcon: ({ color, size, focused }) => (
                    <View style={styles.IconStyles}>
                        {focused ? <ActiveHome /> : <InactiveHome />}
                    </View>
                ),
            }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{
                headerShown: false
            }} name="Thrimurai" component={ThrimuraiList} />
        </Tab.Navigator>
    );
}
export const styles = StyleSheet.create({
    tabContainer: { backgroundColor: '#B14942' }
})