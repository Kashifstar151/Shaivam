import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import ShuffleIcon from '../../assets/Images/music (1).svg';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FavouriteIcon from '../../assets/Images/Vector (2).svg';
import ThumbImage from '../../assets/Images/Ellipse 5.svg';
// import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs'
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    usePlaybackState,
    Event,
    State,
    useTrackPlayerEvents,
    useActiveTrack,
    useProgress,
} from 'react-native-track-player';
import { getSqlData } from '../Database';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { AddSongToDatabase, createUserTable, listfavAudios } from '../../Databases/AudioPlayerDatabase';
import RNFetchBlob from 'rn-fetch-blob';

const RenderAudios = ({ item, index, clb, selectedOdhuvar, setSelectedOdhuvar }) => {
    // console.log('🚀 ~ file: AudioPlayer.js:70 ~ RenderAudios ~ clb:', clb);

    const setItemForPlayer = (item) => {
        // console.log('🚀 ~ file: AudioPlayer.js:73 ~ setItemForPlayer ~ item:', item);
        setSelectedOdhuvar(item);
        clb(index);
    };

    return (
        <>
            {activeTrack?.id == item?.id ? (
                <TouchableOpacity
                    onPress={() => {
                        setItemForPlayer();
                    }}
                    style={{
                        paddingHorizontal: 7,
                        backgroundColor: '#E0AAA7',
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                    }}
                >
                    <Text style={[styles.AudioText, { color: '#3A1917', fontWeight: '700' }]}>
                        {item?.thalamOdhuvarTamilname}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => setItemForPlayer()}
                    style={{
                        paddingHorizontal: 7,
                        backgroundColor: '#292929',
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                    }}
                >
                    <Text style={styles.AudioText}>{item?.thalamOdhuvarTamilname}</Text>
                </TouchableOpacity>
            )}
        </>
    );
};

