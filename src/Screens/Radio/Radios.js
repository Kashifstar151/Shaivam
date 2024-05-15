import React, { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import RadioSVG from "../../components/SVGs/RadioSVG";
import { ThemeContext } from "../../Context/ThemeContext";
import CenterIcon from '../../assets/Images/Vector (3).svg'
import Feather from "react-native-vector-icons/dist/Feather";
import ToggleSwitch from "toggle-switch-react-native";
import { colors } from "../../Helpers";
import { useGetRadioListQuery } from "../../store/features/Calender/CalenderApiSlice";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, usePlaybackState } from "react-native-track-player";
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AudioIcon from "../../assets/Images/7703676 1.svg"
const Radios = ({ navigation }) => {
    const { data: radioData } = useGetRadioListQuery()
    console.log("🚀 ~ Radios ~ radioData:", JSON.stringify(radioData, 0, 2))
    const theme = useContext(ThemeContext)
    const [toggleOn, setToggleOn] = useState(false)
    const [selectedMusic, setSelectedMusic] = useState(false)
    const playBackState = usePlaybackState();
    const audioData = [
        { name: 'Radio Shiva Tattvam', description: 'Current Program: Veda darshana discourse', id: 1 },
        { name: 'Radio Shiva Tattvam', description: 'Current Program: Veda darshana discourse', id: 2 },
        { name: 'Radio Shiva Tattvam', description: 'Current Program: Veda darshana discourse', id: 3 }
    ]
    const programList = [
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 1 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 2 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 3 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 4 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 5 },
    ]
    const [paused, setPaused] = useState(false)
    const [playerState, setPlayerState] = useState()
    const [renderUi, setRenderUi] = useState(false)
    useEffect(() => {
        setPlayerState(playBackState)
        console.log('playBackState', playBackState)
    }, [playBackState])
    useEffect(() => {
        let songs = []
        //     url: require('./coelacanth.ogg'), // Load media from the app bundle
        // title: 'Coelacanth I',
        // artist: 'deadmau5',
        // artwork: require('./cover.jpg'), // Load artwork from the app bundle
        // duration: 166
        radioData?.data?.map((item) => {
            let data = {
                id: item?.id,
                url: item?.attributes?.URL,
                title: item?.attributes?.Title,
                artist: 'deadmau5',
            }
            songs?.push(data)
        })
        // if (songs?.length > 0) {
        setUpPlayer(songs)
        // }
        console.log("🚀 ~ useEffect ~ songs:", songs)
    }, [radioData])
    const setUpPlayer = async (song) => {
        // console.log("🚀 ~ setUpPlayer ~ song:", song)
        try {
            // if (!TrackPlayer._initialized) {
            //     alert(false)
            // }
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
                compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
                progressUpdateEventInterval: 2,
                // icon: require('../../../assets/Images/Component.png'),
            });
            await TrackPlayer.reset();
            await TrackPlayer.add(song);
        } catch (error) {
            console.log("🚀 ~ setUpPlayer ~ error:", error)
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
                compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
                progressUpdateEventInterval: 2,
                // icon: require('../../../assets/Images/Component.png'),
            });
            await TrackPlayer.reset();
            await TrackPlayer.add(song);
            setRenderUi(true)
        }
    }

    // const setUpPlayer =  async (song, from) => {
    //         try {
    //             if (!TrackPlayer._initialized) {
    //                 await TrackPlayer.setupPlayer();
    //             }
    //             await TrackPlayer.updateOptions({
    //                 android: {
    //                     appKilledPlaybackBehavior:
    //                         AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    //                 },
    //                 capabilities: [
    //                     Capability.Play,
    //                     Capability.Pause,
    //                     Capability.SkipToNext,
    //                     Capability.SkipToPrevious,
    //                     Capability.SeekTo,
    //                 ],
    //                 compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
    //                 progressUpdateEventInterval: 2,
    //                 // icon: require('../../../assets/Images/Component.png'),
    //             });
    //             await TrackPlayer.reset();
    //             await TrackPlayer.add(song);
    //         } catch (error) {
    //             await TrackPlayer.updateOptions({
    //                 android: {
    //                     appKilledPlaybackBehavior:
    //                         AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    //                 },
    //                 capabilities: [
    //                     Capability.Play,
    //                     Capability.Pause,
    //                     Capability.SkipToNext,
    //                     Capability.SkipToPrevious,
    //                     Capability.SeekTo,
    //                 ],
    //                 compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
    //                 progressUpdateEventInterval: 2,
    //                 // icon: require('../../../assets/Images/Component.png'),
    //             });
    //             await TrackPlayer.reset();
    //             await TrackPlayer.add(song);
    //         }
    //     },
    // [song]'
    const handleSong = async (item, id) => {
        // TrackPlayer.play()
        alert(true)
        // const track = await TrackPlayer.getActiveTrack()
        setSelectedMusic(item)
        await TrackPlayer.skip(id);
        await TrackPlayer.play();

    }
    const PauseAudio = async () => {
        // setSelectedMusic(item)
        // await TrackPlayer.skip(id);
        await TrackPlayer.pause();
    }
    return (
        <View style={{ height: Dimensions.get('window').height }}>
            <Background>
                <BackButton color={true} secondMiddleText='Radio' navigation={navigation} />
                <View style={{ height: '55%' }}>
                </View>
            </Background>
            <View style={{ zIndex: 50, position: 'absolute', top: '12%', alignSelf: 'center', }}>
                <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'white', }}>Stations</Text>
                {
                    renderUi &&
                    <FlatList bounces={false} data={radioData?.data} renderItem={({ item, index }) => (
                        <Pressable style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, elevation: 10, shadowColor: 'black', shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 1, marginVertical: 10, backgroundColor: '#FEF0CC', height: 80, width: Dimensions.get('window').width - 30 }}>
                            <RadioSVG fill={'#4C3600'} />
                            <View style={{ paddingHorizontal: 10, width: Dimensions.get('window').width / 1.5 }}>
                                <Text style={{ color: '#4C3600', fontFamily: 'Mulish-Regular' }}>{item?.attributes?.Title}</Text>
                                <Text style={{ color: '#4C3600', fontFamily: 'Mulish-Regular', fontSize: 12 }}>{item?.attributes?.description}</Text>
                            </View>
                            {
                                selectedMusic?.id == item?.id && playBackState?.state == 'playing' ?
                                    <Pressable onPress={() => PauseAudio()} style={{ alignItems: 'center', justifyContent: 'center', height: 40, width: 40, backgroundColor: 'white', borderRadius: 20, shadowColor: 'black', shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 1, }}>
                                        <MaterialIcons name='square' size={19} />
                                    </Pressable> :
                                    <Pressable onPress={() => handleSong(item, index)} style={{ alignItems: 'center', justifyContent: 'center', height: 40, width: 40, backgroundColor: 'white', borderRadius: 20, shadowColor: 'black', shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 1, }}>
                                        {<MaterialIcons name='play-arrow' size={24} />}
                                    </Pressable>
                            }
                            {/* <Pressable onPress={() => handleSong(item, index)} style={{ alignItems: 'center', justifyContent: 'center', height: 40, width: 40, backgroundColor: 'white', borderRadius: 20, shadowColor: 'black', shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 1, }}>
                            {selectedMusic?.id == item?.id && playBackState?.state == 'playing' ? <MaterialIcons name='square' size={19} /> : <MaterialIcons name='play-arrow' size={24} />}
                        </Pressable> */}
                        </Pressable>
                    )} />
                }
                {/* <View style={{ paddingHorizontal: 10, }}>
                    <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'black', }}>Program List</Text>
                    <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>You can set reminders to each program</Text>
                    <FlatList contentContainerStyle={{ marginTop: 10 }} bounces={false} data={programList} renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', paddingHorizontal: 0, paddingVertical: 10, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#222222', fontFamily: 'Mulish-SemiBold' }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#777777', fontSize: 12 }}>{item.duration}</Text>
                                    {
                                        index == 0 &&
                                        <View style={{ backgroundColor: '#ECCCCA', padding: 7, borderRadius: 15 }}>
                                            <Text style={{ fontSize: 12, fontFamilyl: 'Mulish-Bold', color: '#C1554E' }}>Now Playing</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name='share-2' size={20} color='#777777' />
                                <View style={{ marginHorizontal: 5 }}>
                                    <ToggleSwitch offColor={colors.grey3} onColor={'#ECCCCA'} onToggle={() => setToggleOn(!toggleOn)} isOn={toggleOn} color={'#777777'} size='small' circleColor={toggleOn ? '#C1554E' : 'white'} />
                                </View>
                            </View>
                        </View>
                    )} />
                </View> */}
            </View>
            {/* <View> */}
            <View
                style={{
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 15,
                    alignSelf: 'center',
                    zIndex: 100,
                    height: 70,
                    width: Dimensions.get('window').width - 20,
                    backgroundColor: '#222222',
                    position: 'absolute',
                    bottom: 30,
                }}
            >
                {/* <TouchableOpacity
                        style={{ position: 'absolute', top: -10, right: -5 }}
                    // onPress={() => setShowPlayer(false)}
                    >
                        <Icon name="closecircle" color={colors.grey7} size={23} />
                    </TouchableOpacity> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            height: 40,
                            width: 40,
                            backgroundColor: colors.grey7,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AudioIcon />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '700' }}>
                            {selectedMusic?.attributes?.Title}
                        </Text>
                        <Text style={{ color: colors.grey6 }}>
                            {/* {formatSeconds(timeRemaining / 1000)}/{formatSeconds(OmPlayTiming / 1000)} */}
                            Now Playing
                        </Text>
                    </View>
                </View>
                {/* {paused ? ( */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity >
                        <Icon name="stepbackward" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 30,
                        }}
                    // onPress={() => TrackPlayer.pause()}
                    >
                        {playBackState?.state == 'playing' ? <Icon name="pause" size={30} color="white" /> : <Icon name="play" size={30} color="white" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNext()}>
                        <Icon name="stepforward" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                {/* ) : (
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 30,
                        }}
                        onPress={() => TrackPlayer.play()}
                    >
                        <Icon name="play" size={40} color="white" />
                    </TouchableOpacity>
                )} */}
            </View>
            {/* </View> */}
        </View >
    );
};

export default Radios;
