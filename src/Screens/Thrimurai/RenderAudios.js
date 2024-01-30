import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MusicIcon1 from '../../assets/Images/music 1.svg';
import { RouteTexts } from '../../navigation/RouteText';
import SQLite from 'react-native-sqlite-storage';
import { getSqlData } from '../Database';
import { ThemeContext } from '../../Context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const RenderAudios = ({  akarthi, navigation, songs, data, thalam, ThalamHeaders, varakatimurai }) => {
    const isFocused = useIsFocused();
    const { theme } = useContext(ThemeContext);
    const [dataLength, setDataLength] = useState(0);
    const [audioData, setAudioData] = useState([]);
    const [pageSize, setPageSize] = useState(0)
    useEffect(() => {
        if (akarthi) {
            getSongsData();
        } else {
            getDtataFromSql();
        }
    }, [isFocused]);
    const getDtataFromSql = async () => {
        const query = `SELECT * FROM thirumurais WHERE  fkTrimuria='${songs?.fkTrimuria}' AND pann='${songs?.pann}' ORDER BY  titleNo `;
        // const query2 = `SELECT * from thirumurai_songs WHERE prevId = ${songs.prevId} and country= '${songs}'ORDER BY song_no ASC LIMIT 10 OFFSET 1`;
        const templleQuery = `Select * from thirumurais WHERE ${ThalamHeaders == 0 ? 'country' : 'thalam'}='${songs}' ORDER BY  title ASC LIMIT 10 OFFSET ${pageSize}`
        const query3 = `SELECT * FROM thirumurais WHERE  authorNo='${songs?.authorNo}' ORDER BY authorNo ASC  LIMIT 10 OFFSET 1`;
        getSqlData(thalam ? templleQuery : varakatimurai ? query3 : query, (callbacks) => {
            setAudioData(callbacks);
        });
    };
    const getSongsData = async () => {
        const query = `SELECT * FROM thirumurais ASC where title OR titleS NOT NULL ORDER BY fkTrimuria,titleNo LIMIT 20 OFFSET ${dataLength} `;
        getSqlData(query, (callbacks) => {
            console.log("🚀 ~ getSqlData ~ callbacks:", callbacks)
            // if (callbacks?.Length > 0) {
            //     set
            // }
            // let arr = audioData
            if (audioData?.length > 0) {
                // arr.concat(callbacks)
                setAudioData(audioData.concat(callbacks))
            } else {
                setAudioData(callbacks)
            }
            setDataLength(dataLength + 20);
        });
    };
    // const loadMoreData = () => {
    //     console.log('pageSize', pageSize + 10)
    //     const query = `SELECT * FROM thirumurais WHERE  fkTrimuria='${songs?.fkTrimuria}' AND pann='${songs?.pann}' ORDER BY  titleNo ASC  LIMIT 10 OFFSET ${pageSize + 10}`;
    //     // const query2 = `SELECT * from thirumurai_songs WHERE prevId = ${songs.prevId} and country= '${songs}'ORDER BY song_no ASC LIMIT 10 OFFSET 1`;
    //     const templleQuery = `Select * from thirumurais WHERE ${ThalamHeaders == 0 ? 'country' : 'thalam'}='${songs}' ORDER BY  title ASC LIMIT 10 OFFSET ${pageSize + 10}`
    //     getSqlData(thalam ? templleQuery : query, (callbacks) => {
    //         let arr = audioData
    //         if (callbacks?.length > 0) {
    //             arr.concat(callbacks)
    //         }
    //         // setAudioData(callbacks);
    //         setAudioData(arr)
    //     });
    // }
    const navigationHandler = (item) => {
        // console.log("🚀 ~ navigationHandler ~ item:", item)
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

                nestedScrollEnabled
                renderItem={({ item, index }) => renderAudios(item, index)}
                data={audioData}
                onEndReached={akarthi ? () => getSongsData() : null}
            />
        </View>
    );
};

export default RenderAudios;
