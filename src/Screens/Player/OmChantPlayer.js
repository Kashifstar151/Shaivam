import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AudioIcon from '../../assets/Images/7703676 1.svg';
import { usePlayer } from '../../Context/PlayerContext';
import { colors } from '../../Helpers';
import { addTracks, setupPlayer } from '../../navigation/BottomTab/OmChantPlayerTrack';

const OmChantPlayer = () => {
    const playbackState = usePlaybackState();
    const [paused, setPaused] = useState(false);
    const { showPlayer, setShowPlayer, OmPlayTiming } = usePlayer();
    const { position, duration } = useProgress();

    useEffect(() => {
        async function removeTheTrackPlayer() {
            console.log('🚀 ~ removeTheTrackPlayer ~ removeTheTrackPlayer:');
            await TrackPlayer.stop();
            await TrackPlayer.reset();
        }
        async function setup() {
            let isSetup = await setupPlayer();
            console.log('🚀 ~ setup ~ isSetup:', isSetup);

            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                await addTracks();
            }
            console.log('🚀 ~ setup ~ addTracks:', addTracks);

            setIsPlayerReady(isSetup);
        }
        if (showPlayer) {
            setup();
        }

        return () => removeTheTrackPlayer();
    }, [showPlayer]);

    const timeRef = useRef();
    // useEffect(() => {
    //     // if (timeRef.current) {
    //     //     clearInterval(timeRef.current);
    //     // } else {
    //     timeRef.current = setInterval(() => {
    //         setTimeRemaining((prev) => {
    //             if (prev >= OmPlayTiming) {
    //                 setShowPlayer(false);
    //                 return prev;
    //             } else {
    //                 return prev + 1;
    //             }
    //         });
    //     }, 1000);
    //     // }

    //     return () => {
    //         console.log('clearing the time interval ');
    //         clearInterval(timeRef.current);
    //     };
    // }, [OmPlayTiming]);

    useEffect(() => {
        (async () => {
            if (playbackState.state !== 'playing') {
                setPaused(false);
            } else {
                setPaused(true);
            }
            // fetchAndDisplayDownloads();
        })();
    }, [playbackState]);
    const playAudio = async () => {
        // console.log(playbackState, 'plauback')
        TrackPlayer.getActiveTrack().then((res) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ res:", res)
            // console.log('res', res)
        }).catch((error) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ error:", error)
        })
        TrackPlayer.play()

    }
    const pauseAudio = async () => {
        // console.log(playbackState)
        TrackPlayer.pause()
    }
    return (
        <View style={{ paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 15, alignSelf: 'center', zIndex: 100, height: 70, width: Dimensions.get('window').width - 20, backgroundColor: '#222222', position: 'absolute', bottom: 60 }}>
            <TouchableOpacity style={{ position: 'absolute', top: -10, right: -5 }} onPress={() => setShowPlayer(false)}>
                <Icon name='closecircle' color={colors.grey7} size={23} />
            </TouchableOpacity>
            <View style={{ height: 40, width: 40, backgroundColor: colors.grey7, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <AudioIcon />
            </View>
            <View>
                <Text style={{ color: 'white', fontWeight: '700' }}>Om Namah Shivaya Chant (Loop)</Text>
                <Text style={{ color: 'white' }}>0:00 / 4:40</Text>
            </View>
            {
                paused ?
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 30,
                        }}
                        onPress={() => pauseAudio()}
                    >

                        <Icon name="pause" size={40} color="white" />
                    </TouchableOpacity> : <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 30,
                        }}
                        onPress={() => playAudio()}
                    >
                        <Icon name="play" size={40} color="white" />
                    </TouchableOpacity>
            }
        </View>
    );
};

export default OmChantPlayer;
