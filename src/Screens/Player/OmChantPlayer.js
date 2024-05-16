import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AudioIcon from '../../assets/Images/7703676 1.svg';
import { usePlayer } from '../../Context/PlayerContext';
import { colors } from '../../Helpers';
import { addTracks, setupPlayer } from '../../navigation/BottomTab/OmChantPlayerTrack';
import { useTranslation } from 'react-i18next';

const OmChantPlayer = () => {
    const playbackState = usePlaybackState();
    const [paused, setPaused] = useState(false);
    const { showPlayer, setShowPlayer, OmPlayTiming, isPlaying, setIsPlaying } = usePlayer();
    const [timeRemaining, setTimeRemaining] = useState(0);
    useEffect(() => {
        async function removeTheTrackPlayer() {
            await TrackPlayer.stop();
            await TrackPlayer.reset();
        }
        async function setup() {
            let isSetup = await setupPlayer();
            await TrackPlayer.setRepeatMode(1);
            await TrackPlayer.reset();
            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                await addTracks();
            }
            setIsPlayerReady(isSetup);
        }
        if (showPlayer) {
            setup();
        }

        return () => removeTheTrackPlayer();
    }, [showPlayer]);

    const timeRef = useRef();
    useEffect(() => {
        return () => {
            clearTheRef();
        };
    }, [OmPlayTiming]);

    const setTheRef = () => {
        if (timeRef.current) {
            clearTheRef();
        }
        timeRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev >= OmPlayTiming) {
                    setShowPlayer(false);
                    setIsPlaying(false);
                    return prev;
                } else {
                    return prev + 10;
                }
            });
        }, 10);
    };

    const clearTheRef = () => {
        clearInterval(timeRef.current);
    };

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
        // console.log(playbackState, 'plauback');
        // TrackPlayer.getActiveTrack()
        //     .then((res) => {
        //         console.log('res', res);
        //     })
        //     .catch((error) => {
        //         console.log('🚀 ~ TrackPlayer.getActiveTrack ~ error:', error);
        //     });
        TrackPlayer.play();
        setTheRef();
        setIsPlaying(true);
    };

    function formatSeconds(seconds) {
        const date = new Date(seconds * 1000);
        const minutes = date.getUTCMinutes();
        const formattedSeconds = ('0' + date.getUTCSeconds()).slice(-2);
        return `${minutes}:${formattedSeconds}`;
    }
    const pauseAudio = async () => {
        console.log(playbackState);
        TrackPlayer.pause();
        clearTheRef();
        setIsPlaying(false);
    };

    const { t } = useTranslation();
    return (
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
                bottom: 60,
            }}
        >
            <TouchableOpacity
                style={{ position: 'absolute', top: -10, right: -5 }}
                onPress={() => {
                    setShowPlayer(false);
                    setIsPlaying(false);
                }}
            >
                <Icon name="closecircle" color={colors.grey7} size={23} />
            </TouchableOpacity>
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
            <View>
                <Text style={{ color: 'white', fontWeight: '700' }}>
                    {t('Om Namah Shivaya Chant')} (Loop)
                </Text>
                <Text style={{ color: 'white' }}>
                    {formatSeconds(timeRemaining / 1000)}/{formatSeconds(OmPlayTiming / 1000)}
                </Text>
            </View>
            {paused ? (
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
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
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
            )}
        </View>
    );
};

export default OmChantPlayer;
