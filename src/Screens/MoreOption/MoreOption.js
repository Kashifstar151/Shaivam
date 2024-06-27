import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
    BottomSheetView,
} from '@gorhom/bottom-sheet';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Background from '../../components/Background';
import ConstantHeader from '../../components/ConstantHeader';
import { colors } from '../../Helpers';
import ChooseLanguage from './ChooseLanguage';
import { ThemeContext } from '../../Context/ThemeContext';
import LanguageSVG from '../../components/SVGs/LanguageSVG';
// import FavOdhuvarSVG from '../../components/SVGs/FavOdhuvarSVG';
import GoToWebSVG from '../../components/SVGs/GoToWebSVG';
import WebSearchSVG from '../../components/SVGs/WebSearchSVG';
import ContactSVG from '../../components/SVGs/ContactSVG';
import ShareSVG from '../../components/SVGs/ShareSVG';
import RateTheAppSVG from '../../components/SVGs/RateTheAppSVG';
import AboutSVG from '../../components/SVGs/AboutSVG';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutUs from './AboutUs';
import RBSheet from 'react-native-raw-bottom-sheet';
import ShareApp from './ShareApp';
import Share from 'react-native-share';
import AcknowladgeMent from './AcknowladgeMent';

const MoreOption = () => {
    const { theme } = useContext(ThemeContext);
    const SheetRef = useRef(null);
    const shareSheetRef = useRef(null)
    const aboutSheetRef = useRef(null)
    const acknowladgeRef = useRef(null)
    const option = [
        {
            title: 'Language',
            Description: 'Your Selection',
            icon: <LanguageSVG fill={'#333333'} />,
        },
        // {
        //     title: 'Favourite Odhuvar',
        //     Description: 'Your Selection',
        //     icon: <FavOdhuvarSVG fill={'#333333'} />,
        // },
        {
            title: 'Go to website',
            Description: 'Shaivam.org',
            icon: <GoToWebSVG fill={'#333333'} />,
        },
        // {
        //     title: 'Website search',
        //     Description: 'Your Selection',
        //     icon: <WebSearchSVG fill={'#333333'} />,
        // },
        {
            title: 'Contact',
            Description: 'shaivam@shaivam.org',
            icon: <ContactSVG fill={'#333333'} />,
        },
        {
            title: 'Share the app',
            Description: '',
            icon: <ShareSVG fill={'#333333'} />,
        },
        {
            title: 'Rate the app',
            Description: '',
            icon: <RateTheAppSVG fill={'#333333'} />,
        },
        {
            title: 'About',
            Description: '',
            icon: <AboutSVG fill={'#333333'} />,
        },
        {
            title: 'Acknowledgement',
            Description: '',
            icon: <AboutSVG fill={'#333333'} />,
        },
    ];
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const firstTime = useRef(true);
    useEffect(() => {
        if (!firstTime.current && selectedLanguage?.name) {
            bottomSheetRef.current?.dismiss();
        }

        // return () => {
        //     console.log('the return function278927892789278297829789');
        //     bottomSheetRef.current?.close();
        // };
    }, [selectedLanguage]);

    useFocusEffect(
        React.useCallback(() => {
            return () => bottomSheetRef.current?.close();
        }, [])
    );

    const bottomSheetRef = useRef(null);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const navigationHandler = (item) => {
        if (item.title == 'Language') {
            bottomSheetRef.current?.present();
            firstTime.current = false;
        } else if (item?.title == 'Go to website') {
            Linking.openURL('https://shaivam.org/#gsc.tab=0')
        } else if (item?.title == 'About') {
            aboutSheetRef?.current?.open()
        } else if (item?.title == 'Contact') {
            shareSheetRef.current?.open()
        } else if (item?.title == 'Share the app') {
            Shareapp()
        } else if (item?.title == 'Acknowledgement') {
            acknowladgeRef.current.open()
        } else if (item?.title === 'Rate the app') {
            Linking.openURL("https://play.google.com/store/apps/details?id=org.shaivam")
        }
    };

    const { i18n, t } = useTranslation();

    const language = [
        // { name: 'العربية', lngCode: 'ar' },
        { name: ' অসমীয়া', lngCode: 'as' },
        { name: 'বাংলা', lngCode: 'bn' },
        { name: 'English', lngCode: 'en-IN' },
        { name: 'ગુજરાતી', lngCode: 'gu' },
        // { name: 'עברית', lngCode: 'he' },
        { name: 'हिन्दी', lngCode: 'hi' },
        // { name: '日本語', lngCode: 'ja' },
        { name: 'ಕನ್ನಡ', lngCode: 'kn-IN' },
        { name: 'മലയാളം', lngCode: 'ml' },
        { name: 'ଓଡ଼ିଆ', lngCode: 'od' },
        { name: 'ਪੰਜਾਬੀ', lngCode: 'pa' },
        { name: 'සිංහල', lngCode: 'si' },
        { name: 'தமிழ்', lngCode: 'en' },
        { name: 'తెలుగు', lngCode: 'te' },
        // { name: 'اُردُو', lngCode: 'ur' },
    ];

    const handleLanguageClick = async (item) => {
        i18n.changeLanguage(item.lngCode); // 12
        await AsyncStorage.setItem('language', JSON.stringify(item));
        setSelectedLanguage(item);
    };

    useEffect(() => {
        handleLanguageClick(language.find((i) => i.lngCode === i18n.language));
    }, []);

    const Shareapp = async () => {
        await Share.open({
            title: `Download this app from playstore and appstore`,
            message: `Download this app from playstore and appstore`,
            urls: ['https://play.google.com/store/apps/details?id=org.shaivam , http://itunes.apple.com/in/app/shaivam-org-mobile/id1363893783?mt8']
        })
    }

    const rednderItem = (item, index) => {
        // console.log("🚀 ~ file: MoreOption.js:19 ~ rednderItem ~ item:", item)
        return (
            <Pressable style={styles.list} onPress={() => navigationHandler(item)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>{item.icon}</View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={[styles.titleText, { color: theme.textColor }]}>
                            {t(item.title)}
                        </Text>
                        <Text style={{ color: colors.grey6 }}>
                            {item.title === 'Language' ? selectedLanguage.name : item.Description}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <Icon name="arrow-forward-ios" size={17} color={'#C1554E'} />
                </TouchableOpacity>
            </Pressable>
        );
    };

    return (
        <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
            <Background>
                <View
                    style={{ marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 0 }}
                >
                    <ConstantHeader />
                </View>
            </Background>
            <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <FlatList
                    contentContainerStyle={{ gap: 16 }}
                    renderItem={({ item, index }) => rednderItem(item, index)}
                    data={option}
                />
            </View>
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={['50%']}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        opacity={0.5}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                )}
                backgroundStyle={{
                    backgroundColor: theme.backgroundColor,
                }}
                handleIndicatorStyle={{
                    backgroundColor: theme.colorscheme === 'dark' ? '#fff' : '#777777',
                }}
                handleStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomColor: theme.colorscheme === 'dark' ? '#fff' : '#777777',

                    borderBottomWidth: 0.5,
                }}
            >
                <ChooseLanguage
                    setSelected={(val) => {
                        setSelectedLanguage((prev) => val);
                    }}
                    selected={selectedLanguage}
                    language={language}
                    handleClick={handleLanguageClick}
                />
            </BottomSheetModal>
            <RBSheet
                ref={aboutSheetRef}
                closeOnDragDown
                height={600}
            >
                <AboutUs />
            </RBSheet>
            <RBSheet
                ref={acknowladgeRef}
                closeOnDragDown
                height={600}
            >
                <AcknowladgeMent />
            </RBSheet>
            <RBSheet
                ref={shareSheetRef}
                closeOnDragDown
                height={300} >
                <ShareApp />
            </RBSheet>
        </View>
    );
};
export const styles = StyleSheet.create({
    main: { flex: 1 },
    container: {
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    },
    titleText: { fontSize: 14, fontFamily: 'Mulish-Bold', color: 'black' },
    imageContainer: {
        backgroundColor: '#F2F0F8',
        width: 45,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,


        borderBottomWidth: 0.5,
    },
});
export default MoreOption;
