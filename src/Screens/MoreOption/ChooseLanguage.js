import React, { useContext, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../Helpers';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../Context/ThemeContext';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const ChooseLanguage = ({ selected, setSelected }) => {
    const { i18n } = useTranslation();
    const language = [
        { name: 'العربية', lngCode: 'ar' },
        { name: ' অসমীয়া', lngCode: 'as' },
        { name: 'বাংলা', lngCode: 'bn' },
        { name: 'English', lngCode: 'en-IN' },
        { name: 'ગુજરાતી', lngCode: 'gu' },
        { name: 'עברית', lngCode: 'he' },
        { name: 'हिन्दी', lngCode: 'DV' },
        { name: '日本語', lngCode: 'ja' },
        { name: 'ಕನ್ನಡ', lngCode: 'kn-IN' },
        { name: 'മലയാളം', lngCode: 'ml' },
        { name: 'ଓଡ଼ିଆ', lngCode: 'od' },
        { name: 'ਪੰਜਾਬੀ', lngCode: 'pa' },
        { name: 'सिन्धी', lngCode: 'si' },
        { name: 'தமிழ்', lngCode: 'en' },
        { name: 'తెలుగు', lngCode: 'te' },
        { name: 'اُردُو', lngCode: 'ur' },
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
        <View style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <Text style={[styles.headingText, { color: theme.textColor }]}>
                    Select Your Language
                </Text>
                <Text
                    style={[
                        styles.descriptionText,
                        {
                            color: theme.textColor,
                        },
                    ]}
                >
                    Changes will be made across the app
                </Text>
            </View>
            <BottomSheetFlatList
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
        paddingBottom: 5,
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
