import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
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
    ScrollView,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MusicContainer from '../../../assets/Images/Frame 83.svg';
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

const SongAndAudio = ({ item, index, theme }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    paddingHorizontal: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <MusicContainer />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '600',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.songName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.description}
                    </Text>
                </View>
            </View>
            <TouchableOpacity>
                <Icon name="more-vert" size={22} />
            </TouchableOpacity>
        </View>
    );
    // return<Text>dhjkshajk</Text>;
};

const HomeScreen = () => {
    console.log('the re-render ');
    const { t, i18n } = useTranslation();
    const selectedLngCode = i18n.language;
    const setLng = (lngCode) => i18n.changeLanguage(lngCode);
    const { theme } = useContext(ThemeContext);
    const [compHeight, setCompHeight] = useState();
    const handleLayout = useCallback(
        (event) => {
            const { height } = event.nativeEvent.layout;
            setCompHeight(Math.floor(height));
        },
        [setCompHeight, compHeight]
    );

    useEffect(() => {
        console.log('The component height ==> ', compHeight);
    }, [compHeight]);

    const data = [
        {
            id: 1,
            songName: 'Ashtakam-1 Adhyayam-1',
            description: 'सम्पूर्ण ऋग्वेद पारायणम् Complete ...',
        },
        {
            id: 2,
            songName: 'Ashtakam-2 Adhyayam-2',
            description: 'सम्पूर्ण ऋग्वेद पाराणम् Complete ...',
        },
        {
            id: 3,
            songName: 'Ashtakam-2 Adhyayam-2',
            description: 'सम्पूर्ण ऋग्वेद पाराणम् Complete ...',
        },
    ];

    return (
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
                    paddingTop: 12,
                    marginTop: compHeight ? -compHeight / 2 : 0,
                }}
                onLayout={handleLayout}
            >
                <CardComponents />
            </View>

            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.textColor }}>
                    Songs & Audios
                </Text>

                <View style={styles.boxCommon}>
                    <FlatList
                        key={(item) => item?.id}
                        data={data}
                        renderItem={({ item, index }) => <SongAndAudio item={item} theme={theme} />}
                    />
                </View>
            </View>

            <View
                style={{
                    backgroundColor: 'red',
                    left: 0,
                    overflow: 'visible',
                    height: 230,
                    marginBottom: 230,
                }}
            >
                <Text
                    style={{
                        backgroundColor: 'green',
                        transform: [{ rotate: '-90deg' }],
                        transformOrigin: '10px',
                        position: 'absolute',
                        left: 0,
                    }}
                >
                    nfndcnmsnfmfmdsjak
                </Text>
                {/* <View>
                    <View>
                        <Text>box</Text>
                    </View>
                    <View>
                        <Text>card</Text>
                    </View>
                </View> */}
            </View>
        </ScrollView>
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