const AudioPlayer = ({ navigation, songsData, prevId, route, title, songs }) => {
    // const { params } = route
    const downloadAudios = () => {
        createUserTable()
        TrackPlayer.getActiveTrack().then((res) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ res:", res)
            AddSongToDatabase('sf', [res?.id, res?.url, res?.title, res?.artist, res?.categoryName, res?.thalamOdhuvarTamilname, res?.thirumariasiriyar], callbacks => {
                console.log('callbacks', JSON.stringify(callbacks, 0, 2))
            })
        }).catch((err) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ err:", err)
        }
        )
    }
    const isFocuced = useIsFocused;
    const { position, duration } = useProgress();
    const [paused, setPaused] = useState(false);
    const [ThumbImage, setThumbImage] = useState(null);
    const [Odhuvar, setOdhuvar] = useState(songsData);
    const playBackState = usePlaybackState();
    useEffect(() => {
        Icon.getImageSource('circle', 18, '#C1554E').then((source) => {
            return setThumbImage({ thumbIcon: source });
        });
    }, []);

    const activeTrack = useActiveTrack();

    useEffect(() => {
        getSOngData();
    }, [songsData, isFocuced]);

    const getSOngData = () => {
        const query = `SELECT * from thirumurai_songs where prevId=${prevId} and title NOTNULL`;
        getSqlData(query, (callbacks) => {
            const query2 = `SELECT * FROM odhuvars WHERE title='${callbacks?.[0]?.title}'`;
            getSqlData(query2, async (callbacks) => {
                setOdhuvar(callbacks);
                setUpPlayer(callbacks);
            });
        });
    };
    const handlePause = async () => {
        setPaused(false);
        await TrackPlayer.pause();
        await TrackPlayer.getActiveTrack();
    };
    const handlePlay = async () => {
        setPaused(true);
        await TrackPlayer.play();
        await TrackPlayer.getActiveTrack();
    };

    const handleNext = async () => {
        await TrackPlayer.skipToNext();
        await TrackPlayer.play();
        setPaused(true);
    };
    const handlePrevious = async () => {
        await TrackPlayer.skipToPrevious();
        await TrackPlayer.play();
        setPaused(true);
    };
    const downloadAudio = () => {
        // let dirs = RNFetchBlob.fs.dirs;
        TrackPlayer.getActiveTrack().then((item) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ res:", item)
            RNFetchBlob.config({
                path: `${RNFS.ExternalDirectoryPath}/downloaded`
            })
                .fetch('GET', item?.url)
                .then((res) => {
                    console.log('The file is saved to:', res.path());
                    // Now you can play this file offline
                })
                .catch((error) => console.error(error));
            // AddSongToDatabase('sf', [res?.id, res?.url, res?.title, res?.artist, res?.categoryName, res?.thalamOdhuvarTamilname, res?.thirumariasiriyar], callbacks => {
            //     console.log('callbacks', JSON.stringify(callbacks, 0, 2))
            // })
        }).catch((err) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ err:", err)
        }
        )
        // TrackPlayer.getActiveTrack().then((item) => {
        //     console.log("🚀 ~ TrackPlayer.getActiveTrack ~ item:", item)

        // }).catch((err) => {
        //     console.log("err", err)
        // })
    };
    const playById = async (id) => {
        // console.log('The player ==>', id);
        await TrackPlayer.skip(id);
        await TrackPlayer.play();
        setPaused(true);
    };

    const setUpPlayer = async (song) => {
        try {
            if (!TrackPlayer._initialized) {
                await TrackPlayer.setupPlayer();
            }
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
            });
            await TrackPlayer.add(song);
        } catch (error) {
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
            });

            await TrackPlayer.add(song);
        }
    };
    return (
        <View style={{ backgroundColor: '#222222', height: 200 }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.headingText}>Odhuvar</Text>
                    <Text style={styles.headingText}>(Select One)</Text>
                </View>
                <FlatList
                    contentContainerStyle={{ backgroundColor: '#222222' }}
                    horizontal
                    data={Odhuvar}
                    renderItem={({ item, index }) => (
                        <RenderAudios
                            item={item}
                            index={index}
                            clb={playById}
                            activeTrack={activeTrack}
                        />
                    )}
                />
            </View>
            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                <Slider
                    value={position}
                    thumbImage={ThumbImage}
                    onValueChange={(value) => TrackPlayer.seekTo(value)}
                    style={{ width: Dimensions.get('window').width - 30, alignSelf: 'center' }}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#C1554E"
                    maximumTrackTintColor="#EFEFEF"
                    thumbTintColor="#C1554E"
                />
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                    }}
                >
                    <Text style={{ color: 'white' }}>
                        {new Date(position * 1000).toISOString().substring(14, 19)}
                    </Text>
                    <Text style={{ color: 'white' }}>
                        {new Date(duration * 1000).toISOString().substring(14, 19)}
                    </Text>
                </View>
            </View>
            {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                }}
            >
                <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                    <ShuffleIcon />
                </View>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <TouchableOpacity onPress={() => handlePrevious()}>
                        <Icon name="stepbackward" size={24} color="white" />
                    </TouchableOpacity>
                    {paused ? (
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() => handlePause(playBackState)}
                        >
                            <View
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    backgroundColor: '#FAF8FF',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Icon name="pause" size={32} color="black" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() => handlePlay(playBackState)}
                        >
                            <Icon name="play" size={40} color="white" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleNext()}>
                        <Icon name="stepforward" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <Icon name="download" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FavouriteIcon />
                    </TouchableOpacity>
                </View>
            </View> */}

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    // backgroundColor: 'white'
                }}
            >
                <TouchableOpacity
                    style={{ width: '28%', }}
                    onPress={() => {
                        return;
                    }}
                >
                    <ShuffleIcon />
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={{ width: 30, height: 30, paddingHorizontal: 20 }}
                    onPress={() => {
                        return;
                    }}
                ></TouchableOpacity> */}
                {/* <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                    <TouchableOpacity onPress={() => handlePrevious()}>
                        <Icon name="stepbackward" size={24} color="white" />
                    </TouchableOpacity>
                    {paused ? (
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() => handlePause(playBackState)}
                        >
                            <View
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    backgroundColor: '#FAF8FF',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginHorizontal: 30
                                }}
                            >
                                <Icon name="pause" size={32} color="black" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{ marginHorizontal: 30 }}
                            onPress={() => handlePlay(playBackState)}
                        >
                            <Icon name="play" size={40} color="white" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleNext()}>
                        <Icon name="stepforward" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {/* <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => downloadAudio()}>
                        <Icon name="download" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => downloadAudios()}>
                        <FavouriteIcon />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                </View> */}
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    main: {},
    container: { flexDirection: 'row', padding: 10 },
    headingText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#CECECE',
        fontFamily: 'Mulish-Regular',
    },
    AudioText: {
        fontSize: 12,
        color: '#777777',
        fontWeight: '600',
        fontFamily: 'AnekTamil-Regular',
    },
});
export default AudioPlayer;
