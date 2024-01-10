import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardComponents from '../../components/CardComponents';
import Header from '../../components/Header';
import HeadingText from '../../components/HeadingText';
import SearchInput from '../../components/SearchInput';
import { colors } from '../../Helpers';
import { useTranslation } from 'react-i18next';
import '../../../localization';
import { ThemeContext } from '../../Context/ThemeContext';
import bgImg from '../../../assets/Images/Background.png';
import bgImgDark from '../../../assets/Images/BackgroundCommon.png';
import { ScrollView } from 'react-native-gesture-handler';

const LANGS = [
    { lngCode: 'en', label: 'English' },
    { lngCode: 'hi', label: 'हिन्दी' },
    { lngCode: 'ar', label: 'Arabic' },
    { lngCode: 'as', label: 'Assamese' },
    { lngCode: 'gu', label: 'Gujarati' },
    { lngCode: 'he', label: 'Hebrew' },
    { lngCode: 'ja', label: 'Japanese' },
    { lngCode: 'kn', label: 'Kannada' },
    { lngCode: 'ml', label: 'Malayalam' },
    { lngCode: 'od', label: 'Odia' },
    { lngCode: 'pa', label: 'Punjabi' },
    { lngCode: 'si', label: 'Sinhala' },
    { lngCode: 'ta', label: 'Tamil' },
    { lngCode: 'te', label: 'Telugu' },
    { lngCode: 'ur', label: 'Urdu' },
];

const HomeScreen = () => {
    const { t, i18n } = useTranslation();
    const selectedLngCode = i18n.language;
    const setLng = (lngCode) => i18n.changeLanguage(lngCode);
    const { theme } = useContext(ThemeContext);
    const [compHeight, setCompHeight] = useState();
    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setCompHeight(height);
    };

    useEffect(() => {
        console.log('The component height ==> ', compHeight);
    }, [compHeight]);
    return (
        // <SafeAreaView>

        <ScrollView style={{ flex: 1, overflow: 'visible' }}>
            {/* <View style={styles.firstContainer}>
                <Header />
                <SearchInput />
                <HeadingText text={'Shaivam Exclusive'} />
                <Text
                    style={{ color: colors.grey3, fontSize: 12, marginTop: 5, fontWeight: '600' }}
                >
                    Scroll through and check out what Shaiva, offers {t("Thirumurais")}
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <CardComponents />
                </View>
            </View> */}

            {/* test case for language implementation */}
            {/* <View style={styles.secondContainer}>
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
            </View> */}

            <View style={[styles.firstContainer]}>
                <ImageBackground
                    source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                >
                    <Header />
                    <SearchInput
                        extraPad={false}
                        styleOverwrite={{ marginHorizontalUnset: true, paddingTop: 24 }}
                    />

                    <View style={{ marginTop: 24 }}>
                        <HeadingText text={'Shaivam Exclusive'} />
                        <Text
                            style={{
                                color: colors.grey3,
                                fontSize: 12,
                                marginTop: 5,
                                fontWeight: '600',
                            }}
                        >
                            Scroll through and check out what Shaiva, offers {t('Thirumurais')}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingTop: 15,
                    marginTop: compHeight ? -compHeight / 2 : 0,
                }}
                onLayout={handleLayout}
            >
                <CardComponents />
            </View>

            <Text style={{ color: 'black' }}>fhjkdhj</Text>

            {/* <View>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
                <Text style={{ backgroundColor: 'blue', fontSize: 80 }}>hdjkshjkfh</Text>
            </View> */}
        </ScrollView>
        // </SafeAreaView>
    );
};
export const styles = StyleSheet.create({
    main: { flex: 1 },
    firstContainer: {
        height: Dimensions.get('window').height / 2.5,
        // paddingHorizontal: 15,
    },
    secondContainer: { backgroundColor: 'white' },
    headerContainer: {
        paddingTop: StatusBar.currentHeight + 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    notificationContainer: { height: 50, width: 50, borderRadius: 25 },
});
export default HomeScreen;
