import React from "react";
import { Image, Text, View } from "react-native";
import Icon from "../../../assets/Images/itinerary 1.svg"
import { RouteTexts } from "../../../navigation/RouteText";
import ButtonComp from "../Common/ButtonComp";

const EmptyTrip = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon />
            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish-Bold', fontWeight: '700' }}>Plan your first trip now!</Text>
                <Text style={{ color: 'black', fontSize: 14, }}>Follow the simple steps and start your trip</Text>
            </View>
            <ButtonComp text={'Create trip'} navigation={() => navigation.navigate(RouteTexts.CREATE_TRIP)} />
        </View>
    );
};

export default EmptyTrip;
