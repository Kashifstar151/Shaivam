import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import { View, TextInput } from 'react-native';
import SearchSVG from '../../components/SVGs/SearchSVG';
import BackBtnSvg from '../../components/SVGs/BackBtnSvg';
import { useTranslation } from 'react-i18next';
import { useDebouncer } from '../../Helpers/useDebouncer';

const FilterTheTempleFromList = ({ route, data, setDataToRender }) => {
    const [searchText, setSearchText] = useState('');
    const { t } = useTranslation();
    const debounceVal = useDebouncer(searchText, 500);

    const removeSpace = (input) => {
        return input.replace(/\s+/g, '');
    };
    const filterThedata = (debouncedVal) => {
        let sanitizedInput = removeSpace(debouncedVal);
        let filteredDataArray = [];

        for (let i of data) {
            const sanitizedDataName = removeSpace(i.name);
            if (sanitizedDataName.includes(sanitizedInput)) {
                filteredDataArray.push(i);
            }
        }

        setDataToRender(() => filteredDataArray);
    };
    useEffect(() => {
        filterThedata(debounceVal);
    }, [debounceVal]);
    const triggerCall = useRef(true);

    const textInputRef = useRef();

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
                    ref={textInputRef}
                    placeholder={t('Search for any temple')}
                    placeholderTextColor={'#777777'}
                    style={{ color: '#777777', flex: 1 }}
                    value={searchText}
                    onChangeText={(val) => {
                        setSearchText(val);
                    }}
                />
            </View>
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

export default FilterTheTempleFromList;
