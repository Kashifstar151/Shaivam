import React, { useContext, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import SearchSVG from '../../components/SVGs/SearchSVG';
import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDebouncer } from '../../Helpers/useDebouncer';
import getDimension from '../../Helpers/getDimension';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import * as RNLocalize from 'react-native-localize';
import { checkPermissionAccess } from '../../Helpers/GeolocationFunc';
import { PERMISSIONS } from 'react-native-permissions';
import { ThemeContext } from '../../Context/ThemeContext';
// import BackBtnSVG from '../../components/SVGs/BackBtnSvg';

const SearchTemple = ({
    setRegionCoordinate,
    setMapInteractivityState,
    isAutoComplete,
    isDisable,
    route,
    value,
    isNavigable,
    positionSuggestionBox,
}) => {
    const [searchText, setSearchText] = useState('');
    const [showSuggestion, setShowSuggestion] = useState('');
    const [msg, setMsg] = useState('Please search for location');
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

    const clearTheSearchText = () => {
        if (!isDisable) setSearchText('');
    };
    const searchResultData = async () => {
        return await fetch(
            // `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${debounceVal}&key=${'AIzaSyC9Esy5cuOwL4OsSxPuhOet3ky5cKI8J1k'}&language=en`,
            `https://nominatim.openstreetmap.org/search?format=json&q=${debounceVal}&accept-language=${
                RNLocalize.getLocales().map((locale) => locale.languageCode)[0]
            }`,

            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }
        ).then((res) => res.json());
    };

    const [fetchedLocationsName, setFetchedLocationsName] = useState([]);
    useEffect(() => {
        if (debounceVal) {
            searchResultData()
                .then((response) => {
                    console.log(
                        'the response for the search of the place name is ========================== ==>',
                        JSON.stringify(response, null, 2)
                    );

                    setFetchedLocationsName(() => response);
                    setShowSuggestion(true);
                })
                .catch((error) => {
                    console.log('some error occured ==>', error);
                    setMsg('Error Occurred');
                });
        }
    }, [debounceVal]);
    const triggerCall = useRef(true);

    useEffect(() => {
        if (setMapInteractivityState !== undefined) {
            if (showSuggestion) {
                setMapInteractivityState(false);
            } else {
                setMapInteractivityState(true);
            }
        }
    }, [showSuggestion, setMapInteractivityState]);

    const textInputRef = useRef();
    const handleFocus = () => {
        setShowSuggestion(true);
    };

    const handleBlur = () => {
        setShowSuggestion(false);
        textInputRef.current.blur();
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            triggerCall.current = true;
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            triggerCall.current = false;
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const permissionTypeRef = useRef(
        Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        })
    );

    const { theme } = useContext(ThemeContext);
    return (
        <View style={{ flexGrow: 1 }}>
            <View
                style={[
                    styles.wrapper,
                    {
                        backgroundColor: theme.colorscheme === 'light' ? '#F3F3F3' : '#3A3A3A',
                    },
                ]}
            >
                {route !== 'filteredTemples' ? (
                    <SearchSVG fill={theme.colorscheme === 'light' ? '#777777' : '#fff'} />
                ) : (
                    <Pressable
                        onPress={() => {
                            navigation.dispatch(popAction);
                        }}
                    >
                        {/* <BackBtnSVG /> */}
                    </Pressable>
                )}
                <TextInput
                    ref={textInputRef}
                    placeholder={t('Search for any temple')}
                    placeholderTextColor={theme.colorscheme === 'light' ? '#777777' : '#fff'}
                    style={{ color: theme.colorscheme === 'light' ? '#777777' : '#fff', flex: 1 }}
                    value={searchText}
                    onChangeText={(val) => {
                        setSearchText(val);
                    }}
                    onFocus={handleFocus}
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

                {searchText.length > 1 && (
                    <Pressable
                        style={{
                            width: 25,
                            height: 25,
                            borderRadius: 20,
                            marginRight: -10,
                        }}
                        onPress={clearTheSearchText}
                    >
                        <AntDesign name="close" size={20} color="rgba(119, 119, 119, 1)" />
                    </Pressable>
                )}
            </View>

            {isAutoComplete && showSuggestion && (
                <>
                    <Pressable
                        style={{
                            position: 'absolute',
                            top: 60,
                            width: screenWidth,
                            height: screenHeight,
                            marginLeft: -20,
                        }}
                        onPress={handleBlur}
                    ></Pressable>
                    <ScrollView
                        style={[
                            {
                                position: 'absolute',
                                top: 60,
                                width: screenWidth - 40,
                                backgroundColor:
                                    theme.colorscheme === 'light' ? '#F3F3F3' : '#222222',
                                borderRadius: 8,
                                padding: 10,
                                borderWidth: 1,
                                maxHeight: screenHeight * 0.5,
                            },
                            positionSuggestionBox,
                        ]}
                        contentContainerStyle={{
                            paddingBottom: fetchedLocationsName.length ? 20 : 0,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {fetchedLocationsName.length ? (
                            fetchedLocationsName.map((item, ind) => {
                                return (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            handleBlur();
                                            triggerCall.current = false;
                                            setSearchText(() => item.display_name);
                                            checkPermissionAccess(permissionTypeRef.current) &&
                                                setRegionCoordinate(item);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    theme.colorscheme === 'light' ? '#000' : '#fff',
                                                paddingVertical: 10,
                                                borderBottomWidth: fetchedLocationsName[ind + 1]
                                                    ? 1
                                                    : 0,
                                                borderColor:
                                                    theme.colorscheme === 'light'
                                                        ? '#33333333'
                                                        : '#fff',
                                            }}
                                        >
                                            {item.display_name}
                                        </Text>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        ) : (
                            <Text style={{ color: 'red' }}>{msg}</Text>
                        )}
                    </ScrollView>
                </>
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
