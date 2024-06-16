import React, { useContext } from 'react';
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import BackIcon from '../../src/assets/Images/BackIcon.svg';
import WhiteBackButton from '../../src/assets/Images/arrow (1) 1.svg';
import NandiLogo from '../../src/assets/Images/NandiLogo.svg';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
import { MusicContext } from './Playbacks/TrackPlayerContext';
import { useTranslation } from 'react-i18next';
import { RouteTexts } from '../navigation/RouteText';

const BackButton = ({
    secondText,
    firstText,
    middleText,
    color,
    navigation,
    secondMiddleText,
    rightIcon,
    buttonDisable,
    nandiLogo,
    firstRightIcon,
    prevId,
    eventShare,
    item
}) => {
    // console.log("🚀 ~ item:", item)
    const { musicState, dispatchMusic } = useContext(MusicContext);
    const { t } = useTranslation()
    // console.log("🚀 ~ musicState:", musicState)
    async function buildLink() {
        // alert(true)
        const link = await dynamicLinks().buildShortLink({
            link: eventShare ? `https://shaivaam.page.link/org?eventId=${item?.attributes?.schedula_type ? 'recurring_' + item?.attributes?.id : 'regular_' + item?.attributes?.id}` : `https://shaivaam.page.link/org?prevId=${musicState?.prevId}`,
            domainUriPrefix: 'https://shaivaam.page.link',
            ios: {
                appStoreId: '1575138510',
                bundleId: 'com.Shaivam.shaivam',
                minimumVersion: '18',
            },
            android: {
                packageName: 'org.shaivam'
            }
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
        },
            dynamicLinks.ShortLinkType.DEFAULT,
        );
        // console.log("🚀 ~ link ~ link:", `https://shaivaam.page.link/org?eventId=${item?.attributes?.schedula_type ? 'recurring_' + item?.attributes?.id : 'regular_' + item?.attributes?.id}`)
        return link;
    }
    const shareSong = async () => {
        const link = await buildLink()
        Share.open({
            title: item?.attributes?.title,
            message: eventShare ? `Event Title : ${item?.attributes?.title}
Start date : ${item?.attributes?.start_date} 
Location : ${item?.attributes?.location}
This event is shared through Shaivam.org Mobile App. For more details about this event, please check here:${link}` :
                `${secondMiddleText}I want to share this Thirumurai with you.
            இந்தத் திருமுறையை Shaivam.org Mobile செயலியில் படித்தேன்.மிகவும் பிடித்திருந்தது.பகிர்கின்றேன்.படித்து மகிழவும் ${link} `


        })
    }
    return (
        <View
            style={{
                paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 10,
                paddingHorizontal: 15,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 30 : 0,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttonDisable ? null : (
                            <TouchableOpacity
                                style={{ alignSelf: 'center', height: 30, width: 50 }}
                                onPress={() => navigation.goBack()}
                            >
                                {!color ? <WhiteBackButton /> : <BackIcon />}
                            </TouchableOpacity>
                        )}
                        <View style={{ width: '85%' }}>
                            {firstText && (
                                <Text
                                    style={{
                                        marginHorizontal: 10,
                                        fontFamily: 'Lora-Regular',
                                        fontSize: 24,
                                        fontWeight: '700',
                                        color: 'white',
                                    }}>{firstText}</Text>
                            )}
                            {middleText && (
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        {middleText}
                                    </Text>
                                </View>
                            )}

                            {secondMiddleText && (
                                <View
                                    style={{
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        {secondMiddleText}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        {firstRightIcon && (
                            <TouchableOpacity style={{
                                paddingHorizontal: 5,
                                alignSelf: 'center'
                            }}>
                                <Icon name="download" size={24} color="white" />
                            </TouchableOpacity>
                        )
                        }
                        {rightIcon && (
                            <TouchableOpacity onPress={shareSong}
                                style={{
                                    paddingHorizontal: 5,
                                    alignSelf: 'center',
                                }}
                            >
                                <Icon name="sharealt" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate(RouteTexts.BOTTOM_TABS)}>
                            {nandiLogo == false ? null : <NandiLogo />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BackButton;
