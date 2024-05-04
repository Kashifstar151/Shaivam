import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import SearchSVG from '../../components/SVGs/SearchSVG';
import { useNavigation } from '@react-navigation/core';
import BackBtnSvg from '../../components/SVGs/BackBtnSvg';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDebouncer } from '../../Helpers/useDebouncer';
import getDimension from '../../Helpers/getDimension';
import { ScrollView } from 'react-native-gesture-handler';

const SearchTemple = ({ isAutoComplete, isDisable, route, value, isNavigable }) => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const { t } = useTranslation();
    const navigator = (name, data) => {
        navigation.navigate(name, data);
    };
    const { screenWidth, screenHeight, orientation } = getDimension();

    const popAction = StackActions.pop();

    useEffect(() => {
        if (value) {
            setSearchText(value);
        }
    }, [value]);

    const debounceVal = useDebouncer(searchText, 500);

    const searchResultData = async () =>
        await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${debounceVal}&accept-language=en`,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }
        ).then((res) => res.json());

    const [fetchedLocationsName, setFetchedLocationsName] = useState([]);
    useEffect(() => {
        searchResultData().then((response) => {
            console.log(
                'the response for the search of the place name is ========================== ==>',
                response
            );

            setFetchedLocationsName((prev) => response);
        });
    }, [debounceVal]);

    return (
        <View style={{ flexGrow: 1 }}>
            <View
                style={[
                    styles.wrapper,
                    {
                        backgroundColor: '#F3F3F3',
                    },
                ]}
            >
                {route !== 'filteredTemples' ? (
                    <SearchSVG fill={'#777777'} />
                ) : (
                    <Pressable
                        onPress={() => {
                            navigation.dispatch(popAction);
                        }}
                    >
                        <BackBtnSvg />
                    </Pressable>
                )}
                <TextInput
                    placeholder={t('Search for any temple')}
                    placeholderTextColor={'#777777'}
                    style={{ color: '#777777' }}
                    value={searchText}
                    onChangeText={(val) => {
                        setSearchText(val);
                    }}
                    editable={!isDisable}
                    onSubmitEditing={() => {
                        if (isNavigable) {
                            navigator('filteredTemples', {
                                searchText,
                                data: null,
                            });
                        }
                    }}
                />
            </View>

            {isAutoComplete && (
                <ScrollView
                    style={{
                        maxHeight: screenHeight * 0.5,
                        backgroundColor: '#F3F3F3',
                        position: 'absolute',
                        top: 60,
                        zIndex: 100,
                        width: screenWidth - 40,
                        borderRadius: 8,
                        padding: 10,
                        borderWidth: 1,
                    }}
                >
                    {fetchedLocationsName.map((item, ind) => {
                        return (
                            <Pressable
                                style={{
                                    paddingVertical: 10,
                                    borderBottomWidth: fetchedLocationsName[ind + 1] ? 1 : 0,
                                    borderColor: '#33333333',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#000',
                                    }}
                                >
                                    {item.display_name}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            )}
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
        height: 45,
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
