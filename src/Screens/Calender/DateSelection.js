import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setInputValue } from "../../store/features/Calender/FormSlice";

const DateSelection = ({ item, inputKey, value, style }) => {
    console.log("🚀 ~ DateSelection ~ inputValue:", value)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const selectionHandler = () => {
        dispatch(setInputValue({ inputKey, inputValue: item }))
        dispatch(setInputValue({ inputKey: 'Day', inputValue: item }))
    }
    return (
        <TouchableOpacity onPress={() => selectionHandler(item)} style={value == item ? [style, { backgroundColor: '#FCB300' }] : style}>
            <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12, color: '#777777' }}>{t(item)}</Text>
        </TouchableOpacity>
    );
};

export default DateSelection;
