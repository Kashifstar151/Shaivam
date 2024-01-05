import React from 'react'
import {
    Dimensions,
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardComponents from '../../components/CardComponents';
import Header from '../../components/Header';
import HeadingText from '../../components/HeadingText';
import SearchInput from '../../components/SearchInput';
import { colors } from '../../Helpers';
import '../../../localization';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const LANGS = [
    { lngCode: 'en', label: 'English' },
    { lngCode: 'hi', label: 'हिन्दी' },
];
const HomeScreen = () => {
    const { t, i18n } = useTranslation();
    const selectedLngCode = i18n.language;
    console.log('🚀 ~ file: HomeScreen.js:16 ~ HomeScreen ~ selectedLngCode:', selectedLngCode);
    const setLng = (lngCode) => i18n.changeLanguage(lngCode);
    return (
        // <SafeAreaView>

        <View style={{ flex: 1 }}>
            <View style={styles.firstContainer}>
                <Header />
                <SearchInput />
                <HeadingText text={'Shaivam Exclusive'} />
                <Text
                    style={{ color: colors.grey3, fontSize: 12, marginTop: 5, fontWeight: '600' }}
                >
                    Scroll through and check out what Shaiva, offers {t('common:loveThyself_she')}
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <CardComponents />
                </View>
            </View>
            <View style={styles.secondContainer}>
                <View>
                    {LANGS.map((l) => {
                        const selected = l.lngCode === selectedLngCode;
                        return (
                            <TouchableOpacity
                                onPress={() => setLng(l.lngCode)}
                                key={l.lngCode}
                                disabled={selected}
                            >
                                <View style={[styles.row, selected ? styles.selectedRow : {}]}>
                                    <Text
                                        style={[
                                            selected ? styles.selectedText : styles.text,
                                            { color: 'black' },
                                        ]}
                                    >
                                        {l.label}
                                    </Text>
                                    {selected && <Text>👍</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
        // </SafeAreaView>
    );
};
export const styles = StyleSheet.create({
    main: { flex: 1 },
    firstContainer: { backgroundColor: '#AA4A44', height: Dimensions.get('window').height / 2.5, paddingHorizontal: 15 },
    secondContainer: { backgroundColor: 'white' },
    headerContainer: { paddingTop: StatusBar.currentHeight + 50, justifyContent: 'space-between', flexDirection: 'row' },
    notificationContainer: { height: 50, width: 50, borderRadius: 25, }
})
export default HomeScreen