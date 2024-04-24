import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Background from '../../components/Background';
import SearchInput from '../../components/SearchInput';
import { ThemeContext } from '../../Context/ThemeContext';
import { listfavAudios, RemoveFavAudios } from '../../Databases/AudioPlayerDatabase';
import MusicContainer from '../../../assets/Images/Frame 83.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import HeadingText from '../../components/HeadingText';
import { RouteTexts } from '../../navigation/RouteText';
import { useIsFocused } from '@react-navigation/native';
import EditPencil from '../../assets/Images/EditPencil.svg';
import AlertScreen from '../../components/AlertScreen';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import EmptyIcon from '../../assets/Images/Vector (6).svg';
import { AnimatedToast } from '../../components/Toast';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share'
import ShareSVG from '../../components/SVGs/ShareSVG';
import DeleteSVG from '../../components/SVGs/DeleteSVG';
// import Button from '../Temples/Common/Button'
// import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import * as RNFS from 'react-native-fs';
const Fav = ({ navigation }) => {
    // const BottomSheetRef = useRef(null)
    const { theme } = useContext(ThemeContext);
    const isFocuced = useIsFocused();
    const [selecetedHeader, setSelectedHeader] = useState('Favourites');
    const [favList, setFavList] = useState([]);
    const [downloadList, setDownloadList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelected] = useState(null);
    const [showToastMessage, setShowToast] = useState(false);
    const [emptyImage, setEmptyImage] = useState(true);
    useEffect(() => {
        // fetchAndDisplayDownloads()
        // listfavAudios(callbacks => {
        //     console.log("🚀 ~ useEffect ~ callbacks:", JSON.stringify(callbacks, 0, 2))
        //     setFavList(callbacks)
        //     if(callbacks?.length>0){
        //         setEmptyImage(false)
        //     }
        // })

        Promise.all([
            fetchAndDisplayDownloads(),
            listfavAudios((callbacks) => {
                console.log('🚀 ~ useEffect ~ callbacks:', JSON.stringify(callbacks, 0, 2));
                setFavList(callbacks);
                if (callbacks?.length > 0) {
                    setEmptyImage(false);
                }
            }),
        ]);
        checkFile()
    }, [isFocuced]);
    const checkFile = async (path) => {
        RNFS.readFile(`file://${RNFS.MainBundlePath}`).then((res) => {
            console.log("🚀 ~ RNFS.exists ~ res:", res)
        }).catch((error) => {
            console.log("🚀 ~ RNFS.exists ~ error:", error)
        })
        // const exists = await RNFetchBlob.fs.exists(`file://${RNFS.DocumentDirectoryPath}`);
        // console.log('File exists: ', exists);
        // return exists;
    };
    const header = [
        {
            name: 'Favourites',
            icon: (
                <MaterialIcons
                    name="heart-outline"
                    size={24}
                    color={theme.searchContext.unSelected.textColor}
                />
            ),
        },
        {
            name: 'Special Playlist',
            icon: (
                <Icon
                    name="bookmark-outline"
                    size={24}
                    color={theme.searchContext.unSelected.textColor}
                />
            ),
        },
        {
            name: 'Offline Downloads',
            icon: (
                <Icon name="download" size={24} color={theme.searchContext.unSelected.textColor} />
            ),
        },
    ];
    // const translateX = useSharedValue(0);
    // const animatedStyles = useAnimatedStyle(() => ({
    //     transform: [{ translateX: withSpring(translateX.value * 1) }],
    // }));

    const fetchAndDisplayDownloads = async () => {
        try {
            // const keys = await AsyncStorage.getAllKeys();
            const parsedMetadata = await AsyncStorage.getItem('downloaded');
            console.log('🚀 ~ fetchAndDisplayDownloads ~ parsedMetadata:', parsedMetadata);
            if (parsedMetadata?.length > 0) {
                setEmptyImage(false);
            }
            // const metadataKeys = keys.filter(key => key.startsWith('downloaded:'));
            // const metadata = await AsyncStorage.multiGet(metadataKeys);
            // const parsedMetadata = metadata.map(([key, value]) => JSON.parse(value));
            // console.log("🚀 ~ fetchAndDisplayDownloads ~ parsedMetadata:", parsedMetadata)
            // setFavList(JSON.parse(parsedMetadata))
            setDownloadList(JSON.parse(parsedMetadata));
            // Now `parsedMetadta` contains all of your audio files' metadata
            // You can use this data to render your downloads page
        } catch (e) {
            console.error('Failed to fetch metadata', e);
        }
    };
    useEffect(() => {
        if (selecetedHeader == 'Favourites') {
            listfavAudios((callbacks) => {
                console.log('🚀 ~ useEffect ~ callbacks:', JSON.stringify(callbacks, 0, 2));
                setFavList(callbacks);
            });
        } else if (selecetedHeader == 'Offline Downloads') {
            fetchAndDisplayDownloads();
        }
    }, [selecetedHeader]);
    useEffect(() => {
        if (showToastMessage) {
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }
    }, [showToastMessage]);
    const removeFromPlaylist = (item) => {
        if (selecetedHeader == 'Offline Downloads') {
            let arr = downloadList.filter((res) => {
                return res.id !== item.id;
            });
            console.log('🚀 ~ removeFromPlaylist ~ arr:', arr);
            setDownloadList(arr);
            AsyncStorage.setItem('downloaded', JSON.stringify(arr));
            setShowModal(false);
            setShowToast(true);
        } else if (selecetedHeader == 'Favourites') {
            RemoveFavAudios('d', item, (cb) => {
                if (cb?.message == 'Success') {
                    let arr = favList.filter((res) => res?.id !== item.id);
                    setFavList(arr);
                }
                setShowModal(false);
                setShowToast(true);
            });
        }
    };
    const confirmRemove = (item) => {
        setSelected(item);
        setShowModal(true);
        // Alert.alert('Confirmation', 'Are you sure to remove', [
        //     {
        //         text: 'Confirm',
        //         onPress: () => removeFromPlaylist(item)
        //     },
        //     {
        //         text: 'Cancel',
        //         onPress: console.log(false)
        //     }
        // ])
    };
    const [searchText, setSearchText] = useState(null);
    const [onFocus, setOnFocus] = useState(false);
    async function buildLink(item) {
        // alert(true)
        const link = await dynamicLinks().buildShortLink({
            link: `https://shaivaam.page.link/org?prevId=${item?.prevId}`,
            domainUriPrefix: 'https://shaivaam.page.link',
            ios: {
                appStoreId: '123456',
                bundleId: 'com.shaivam.app',
                minimumVersion: '18',
            },
            android: {
                packageName: 'com.shaivam'
            }
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
        },
            dynamicLinks.ShortLinkType.DEFAULT,
        );

        console.log("🚀 ~ link ~ link:", link)
        return link;
    }
    const shareSong = async (item) => {
        // alert(JSON.stringify(item))
        console.log('Stringinfy', JSON.stringify(item, 0, 2))
        const link = await buildLink(item)
        Share.open({
            message: `${item?.title} I want to share this Thirumurai with you.
            இந்தத் திருமுறையை Shaivam.org Mobile செயலியில் படித்தேன். மிகவும் பிடித்திருந்தது. பகிர்கின்றேன். படித்து மகிழவும் ${link}`

        })
    }

    const renderSong = (item, index) => (
        <Pressable
            style={styles.listContainer}
            onPress={() => {
                navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                    data: item,
                    downloaded: true,
                });
            }}
        >
            <View style={styles.listInnerContainer}>
                <MusicContainer />
                <View style={{ paddingHorizontal: 10, width: '73%' }}>
                    <Text
                        style={{
                            fontSize: RFValue(10),
                            fontWeight: '600',
                            fontFamily: 'Mulish-Regular',
                            color: '#222222',
                        }}
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: RFValue(8),
                            fontWeight: '400',
                            fontFamily: 'Mulish-Regular',
                            color: '#222222',
                        }}
                    >
                        {item.title}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => shareSong(item)}>
                    <ShareSVG fill={'#777777'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmRemove(item)}>
                    {selecetedHeader == 'Favourites' ? (
                        <AntDesign name="heart" size={20} color={'#C1554E'} />
                    ) : (
                        <DeleteSVG fill={'#777777'} />
                    )}
                </TouchableOpacity>
            </View>
        </Pressable>
    );
    return (
        <ScrollView>
            {/* <View> */}
            <Background>
                <View style={{ marginVertical: 10 }}>
                    <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                        <HeadingText text={'Favourites'} nandiLogo={true} />
                    </View>
                    <SearchInput
                        placeholder={'Search for your favourties (Eg - தோடுடைய)'}
                        setState={setSearchText}
                        state={searchText}
                        setOnFocus={setOnFocus}
                    />
                </View>
                <FlatList
                    contentContainerStyle={{ marginBottom: 10 }}
                    horizontal
                    data={header}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedHeader(item.name)}
                            style={
                                selecetedHeader == item?.name
                                    ? [
                                        styles.headerContainer,
                                        { backgroundColor: theme.searchContext.selected.bgColor },
                                    ]
                                    : [
                                        styles.headerContainer,
                                        {
                                            backgroundColor:
                                                theme.searchContext.unSelected.bgColor,
                                        },
                                    ]
                            }
                        >
                            {item?.icon}
                            <Text
                                style={
                                    selecetedHeader == item?.name
                                        ? [
                                            styles.headingText,
                                            { color: theme.searchContext.selected.textColor },
                                        ]
                                        : [
                                            styles.headingText,
                                            { color: theme.searchContext.unSelected.textColor },
                                        ]
                                }
                            >
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </Background>
            {selecetedHeader == 'Favourites' && favList.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.RearrangsTask}
                        onPress={() =>
                            navigation.navigate(RouteTexts.SONGS_LIST, {
                                data: favList,
                            })
                        }
                    >
                        <EditPencil />
                        <Text
                            style={{
                                marginHorizontal: 10,
                                fontFamily: 'Mulish-Bold',
                                color: '#C1554E',
                                fontWeight: '700',
                                fontSize: 12,
                            }}
                        >
                            Re arrange task
                        </Text>
                    </TouchableOpacity>
                    <FlatList
                        data={favList}
                        renderItem={({ item, index }) => renderSong(item, index)}
                    />
                </View>
            ) : selecetedHeader == 'Offline Downloads' && downloadList?.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.RearrangsTask}
                        onPress={() =>
                            navigation.navigate(RouteTexts.SONGS_LIST, {
                                data: favList,
                            })
                        }
                    >
                        <EditPencil />
                        <Text
                            style={{
                                marginHorizontal: 10,
                                fontFamily: 'Mulish-Bold',
                                color: '#C1554E',
                                fontWeight: '700',
                                fontSize: 12,
                            }}
                        >
                            Re arrange task
                        </Text>
                    </TouchableOpacity>
                    <FlatList
                        data={downloadList}
                        renderItem={({ item, index }) => renderSong(item, index)}
                    />
                </View>
            ) : (
                <View
                    style={{
                        paddingHorizontal: 20,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 100,
                    }}
                >
                    <EmptyIcon />
                    <Text
                        style={{
                            color: '#222222',
                            fontFamily: 'Mulish-Bold',
                            fontSize: 18,
                            marginVertical: 15,
                        }}
                    >
                        You haven’t favourited anything!
                    </Text>
                    <Text style={{ color: '#222222', fontFamily: 'Mulish-Regular', fontSize: 14 }}>
                        Start adding stotras, vedas, thirumurais etc. here for easy access to them
                        every time
                    </Text>
                </View>
            )}
            {/* {
                !emptyImage ?
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity style={styles.RearrangsTask}
                            onPress={() => navigation.navigate(RouteTexts.SONGS_LIST, {
                                data: favList
                            })} >
                            <EditPencil />
                            <Text style={{ marginHorizontal: 10, fontFamily: 'Mulish-Bold', color: '#C1554E', fontWeight: '700', fontSize: 12 }}>Re arrange task</Text>
                        </TouchableOpacity>
                        <FlatList data={selecetedHeader == 'Favourites' ? favList : downloadList} renderItem={({ item, index }) => renderSong(item, index)} />
                    </View> :
                    <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        <EmptyIcon />
                        <Text style={{ color: '#222222', fontFamily: 'Mulish-Bold', fontSize: 18, marginVertical: 15 }}>You haven’t favourited anything!</Text>
                        <Text style={{ color: '#222222', fontFamily: 'Mulish-Regular', fontSize: 14 }}>Start adding stotras, vedas, thirumurais etc. here for easy access to them every time</Text>
                    </View>
            } */}
            {showModal && (
                <Modal transparent>
                    <AlertScreen
                        descriptionText={selectedItem}
                        removeFromPlaylist={removeFromPlaylist}
                        setShowModal={setShowModal}
                        headingText={selecetedHeader == 'Favourites' ? 'Are you sure you want to remove this from Favourite Songs?' : 'Are you sure you want to delete this from Offline Download?'}
                    />
                </Modal>
            )}
            <View
                style={{
                    position: 'absolute',
                    top: Dimensions.get('window').height / 1.07,
                    right: 10,
                    left: 10,
                }}
            >
                {showToastMessage && (
                    <AnimatedToast
                        state={showToastMessage}
                        type={'ERROR'}
                        svg={true}
                        text={
                            selecetedHeader == 'Favourites'
                                ? 'Removed from favourite'
                                : 'Deleted from offline downloads'
                        }
                    />
                )}
            </View>
        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    headingText: { marginHorizontal: 5, fontSize: 12, fontFamily: 'Mulish-Regular' },
    headerContainer: {
        marginLeft: 10,
        paddingHorizontal: 12,
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    listContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    listInnerContainer: {
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    RearrangsTask: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: '#C1554E',
        height: 30,
        borderRadius: 15,
        width: 150,
        marginHorizontal: 20,
        // width: 80,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
});
export default Fav;
