import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import MusicIcon1 from '../../assets/Images/music 1.svg';
import { RouteTexts } from '../../navigation/RouteText';
import SQLite from 'react-native-sqlite-storage';
import { getSqlData } from '../Database';
import { ThemeContext } from '../../Context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';

const RenderAudios = ({ akarthi, navigation, songs, data, thalam }) => {
    const isFocused = useIsFocused();
    const { theme } = useContext(ThemeContext);
    const [dataLength, setDataLength] = useState(20);
    const [audioData, setAudioData] = useState([]);
    useEffect(() => {
        if (akarthi) {
            getSongsData();
        } else {
            getDtataFromSql();
        }
    }, [isFocused]);
    const getDtataFromSql = async () => {
        const query = `SELECT * FROM thirumurais WHERE  fkTrimuria='${songs?.fkTrimuria}' AND pann='${songs?.pann}' ORDER BY  titleNo ASC  LIMIT 10 OFFSET 1`;
        const query2 = `SELECT * from thirumurai_songs WHERE prevId = ${songs.prevId} and country= '${songs?.country}'ORDER BY song_no ASC LIMIT 10 OFFSET 1`;
        getSqlData(thalam ? query2 : query, (callbacks) => {
            setAudioData(callbacks);
        });
    };
    const getSongsData = async () => {
        const query = `SELECT * FROM thirumurais ASC where title OR titleS NOT NULL LIMIT ${dataLength} OFFSET 0`;
        getSqlData(query, (callbacks) => {
            // if (callbacks?.Length > 0) {
            //     set
            // }
            setAudioData(callbacks);
            setDataLength(dataLength + 10);
        });
    };
    const navigationHandler = (item) => {
        navigation.navigate(RouteTexts.THRIMURAI_SONG, {
            data: item,
        });
    };
    const renderAudios = (item, index) => (
        <Pressable
            style={{
                alignItems: 'center',
                marginVertical: 5,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
            }}
            onPress={() => navigationHandler(item)}
        >
            <View
                style={{
                    backgroundColor: '#F2F0F8',
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                }}
            >
                <MusicIcon1 />
            </View>
            <Text
                style={{
                    marginHorizontal: 10,
                    fontSize: 12,
                    fontFamily: 'AnekTamil-Regular',
                    fontWeight: '500',
                    color: theme.textColor,
                }}
            >
                {thalam ? item?.title : item?.titleS}
            </Text>
        </Pressable>
    );
    return (
        <View>
            <FlatList
                renderItem={({ item, index }) => renderAudios(item, index)}
                data={audioData}
                onEndReached={akarthi ? () => getSongsData() : null}
            />
        </View>
    );
};

export default RenderAudios;
