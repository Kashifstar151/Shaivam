
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { useActiveTrack, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AudioIcon from '../assets/Images/7703676 1.svg';
import { usePlayer } from '../../Context/PlayerContext';
import { colors } from '../Helpers';
// import { addTracks, setupPlayer } from '../../navigation/BottomTab/OmChantPlayerTrack';
import { useTranslation } from 'react-i18next';

const CommonPlayer = () => {
    const activeTrack = useActiveTrack()
    const playBackState = usePlaybackState()
    console.log("🚀 ~ CommonPlayer ~ activeTrack:", activeTrack, playBackState)
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
                onPress={() => TrackPlayer.reset()}
                style={{ position: 'absolute', top: -10, right: -5 }}
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
            <View style={{ width: '75%' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>
                    {activeTrack?.title}
                </Text>
                {/* <Text style={{ color: 'white' }}>
                    {formatSeconds(timeRemaining / 1000)}/{formatSeconds(OmPlayTiming / 1000)}
                </Text> */}
            </View>
            {playBackState.state == 'playing' ? (
                <TouchableOpacity
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginHorizontal: 30,
                    }}
                    onPress={() => TrackPlayer.pause()}
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
                    onPress={() => TrackPlayer.play()
                    }
                >
                    <Icon name="play" size={40} color="white" />
                </TouchableOpacity>
            )
            }
        </View >
    );
};

export default CommonPlayer;
