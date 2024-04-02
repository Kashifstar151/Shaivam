import React from "react";
import { Dimensions, View } from "react-native";

const ReminderSnackBar = () => {
    return (
        <View style={{ height: 50, width: Dimensions.get('window').width - 40, borderColor: '#F0F0F0', borderWidth: 1, borderRadius: 10 }}>

        </View>
    );
};

export default ReminderSnackBar;
