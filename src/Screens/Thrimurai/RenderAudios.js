import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MusicIcon1 from '../../assets/Images/music 1.svg';
import { RouteTexts } from '../../navigation/RouteText';
import SQLite from 'react-native-sqlite-storage';
import { getSqlData } from '../Database';
import { ThemeContext } from '../../Context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';
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
                fontSize: RFValue(11),
                fontFamily: 'AnekTamil-Regular',
                // fontWeight: '500',
                color: theme.textColor,
                flex: 1,
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

        /*
         * general query when not temple or varalatimurai
         !need prevId
         */

        const query = `SELECT * FROM thirumurais WHERE  fkTrimuria='${id}' ${id <= 7 || id === 10 || id === 11 ? `AND pann='${songs?.pann}'` : `AND pann =''`
            } and  locale='${i18n.language === 'en-IN' ? 'ro' : i18n.language
            }'  and titleS IS NOT NULL  GROUP BY titleS   ORDER BY  titleS ASC`;

        /*
         ? query when for temple 
         */
        const templleQuery = `Select * from thirumurais WHERE ${ThalamHeaders == 0 ? 'country' : 'thalam'
            }='${songs?.thalam}'  and  locale='${i18n.language === 'en-IN' ? 'ro' : i18n.language
            }' ORDER BY  fkTrimuria,titleNo  ASC LIMIT 10 OFFSET ${pageSize}`;

        /*
         todos: have to optimize the queries  
         */
        const query3 = `SELECT * FROM thirumurais WHERE  author='${songs?.author}'  and locale='${i18n.language === 'en-IN' ? 'ro' : i18n.language
            }' GROUP BY titleS ORDER by orderAuthor`;

        const makeQuery = thalam ? templleQuery : varakatimurai ? query3 : query;
        getSqlData(makeQuery, (callbacks) => {
            setAudioData(callbacks);
        });
    };

    const [isFetchingNextPage, setIsFetchingNextPage] = useState({ state: false, haveMore: true });
    const getSongsData = async () => {
        const query = `SELECT * FROM thirumurais  where  locale='${i18n.language === 'en-IN' ? 'ro' : i18n.language
            }' and fkTrimuria ${prevId} and titleS != "" ORDER BY fkTrimuria,titleNo LIMIT 20 OFFSET ${dataLength} `;
        if (audioData?.length > 0) {
            setIsFetchingNextPage((prev) => ({ ...prev, state: true }));
        }
        getSqlData(query, (callbacks) => {
            if (callbacks.length > 0) {
                if (audioData?.length > 0) {
                    setAudioData(audioData.concat(callbacks));
                } else {
                    setAudioData(callbacks);
                }
                setDataLength(dataLength + 20);
                setIsFetchingNextPage((prev) => ({ ...prev, state: false }));
            } else if (callbacks.error) {
                setIsFetchingNextPage((prev) => ({ ...prev, haveMore: false, state: false }));
            }
        });
    };

    const navigationHandler = (item) => {
        let type = akarthi
            ? 'akarthi'
            : varakatimurai
                ? 'varakatimurai'
                : thalam
                    ? 'thalam'
                    : 'raga';
        navigation.navigate(RouteTexts.THRIMURAI_SONG, {
            data: item,
            type,
            play: true
            // nextIndxId,
        });
    };

    // const [nextIndxId, setNextIndxId] = useState(null);

    return (
        <View>
            {audioData.length > 0 ? (
                <FlatList
                    contentContainerStyle={{
                        paddingBottom: 30,
                    }}
                    disableVirtualization
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
                    onEndReachedThreshold={0.6}
                    onEndReached={() => {
                        if (akarthi && isFetchingNextPage?.haveMore) {
                            getSongsData();
                        }
                    }}
                    ListFooterComponent={
                        isFetchingNextPage.state ? <ActivityIndicator size={'small'} /> : null
                    }
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
