import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider';
import ShuffleIcon from "../../assets/Images/music (1).svg"
import Icon from "react-native-vector-icons/dist/AntDesign"
import FavouriteIcon from "../../assets/Images/Vector (2).svg"
import ThumbImage from "../../assets/Images/Ellipse 5.svg"
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    usePlaybackState,
    Event,
    State,
    useProgress,
} from 'react-native-track-player';
import { getSqlData } from '../Database';

const AudioPlayer = ({ navigation, songsData, route, title, songs }) => {
    // const { params } = route
    console.log("🚀 ~ file: AudioPlayer.js:19 ~ AudioPlayer ~ songsData:", JSON.stringify(songsData, 0, 2))
    const { position, duration } = useProgress()
    console.log("🚀 ~ file: AudioPlayer.js:110 ~ handlePlay ~ position:", position, duration)
    const [selectedOdhuvar, setSelectedOdhuvar] = useState(null)
    const [paused, setPaused] = useState(false)
    const [ThumbImage, setThumbImage] = useState(null)
    const [Odhuvar, setOdhuvar] = useState(songsData)
    const playBackState = usePlaybackState()
    useEffect(() => {
        Icon.getImageSource('circle', 18, '#C1554E')
            .then(source => {
                // console.log("🚀 ~ file: AudioPlayer.js:26 ~ useEffect ~ source:", source)
                return setThumbImage({ thumbIcon: source })
            })
    }, [])
    useEffect(() => {
        if (songsData?.length > 0) {
            setUpPlayer()
        }
    }, [songsData])
    const odhuvar = [
        {
            id: 3787,
            attributes: {
                Odhuvarname: "Madurai Muthukkumaran",
                Odhuvar_Tamilname: "மதுரை முத்துக்குமரன்",
                Audio_Url: "https://shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                rawSong: "விண்ணுறு மால்வரை போல்விடை யேறுவர் ஆறுசூ\n  டுவர் விரி சுரி யொளிகொள் தோடுநின் றிலங்கக்\nகண்ணுற நின்றொளி ருங்கதிர் வெண்மதிக் கண்ணியர்\n  கழிந் தவ ரிழிந் திடும் முடைதலை கலனாப்\nபெண்ணுற நின்றவர் தம்முரு வம்மயன் மால்தொழவ் \n  வரி வையைப் பிணைந் திணைந் தணைந்ததும் பிரியார்\nதண்ணிதழ் முல்லையொ டெண்ணிதழ் மௌவல் மருங்கலர்\n  கருங் கழிந் நெருங் குநற் றரும புரம்பதியே.",

            }
        },
        {
            id: 3788,
            attributes: {
                Odhuvarname: "Satgurunatha Odhuvar",
                Odhuvar_Tamilname: "சற்குருநாத ஓதுவார்",
                Audio_Url: "https://shaivam.org/gallery/audio/satguru/sam-thkkappu-muzhuvathum/tis-sat-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                rawSong: "விண்ணுறு மால்வரை போல்விடை யேறுவர் ஆறுசூ\n  டுவர் விரி சுரி யொளிகொள் தோடுநின் றிலங்கக்\nகண்ணுற நின்றொளி ருங்கதிர் வெண்மதிக் கண்ணியர்\n  கழிந் தவ ரிழிந் திடும் முடைதலை கலனாப்\nபெண்ணுற நின்றவர் தம்முரு வம்மயன் மால்தொழவ் \n  வரி வையைப் பிணைந் திணைந் தணைந்ததும் பிரியார்\nதண்ணிதழ் முல்லையொ டெண்ணிதழ் மௌவல் மருங்கலர்\n  கருங் கழிந் நெருங் குநற் றரும புரம்பதியே.",

            }
        },
        {
            id: 3789,
            attributes: {
                Odhuvarname: "Satgurunatha Odhuvar",
                Odhuvar_Tamilname: "சற்குருநாத ஓதுவார்",
                Audio_Url: "https://shaivam.org/gallery/audio/satguru/sam-thkkappu-muzhuvathum/tis-sat-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
                rawSong: "விண்ணுறு மால்வரை போல்விடை யேறுவர் ஆறுசூ\n  டுவர் விரி சுரி யொளிகொள் தோடுநின் றிலங்கக்\nகண்ணுற நின்றொளி ருங்கதிர் வெண்மதிக் கண்ணியர்\n  கழிந் தவ ரிழிந் திடும் முடைதலை கலனாப்\nபெண்ணுற நின்றவர் தம்முரு வம்மயன் மால்தொழவ் \n  வரி வையைப் பிணைந் திணைந் தணைந்ததும் பிரியார்\nதண்ணிதழ் முல்லையொ டெண்ணிதழ் மௌவல் மருங்கலர்\n  கருங் கழிந் நெருங் குநற் றரும புரம்பதியே.",

            }
        }
    ]

    const song = [
        {
            "category_name": "முதல்-திருமுறை",
            "thirumariasiriyar": "திருஞானசம்பந்தர்  ",
            "url": "https://shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-001-1-1-thodudaiya-seviyan.mp3",
            "thalamOdhuvar_Tamilname": "மதுரை முத்துக்குமரன்",
            "artist": "Madurai Muthukkumaran",
            "title": "01.001 தோடுடைய செவியன்",
            "id": 67
        },
        {
            "category_name": "முதல்-திருமுறை",
            "thirumariasiriyar": "திருஞானசம்பந்தர்",
            "url": "https://shaivam.org/gallery/audio/satguru/sam-thkkappu-muzhuvathum/tis-sat-sam-thkkappu-muzhu-part-1-001-1-1-thodudaiya-seviyan.mp3",
            "thalamOdhuvar_Tamilname": "சற்குருநாத ஓதுவார்",
            "artist": "Satgurunatha Odhuvar",
            "title": "01.001 தோடுடைய செவியன்",
            "id": 249
        },
        {
            "category_name": "முதல்-திருமுறை",
            "thirumariasiriyar": "திருஞானசம்பந்தர்",
            "url": "https://shaivam.org/gallery/audio/thiruthani-swaminathan/nalamiku-padhikangal/tis-tns-np-01-thodudaiya-seviyan.mp3",
            "thalamOdhuvar_Tamilname": "திருத்தணி சுவாமிநாதன்",
            "artist": "Thiruthani Swaminathan",
            "title": "01.001 தோடுடைய செவியன்",
            "id": 286
        }
    ]
    const handlePause = async () => {
        setPaused(false)
        await TrackPlayer.pause()
        await TrackPlayer.getActiveTrack()
    }
    const handlePlay = async () => {
        setPaused(true)
        await TrackPlayer.play()
        await TrackPlayer.getActiveTrack()
    }
    const renderAudios = (item, index) => {
        return (
            <>
                {
                    selectedOdhuvar?.id == item?.id ?
                        <TouchableOpacity onPress={() => setSelectedOdhuvar(item)} style={{ paddingHorizontal: 7, backgroundColor: '#E0AAA7', marginLeft: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text style={[styles.AudioText, { color: '#3A1917', fontWeight: '700' }]}>{item?.category_name}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setSelectedOdhuvar(item)} style={{ paddingHorizontal: 7, backgroundColor: '#292929', marginLeft: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text style={styles.AudioText}>{item?.category_name}</Text>
                        </TouchableOpacity>
                }
            </>

        )
    }
    const handleNext = async () => {
        // console.log("Trackplayer", TrackPlayer.getCurrentTrack())
        await TrackPlayer.skipToNext()
        await TrackPlayer.play()
        setPaused(true)
    }
    const handlePrevious = async () => {
        await TrackPlayer.skipToPrevious()
        await TrackPlayer.play()
        setPaused(true)
    }
    const setUpPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                android: {
                    appKilledPlaybackBehavior:
                        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                },
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.SeekTo,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                ],
                progressUpdateEventInterval: 2,
            });
            await TrackPlayer.add(songsData)
            // await TrackPlayer.setRepeatMode()
        } catch (error) {
            // console.log("🚀 ~ file: AudioPlayer.js:102 ~ setUpPlayer ~ error:", error)
        }
    }
    return (
        <View style={{ backgroundColor: '#222222', height: 200 }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.headingText}>Odhuvar</Text>
                    <Text style={styles.headingText}>(Select One)</Text>
                </View>
                <FlatList horizontal data={songsData} renderItem={({ item, index }) => renderAudios(item, index)} />

            </View>
            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                <Slider

                    value={position}
                    thumbImage={ThumbImage}
                    style={{ width: Dimensions.get('window').width - 30, alignSelf: 'center' }}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#C1554E"
                    maximumTrackTintColor="#EFEFEF"
                    thumbTintColor='#C1554E'
                />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <Text style={{ color: 'white' }}>{new Date(position * 1000).toISOString().substring(15, 19)}</Text>
                    <Text style={{ color: 'white' }}>
                        {new Date((duration) * 1000).toISOString().substring(14, 19)}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingHorizontal: 20, alignItems: 'center' }}>
                <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                    <ShuffleIcon />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => handlePrevious()}>
                        <Icon name='stepbackward' size={24} color='white' />
                    </TouchableOpacity>
                    {
                        paused ?
                            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() =>
                                handlePause(playBackState)
                            }>
                                <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#FAF8FF', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='pause' size={32} color='black' />
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() =>
                                handlePlay(playBackState)
                            }>
                                <Icon name='play' size={40} color='white' />
                            </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => handleNext()}>
                        <Icon name='stepforward' size={24} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <Icon name='download' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FavouriteIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export const styles = StyleSheet.create({
    main: {},
    container: { flexDirection: 'row', padding: 10 },
    headingText: { fontSize: 12, fontWeight: '500', color: '#CECECE', fontFamily: 'Mulish-Regular' },
    AudioText: { fontSize: 12, color: '#777777', fontWeight: '600', fontFamily: 'AnekTamil-Regular' }
})
export default AudioPlayer