import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderAudios from './RenderAudios';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../Context/ThemeContext';
import { getSqlData } from '../Database';
// import { colors } from '../../Helpers';
// import { styles } from "../Thrimurai/ThrimuraiHeadingPage/ThrimuraiHeadingPagex"

const Varakatrimurai = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [authordata, setAuthorData] = useState(null)

    useEffect(() => {
        getSqlData('select * from thirumurais GROUP BY author ', cb => {
            // console.log("🚀 ~ useEffect ~ cb:", JSON.stringify(cb, 0, 2))
            setAuthorData(cb)
        })
    }, [])
    const data = [
        {
            id: 1,
            name: 'Author_name 1',
            image_url: '/images/varakatrimurai.jpg',
            songLyrics: [
                {
                    id: 70327,
                    attributes: {
                        titleNo: '82',
                        title: '01.082 இரும்பொன் மலைவில்லா எரியம்',
                        pann: 'குறிஞ்சி',
                        audioUrl:
                            'http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-2-222-1-82-irumpon-malai.mp3',
                        thirumuraiId: 1120,
                        refId: 1120,
                        songNo: 1,
                        thalam: 'வீழிமிழலை',
                        country: 'சோழநாடு காவிரித் தென்கரை',
                        author: 'திருஞானசம்பந்தர்',
                        url: 'https://shaivam.org/thirumurai/first-thirumurai/1120/thirugnanasambandar-devaram-tiruvilimilalai-irumpon-malaivilla',
                        centerNo: '61',
                        addon: '',
                        createdAt: '2023-11-08T04:22:13.386Z',
                        updatedAt: '2023-11-08T10:14:15.479Z',
                        publishedAt: '2023-11-08T08:19:30.000Z',
                        prevId: 983,
                        rawSong:
                            'இரும்பொன் மலைவில்லா எரியம் பாநாணில்\nதிரிந்த புரமூன்றுஞ் செற்றான் உறைகோயில்\nதெரிந்த அடியார்கள் சென்ற திசைதோறும்\nவிரும்பி யெதிர்கொள்வார் வீழி மிழலையே.',
                        type: null,
                        searchRawSong:
                            '"இரும்பொன்மலைவில்லாஎரியம்பாநாணில்\\nதிரிந்தபுரமூன்றுஞ்செற்றான்உறைகோயில்\\nதெரிந்தஅடியார்கள்சென்றதிசைதோறும்\\nவிரும்பியெதிர்கொள்வார்வீழிமிழலையே."',
                        locale: 'en',
                    },
                },
                {
                    id: 70328,
                    attributes: {
                        titleNo: '82',
                        title: '01.082 இரும்பொன் மலைவில்லா எரியம்',
                        pann: 'குறிஞ்சி',
                        audioUrl:
                            'http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-2-222-1-82-irumpon-malai.mp3',
                        thirumuraiId: 1120,
                        refId: 1120,
                        songNo: 2,
                        thalam: 'வீழிமிழலை',
                        country: 'சோழநாடு காவிரித் தென்கரை',
                        author: 'திருஞானசம்பந்தர்',
                        url: 'https://shaivam.org/thirumurai/first-thirumurai/1120/thirugnanasambandar-devaram-tiruvilimilalai-irumpon-malaivilla',
                        centerNo: '61',
                        addon: '',
                        createdAt: '2023-11-08T04:22:14.134Z',
                        updatedAt: '2023-11-08T10:14:16.415Z',
                        publishedAt: '2023-11-08T08:19:30.000Z',
                        prevId: 984,
                        rawSong:
                            'வாதைப் படுகின்ற வானோர் துயர்தீர\nஓதக் கடல்நஞ்சை உண்டான் உறைகோயில்\nகீதத் திசையோடுங் கேள்விக் கிடையோடும்\nவேதத் தொலியோவா வீழி மிழலையே.',
                        type: null,
                        searchRawSong:
                            '"வாதைப்படுகின்றவானோர்துயர்தீர\\nஓதக்கடல்நஞ்சைஉண்டான்உறைகோயில்\\nகீதத்திசையோடுங்கேள்விக்கிடையோடும்\\nவேதத்தொலியோவாவீழிமிழலையே."',
                        locale: 'en',
                    },
                },
                {
                    id: 70329,
                    attributes: {
                        titleNo: '82',
                        title: '01.082 இரும்பொன் மலைவில்லா எரியம்',
                        pann: 'குறிஞ்சி',
                        audioUrl:
                            'http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-2-222-1-82-irumpon-malai.mp3',
                        thirumuraiId: 1120,
                        refId: 1120,
                        songNo: 3,
                        thalam: 'வீழிமிழலை',
                        country: 'சோழநாடு காவிரித் தென்கரை',
                        author: 'திருஞானசம்பந்தர்',
                        url: 'https://shaivam.org/thirumurai/first-thirumurai/1120/thirugnanasambandar-devaram-tiruvilimilalai-irumpon-malaivilla',
                        centerNo: '61',
                        addon: '',
                        createdAt: '2023-11-08T04:22:14.829Z',
                        updatedAt: '2023-11-08T10:14:16.772Z',
                        publishedAt: '2023-11-08T08:19:30.000Z',
                        prevId: 985,
                        rawSong:
                            'பயிலும் மறையாளன் தலையிற் பலிகொண்டு\nதுயிலும் பொழுதாடுஞ் சோதி யுறைகோயில்\nமயிலும் மடமானும் மதியும் மிளவேயும்\nவெயிலும் பொலிமாதர்1 வீழி மிழலையே.\n\nபாடம் : 1போன்மாதர்',
                        type: null,
                        searchRawSong:
                            '"பயிலும்மறையாளன்தலையிற்பலிகொண்டு\\nதுயிலும்பொழுதாடுஞ்சோதியுறைகோயில்\\nமயிலும்மடமானும்மதியும்மிளவேயும்\\nவெயிலும்பொலிமாதர்1வீழிமிழலையே.\\n\\nபாடம்:1போன்மாதர்"',
                        locale: 'en',
                    },
                },
                {
                    id: 70330,
                    attributes: {
                        titleNo: '82',
                        title: '01.082 இரும்பொன் மலைவில்லா எரியம்',
                        pann: 'குறிஞ்சி',
                        audioUrl:
                            'http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-2-222-1-82-irumpon-malai.mp3',
                        thirumuraiId: 1120,
                        refId: 1120,
                        songNo: 4,
                        thalam: 'வீழிமிழலை',
                        country: 'சோழநாடு காவிரித் தென்கரை',
                        author: 'திருஞானசம்பந்தர்',
                        url: 'https://shaivam.org/thirumurai/first-thirumurai/1120/thirugnanasambandar-devaram-tiruvilimilalai-irumpon-malaivilla',
                        centerNo: '61',
                        addon: '',
                        createdAt: '2023-11-08T04:22:15.511Z',
                        updatedAt: '2023-11-08T10:14:17.051Z',
                        publishedAt: '2023-11-08T08:19:30.000Z',
                        prevId: 986,
                        rawSong:
                            'இரவன் பகலோனும் எச்சத் திமையோரை\nநிரவிட் டருள்செய்த நிமலன் உறைகோயில்\nகுரவஞ் சுரபுன்னை குளிர்கோங் கிளவேங்கை\nவிரவும் பொழிலந்தண் வீழி மிழலையே.',
                        type: null,
                        searchRawSong:
                            '"இரவன்பகலோனும்எச்சத்திமையோரை\\nநிரவிட்டருள்செய்தநிமலன்உறைகோயில்\\nகுரவஞ்சுரபுன்னைகுளிர்கோங்கிளவேங்கை\\nவிரவும்பொழிலந்தண்வீழிமிழலையே."',
                        locale: 'en',
                    },
                },
                {
                    id: 70331,
                    attributes: {
                        titleNo: '82',
                        title: '01.082 இரும்பொன் மலைவில்லா எரியம்',
                        pann: 'குறிஞ்சி',
                        audioUrl:
                            'http://www.shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-2-222-1-82-irumpon-malai.mp3',
                        thirumuraiId: 1120,
                        refId: 1120,
                        songNo: 5,
                        thalam: 'வீழிமிழலை',
                        country: 'சோழநாடு காவிரித் தென்கரை',
                        author: 'திருஞானசம்பந்தர்',
                        url: 'https://shaivam.org/thirumurai/first-thirumurai/1120/thirugnanasambandar-devaram-tiruvilimilalai-irumpon-malaivilla',
                        centerNo: '61',
                        addon: '',
                        createdAt: '2023-11-08T04:22:16.203Z',
                        updatedAt: '2023-11-08T10:14:17.330Z',
                        publishedAt: '2023-11-08T08:19:30.000Z',
                        prevId: 987,
                        rawSong:
                            'கண்ணிற் கனலாலே காமன் பொடியாகப்\nபெண்ணுக் கருள்செய்த பெருமான் உறைகோயில்\nமண்ணிற் பெருவேள்வி வளர்தீப் புகைநாளும்\nவிண்ணிற் புயல்காட்டும் வீழி மிழலையே.',
                        type: null,
                        searchRawSong:
                            '"கண்ணிற்கனலாலேகாமன்பொடியாகப்\\nபெண்ணுக்கருள்செய்தபெருமான்உறைகோயில்\\nமண்ணிற்பெருவேள்விவளர்தீப்புகைநாளும்\\nவிண்ணிற்புயல்காட்டும்வீழிமிழலையே."',
                        locale: 'en',
                    },
                },
            ],
        },
        {
            id: 2,
            name: 'Author_name 2',
        },
        {
            id: 3,
            name: 'Author_name 3',
        },
        {
            id: 4,
            name: 'Author_name 4',
        },
    ];
    const renderContents = (item, index) => {
        return (
            <>
                <View style={[styles.chapterBox, { backgroundColor: theme.backgroundColor }]}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={[styles.chapterNameTexts, { color: theme.textColor }]}>
                            {item?.author}
                        </Text>
                        {/* <Text style={styles.chapterTexts}>{item.chapters}</Text> */}
                    </View>
                    <TouchableOpacity onPress={() => setSelectedTitle(index)}>
                        <Icon
                            name="add"
                            size={24}
                            color={theme.colorscheme === 'light' ? '#000' : '#fff'}
                        />
                    </TouchableOpacity>
                </View>
                {selectedTitle == index && (
                    <View style={{ marginTop: 10 }}>
                        {/* <FlatList data={item?.title} renderItem={({ item, index }) => renderTitle(item, index)} /> */}
                        <RenderAudios songs={item} navigation={navigation} />
                    </View>
                )}
            </>
        );
    };

    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: 20 }}
                data={authordata}
                renderItem={({ item, index }) => renderContents(item, index)}
            />
        </View>
    );
};
export const styles = StyleSheet.create({
    chapterBox: {
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 50,
        width: Dimensions.get('window').width,
        marginBottom: 4,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    chapterNameTexts: { fontSize: 12, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
});

export default Varakatrimurai;
