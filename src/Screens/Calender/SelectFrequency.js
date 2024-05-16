import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../Context/ThemeContext";
import { colors } from "../../Helpers";
import { setInputValue } from "../../store/features/Calender/FormSlice";

const SelectFrequency = ({ selectedFrequecy, setSelectedFrequecy, closeBottomSheet, showCategory, comp }) => {
    // console.log("🚀 ~ SelectFrequency ~ comp:", comp)
    const { t } = useTranslation()
    const theme = useContext(ThemeContext)
    const isFocueseed = useIsFocused()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    // const [inputKey, setInputValue] = useState(null)
    const type = [
        { name: 'Weekly', id: 1 },
        { name: 'Monthly', id: 2 }
    ]
    let inputKey = showCategory ? 'category' : 'Frequency'
    const category = [
        { name: 'Festival', id: 1 },
        { name: 'Concert', id: 2 },
        { name: 'Discource', id: 3 },
        { name: 'Pranayam / Recitation', id: 4 },
        { name: 'Uzhavarappani', id: 5 },
        { name: 'Others', id: 6 }

    ]
    const weekData = [
        { name: 'One', id: 1 },
        { name: 'Two', id: 2 },
        { name: 'Three', id: 3 },
        { name: 'Four', id: 4 },
        { name: 'Last', id: 5 },
        // { name: 'Sat', id: 6 },
        // { name: 'Sun', id: 7 },

    ]
    // useEffect(() => {
    //     // alert(comp)
    //     if (comp == 'Event category') {
    //         setData(category)
    //         // alert(true)
    //         setInputValue(JSON.stringify('category'))
    //     } else if (comp == 'Frequency') {
    //         setData(type)
    //         setInputValue('frequency')
    //     } else {
    //         setData(weekData)
    //         setInputValue('Days')
    //     }

    // }, [isFocueseed])
    const selectionHandler = (item) => {
        setSelectedFrequecy(item)
        console.log(`${inputKey}`, 'imputKey====>')
        dispatch(setInputValue({ inputKey, inputValue: item?.name }))
        closeBottomSheet
    }
    return (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'black', marginVertical: 10 }}>{t('Select frequency of the event') ? t('Select frequency of the event') : 'Select frequency of the event'}</Text>
            <FlatList data={showCategory ? category : type} renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => selectionHandler(item)}
                    style={styles.dropDown}
                >
                    <Text style={{ fontFamily: 'Mulish-Regular', color: theme.textColor }}>
                        {t(item?.name) ? t(item?.name) : item?.name}
                    </Text>
                    <View
                        style={selectedFrequecy?.name == item?.name ? [styles.iconContainer, { backgroundColor: colors.commonColor }] : styles.iconContainer}
                    >
                        <Feather name="check" size={14} color={selectedFrequecy?.name == item?.name ? 'white' : '#222222'} />
                    </View>
                    {/* <View style={{ height: 2, width: Dimensions.get('window').width - 20, backgroundColor: '#fff' }} /> */}
                </TouchableOpacity>
            )} />
        </View>
    );
};
export const styles = StyleSheet.create({
    dropDown: {
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomColor: colors.grey3,
        borderBottomWidth: 1
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 20,
        height: 20,
        borderColor: 'black',
        borderWidth: 1,
    }
})
export default SelectFrequency;
