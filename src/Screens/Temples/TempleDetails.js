// setting the type of the marker you pressed
// callback function for naving to page which has the temple details
import { StackActions, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Share from 'react-native-share';
import DownArrowSVG from '../../components/SVGs/DownArrowSVG';
import FavSVG from '../../components/SVGs/FavSVG';
import SearchSVG from '../../components/SVGs/SearchSVG';
import ShareSVG from '../../components/SVGs/ShareSVG';
import TempleCard from './TempleCard';
import { CustomButton } from '../../components/Buttons';
import { AnimatedToast } from '../../components/Toast';
import BottomSheetTempleTemplate from './BottomSheetTempleTemplate';
import RenderHTML from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import assetMapWithTempleType from './AssetMapWithTempleType';
import { useTranslation } from 'react-i18next';
import { useGetTempleDetailQuery } from '../../store/features/Temple/TemplApiSlice';
import { RFValue } from 'react-native-responsive-fontsize';
import DirectionSVG from '../../components/SVGs/DirectionSVG';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
import getDimension from '../../Helpers/getDimension';
// import WebView from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import BackBtnSvg from '../../components/SVGs/BackBtnSvg';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const TempleDetails = ({ navigation }) => {
    const route = useRoute();
    const { temple, userLocation, external } = route?.params;
    const {
        data: templeDetail,
        isSuccess,
        isFetching,
        isError,
        error,
    } = useGetTempleDetailQuery({ id: temple?.templeId }, { refetchOnFocus: true });

    const popAction = StackActions.pop(1);
    const [fav, setFav] = useState(true);
    const [animateToast, setAnimateToast] = useState();
    const onFavBtnClick = () => {
        setAnimateToast(!fav);
        setFav(!fav);
    };
    const [snapIndex, setSnapIndex] = useState(0);
    const { t } = useTranslation();
    // const onPress = () => {
    //     const sourceLatitude = parseFloat(userLocation?.latitude); // Example source latitude
    //     const sourceLongitude = parseFloat(userLocation?.longitude); // Example source longitude
    //     const destinationLatitude = parseFloat(temple?.templeCoordinate?.latitude); // Example destination latitude
    //     const destinationLongitude = parseFloat(temple?.templeCoordinate?.longitude); // Example destination longitude

    //     const googleMapsUrl = `geo:${sourceLatitude},${sourceLongitude}?q=${destinationLatitude},${destinationLongitude}`;
    //     Linking.openURL(googleMapsUrl).catch((err) => {
    //         console.log('the map is not avialable');
    //         const googleMapsUrlFallBack = `https://www.google.com/maps/dir/?api=1&origin=${sourceLatitude},${sourceLongitude}&destination=${destinationLatitude},${destinationLongitude}`;
    //         Linking.openURL(googleMapsUrlFallBack);
    //     });
    // };
    const { screenHeight, screenWidth } = getDimension();
    const LATITUDE_DELTA = 0.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (screenWidth / screenHeight);

    const embedNonClickableHTML = (innerFractionOfHTML) => {

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WebView with Links</title>
        </head>
        <style>
        *{
            user-select: none;
        }
        </style>
        <body>
          ${innerFractionOfHTML}
          <script differ>
            document.addEventListener('click', function(event) {
              if (event.target.tagName === 'A') {
                event.preventDefault();
                var href = event.target.href;

                // Check if href starts with 'http:'
                if (href.startsWith('http:') || href.startsWith('Http:')) {
                  // Open the URL as is
                  window.open(href, '_blank');
                } else {
                  // Append the base URL if it does not start with 'http:'
                  window.open('http://shaivam.org' + href, '_blank');
                }
              
              }
            }); // this is to disable the click on links
            
            document.addEventListener('contextmenu', function(event) { event.preventDefault(); }); // this is to disable the click on links
            // document.addEventListener('touchstart', function(event) {
            //       const target = event.target;
            //       const timeout = setTimeout(() => {
            //         window.ReactNativeWebView.postMessage(JSON.stringify({
            //           type: 'longPress',
            //           href: target.href,
            //           text: target.innerText
            //         }));
                    
            //         // Trigger a custom context menu
            //         const customEvent = new TouchEvent('contextmenu', {
            //           bubbles: true,
            //           cancelable: true,
            //           view: window
            //         });
            //         target.dispatchEvent(customEvent);
            //       }, 500);
          
            //       target.addEventListener('touchend', () => clearTimeout(timeout), { once: true });
            //       target.addEventListener('touchcancel', () => clearTimeout(timeout), { once: true });
            //     }
          </script>
        </body>
        </html>`;
    };

    async function buildLink() {
        // alert(true)
        const link = await dynamicLinks().buildShortLink(
            {
                link: `https://shaivaam.page.link/org?templeId=${temple?.templeId}`,
                domainUriPrefix: 'https://shaivaam.page.link',
                ios: {
                    appStoreId: '1575138510',
                    bundleId: 'com.Shaivam.shaivam',
                    minimumVersion: '18',
                },
                android: {
                    packageName: 'org.shaivam',
                },
                // optional setup which updates Firebase analytics campaign
                // "banner". This also needs setting up before hand
            },
            dynamicLinks.ShortLinkType.DEFAULT
        );
        // console.log("🚀 ~ link ~ link:", `https://shaivaam.page.link/org?eventId=${item?.attributes?.schedula_type ? 'recurring_' + item?.attributes?.id : 'regular_' + item?.attributes?.id}`)
        return link;
    }

    const onShare = async () => {
        const link = await buildLink();
        Share.open({
            title: 'Share Temple',
            message: `The Shared temple is ${temple?.templeName}:  ${link}`,
        });
    };

    if (isFetching) {
        return <Text>Fetching data ....</Text>;
    }

    return (
        <>
            {
                <BottomSheetTempleTemplate
                    showMultipleMarker={false}
                    snapPoints={['50%', '95%']}
                    showSearchBarWhenFullSize={false}
                    data={[
                        {
                            latitude: !external
                                ? temple?.templeCoordinate?.latitude
                                : templeDetail?.templeCoordinate?.latitude,
                            longitude: !external
                                ? temple?.templeCoordinate?.longitude
                                : templeDetail?.templeCoordinate?.longitude,
                            flag: 9,
                        },
                    ]}
                    regionCoordinate={
                        !external
                            ? {
                                ...temple?.templeCoordinate,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }
                            : {
                                ...templeDetail?.templeCoordinate,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }
                    }
                    userLocation={{
                        ...route?.params?.data?.userLocation,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    snapIndex={snapIndex}
                    setSnapIndex={setSnapIndex}
                    initialIndexOfSize={0}
                    appearsOnIndex={1}
                    disappearsOnIndex={0}
                    isNavigable={true}
                    isSearchFieldDisabled={true}
                    isSearchFieldDisabledInFullScreenMode={false}
                    routeName={route.name}
                    valueToBePreFilled={!external ? temple?.templeName : templeDetail?.templeName}
                >
                    <View
                        style={[
                            styles.wholeContainerWrapper,
                            {
                                backgroundColor: 'white',
                                flex: 1,
                            },
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: 20,
                                paddingHorizontal: 15,
                                alignItems: 'center',
                            }}
                        >
                            <CustomButton
                                svg={<BackBtnSvg fill={'#000'} width={20} height={20} />}
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                }}
                                onPress={() => {
                                    navigation.dispatch(popAction);
                                }}
                                type="TouchableOpacity"
                            />
                            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                {/* <CustomButton
                                svg={<SearchSVG fill={'#777777'} width={17} height={17} />}
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={() => {
                                    navigation.dispatch(popAction);
                                }}
                                type="TouchableOpacity"
                            /> */}
                                {/* <CustomButton
                                svg={
                                    <FavSVG
                                        outerfill={fav ? '#C1554E' : '#777777'}
                                        innerfill={fav ? '#C1554E' : '#fff'}
                                        fill={'#777777'}
                                        width={14}
                                        height={20}
                                    />
                                }
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={onFavBtnClick}
                                type="TouchableOpacity"
                            /> */}
                                <CustomButton
                                    svg={<ShareSVG fill={'#777777'} width={18} height={18} />}
                                    style={{
                                        paddingVertical: 0,
                                        paddingHorizontal: 0,
                                        borderRadius: 0,
                                    }}
                                    onPress={() => {
                                        // navigation.dispatch(popAction);
                                        // Share.open({
                                        //     message: `https://www.google.com/maps/dir/?api=1&destination=${temple?.templeCoordinate?.latitude},${temple?.templeCoordinate?.longitude}`,
                                        // });

                                        onShare();
                                    }}
                                    type="TouchableOpacity"
                                />
                            </View>
                        </View>
                        <ScrollView style={{ marginHorizontal: 0 }}>
                            <View>
                                <TempleCard
                                    dataSet={{
                                        templeName: !external
                                            ? temple?.templeName
                                            : templeDetail?.templeName,
                                        flag: !external ? temple?.templeFlag : templeDetail?.flag,
                                        id: temple?.templeId,
                                        templeType:
                                            assetMapWithTempleType[
                                                !external ? temple?.templeFlag : templeDetail?.flag
                                            ].name,
                                        longitude: !external
                                            ? temple?.templeCoordinate?.longitude
                                            : templeDetail?.templeCoordinate?.longitude,
                                        latitude: !external
                                            ? temple?.templeCoordinate?.latitude
                                            : templeDetail?.templeCoordinate?.latitude,
                                    }}
                                    regionCoordinate={userLocation}
                                    showButton={true}
                                    showMargin={false}
                                    showImage={true}
                                    imageArr={templeDetail?.temple_images}
                                />

                                {/* <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Pressable
                                    style={{
                                        margin: 10,
                                        elevation: 3,
                                        shadowColor: 'black',
                                        backgroundColor: '#C1554E',
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        flexDirection: 'row',
                                        gap: 10,
                                        alignItems: 'center',
                                        alignSelf: 'left',
                                        borderRadius: 10,
                                    }}
                                    onPress={onPress}
                                >
                                    <DirectionSVG fill={'#fff'} />
                                    <Text
                                        style={{
                                            color: '#fff',
                                        }}
                                    >
                                        {t('Directions')}
                                    </Text>
                                </Pressable>
                            </View> */}

                                {templeDetail?.basicDetails && (
                                    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontFamily: 'Mulish-Bold',
                                                fontSize: 18,
                                                paddingVertical: 8,
                                            }}
                                        >
                                            {t('Basic Details')}
                                        </Text>
                                        {Object.entries(templeDetail?.basicDetails ?? []).map(
                                            ([key, value], index) => (
                                                <KeyValueComp
                                                    key={index}
                                                    keyVal={key}
                                                    value={value}
                                                />
                                            )
                                        )}

                                        {templeDetail?.Sthala_Puranam_Description && (
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Mulish-Bold',
                                                    fontSize: 18,
                                                    paddingVertical: 10,
                                                }}
                                            >
                                                {t('Temple Description')}
                                            </Text>
                                        )}

                                        <AutoHeightWebView
                                            style={{
                                                width: Dimensions.get('window').width - 15,
                                                marginTop: 35,
                                            }}
                                            originWhitelist={['*']}
                                            source={{
                                                html: embedNonClickableHTML(
                                                    templeDetail?.Sthala_Puranam_Description
                                                ),
                                            }}
                                        />

                                        {templeDetail?.Specialities_Description && (
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Mulish-Bold',
                                                    fontSize: 18,
                                                    paddingVertical: 10,
                                                }}
                                            >
                                                {t('Specialities ')}
                                            </Text>
                                        )}

                                        <AutoHeightWebView
                                            style={{
                                                width: Dimensions.get('window').width - 15,
                                            }}
                                            originWhitelist={['*']}
                                            source={{
                                                html: embedNonClickableHTML(
                                                    templeDetail?.Specialities_Description
                                                ),
                                            }}
                                        />
                                    </View>
                                )}

                                {!(
                                    templeDetail?.basicDetails ||
                                    templeDetail?.temple_images?.length
                                ) && (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingVertical: 40,
                                                gap: 10,
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/Images/no-data.png')}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'center',

                                                    fontFamily: 'Mulish-Bold',
                                                    fontSize: RFValue(16, 850),
                                                }}
                                            >
                                                Temple data is not Available
                                            </Text >
                                        </View >
                                    )}
                            </View >
                        </ScrollView >

                        {/* <Toast /> */}
                        {
                            fav && animateToast ? (
                                <AnimatedToast
                                    state={animateToast && fav}
                                    type={'SUCCESS'}
                                    text={'Saved in My Trips > Saved Temples'}
                                />
                            ) : (
                                <AnimatedToast
                                    state={animateToast && fav}
                                    type={'ERROR'}
                                    text={'Temple removed from saved'}
                                />
                            )
                        }
                    </View >
                </BottomSheetTempleTemplate >
            }
        </>
    );
};

const KeyValueComp = ({ keyVal, value }) => {
    return (
        <View
            style={{
                gap: 20,
                width: '100%',
                flexDirection: 'row',
            }}
        >
            <View style={{ width: '25%' }}>
                <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>{keyVal}</Text>
            </View>
            <View style={{ width: '75%' }}>
                {keyVal == 'Head tree' ? (
                    <RenderHTML
                        source={{ html: value }}
                        contentWidth={Dimensions.get('window').width - 10}
                    />
                ) : (
                    <Text style={{ color: 'black', fontFamily: 'Mulish-Regular', fontWeight: 600 }}>
                        {value}
                    </Text>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    map: {
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    wholeContainerWrapper: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
        marginTop: -12,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    contWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    },
    textContWrapper: {
        height: 14,
        width: 14,
        borderRadius: 2,
        justifyContent: 'center',
    },

    textStyleForCont: {
        alignSelf: 'center',
        paddingVertical: 'auto',
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 16,
    },
});

export default TempleDetails;
