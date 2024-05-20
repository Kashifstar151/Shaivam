import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Background from '../../components/Background';
import NandiLogo from '../../assets/Images/NandiLogo.svg';
import Icon from 'react-native-vector-icons/dist/Feather';
import ButtonComp from '../Temples/Common/ButtonComp';
import { RouteTexts } from '../../navigation/RouteText';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashLogo from "../../assets/Images/SplashLogo.svg"

const Onboarding = ({ navigation }) => {
    const [showImage, setShowImage] = useState(true);
    const [selectedLang, setSelectedLang] = useState({ name: 'English', lngCode: 'en-IN' });
    const { i18n } = useTranslation();
    useEffect(() => {
        getStorageItem();
    }, []);
    const language = [
        // { name: 'English', lngCode: 'en' },
        // { name: 'Hindi', lngCode: 'hi' },
        // { name: 'Kannada', lngCode: 'kn' },

        // { name: 'العربية', lngCode: 'ar' },
        { name: ' অসমীয়া', lngCode: 'as' },
        { name: 'বাংলা', lngCode: 'bn' },
        { name: 'English', lngCode: 'en-IN' },
        { name: 'ગુજરાતી', lngCode: 'gu' },
        // { name: 'עברית', lngCode: 'he' },
        { name: 'हिन्दी', lngCode: 'DV' },
        // { name: '日本語', lngCode: 'ja' },
        { name: 'ಕನ್ನಡ', lngCode: 'kn-IN' },
        { name: 'മലയാളം', lngCode: 'ml' },
        { name: 'ଓଡ଼ିଆ', lngCode: 'od' },
        { name: 'ਪੰਜਾਬੀ', lngCode: 'pa' },
        { name: 'सिन्धी', lngCode: 'si' },
        { name: 'தமிழ்', lngCode: 'en' },
        { name: 'తెలుగు', lngCode: 'te' },
        // { name: 'اُردُو', lngCode: 'ur' },
    ];
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const handleClick = (item) => {
        i18n.changeLanguage(item.lngCode); // 12
        setSelectedLang(item);
    };
    useEffect(() => {
        fadeIn();
        handleClick(language.find((i) => i.lngCode === i18n.language));
    }, []);
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    };
    const getStorageItem = async () => {
        let data = await AsyncStorage.getItem('language');
        console.log('🚀 ~ getStorageItem ~ data:', data);
        data = JSON.parse(data);

        if (data) {
            // setShowImage(false)
            i18n.changeLanguage(data?.lngCode);
            setTimeout(() => {
                navigation.replace(RouteTexts.BOTTOM_TABS);
            }, 3000);
        } else {
            setTimeout(() => {
                setShowImage(false);
            }, 4000);
        }
    };
    const submitNext = () => {
        AsyncStorage.setItem('language', JSON.stringify(selectedLang));
        navigation.replace(RouteTexts.BOTTOM_TABS);
    };
    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground
            style={{ width: '100%', height: Dimensions.get('window').height }}
            source={require('../../assets/Images/Background.png')}
            resizeMode="repeat"
        >
            <View
                style={{
                    justifyContent: 'center',
                    height: Dimensions.get('window').height,
                }}
            >
                {showImage ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            resizeMode="cover"
                            source={require('../../assets/Images/Component.png')}
                            style={{ alignSelf: 'center', height: 200, width: 200 }}
                        />
                        <Animated.View style={{ marginTop: 20, opacity: fadeAnim }}>
                            <Text
                                style={{ fontFamily: 'Lora-Bold', fontSize: 20, color: '#ffffff' }}
                            >
                                Om Namah Shivaya
                            </Text>
                        </Animated.View>
                    </View>
                ) : (
                    <ScrollView>
                        <View
                            style={{
                                marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 50 : 20,
                                paddingHorizontal: 20,
                            }}
                        >
                            <NandiLogo />
                            <View style={{ marginVertical: 20 }}>
                                <Text style={styles.headingText}>
                                    Choose your preferred language
                                </Text>
                                <Text style={styles.descriptionText}>
                                    The app will appear in the language you select now. However, You
                                    can always change your language in More options
                                </Text>
                            </View>
                            <FlatList
                                data={language}
                                contentContainerStyle={{
                                    paddingBottom: 60,
                                }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => handleClick(item)}
                                        style={styles.languageContainer}
                                    >
                                        <Text style={styles.languageText}>{item.name}</Text>
                                        <View
                                            style={
                                                selectedLang?.name == item?.name
                                                    ? [
                                                        styles.iconContainer,
                                                        { backgroundColor: '#FCB300' },
                                                    ]
                                                    : styles.iconContainer
                                            }
                                        >
                                            <Icon
                                                name="check"
                                                size={14}
                                                color={
                                                    selectedLang?.name == item?.name
                                                        ? '#222222'
                                                        : '#fff'
                                                }
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </ScrollView>
                )}
                {showImage ? null : (
                    <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                        <ButtonComp
                            color={true}
                            text={'Select & Continue'}
                            navigation={() => submitNext()}
                        />
                    </View>
                )}
            </View>
        </ImageBackground>
        // </View>
    );
};
export const styles = StyleSheet.create({
    headingText: { fontFamily: 'Lora-Bold', fontSize: 20, color: '#fff' },
    descriptionText: { fontSize: 12, fontFamily: 'Mulish-Regular', color: '#fff' },
    languageText: { fontFamily: 'Mulish-ExtraBold', fontSize: 12, color: '#fff' },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    iconContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Onboarding;
