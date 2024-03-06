import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";

const ButtonComp = ({ text }) => {
    return (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCB300', height: 50, width: Dimensions.get('window').width - 30, borderRadius: 10 }}>
            <Text style={{ fontSize: 14, fontFamily: 'Mulish-Regular', color: '#4C3600' }}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ButtonComp;
