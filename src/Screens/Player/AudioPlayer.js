import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
    State
} from 'react-native-track-player';

const AudioPlayer = ({ navigation }) => {
    const [selectedOdhuvar, setSelectedOdhuvar] = useState(null)
    const [paused, setPaused] = useState(false)
    const [ThumbImage, setThumbImage] = useState(null)
    const playBackState = usePlaybackState()
    useEffect(() => {
        setUpPlayer()
        Icon.getImageSource('circle', 15, 'white')
            .then(source => {
                // console.log("🚀 ~ file: AudioPlayer.js:26 ~ useEffect ~ source:", source)
                return setThumbImage({ thumbIcon: source })
            })
    }, [])
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

            id: '1',
            url: "https://shaivam.org/gallery/audio/satguru/sam-thkkappu-muzhuvathum/tis-sat-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
            title: 'Satgurunatha Odhuvar',
            artist: 'tobylane',
            duration: 120,

        },
        {

            id: '2',
            url: "https://shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
            title: 'Satgurunatha',
            artist: 'tobylane',
            duration: 120,

        },
        {
            id: '3',
            title: "Madurai Muthukkumaran",
            artist: "மதுரை முத்துக்குமரன்",
            url: "https://shaivam.org/gallery/audio/madurai-muthukkumaran/thirugnanasambandar-thirukkadaikkappu-muzhuvathum/tis-md-mthkumaran-sam-thkkappu-muzhu-part-1-179-1-136-madhar-madappidi.mp3",
            duration: 120,
        }
    ]
    const handlePause = async () => {
        setPaused(false)
        await TrackPlayer.pause()
    }
    const handlePlay = async () => {
        setPaused(true)
        await TrackPlayer.play()
    }
    const renderAudios = (item, index) => {
        return (
            <>
                {
                    selectedOdhuvar?.id == item?.id ?
                        <TouchableOpacity onPress={() => setSelectedOdhuvar(item)} style={{ paddingHorizontal: 7, backgroundColor: '#E0AAA7', marginLeft: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text style={[styles.AudioText, { color: '#3A1917', fontWeight: '700' }]}>{item?.attributes?.Odhuvar_Tamilname}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setSelectedOdhuvar(item)} style={{ paddingHorizontal: 7, backgroundColor: '#292929', marginLeft: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text style={styles.AudioText}>{item?.attributes?.Odhuvar_Tamilname}</Text>
                        </TouchableOpacity>
                }
            </>

        )
    }
    const handleNext = async () => {
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
            await TrackPlayer.add(song)
        } catch (error) {
            console.log("🚀 ~ file: AudioPlayer.js:102 ~ setUpPlayer ~ error:", error)
        }
    }
    return (
        <View style={{ backgroundColor: '#222222', height: 200 }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.headingText}>Odhuvar</Text>
                    <Text style={styles.headingText}>(Select One)</Text>
                </View>
                <FlatList horizontal data={odhuvar} renderItem={({ item, index }) => renderAudios(item, index)} />

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Slider
                    // thumbTouchSize={10}
                    thumbImage={ThumbImage}
                    style={{ width: Dimensions.get('window').width - 30, }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#C1554E"
                    maximumTrackTintColor="#EFEFEF"

                />
                <View>
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