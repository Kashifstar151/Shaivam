import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import SearchSVG from '../../components/SVGs/SearchSVG';

const SearchTemple = () => {
    return (
        <View
            style={[
                styles.wrapper,
                {
                    backgroundColor: '#F3F3F3',
                },
            ]}
        >
            <SearchSVG fill={'#777777'} />

            <TextInput
                placeholder="Search for any temple"
                placeholderTextColor={'#777777'}
                style={{ color: '#777777' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 8,
        elevation: 5,
        flex: 1,
    },
});

export default SearchTemple;

/*
import React, { useContext } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../Helpers';
import { ThemeContext } from '../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
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
                    fontSize: 12,
                    paddingHorizontal: 5,
                    color: '#FF9D9D',
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


*/