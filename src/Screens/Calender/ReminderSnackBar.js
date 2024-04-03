import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import BellIcon from "../../assets/Images/Vector (7).svg"
import ToggleSwitch from 'toggle-switch-react-native'

export const styles = StyleSheet.create({
    main: { justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', height: 50, width: Dimensions.get('window').width - 40, borderColor: '#F0F0F0', borderWidth: 1, borderRadius: 10 }
})
const ReminderSnackBar = ({ hidebell }) => {
    const [toggleOn, setToggleOn] = useState(false)
    return (
        <View style={toggleOn ? [styles.main, { borderColor: '#C1554E' }] : styles.main}>
            {
                hidebell ? null : <BellIcon />
            }

            <View style={{}}>
                <Text style={{ fontSize: 14, fontFamily: 'Mulish-Bold', color: '#222222' }}>Turn on reminder for event</Text>
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' }}>Notification will be sent X days prior</Text>
            </View>
            <View>
                <ToggleSwitch
                    isOn={toggleOn}
                    onColor="#C1554E"
                    offColor="#C0C0C0"
                    // label="Example label"
                    // labelStyle={{ color: "black", fontWeight: "900" }}
                    size='small'
                    onToggle={isOn => setToggleOn(isOn)}
                />
            </View>
        </View>
    );
};

export default ReminderSnackBar;
