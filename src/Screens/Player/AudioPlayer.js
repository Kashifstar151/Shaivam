import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import ShuffleIcon from '../../assets/Images/music (1).svg';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FavouriteIcon from '../../assets/Images/Vector (2).svg';
import ThumbImage from '../../assets/Images/Ellipse 5.svg';
import MusicIcon from "../../assets/Images/MusicPlayer.svg"
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
import { AddDownloadedAudios, AddSongToDatabase, createDownloadTable, createUserTable, listfavAudios } from '../../Databases/AudioPlayerDatabase';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../Helpers';

const RenderAudios = ({ item, index, clb, activeTrack, setSelectedOdhuvar }) => {

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

const AudioPlayer = ({ orientation, navigation, songsData, prevId, route, title, songs }) => {
    const [height, setHeight] = useState(Dimensions.get('window').height)
    const [selectedOdhuvar, setSelectedOdhuvar] = useState()
    // const [orientation, setOrientation] = useState('PORTRAIT')
    // useEffect(() => {
    //     Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    //         if (width < height) {
    //             setOrientation("PORTRAIT")
    //         } else {
    //             setOrientation("LANDSCAPE")

    //         }
    //     })
    // }, [])
    // const { params } = route
    const downloadAudios = () => {
        TrackPlayer.getActiveTrack().then((res) => {
            // console.log("🚀 ~ TrackPlayer.getActiveTrack ~ res:", res)
            AddSongToDatabase('sf', [res?.id, res?.url, res?.title, res?.artist, res?.categoryName, res?.thalamOdhuvarTamilname, res?.thirumariasiriyar], callbacks => {
                // console.log('callbacks', JSON.stringify(callbacks, 0, 2))
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
    const [repeatMode, setRepeatMode] = useState()
    const playBackState = usePlaybackState();
    useEffect(() => {
        Icon.getImageSource('circle', 18, '#C1554E').then((source) => {
            return setThumbImage({ thumbIcon: source });
        });
        createUserTable()

    }, []);
    const getMode = (mode) => {
        if (mode == 0) {
            TrackPlayer.setRepeatMode(RepeatMode.Off)
            setRepeatMode(0)
        } else {
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
            setRepeatMode(2)
        }
    }
    const activeTrack = useActiveTrack();
    useEffect(() => {
        getSOngData();
    }, [songsData, isFocuced]);

    const getSOngData = () => {
        const query = `SELECT * from thirumurai_songs where prevId=${prevId} and title NOTNULL`;
        getSqlData(query, (callbacks) => {
            console.log("🚀 ~ getSqlData ~ callbacks:", callbacks)
            const query2 = `SELECT * FROM odhuvars WHERE title='${callbacks?.[0]?.title}'`;
            getSqlData(query2, async (callbacks) => {
                console.log("🚀 ~ getSqlData ~ callbacks:", JSON.stringify(callbacks, 0, 2))
                setOdhuvar(callbacks);
                setUpPlayer(callbacks);
                setSelectedOdhuvar(callbacks[0])
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
        TrackPlayer.getActiveTrack().then(async (item) => {
            console.log("🚀 ~ TrackPlayer.getActiveTrack ~ res:", item)
            const path = `${RNFS.ExternalDirectoryPath}/${item?.thalamOdhuvarTamilname}`;
            // const options = {
            //     fromUrl: item?.url,
            //     toFile: path,
            // };
            RNFetchBlob.config({
                path: path
            })
                .fetch(
                    'GET',
                    `${item?.url}`
                ).then(async (res) => {
                    console.log("the audio file save to this path", res.path())
                    const jsonValue = JSON.stringify({
                        id: item?.id,
                        title: item?.title,
                        artist: item?.artist,
                        url: res.path(),
                        categoryName: item?.categoryName,
                        thalamOdhuvarTamilname: item?.thalamOdhuvarTamilname,
                        thirumariasiriyar: item?.thirumariasiriyar
                    });
                    await AsyncStorage.setItem(`downloaded:${item?.thalamOdhuvarTamilname}`, jsonValue);
                    console.log('Metadata saved');
                    //     }
                    //   };
                }).catch((err) => {
                    console.log('error occured in downloading audio', err)
                })
            // console.log("🚀 ~ TrackPlayer.getActiveTrack ~ options:", options)
            // try {
            //     await RNFS.downloadFile(options).promise;
            //     console.log('Audio downloaded to', path);
            //     // You can now play this file offline using the path
            // } catch (error) {
            //     console.error('Download error:', error);
            // }
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
        <View style={orientation == 'LANDSCAPE' ? { width: Dimensions.get('window').width / 2, backgroundColor: '#222222', height: 70, alignItems: 'center', } : { backgroundColor: '#222222', height: 200 }}>
            {
                orientation == 'PORTRAIT' &&
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
                                setSelectedOdhuvar={setSelectedOdhuvar}
                            />
                        )}
                    />
                </View>
            }
            {
                orientation == 'LANDSCAPE' ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 50, width: 50, backgroundColor: colors.grey7, marginHorizontal: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <MusicIcon />
                            </View>
                            <View>

                                <Text style={[styles.AudioText, { fontWeight: '700', color: '#FFFFFF' }]}>
                                    {selectedOdhuvar?.thalamOdhuvarTamilname}
                                </Text>
                                <Text style={[styles.AudioText, { fontWeight: '400', color: '#FFFFFF', fontSize: 12 }]}>
                                    {selectedOdhuvar?.title}
                                </Text>
                            </View>
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                <TouchableOpacity onPress={() => handlePrevious()}>
                                    <Icon name="stepbackward" size={24} color="white" />
                                </TouchableOpacity>
                                {paused ? (
                                    <TouchableOpacity
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
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 20,
                                            // backgroundColor: '#FAF8FF',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: 30
                                        }}
                                        onPress={() => handlePlay(playBackState)}
                                    >
                                        <Icon name="play" size={40} color="white" />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => handleNext()}>
                                    <Icon name="stepforward" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    : <>
                        <View style={{ justifyContent: 'center', marginTop: 10 }}>
                            <Slider
                                value={position}
                                thumbImage={ThumbImage}
                                onValueChange={(value) => TrackPlayer.seekTo(value)}
                                onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
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
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingHorizontal: 20, alignItems: 'center', }}>
                            {
                                repeatMode == 2 ?
                                    <TouchableOpacity
                                        style={{ width: '28%', }}
                                        onPress={() => getMode(0)}
                                    >
                                        <MaterialIcons name='shuffle' size={24} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity
                                        style={{ width: '28%', }}
                                        onPress={() => getMode(2)}
                                    >
                                        <ShuffleIcon />
                                    </TouchableOpacity>
                            }
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                <TouchableOpacity onPress={() => handlePrevious()}>
                                    <Icon name="stepbackward" size={24} color="white" />
                                </TouchableOpacity>
                                {paused ? (
                                    <TouchableOpacity
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
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: 30
                                        }}
                                        onPress={() => handlePlay(playBackState)}
                                    >
                                        <Icon name="play" size={40} color="white" />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => handleNext()}>
                                    <Icon name="stepforward" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => downloadAudio()}>
                                    <Icon name="download" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => downloadAudios()}>
                                    <FavouriteIcon />
                                </TouchableOpacity>
                            </View>
                        </View></>
            }
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
