import React, { useContext, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../Helpers';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../Context/ThemeContext';

const ChooseLanguage = ({ selected, setSelected }) => {
    const { i18n } = useTranslation();
    const language = [
        // { name: 'English', lngCode: 'en' },
        // { name: 'Hindi', lngCode: 'hi' },
        // { name: 'Kannada', lngCode: 'kn' },
        { name: 'English', lngCode: 'en-IN' },
        { name: 'Hindi', lngCode: 'DV' },
        { name: 'Kannada', lngCode: 'kn-IN' },
        { name: 'Malayalam', lngCode: 'ml' },
        { name: 'Tamil', lngCode: 'en' },
        { name: 'Bengali', lngCode: 'bn' },
        { name: 'Assamese', lngCode: 'as' },
        { name: 'Arabic', lngCode: 'ar' },
        { name: 'Gujrati', lngCode: 'gu' },
        { name: 'Hebrew', lngCode: 'he' },
        { name: 'Japanese', lngCode: 'ja' },
        { name: 'Oriya', lngCode: 'od' },
        { name: 'Punjabi', lngCode: 'pa' },
        { name: 'Sindhi', lngCode: 'si' },
        { name: 'Telgu', lngCode: 'te' },
        { name: 'Urdu', lngCode: 'ur' },
    ];

    const handleClick = (item) => {
        i18n.changeLanguage(item.lngCode); // 12
        setSelected(item);
    };

    useEffect(() => {
        handleClick(language.find((i) => i.lngCode === i18n.language));
    }, []);

    const { theme } = useContext(ThemeContext);
    return (
        <View style={{ marginTop: 10, backgroundColor: theme.backgroundColor }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={[styles.headingText, { color: theme.textColor }]}>
                    Select Your Language {i18n.language} and selected is {selected?.name}
                </Text>
                <Text style={styles.descriptionText}>Changes will be made across the app</Text>
            </View>
            <FlatList
                contentContainerStyle={{ marginTop: 10 }}
                data={language}
                renderItem={({ item, index }) => (
                    <Pressable style={styles.list} onPress={() => handleClick(item)}>
                        <Text style={[styles.listText, { color: theme.textColor }]}>
                            {item.name}
                        </Text>
                        <View
                            style={
                                selected?.name == item.name
                                    ? styles.selectView
                                    : styles.unSelectedView
                            }
                        >
                            <Icon
                                name="check"
                                color={selected?.name == item.name ? 'white' : '#777777'}
                                size={12}
                            />
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
};
export const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Lora-SemiBold',
        color: '#222222',
        fontSize: 16,
        paddingVertical: 10,
    },
    descriptionText: { fontFamily: 'Mulish-Bold', fontSize: 12 },
    list: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listText: { fontFamily: 'Mulish-Bold', fontSize: 14, color: 'black', marginHorizontal: 10 },
    selectView: {
        marginHorizontal: 10,
        backgroundColor: '#C1554E',
        height: 20,
        width: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unSelectedView: {
        marginHorizontal: 10,
        borderColor: '#777777',
        borderWidth: 2,
        height: 20,
        width: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default ChooseLanguage;
