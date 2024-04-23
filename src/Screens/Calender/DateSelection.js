import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setInputValue } from "../../store/features/Calender/FormSlice";

const DateSelection = ({ item, inputKey, value, style }) => {
    console.log("🚀 ~ DateSelection ~ inputValue:", value)
    const dispatch = useDispatch()
    return (
        <TouchableOpacity onPress={() => dispatch(setInputValue({ inputKey, inputValue: item }))} style={value == item ? [style, { backgroundColor: '#FCB300' }] : style}>
            <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12, color: '#777777' }}>{item}</Text>
        </TouchableOpacity>
    );
};

export default DateSelection;
