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
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MusicContainer from '../../../assets/Images/Frame 83.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardComponents from '../../components/CardComponents';
import '../../../localization';
import { ThemeContext } from '../../Context/ThemeContext';
import bgImg from '../../../assets/Images/Background.png';
import bgImgDark from '../../../assets/Images/BackgroundCommon.png';
import HomePlaylistCard from '../../components/HomePlaylistCard';
import ElevatedCard from '../../components/ElevatedCard';
import EventCard from '../../components/EventCard';
import OmChat from './OmChat';
import HeadingAndView from './HeadingAndView';
import PlaceCard from './PlaceCard';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import { AddSongToDatabase, MostPlayedList } from '../../Databases/AudioPlayerDatabase';
import { useIsFocused } from '@react-navigation/native';
import Quiz from './Quiz';
import VideosList from './VideosList';
import { useSelector } from 'react-redux';
import { colors } from '../../Helpers';

const SongAndAudio = ({ item, index, theme }) => {
    const [fav, setFav] = useState(false);
    const authState = useSelector((store) => store.auth);
    // console.log('🚀 ~ SongAndAudio ~ authState:', authState);
    const FavouriteAudios = (res) => {
        // TrackPlayer.getActiveTrack()
        //     .then((res) => {
        AddSongToDatabase(
            'sf',
            [
                res?.id,
                res?.url,
                res?.title,
                res?.artist,
                res?.categoryName,
                res?.thalamOdhuvarTamilname,
                res?.thirumariasiriyar,
            ],
            (callbacks) => {
                if (callbacks?.message == 'Success') {
                    setFav(true);
                }
            }
        );
        // })
        // .catch((err) => {
        // });
    };
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
                            fontSize: RFValue(14, 800),
                            // fontWeight: '600',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.thalamOdhuvarTamilname}
                    </Text>
                    <Text
                        style={{
                            fontSize: RFValue(12, 800),
                            // fontWeight: '400',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.categoryName}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 25 }}>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="share" size={22} color={theme.textColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={fav ? null : () => FavouriteAudios(item)}>
                    {fav ? (
                        <AntDesign name="heart" size={22} color={'#C1554E'} />
                    ) : (
                        <Feather name="heart" size={22} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
    // return<Text>dhjkshajk</Text>;
};
const HomeScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [compHeight, setCompHeight] = useState();
    const [textInsidePlaylistCard, setTextInsidePlaylistCard] = useState(0);
    const [playlistCardHeight, setPlaylistCardHeight] = useState(0);
    const [dimentionsOfText1, setDimentionsOfText1] = useState({
        width: 0,
        height: 0,
    });
    const isFocused = useIsFocused();
    const handleLayout = useCallback(
        (event) => {
            const { height } = event.nativeEvent.layout;
            setCompHeight(Math.trunc(height));
        },
        [setCompHeight, compHeight]
    );
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

    const PlayList = [
        {
            id: 1,
            heading: 'Thirumurais',
            info: 'Attaveerattam and Saptavidanga Thevaram - Audi...',
            subInfo: 'Thiruthani Swaminathan Odhuvar',
            songCount: 46,
            colors: theme.colorscheme === 'light' ? ['#FEE8B3', '#FDD166'] : ['#3A3A3A', '#3A3A3A'],
            navDetail: '',
        },
        {
            id: 2,
            heading: 'Thirumurais',
            info: 'Attaveerattam and Saptavidanga Thevaram - Audi...',
            subInfo: 'Thiruthani Swaminathan Odhuvar',
            songCount: 40,
            colors: theme.colorscheme === 'light' ? ['#AFD9BB', '#60B278'] : ['#3A3A3A', '#3A3A3A'],
            navDetail: '',
        },
        {
            id: 3,
            heading: 'Thirumurais',
            info: 'Attaveerattam and Saptavidanga Thevaram - Audi...',
            subInfo: 'Thiruthani Swaminathan Odhuvar',
            songCount: 45,
            colors: theme.colorscheme === 'light' ? ['#FEE8B3', '#FDD166'] : ['#3A3A3A', '#3A3A3A'],
            navDetail: '',
        },
    ];
    const eventData = [
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
    ];
    const [selectedPlaylistType, setSelectedPlaylistType] = useState('Recently Played');
    const [playlistSong, setPlaylistSong] = useState([]);
    const playlisType = ['Recently Played', 'Most Played'];
    useEffect(() => {
        getPlaylistSong();
    }, [selectedPlaylistType, isFocused]);
    const getPlaylistSong = async () => {
        if (selectedPlaylistType == 'Recently Played') {
            const data = await AsyncStorage.getItem('recentTrack');
            setPlaylistSong(JSON.parse(data));
        } else {
            MostPlayedList('d', (callbacks) => {
                setPlaylistSong(callbacks.slice(0, 4));
            });
        }
    };

    const nearByTempleData = [
        {
            img: 'https://s3-alpha-sig.figma.com/img/6700/69a2/03a54c10e1ad2d1887bbcff155403f1b?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PkT20h7qdc~YIQF~kGaGxb5qLWbWMoNT8MiSQGsZSIoaUduQhJ0yvVXL1udbmoV8cZLi-SlUnHH5AbOpoTnnQhYifWVAynjIZ~Jd8nYrdr3eXY9cwTGaqI2SL3iaff5ffwML2Vgyjqyeg8GQFc~TVs26g8s1R41X-sFWgbyp-J7YaAK6SlvFs3m6lwGKnIe8BFr1qsjom6qDOp8o~y6JgYInVyUpYtemjMMXGUrQgD0BJOrCKaKfG2t-jsW-VTrlrKHrKRe7arx-wVkde531J~IjCjednhvbsCV3e7ZL3Y4u9D7p1MEvkJe5WSxS7sarKFjY2S-qrgRPAvhmAxHfNA__',
            templeName: 'Brahmalingeshwara',
            address: 'Kanakapura road, Banglore',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/271a/e6ac/4dafe0139a026f994bc4f9e2718768cf?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YyIAVCbH6bvqM4W1z8nwzvYtllzoNjN0GCuB0scpWZBQXXR8miDFBtfA2j43~yxLa5S3dP9qSNcsowbRGQiHnJhbEum2SHffUrCGXCQQdGZ7mcOAOSM8WiX1t-VmNKqGTVuYqFCf-eI1Gg2xZJEyrrsxD8bT24kQJa4dgaGJoWav8M4L5TUXq57wbJ2UNA9p9-tvkvBQyGOyyN-iv1pkGsDgEto69UB-uuQI2P2rnNhrpUx020TKc34WRUAf9lTmpL29iuodm2uioh2euQLDQff5dpd0S3WBMAzR2kE6bkSS~-V1AY2Z8D8dwHX1Mkd2l0Kf9VoPSUgYTpcx0HmOGA__',
            templeName: 'Mahadeshwara',
            address: 'Kanakapura road, Banglore',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/6700/69a2/03a54c10e1ad2d1887bbcff155403f1b?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PkT20h7qdc~YIQF~kGaGxb5qLWbWMoNT8MiSQGsZSIoaUduQhJ0yvVXL1udbmoV8cZLi-SlUnHH5AbOpoTnnQhYifWVAynjIZ~Jd8nYrdr3eXY9cwTGaqI2SL3iaff5ffwML2Vgyjqyeg8GQFc~TVs26g8s1R41X-sFWgbyp-J7YaAK6SlvFs3m6lwGKnIe8BFr1qsjom6qDOp8o~y6JgYInVyUpYtemjMMXGUrQgD0BJOrCKaKfG2t-jsW-VTrlrKHrKRe7arx-wVkde531J~IjCjednhvbsCV3e7ZL3Y4u9D7p1MEvkJe5WSxS7sarKFjY2S-qrgRPAvhmAxHfNA__',
            templeName: 'Brahmalingeshwara',
            address: 'Kanakapura road, Banglore',
        },
    ];
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenheight] = useState(Dimensions.get('window').height);
    const [orientation, setOrientation] = useState('PORTRAIT');
    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation('PORTRAIT');
            } else {
                setOrientation('LANDSCAPE');
            }
        });
        const updateItemWidth = () => {
            setScreenWidth(Dimensions.get('window').width);
            setScreenheight(Dimensions.get('window').height);
        };
        const subscription = Dimensions.addEventListener('change', updateItemWidth);
        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <ScrollView
            style={{
                flex: 1,
                overflow: 'visible',
                backgroundColor: theme.backgroundColor,
                paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
            }}
        >
            <View
                style={{
                    height:
                        orientation == 'PORTRAIT'
                            ? Dimensions.get('window').height / 2.5
                            : Dimensions.get('window').height / 1.5,
                }}
            >
                <ImageBackground
                    source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                ></ImageBackground>
            </View>
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingBottom: 10,
                    marginTop:
                        orientation == 'PORTRAIT'
                            ? -screenHeight / 2.3
                            : -Dimensions.get('window').height / 1.3,
                }}
                onLayout={handleLayout}
            >
                <CardComponents navigation={navigation} />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text
                    style={{
                        fontSize: RFValue(18, 800),
                        // fontWeight: '700',
                        fontFamily: 'Lora-Bold',
                        color: theme.textColor,
                        marginVertical: 10,
                    }}
                >
                    Songs & Audios
                </Text>
                <View>
                    <FlatList
                        contentContainerStyle={{
                            marginVertical: 10,
                            paddingHorizontal: 10,
                        }}
                        horizontal
                        style={{
                            alignSelf: 'flex-start',
                        }}
                        data={playlisType}
                        renderItem={({ item }) => (
                            <Pressable
                                style={{
                                    marginRight: 8,
                                    elevation: 5,
                                    backgroundColor:
                                        selectedPlaylistType == item
                                            ? '#C1554E'
                                            : theme.unSelectedBox.bgColor,

                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                }}
                                onPress={() => {
                                    setSelectedPlaylistType(item);
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            selectedPlaylistType == item ? colors.white : '#777777',
                                        fontFamily: 'Mulish-Bold',
                                        fontWeight: '700',
                                    }}
                                >
                                    {item}
                                </Text>
                            </Pressable>
                        )}
                    />
                </View>

                <View style={styles.boxCommon}>
                    <FlatList
                        key={(item) => item?.id}
                        data={playlistSong}
                        renderItem={({ item, index }) => <SongAndAudio item={item} theme={theme} />}
                    />
                </View>
            </View>
            <View
                style={{
                    height: 260,
                    marginVertical: 20,
                }}
            >
                <Text
                    style={{
                        position: 'absolute',
                        transform: [
                            {
                                translateX: -dimentionsOfText1.width / 2 + dimentionsOfText1.height,
                            },
                            { translateY: (260 + dimentionsOfText1.width / 2) / 2 },
                            { rotate: '-90deg' },
                            { translateX: dimentionsOfText1.width / 2 },
                        ],

                        fontSize: RFValue(14, 800),
                        fontFamily: 'Mulish-Bold',
                        letterSpacing: 5,
                        color: '#B6B6B6',
                    }}
                    onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        setDimentionsOfText1((prev) => ({ width, height }));
                    }}
                >
                    PLAYLISTS
                </Text>
                <View
                    style={{
                        position: 'relative',
                        left: dimentionsOfText1.height * 2,
                        width: screenWidth - dimentionsOfText1.height * 2,
                    }}
                >
                    <ImageBackground
                        source={bgImg}
                        resizeMode="cover"
                        style={{
                            height: textInsidePlaylistCard
                                ? textInsidePlaylistCard + (playlistCardHeight / 2 + 30)
                                : null,
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                            overflow: 'hidden',
                            padding: 15,
                        }}
                    >
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                setTextInsidePlaylistCard(height);
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontSize: RFValue(18, 800),
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                >
                                    Shaivam Playlists
                                </Text>
                                <Text
                                    style={{
                                        fontSize: RFValue(12, 800),
                                        fontWeight: 200,
                                        paddingTop: 5,
                                        color: '#fff',
                                    }}
                                >
                                    We have created playlists for you
                                </Text>
                            </View>
                            <Pressable style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        fontSize: RFValue(16, 800),
                                        color: '#fff',
                                    }}
                                >
                                    View all
                                </Text>
                                <Icon name="arrow-right-alt" color={'#FFFFFF'} size={24} />
                            </Pressable>
                        </View>
                    </ImageBackground>
                    <View
                        onLayout={(event) => {
                            const { height } = event.nativeEvent.layout;
                            setPlaylistCardHeight(height);
                        }}
                        style={{
                            marginTop: -playlistCardHeight / 2,
                            paddingLeft: 15,
                            overflow: 'hidden',
                        }}
                    >
                        <FlatList
                            style={{ overflow: 'visible' }}
                            horizontal
                            data={PlayList}
                            renderItem={({ item, index }) => (
                                <HomePlaylistCard
                                    navigation={navigation}
                                    colors={item.colors}
                                    heading={item.heading}
                                    info={item.info}
                                    subInfo={item.subInfo}
                                    songCount={item.songCount}
                                    navDetail={item.navDetail}
                                    theme={{
                                        colorScheme: theme.colorscheme,
                                        backgroundColor: theme.backgroundColor,
                                        textColor: theme.textColor,
                                    }}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            {/* upcoming events  */}
            <View>
                <View style={{ paddingBottom: 15, paddingHorizontal: 15 }}>
                    <HeadingAndView
                        viewBtnColor={theme.colorscheme === 'light' ? colors.maroon : colors.white}
                        title={'Upcoming Festivals'}
                        theme={{ textColor: theme.textColor, colorscheme: theme.colorscheme }}
                        onPress={() => {}}
                    />
                </View>

                <FlatList
                    contentContainerStyle={{
                        rowGap: 4,
                        paddingBottom: 15,
                    }}
                    key={(item) => item?.id}
                    data={eventData}
                    renderItem={({ item, index }) => (
                        <ElevatedCard theme={{ colorscheme: theme.colorscheme }}>
                            <EventCard
                                date={item.date}
                                timing={item.timing}
                                title={item.title}
                                theme={{
                                    textColor: theme.textColor,
                                    colorscheme: theme.colorscheme,
                                }}
                            />
                        </ElevatedCard>
                    )}
                />
            </View>
            {/* om chant */}
            <View>
                <OmChat />
            </View>
            {/* last section */}
            <View>
                <View style={{ padding: 15 }}>
                    <HeadingAndView
                        viewBtnColor={theme.colorscheme === 'light' ? colors.maroon : colors.white}
                        title={'Nearby Temples'}
                        onPress={() => {}}
                        theme={{
                            textColor: theme.textColor,
                            colorscheme: theme.colorscheme,
                        }}
                    />
                </View>
                <FlatList
                    contentContainerStyle={{
                        rowGap: 4,
                        paddingBottom: 15,
                    }}
                    key={(item) => item?.id}
                    data={nearByTempleData}
                    renderItem={({ item, index }) => (
                        <ElevatedCard theme={{ colorscheme: theme.colorscheme }}>
                            <PlaceCard
                                img={item.img}
                                templeName={item.templeName}
                                address={item.address}
                                theme={{
                                    textColor: theme.textColor,
                                    colorscheme: theme.colorscheme,
                                }}
                            />
                        </ElevatedCard>
                    )}
                />
            </View>
            {/* Quiz */}
            <Quiz />
            {/* video list */}
            <View
                style={{
                    paddingBottom: 60,
                    paddingHorizontal: 15,
                }}
            >
                <HeadingAndView
                    viewBtnColor={theme.colorscheme === 'light' ? colors.maroon : colors.white}
                    title={'App Walkthrough Videos '}
                    // todos : add the fn that take it to the dedicated video page
                    onPress={() => {}}
                    theme={{
                        textColor: theme.textColor,
                        colorscheme: theme.colorscheme,
                    }}
                />
                <VideosList screenDimension={{ screenHeight, screenWidth }} />
            </View>
        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    main: { flex: 1 },
    firstContainer: {
        height: Dimensions.get('window').height / 2.5,
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
