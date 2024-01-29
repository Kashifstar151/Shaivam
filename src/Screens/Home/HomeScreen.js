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
import HomePlaylistCard from '../../components/HomePlaylistCard';
import ElevatedCard from '../../components/ElevatedCard';
import EventCard from '../../components/EventCard';
import OmChat from './OmChat';
import RightDirSVG from '../../components/SVGs/RightDirSVG';
import HeadingAndView from './HeadingAndView';
import PlaceCard from './PlaceCard';

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

const HomeScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const [compHeight, setCompHeight] = useState();
    const [textInsidePlaylistCard, setTextInsidePlaylistCard] = useState(0);
    const [playlistCardHeight, setPlaylistCardHeight] = useState(0);
    const [dimentionsOfText1, setDimentionsOfText1] = useState({
        width: 0,
        height: 0,
    });
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

    return (
        <ScrollView
            style={{
                flex: 1,
                overflow: 'visible',
                backgroundColor: theme.backgroundColor,
            }}
        >
            <View style={[styles.firstContainer]}>
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
                    marginTop: -Dimensions.get('window').height / 2.3,
                }}
                onLayout={handleLayout}
            >
                <CardComponents navigation={navigation} />
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

            {/* playlist 2 */}
            <View
                style={{
                    // backgroundColor: 'red',
                    height: 250,
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

                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 5,
                        color: theme.textColor,
                    }}
                    onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        setDimentionsOfText1((prev) => ({ width, height }));
                    }}
                >
                    PLAYLIST
                </Text>
                <View
                    style={{
                        position: 'relative',
                        left: dimentionsOfText1.height * 2,
                        width: Dimensions.get('screen').width - dimentionsOfText1.height * 2,
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
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                    Shaivam Playlists
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 200,
                                        paddingTop: 5,
                                        color: '#fff',
                                    }}
                                >
                                    We have created playlists for you
                                </Text>
                            </View>

                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#fff',
                                }}
                            >
                                View all
                            </Text>
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

            <>
                <View style={{ paddingBottom: 15, paddingHorizontal: 15 }}>
                    <HeadingAndView
                        viewBtnColor={'#C1554E'}
                        title={'Upcoming Events'}
                        theme={{ textColor: theme.textColor }}
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
            </>

            {/* om chant section  */}

            <OmChat />

            {/* last section */}
            <View style={{ paddingBottom: 100 }}>
                <View style={{ padding: 15 }}>
                    <HeadingAndView
                        viewBtnColor={'#C1554E'}
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
