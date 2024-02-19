import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MusicIcon1 from '../../assets/Images/music 1.svg';
import { RouteTexts } from '../../navigation/RouteText';
import SQLite from 'react-native-sqlite-storage';
import { getSqlData } from '../Database';
import { ThemeContext } from '../../Context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
const RenderAudiosItem = ({ navigationHandler, item, theme }) => (
    <Pressable style={styles.audioTitleWrapper} onPress={() => navigationHandler(item)}>
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
            {item?.title}
            {/* {thalam ? item?.title : item?.titleS} */}
        </Text>
    </Pressable>
);

const styles = StyleSheet.create({
    audioTitleWrapper: {
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
});

const RenderAudios = ({
    akarthi,
    navigation,
    songs,
    data,
    thalam,
    ThalamHeaders,
    varakatimurai,
    prevId, //passed from the thrimurai song
}) => {
    // console.log('🚀 ~ RenderAudios ~ songs:', songs);
    const { theme } = useContext(ThemeContext);
    const [dataLength, setDataLength] = useState(0);
    const [audioData, setAudioData] = useState([]);
    const [pageSize, setPageSize] = useState(0);

    const { i18n } = useTranslation();

    useEffect(() => {
        if (akarthi) {
            getSongsData();
        } else {
            getDtataFromSql();
        }
    }, []);

    const getDtataFromSql = async () => {
        let id = songs?.fkTrimuria ? songs?.fkTrimuria : songs?.prevId;

        const query = `SELECT * FROM thirumurais WHERE  fkTrimuria='${id}' ${
            id <= 7 || id === 10 ? `AND pann='${songs?.pann}'` : ''
        } and  locale='${i18n.language === 'en-IN' ? 'RoI' : i18n.language}'   ORDER BY  titleNo `;

        const templleQuery = `Select * from thirumurais WHERE ${
            ThalamHeaders == 0 ? 'country' : 'thalam'
        }='${songs?.thalam}'  and  locale='${
            i18n.language === 'en-IN' ? 'RoI' : i18n.language
        }' ORDER BY  title ASC LIMIT 10 OFFSET ${pageSize}`;

        const query3 = `SELECT * FROM thirumurais WHERE  authorNo='${
            songs?.authorNo
        }'  and locale='${
            i18n.language === 'en-IN' ? 'RoI' : i18n.language
        }' GROUP BY titleS ORDER by orderAuthor  `;

        const makeQuery = thalam ? templleQuery : varakatimurai ? query3 : query;
        getSqlData(makeQuery, (callbacks) => {
            setAudioData(callbacks);
        });
    };
    const getSongsData = async () => {
        const query = `SELECT * FROM thirumurais  where  locale='${
            i18n.language === 'en-IN' ? 'RoI' : i18n.language
        }' and fkTrimuria ${prevId} ORDER BY fkTrimuria,titleNo LIMIT 20 OFFSET ${dataLength} `;

        getSqlData(query, (callbacks) => {
            // if (callbacks?.Length > 0) {
            //     set
            // }
            // let arr = audioData
            if (callbacks.length > 0) {
                if (audioData?.length > 0) {
                    setAudioData(audioData.concat(callbacks));
                } else {
                    setAudioData(callbacks);
                }
                setDataLength(dataLength + 20);
            }
        });
    };

    const navigationHandler = (item) => {
        navigation.navigate(RouteTexts.THRIMURAI_SONG, {
            data: item,
            // nextIndxId,
        });
    };

    // const [nextIndxId, setNextIndxId] = useState(null);

    return (
        <View>
            {audioData.length > 0 ? (
                <FlatList
                    nestedScrollEnabled
                    keyExtractor={(item, index) => {
                        // setNextIndxId((prev) => {
                        //     if (audioData[index + 1]) {
                        //         console.log(
                        //             'the next id of the song ==>',
                        //             audioData[index + 1].prevId
                        //         );
                        //         return audioData[index + 1].prevId;
                        //     } else {
                        //         return prev;
                        //     }
                        // });
                        return item?.prevId;
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <RenderAudiosItem
                                navigationHandler={navigationHandler}
                                item={item}
                                theme={theme}
                            />
                        );
                    }}
                    data={audioData}
                    onEndReached={() => {
                        if (akarthi) {
                            getSongsData();
                        }
                    }}
                />
            ) : (
                <View
                    style={[
                        styles.audioTitleWrapper,
                        { backgroundColor: theme.backgroundColor, paddingVertical: 10 },
                    ]}
                >
                    <Text style={{ width: '100%', textAlign: 'center', color: theme.textColor }}>
                        Text currently not available
                    </Text>
                </View>
            )}
        </View>
    );
};

export default RenderAudios;
