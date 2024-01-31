import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import SQLite from 'react-native-sqlite-storage';
import { colors } from '../../../Helpers';
import RenderAudios from '../RenderAudios';
import { getSqlData } from '../../Database';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { RouteTexts } from '../../../navigation/RouteText';

const RenderEachTitle = ({
    item,
    index,
    navigation,
    selectedChapter,
    setSelectedChapter,
    thalam,
    flagShowAudio,
}) => {
    // console.log('🚀 ~ file: RenderTitle.js:21 ~ flagShowAudio:', flagShowAudio);
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    // console.log('the col===>', JSON.stringify(item));
    return (
        <>
            {!flagShowAudio ? (
                <>
                    <Pressable
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingHorizontal: 25,
                            alignItems: 'center',
                            paddingBottom: 10,
                            borderBottomColor: colors.grey3,
                            borderBottomWidth: 1,
                        }}
                        onPress={() => {
                            if (thalam) {
                                navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                                    data: item,
                                });
                            }
                        }}
                    >
                        <View style={{ width: '95%' }}>
                            <Text
                                style={
                                    selectedChapter == index
                                        ? [styles.titleText, { color: theme.textColor }]
                                        : [styles.titleText, { color: theme.textColor }]
                                }
                            >
                                {t(item?.pann)}
                            </Text>
                        </View>
                        {/* {!thalam ? ( */}
                        {selectedChapter !== null && selectedChapter == index ? (
                            <TouchableOpacity onPress={() => setSelectedChapter(null)}>
                                {
                                    <Icon
                                        name="keyboard-arrow-down"
                                        size={24}
                                        color={
                                            theme.colorscheme === 'light'
                                                ? '#000'
                                                : colors.grey1
                                        }
                                    />
                                }
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setSelectedChapter(index)}>
                                {
                                    <Icon
                                        name="keyboard-arrow-right"
                                        size={24}
                                        color={
                                            theme.colorscheme === 'light'
                                                ? '#000'
                                                : colors.grey1
                                        }
                                    />
                                }
                            </TouchableOpacity>
                        )
                        }
                        {/* ) : null} */}
                    </Pressable>
                    {selectedChapter == index && (
                        <View style={{ marginBottom: 10 }}>
                            {/* <FlatList renderItem={({ item, index }) => renderAudios(item, index)} data={item.songLyrics} /> */}
                            <RenderAudios thalam={thalam} songs={item} navigation={navigation} />
                        </View>
                    )}
                </>
            ) : (
                <RenderAudios songs={item} navigation={navigation} />
                // <Text>The 8 the col </Text>
            )}
        </>
    );
};

const RenderTitle = ({ data, navigation, thalam, ThalamHeaders, flagShowAudio }) => {
    console.log('🚀 ~ RenderTitle ~ data:', data);
    let key = true;

    const [selectedChapter, setSelectedChapter] = useState(null);
    const [TitleData, setTitleData] = useState([]);
    const [showLoading, setShowLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    useEffect(() => {
        getDtataFromSql();
    }, []);
    const getDtataFromSql = async () => {
        setShowLoading(true);
        let query;
        if (data?.prevId <= 7) {
            query = `SELECT pann, prevId,fkTrimuria FROM thirumurais where fkTrimuria=${data.prevId} and pann NOTNULL GROUP BY pann ORDER BY titleNo ASC LIMIT ${pageSize} OFFSET 0`;
        } else {
            query = `SELECT * FROM thirumurais where fkTrimuria=${data.prevId}  ORDER BY titleNo ASC LIMIT ${pageSize} OFFSET 0`;
        }
        // const query = `SELECT pann, prevId,fkTrimuria FROM thirumurais where fkTrimuria=${data.prevId} and pann NOTNULL GROUP BY pann ORDER BY titleNo ASC`;
        const query2 = `Select * from thirumurais where ${ThalamHeaders == 0 ? 'country' : 'thalam'}= '${data}' ORDER BY  titleNo ASC LIMIT ${pageSize} OFFSET 0`;
        getSqlData(thalam ? query2 : query, (callbacks) => {
            console.log("🚀 ~ getSqlData ~ callbacks:", callbacks)
            setShowLoading(false)
            setTitleData(callbacks);
        });
    };

    return (
        <View style={{ marginTop: 0 }}>
            {showLoading ? (
                <Modal transparent presentationStyle="overFullScreen">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'small'} />
                    </View>
                </Modal>
            ) : (
                <FlatList
                    data={TitleData}
                    renderItem={({ item, index }) => (
                        <RenderEachTitle
                            thalam={thalam}
                            item={item}
                            index={index}
                            navigation={navigation}
                            selectedChapter={selectedChapter}
                            setSelectedChapter={setSelectedChapter}
                            flagShowAudio={flagShowAudio}
                        />
                    )}
                />
            )}
        </View>
    );
};
export const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'AnekTamil-Regular',
        fontSize: 14,
        fontWeight: '500',
    },
});
export default RenderTitle;
