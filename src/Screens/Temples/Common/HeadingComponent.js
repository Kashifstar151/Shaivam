import React, { useContext } from "react";
import { Dimensions, Pressable, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeContext } from "../../../Context/ThemeContext";

const HeadingComponent = ({ item, index, setHeader, selectedHeader }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                marginRight: 8,
                // elevation: {
                elevation: 5,
                backgroundColor: selectedHeader == item?.name ? theme.searchContext.selected.bgColor : theme.searchContext.unSelected.bgColor,
                // height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                width: Dimensions.get('window').width / 2.2
            }}
            onPress={() => {
                setHeader(item.name);
            }}
        >
            {selectedHeader == item?.name ? item.selected : item.unSelected}
            <Text
                style={{
                    marginHorizontal: 10,
                    color: selectedHeader == item?.name ? theme.searchContext.selected.textColor : theme.searchContext.unSelected.textColor,

                    fontFamily: 'Mulish-Bold',
                    fontSize: RFValue(11)
                    // fontWeight: '600'

                }}
            >{item.name}</Text>
        </Pressable>
    )
};

export default HeadingComponent;
