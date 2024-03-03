import React from "react";
import { Image, Text, View } from "react-native";
import Icon from "../../../assets/Images/itinerary 1.svg"

const EmptyTrip = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon />
            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish-Bold' }}>Plan your first trip now!</Text>
                <Text style={{ color: 'black', fontSize: 14, }}>Follow the simple steps and start your trip</Text>
            </View>

        </View>
    );
};

export default EmptyTrip;
