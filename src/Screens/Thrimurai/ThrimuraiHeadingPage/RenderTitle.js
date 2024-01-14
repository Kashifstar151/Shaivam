import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import SQLite from 'react-native-sqlite-storage';
import { colors } from '../../../Helpers';
import RenderAudios from '../RenderAudios';
import { getSqlData } from '../../Database';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';

const RenderEachTitle = ({ item, index, navigation, selectedChapter, setSelectedChapter, thalam }) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    return (
        <>
            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 25,
                    alignItems: 'center',
                    paddingBottom: 10,
                    borderBottomColor: colors.grey3,
                    borderBottomWidth: 1,
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
                        {thalam ? t(item?.titleS) : t(item?.pann)}
                    </Text>
                </View>
                {selectedChapter !== null && selectedChapter == index ? (
                    <TouchableOpacity onPress={() => setSelectedChapter(null)}>
                        {
                            <Icon
                                name="keyboard-arrow-down"
                                size={24}
                                color={theme.colorscheme === 'light' ? '#000' : colors.grey1}
                            />
                        }
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setSelectedChapter(index)}>
                        {
                            <Icon
                                name="keyboard-arrow-right"
                                size={24}
                                color={theme.colorscheme === 'light' ? '#000' : colors.grey1}
                            />
                        }
                    </TouchableOpacity>
                )}
            </View>
            {selectedChapter == index && (
                <View style={{ marginBottom: 10 }}>
                    {/* <FlatList renderItem={({ item, index }) => renderAudios(item, index)} data={item.songLyrics} /> */}
                    <RenderAudios thalam={thalam} songs={item} navigation={navigation} />
                </View>
            )}
        </>
    );
};

const RenderTitle = ({ data, navigation, thalam, ThalamHeaders }) => {
    console.log("🚀 ~ RenderTitle ~ data:", data)
    let key = true;
    const database = SQLite.openDatabase({
        name: key ? 'SongsData.db' : 'main.db',
        createFromLocation: 1,
    });
    // const database = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: 1 });
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [TitleData, setTitleData] = useState([]);

    useEffect(() => {
        getDtataFromSql();
    }, []);
    const getDtataFromSql = async () => {
        const query = `SELECT pann, prevId,fkTrimuria FROM thirumurais where fkTrimuria=${data.prevId} and pann NOTNULL GROUP BY pann ORDER BY titleNo ASC`;
        const query2 = `Select * from thirumurais where ${ThalamHeaders == 0 ? 'country' : 'thalam'}= '${data}' ORDER BY  title 
        ASC LIMIT 10 OFFSET 0`
        getSqlData(thalam ? query2 : query, (callbacks) => {
            console.log("🚀 ~ getSqlData ~ callbacks:", JSON.stringify(callbacks, 0, 2))
            setTitleData(callbacks);
        });
    };
    return (
        <View style={{ marginTop: 0 }}>
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
                    />
                )}
            />
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
