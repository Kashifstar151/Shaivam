import React, { useContext } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../Helpers';
import { ThemeContext } from '../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';
const SearchInput = ({ placeholder, setState, state, color, setOnFocus, styleOverwrite }) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    return (
        <View
            style={
                color
                    ? [
                        styles.inputcontainer,
                        {
                            backgroundColor: '#F3F3F3',
                            marginHorizontal: styleOverwrite?.marginHorizontalUnset ? 0 : 15,
                            marginTop: styleOverwrite.paddingTop,
                        },
                    ]
                    : [
                        styles.inputcontainer,
                        {
                            backgroundColor: theme.searchBox.bgColor,
                            marginHorizontal: styleOverwrite?.marginHorizontalUnset ? 0 : 15,
                            marginTop: styleOverwrite?.paddingTop,
                        },
                    ]
            }
        >
            <Icon name="search" size={28} color={color ? '#777777' : colors.grey1} />
            <TextInput
                onBlur={() => setOnFocus(false)}
                onFocus={() => setOnFocus()}
                placeholder={t(placeholder)}

                onChangeText={(e) => setState(e)}
                placeholderTextColor={theme.searchBox.textColor}
                value={state}
                style={{
                    fontSize: RFValue(10),
                    paddingHorizontal: 5,
                    color: '#FF9D9D',
                    fontFamily: 'Mulish-Regular',
                    width: '100%'
                }}
            />
        </View>
    );
};
export const styles = StyleSheet.create({
    inputcontainer: {
        borderRadius: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
        height: 55,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default SearchInput;
