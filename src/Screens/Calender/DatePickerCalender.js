import React from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { setInputValue } from "../../store/features/Calender/FormSlice";

const DatePickerCalender = ({ setShowDatePicker, showDatePicker, inputKey }) => {
    const dispatch = useDispatch()
    const selectionHandler = (date) => {
        // console.log('selecteddate', date)
        setShowDatePicker(false)
        dispatch(setInputValue({ inputKey, inputValue: date?.toISOString() }))
    }
    return (
        <View>
            <DateTimePickerModal mode='date' onConfirm={selectionHandler} onCancel={() => setShowDatePicker(false)} isVisible={showDatePicker} />
        </View>
    );
};

export default DatePickerCalender;
