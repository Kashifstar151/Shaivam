import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import BellIcon from "../../assets/Images/Vector (7).svg"
import ToggleSwitch from 'toggle-switch-react-native'
import { useTranslation } from "react-i18next";


export const styles = StyleSheet.create({
    main: { justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', height: 'auto', width: Dimensions.get('window').width - 40, borderColor: '#F0F0F0', borderWidth: 1, borderRadius: 10 }
})
const ReminderSnackBar = ({ recurringEvent, setRecurringEvent, hidebell, descriptionText, text, description }) => {
    // const [toggleOn, setToggleOn] = useState(false)
    const { t } = useTranslation()
    return (
        <View style={recurringEvent ? [styles.main, { borderColor: '#C1554E', }] : styles.main}>
            {
                hidebell ? null : <BellIcon />
            }
            <View style={{ width: '85%' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Mulish-Bold', color: '#222222' }}>{text ? text : t('Turn on reminder for event')}</Text>
                {
                    descriptionText ? null :
                        <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' }}>{description ? description : t('Notification will be sent X days prior')}</Text>
                }
            </View>
            <View>
                <ToggleSwitch
                    isOn={recurringEvent}
                    onColor="#C1554E"
                    offColor="#C0C0C0"
                    // label="Example label"
                    // labelStyle={{ color: "black", fontWeight: "900" }}
                    size='small'
                    onToggle={isOn => setRecurringEvent(!recurringEvent)}
                />
            </View>
        </View>
    );
};

export default ReminderSnackBar;
