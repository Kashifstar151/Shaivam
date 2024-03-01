import React from "react";
import { Image, Text, View } from "react-native";
import Icon from "../../../assets/Images/itinerary 1.svg"

const EmptyTrip = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon />
            <Text style={{ color: 'black' }}>Plan your first trip now!</Text>
        </View>
    );
};

export default EmptyTrip;
