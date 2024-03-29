import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Slider from '@kashifum8299/react-native-slider';
import ShuffleIcon from '../../assets/Images/music (1).svg';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FavouriteIcon from '../../assets/Images/Vector (2).svg';
import MusicIcon from '../../assets/Images/MusicPlayer.svg';
// import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';
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
import {
    AddMostPlayed,
    AddSongToDatabase,
    createUserTable,
    listfavAudios,
    MostPlayedList,
    MostPlayedSongList,
    UpdateMostPlayed,
} from '../../Databases/AudioPlayerDatabase';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../Helpers';
import { MusicContext } from '../../components/Playbacks/TrackPlayerContext';
import AlertScreen from '../../components/AlertScreen';

const RenderAudios = ({ item, index, clb, activeTrack, setSelectedOdhuvar }) => {
    // console.log('🚀 ~ file: AudioPlayer.js:70 ~ RenderAudios ~ clb:', clb);

    const setItemForPlayer = (item) => {
        // console.log('🚀 ~ file: AudioPlayer.js:73 ~ setItemForPlayer ~ item:', item);
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

const AudioPlayer = ({
    orientation,
    songsData,
    prevId,
    repeatMode,
    setRepeatMode,
    queryForNextPrevId,
    queryForPreviousPrevId,
    visibleStatusBar,
    setDownloadingLoader,
}) => {
    console.log('the render of page =>', repeatMode);

    // const [oprateMostPlayed, setOprateMostPlayed] = useState(0)
    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        if (event?.state == State?.nextTrack) {
            let index = await TrackPlayer.getActiveTrack();
            setActiveTrack(index);
            // console.log('index', index)
            const newObj = { ...index, prevId: prevId };
            updateRecentlyPlayed(newObj);
        }
    });
    const updateRecentlyPlayed = async (newTrack) => {
        const maxRecentTracks = 4;
        const recentTracksJSON = await AsyncStorage.getItem('recentTrack');
        const recentTracks = recentTracksJSON ? JSON.parse(recentTracksJSON) : [];
        // Check if the track already exists and remove it
        const filteredTracks = recentTracks.filter((track) => track.id !== newTrack.id);
        // Add the new track to the start of the array
        const updatedTracks = [newTrack, ...filteredTracks].slice(0, maxRecentTracks);
        // console.log("🚀 ~ updateRecentlyPlayed ~ updatedTracks:", updatedTracks)
        // Store the updated list back to AsyncStorage
        await AsyncStorage.setItem(`recentTrack`, JSON.stringify(updatedTracks));
    };
    const [fav, setFav] = useState(false);
    const downloadAudios = () => {
        listfavAudios((calbacks) => {
            let lenght = calbacks?.length;
            console.log('🚀 ~ downloadAudios ~ lenght:', lenght);
            TrackPlayer.getActiveTrack()
                .then((res) => {
                    AddSongToDatabase(
                        'sf',
                        [
                            res?.id,
                            res?.url,
                            res?.title,
                            res?.artist,
                            res?.categoryName,
                            res?.thalamOdhuvarTamilname,
                            res?.thirumariasiriyar,
                            lenght++,
                        ],
                        (callbacks) => {
                            if (callbacks?.message == 'Success') {
                                setFav(true);
                            }
                        }
                    );
                })
                .catch((err) => {});
        });
    };
    const { position, duration } = useProgress();
    const [paused, setPaused] = useState(false);
    const [ThumbImage, setThumbImage] = useState(null);
    // const [downloadingLoader, setDownloadingLoader] = useState(false);
    const [downloadedSong, setDownloadedSong] = useState(false);
    const [mostPlayedSongs, setMostPlayedSong] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTract, setActiveTrack] = useState(null);
    const playBackState = usePlaybackState();
    const activeTrack = useActiveTrack();
    // console.log("🚀 ~ activeTrack:", activeTrack)
    useEffect(() => {
        (async () => {
            if (playBackState.state === 'ready') {
                await TrackPlayer.play();
                mostPlayed();
            } else if (playBackState.state !== 'playing') {
                setPaused(false);
            } else {
                setPaused(true);
            }
            // fetchAndDisplayDownloads();
        })();
    }, [playBackState]);
    useEffect(() => {
        Icon.getImageSource('circle', 18, '#C1554E').then((source) => {
            return setThumbImage({ thumbIcon: source });
        });
        Promise.allSettled([createUserTable(), MostPlayedSongList(), getMostPlayedSong()]);
        // createUserTable();
        // MostPlayedSongList();
        // getMostPlayedSong()
        // fetchAndDisplayDownloads()
        // mostPlayed()
        // if (downloaded) {
        //     setUpPlayer(data);
        //     // setOdhuvar(data);
        //     dispatchMusic({ type: 'SET_SONG', payload: data });
        // }
    }, []);
    const getMode = (mode) => {
        if (mode == 0) {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode(0);
        } else {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode(1);
        }
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
        // check whether its last long
        // let queue = await TrackPlayer.getQueue();
        // let checkWhetherLastSong =
        //     (await TrackPlayer.getActiveTrack()).id === queue[queue.length - 1].id;
        // if (checkWhetherLastSong && repeatMode === 0) {
        //     queryForNextPrevId();
        // } else {
        //     await TrackPlayer.skipToNext();
        //     await TrackPlayer.play();
        // }
        queryForNextPrevId();

        // setPaused(true);
    };
    const handlePrevious = async () => {
        // let queue = await TrackPlayer.getQueue();
        // let checkWhetherLastSong = (await TrackPlayer.getActiveTrack()).id === queue[0].id;
        // if (checkWhetherLastSong && repeatMode === 0) {
        //     queryForPreviousPrevId();
        // } else {
        //     await TrackPlayer.skipToPrevious();
        //     await TrackPlayer.play();
        // }

        queryForPreviousPrevId();

        // setPaused(true);
    };
    const getMostPlayedSong = () => {
        MostPlayedList('s', (callbacks) => {
            // console.log("🚀 ~ getMostPlayedSong ~ callbacks:", JSON.stringify(callbacks, 0, 2))
            setMostPlayedSong(callbacks);
            // mostPlayed(callbacks)
        });
    };
    const [downlaodList, setDownloadList] = useState([]);
    // const fetchAndDisplayDownloads = async () => {
    //     try {
    //         // const keys = await AsyncStorage.getAllKeys();
    //         const parsedMetadata = await AsyncStorage.getItem('downloaded');
    //         // console.log("🚀 ~ fetchAndDisplayDownloads ~ parsedMetadata:", parsedMetadata)
    //         // const metadataKeys = keys.filter(key => key.startsWith('downloaded:'));
    //         // const metadata = await AsyncStorage.multiGet(metadataKeys);
    //         // const parsedMetadata = metadata.map(([key, value]) => JSON.parse(value));
    //         setDownloadList(JSON.parse(parsedMetadata));
    //         let data = JSON.parse(parsedMetadata);
    //         console.log('🚀 ~ fetchAndDisplayDownloads ~ data:', activeTrack);
    //         data?.map((item) => {
    //             console.log(
    //                 '🚀 ~ data?.map ~ item:',
    //                 item?.id,
    //                 activeTrack?.id,
    //                 item?.prevId,
    //                 prevId
    //             );
    //             if (item?.id == activeTrack?.id && item?.prevId == prevId) {
    //                 setDownloadedSong(true);
    //             }
    //         });
    //         // Now `parsedMetadta` contains all of your audio files' metadata
    //         // You can use this data to render your downloads page
    //     } catch (e) {
    //         console.error('Failed to fetch metadata', e);
    //     }
    // };
    const mostPlayed = async (callbacks) => {
        let count = 1;
        let exist = false;
        await TrackPlayer.getActiveTrack()
            .then((res) => {
                // console.log("🚀 ~ awaitTrackPlayer.getActiveTrack ~ res:", JSON.stringify(callbacks, 0, 2))
                // console.log("🚀 ~ awaitTrackPlayer.getActiveTrack ~ res:", JSON.stringify(res, 0, 2))
                let num = mostPlayedSongs.filter((value) => {
                    return value?.id == res?.id ? true : false;
                });
                console.log('🚀 ~ awaitTrackPlayer.getActiveTrack ~ exist:', num);
                if (num?.length > 0) {
                    let sql = `UPDATE most_played SET count=? WHERE id=?`;
                    UpdateMostPlayed(sql, [num[0].count + 1, num[0].id], (callbacks) => {
                        console.log('🚀 ~ mostPlayedSongs.map ~ callbacks:', callbacks);
                    });
                } else {
                    AddMostPlayed(
                        's',
                        [
                            res?.id,
                            res?.url,
                            res?.title,
                            res?.artist,
                            res?.categoryName,
                            res?.thalamOdhuvarTamilname,
                            res?.thirumariasiriyar,
                            count,
                        ],
                        (callbacks) => {
                            console.log(
                                '🚀 ~ awaitTrackPlayer.getActiveTrack ~ callbacks:',
                                callbacks
                            );
                        }
                    );
                }
            })
            .catch((error) => {
                console.log('error occured in getting current track');
            });
    };
    const removeFromOfflineDownload = async () => {
        await TrackPlayer.getActiveTrack().then((item) => {
            let arr = downlaodList.filter((res) => res.id !== selectedItem.id);
            // console.log("🚀 ~ removeFromPlaylist ~ arr:", arr)
            setDownloadList(arr);
            AsyncStorage.setItem('downloaded', JSON.stringify(arr));
            setDownloadedSong(false);
            setShowModal(false);
        });
    };
    const [selectedItem, setSelectedItem] = useState([]);
    const removeDownload = async () => {
        await TrackPlayer.getActiveTrack().then((item) => {
            setSelectedItem(item);
            setShowModal(true);
        });
    };
    const downloadAudio = () => {
        // let dirs = RNFetchBlob.fs.dirs;
        setDownloadingLoader(true);
        TrackPlayer.getActiveTrack().then(async (item) => {
            // console.log("🚀 ~ TrackPlayer.getActiveTrack ~ item:", item)
            const path = `${RNFS.ExternalDirectoryPath}/${item?.thalamOdhuvarTamilname}`;

            RNFetchBlob.config({
                path: path,
            })
                .fetch('GET', `${item?.url}`)
                .then(async (res) => {
                    console.log('the audio file save to this path', res.path());
                    const jsonValue = {
                        id: item?.id,
                        title: item?.title,
                        artist: item?.artist,
                        url: 'file://' + res.path(),
                        categoryName: item?.categoryName,
                        thalamOdhuvarTamilname: item?.thalamOdhuvarTamilname,
                        thirumariasiriyar: item?.thirumariasiriyar,
                        prevId: prevId,
                    };
                    const recentTracksJSON = await AsyncStorage.getItem('downloaded');
                    const recentTracks = recentTracksJSON ? JSON.parse(recentTracksJSON) : [];
                    // Check if the track already exists and remove it
                    const filteredTracks = recentTracks.filter(
                        (track) => track.id !== jsonValue.id
                    );
                    // Add the new track to the start of the array
                    const updatedTracks = [jsonValue, ...filteredTracks];
                    // console.log("🚀 ~ updateRecentlyPlayed ~ updatedTracks:", updatedTracks)
                    // Store the updated list back to AsyncStorage
                    await AsyncStorage.setItem(`downloaded`, JSON.stringify(updatedTracks));
                    // await AsyncStorage.setItem(
                    //     `downloaded:${item?.thalamOdhuvarTamilname}`,
                    //     jsonValue
                    // );
                    setDownloadingLoader(false);
                    setDownloadedSong(true);
                    console.log('Metadata saved');
                })
                .catch((err) => {
                    console.log('error occured in downloading audio', err);
                    setDownloadingLoader(false);
                });
        });
    };
    const playById = async (id) => {
        await TrackPlayer.skip(id);
        await TrackPlayer.play();
        setPaused(true);
    };

    return (
        <>
            <View
                style={
                    orientation == 'LANDSCAPE' || !visibleStatusBar
                        ? {
                              width: Dimensions.get('window').width / 2,
                              backgroundColor: '#222222',
                              height: 70,
                              alignItems: 'center',
                          }
                        : { backgroundColor: '#222222', height: 200 }
                }
            >
                {orientation == 'LANDSCAPE' || !visibleStatusBar ? null : (
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.headingText}>Odhuvar</Text>
                            <Text style={styles.headingText}>(Select One)</Text>
                        </View>
                        <FlatList
                            contentContainerStyle={{ backgroundColor: '#222222' }}
                            horizontal
                            data={songsData}
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
                )}
                {orientation == 'LANDSCAPE' || !visibleStatusBar ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            width: '100%',
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    height: 50,
                                    width: 50,
                                    backgroundColor: colors.grey7,
                                    marginHorizontal: 5,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MusicIcon />
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.AudioText,
                                        { fontWeight: '700', color: '#FFFFFF' },
                                    ]}
                                >
                                    {activeTrack?.thalamOdhuvarTamilname}
                                </Text>
                                <Text
                                    style={[
                                        styles.AudioText,
                                        { fontWeight: '400', color: '#FFFFFF', fontSize: 12 },
                                    ]}
                                >
                                    {activeTrack?.title}
                                </Text>
                            </View>
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={{}}>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}
                            >
                                <TouchableOpacity onPress={() => handlePrevious()}>
                                    <Icon name="stepbackward" size={24} color="white" />
                                </TouchableOpacity>
                                {paused ? (
                                    <TouchableOpacity onPress={() => handlePause(playBackState)}>
                                        <View
                                            style={{
                                                height: 40,
                                                width: 40,
                                                borderRadius: 20,
                                                backgroundColor: '#FAF8FF',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginHorizontal: 30,
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
                                            marginHorizontal: 30,
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
                ) : (
                    <View>
                        <View style={{ justifyContent: 'center', marginTop: 10 }}>
                            <Slider
                                value={position}
                                thumbImage={ThumbImage}
                                onValueChange={(value) => TrackPlayer.seekTo(value)}
                                onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
                                style={{
                                    width: Dimensions.get('window').width - 30,
                                    alignSelf: 'center',
                                }}
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
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15,
                                paddingHorizontal: 20,
                                alignItems: 'center',
                            }}
                        >
                            {repeatMode == 1 ? (
                                <TouchableOpacity onPress={() => getMode(0)}>
                                    <MaterialIcons name="shuffle" size={24} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => getMode(2)}>
                                    <ShuffleIcon />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={{ width: 30, height: 30, paddingHorizontal: 30 }}
                                onPress={() => {
                                    return;
                                }}
                            ></TouchableOpacity>

                            <TouchableOpacity onPress={() => handlePrevious()}>
                                <Icon name="stepbackward" size={24} color="white" />
                            </TouchableOpacity>
                            {paused ? (
                                <TouchableOpacity
                                    // style={{ marginHorizontal: 10 }}
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
                                            marginHorizontal: 20,
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
                                        marginHorizontal: 20,
                                    }}
                                    onPress={() => handlePlay(playBackState)}
                                >
                                    <Icon name="play" size={40} color="white" />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => handleNext()}>
                                <Icon name="stepforward" size={24} color="white" />
                            </TouchableOpacity>
                            {downloadedSong || activeTrack?.isLocal ? (
                                <TouchableOpacity
                                    onPress={() => removeDownload()}
                                    style={{
                                        marginHorizontal: 20,
                                        height: 26,
                                        width: 26,
                                        borderRadius: 13,
                                        backgroundColor: '#389F56',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon name="check" size={20} color="white" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={{ marginHorizontal: 20 }}
                                    onPress={() => downloadAudio()}
                                >
                                    <Icon name="download" size={24} color="white" />
                                </TouchableOpacity>
                            )}
                            {/* <TouchableOpacity
                                style={{ marginHorizontal: 20 }}
                                onPress={() => downloadAudio()}
                            >
                                {downloadedSong ? (
                                    <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#389F56', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="check" size={24} color="white" />
                                    </View>
                                ) : (
                                    <Icon name="download" size={24} color="white" />
                                )}
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => downloadAudios()}>
                                {fav ? (
                                    <Icon name="heart" size={22} color="red" />
                                ) : (
                                    <FavouriteIcon />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            {showModal && (
                <Modal transparent>
                    <AlertScreen
                        descriptionText={selectedItem}
                        removeFromPlaylist={removeFromOfflineDownload}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    );
};
export const styles = StyleSheet.create({
    main: {},
    container: { flexDirection: 'row', padding: 10 },
    headingText: {
        fontSize: 12,
        // fontWeight: '500',
        color: '#CECECE',
        fontFamily: 'Mulish-Regular',
    },
    AudioText: {
        fontSize: 12,
        color: '#777777',
        // fontWeight: '600',
        fontFamily: 'AnekTamil-Regular',
    },
});
export default AudioPlayer;
