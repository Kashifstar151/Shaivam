import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import HeartSVG from '../../../components/SVGs/HeartSVG';
import { RouteTexts } from '../../../navigation/RouteText';
import MusicContainer from '../../../../assets/Images/Frame 83.svg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { AddSongToDatabase, listfavAudios } from '../../../Databases/AudioPlayerDatabase';
import { shareSong } from '../../../Helpers/SongShare';
import { useIsFocused } from '@react-navigation/native';
const ListAudios = ({ item, navigation, listFav, colorSet, isFav }) => {
    const [favrted, setFavrted] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        // if (listFav) {
        setFavrted(isFav);
        // }
    }, [isFav, isFocused]);

    const FavouriteAudios = (res) => {
        // TrackPlayer.getActiveTrack()
        //     .then((res) => {
        AddSongToDatabase(
            'sf',
            [
                res?.id,
                res?.url,
                res?.title,
                res?.artist,
                res?.thalamOdhuvarTamilname,
                res?.categoryName,
                res?.thirumariasiriyar,
                res?.serialNo,
                res.prevId,
            ],
            (callbacks) => {
                if (callbacks?.message == 'Success' && callbacks.operationType === 'CREATION') {
                    setFavrted(true);
                } else if (
                    callbacks?.message == 'Success' &&
                    callbacks.operationType === 'DELETION'
                ) {
                    setFavrted(false);
                }
            }
        );
        // })
        // .catch((err) => {
        // });
    };

    return (
        <Pressable
            onPress={() =>
                navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                    data: item,
                })
            }
            style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    paddingHorizontal: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <MusicContainer />
                <View style={{ paddingHorizontal: 10, width: '70%' }}>
                    <Text
                        style={{
                            fontSize: 15,
                            // fontWeight: '600',
                            fontFamily: 'Mulish-Regular',
                            color: colorSet.textColor,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item?.thalamOdhuvarTamilname}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            // fontWeight: '400',
                            fontFamily: 'Mulish-Regular',
                            color: colorSet.textColor,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.title}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 15, paddingRight: 10 }}>
                <TouchableOpacity onPress={() => shareSong(item)}>
                    <Icon name="share" size={22} color={colorSet.textColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => FavouriteAudios(item)}>
                    {/* 
                                                yet isFav doesn't exist but this should be added which can show the fav and add to fav on click if its not already in fav list 
                                         */}
                    {favrted ? (
                        <AntDesign name="heart" size={20} color={'#C1554E'} />
                    ) : (
                        <HeartSVG
                            fill={colorSet.textColor}
                            viewBox="2 2 20 20 "
                            width={20}
                            height={20}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};
export default ListAudios;
