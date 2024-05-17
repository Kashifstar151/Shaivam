import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, View, Pressable, StyleSheet } from 'react-native';
import OmIcon from './SVGs/OmIcon';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../Context/ThemeContext';
import BookIcon from './SVGs/BookIcon';
import OmLetterSvg from './SVGs/OmLetterSvg';
import StrotasSVG from './SVGs/StrotasSVG';
import ShaivaSVG from './SVGs/ShaivaSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import HeadingText from './HeadingText';
import { colors } from '../Helpers';
import { t } from 'i18next';
import Header from './Header';
import SearchInput from './SearchInput';
import ShaivamTVSVG from './SVGs/ShaivamTVSVG';
import Temple1Svg from './SVGs/Temple1Svg';
import RadioSVG from './SVGs/RadioSVG';
import CalendarSVG from './SVGs/CalendarSVG';
import KalaPujaSVG from './SVGs/KalaPujaSVG';
import QuizSVG from './SVGs/QuizSVG';
import HeartSVG from './SVGs/HeartSVG';
import Logo from '../../src/assets/Images/Logo.svg';
import { RouteTexts } from '../navigation/RouteText';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

const RenderItem = ({ blockRef, item, navigation, theme }) => {
    const [blockWidth, setBlockWidth] = useState(0);

    const onLayout = (event, index) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        console.log('🚀 ~ RenderItem ~ index:', index);
        if (index == 0) {
            console.log('🚀 ~ onLayout ~ width:', width);
            setBlockWidth(width);
        }
    };
    // console.log("🚀 ~ RenderItem ~ blockRef:", blockRef)
    return (
        <LinearGradient
            colors={item.gradient}
            useAngle={true}
            angle={130}
            angleCenter={{ x: 0, y: 0 }}
            style={styles.linearGradientBox}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 11,
                }}
            >
                <View style={{ justifyContent: 'center', paddingHorizontal: 5 }}>
                    <Text
                        style={{
                            // fontSize: responsiveFontSize(12),
                            fontSize: 16,
                            // fontWeight: '600',
                            paddingVertical: 3,
                            fontFamily: 'Lora-SemiBold',
                            color: item.textColor,
                        }}
                    >
                        {item?.text}
                    </Text>
                    <Text style={{ fontSize: RFValue(12), color: item.textColor }}>
                        {item?.description}
                    </Text>
                </View>
                <OmIcon fill={theme === 'light' ? '#4C3600' : '#fff'} />
            </View>

            <View style={styles.viewBoxForSubComp}>
                {item.subComp.map((i, _) => (
                    <Pressable
                        ref={blockRef}
                        onLayout={(event) => onLayout(event, _)}
                        onPress={
                            i?.navName == 'Thirumurais' ||
                                i?.navName == 'Stotras' ||
                                i?.navName == RouteTexts.TEMPLE_TABS_NAVIGATE ||
                                i?.navName == RouteTexts.CALENDER ||
                                i?.navName == RouteTexts.FAVOURITE ||
                                i?.navName == RouteTexts.RADIO
                                ? () => navigation.navigate(i?.navName)
                                : i?.navName == 'Website'
                                    ? () => Linking.openURL('https://shaivam.org/')
                                    : () => alert(`the ${i?.navName}`)
                        }
                        style={[
                            styles.subComp,
                            {
                                backgroundColor: theme === 'light' ? 'white' : '#494949',
                                opacity: theme === 'light' ? 0.7 : 1,
                                width:
                                    blockWidth > 100
                                        ? blockWidth
                                        : (Dimensions.get('window').width * 0.85) / 2 - 24,
                            },
                        ]}
                    >
                        {i.icon}
                        <View
                            style={[styles.seperator, { borderRightColor: item.gradient[1] }]}
                        ></View>
                        <Text
                            style={[
                                styles.subCompText,
                                {
                                    color: item.textColor,
                                },
                            ]}
                        >
                            {i.title}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </LinearGradient>
    );
};

const CardComponents = ({ navigation }) => {
    const blockRef = useRef(null);
    const [blockWidth, setBlockWidth] = useState(0);
    const [searchText, setSearchText] = useState(null);
    const [onFocus, setOnFocus] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();

    const data = [
        {
            text: t('Sacred Texts'),
            description: t('Listen to all shiva related audios here'),
            id: 1,
            gradient: theme.gradientHomeCardYellow,
            textColor: theme.textColorHomeCardYellow,

            subComp: [
                {
                    icon: <BookIcon fill={theme.textColorHomeCardYellow} />,
                    title: t('Thirumurais'),
                    navName: 'Thirumurais',
                },
                // {
                //     icon: <OmLetterSvg fill={theme.textColorHomeCardYellow} />,
                //     title: t('Vedas'),
                //     navName: 'Vedas',
                // },
                {
                    icon: <RadioSVG fill={theme.textColor} />,
                    title: t('Radio'),
                    navName: RouteTexts.RADIO,
                },
                // {
                //     icon: <StrotasSVG fill={theme.textColorHomeCardYellow} />,
                //     title: t('Stotras'),
                //     navName: 'Stotras',
                // },
                {
                    icon: <Temple1Svg fill={theme.textColor} />,
                    title: t('Temples'),
                    navName: RouteTexts.TEMPLE_TABS_NAVIGATE,
                },
                {
                    icon: <CalendarSVG fill={theme.textColor} />,
                    title: t('Calendar'),
                    navName: 'Calender',
                },
                // {
                //     icon: <ShaivaSVG fill={theme.textColorHomeCardYellow} />,
                //     title: t('Shaiva Siddanta'),
                //     navName: 'S Siddanta',
                // },
            ],
        },
        {
            text: t('Shaivam Media'),
            description: t('Check out shaivam media features'),
            id: 2,
            gradient: theme.gradientHomeCardGreen,
            textColor: theme.textColor,
            subComp: [
                // {
                //     icon: <ShaivamTVSVG fill={theme.textColor} />,
                //     title: t('Shaivam TV'),
                //     navName: 'Shaivam TV',
                // },
                {
                    icon: <HeartSVG fill={theme.textColorHomeCardYellow} />,
                    title: t('Favourites'),
                    navName: RouteTexts.FAVOURITE,
                },
                {
                    icon: <RadioSVG fill={theme.textColor} />,
                    title: t('Radio'),
                    navName: RouteTexts.RADIO,
                },
                {
                    icon: <Logo fill={theme.textColorHomeCardYellow} />,
                    title: 'Shaivam.org',
                    navName: 'Website',
                },
                // {
                //     icon: <Temple1Svg fill={theme.textColor} />,
                //     title: t('Temples'),
                //     navName: RouteTexts.TEMPLE_TABS_NAVIGATE,
                // },
                // {
                //     icon: <CalendarSVG fill={theme.textColor} />,
                //     title: t('Calendar'),
                //     navName: 'Calender',
                // },
            ],
        },
        // {
        //     text: t('More Features'),
        //     description: 'Listed to all shiva related audios here',
        //     id: 3,
        //     gradient: theme.gradientHomeCardYellow,
        //     textColor: theme.textColorHomeCardYellow,

        //     subComp: [
        //         {
        //             icon: <KalaPujaSVG fill={theme.textColorHomeCardYellow} />,
        //             title: t('Kaala Puja'),
        //             navName: 'Kaala Puja',
        //         },

        //         {
        //             icon: <HeartSVG fill={theme.textColorHomeCardYellow} />,
        //             title: t('Favourites'),
        //             navName: 'Favourites',
        //         },
        //         {
        //             icon: <QuizSVG fill={theme.textColorHomeCardYellow} />,
        //             title: t('Quiz'),
        //             navName: 'Quiz',
        //         },
        //         // {
        //         //     icon: <Logo fill={theme.textColorHomeCardYellow} />,
        //         //     title: 'Shaivam.org',
        //         //     navName: 'Website',
        //         // },
        //         {
        //             icon: <ShaivaSVG fill={theme.textColorHomeCardYellow} />,
        //             title: t('Shaiva Siddanta'),
        //             navName: 'S Siddanta',
        //         },
        //     ],
        // },
    ];

    return (
        <View style={{ paddingLeft: 0 }}>
            <View style={{ marginTop: 24, paddingHorizontal: 15 }}>
                <Header navigation={navigation} />
                {/* <SearchInput
                    placeholder={t('Search for anything (Eg - தோடுடைய செவியன்) ')}
                    setState={setSearchText}
                    state={searchText}
                    setOnFocus={setOnFocus}
                    extraPad={false}
                    styleOverwrite={{ marginHorizontalUnset: true, paddingTop: 24 }}
                /> */}
                <HeadingText text={t('Shaivam Exclusives')} />
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: 12,
                        marginTop: 5,
                        fontWeight: '400',
                    }}
                >
                    {t('Scroll through & check out what Shaivam offers')}
                </Text>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width,
                }}
            >
                <FlatList
                    style={{ overflow: 'visible' }}
                    horizontal
                    contentContainerStyle={{ paddingLeft: 10 }}
                    renderItem={({ item, index }) => (
                        <RenderItem
                            setBlockWidth={setBlockWidth}
                            blockRef={blockRef}
                            item={item}
                            navigation={navigation}
                            theme={theme.colorscheme}
                        />
                    )}
                    data={data}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    linearGradientBox: {
        width: Dimensions.get('window').width * 0.85,
        // backgroundColor: 'red',
        minHeight: 200,
        borderRadius: 15,
        marginRight: 15,
        marginTop: 15,
        padding: 15,
        justifyContent: 'center',
    },
    viewBoxForSubComp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginVertical: 'auto',
    },
    subComp: {
        margin: 4,
        // width: (Dimensions.get('window').width * 0.85) / 2 - 24,
        // height: 40,
        width: 'auto',
        height: 50,
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        flexWrap: 'nowrap',
    },

    seperator: {
        borderRightWidth: 1,
        marginHorizontal: 12,
        height: 20,
    },

    subCompText: {
        alignContent: 'center',
        // flex: 1,
        fontFamily: 'Mulish-SemiBold',
        fontSize: RFValue(6, Dimensions.get('window').width),
    },
});

export default CardComponents;
