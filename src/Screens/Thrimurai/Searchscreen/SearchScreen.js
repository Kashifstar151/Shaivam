import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Background from '../../../components/Background';
import HeaderWithTextInput from '../../../components/HeaderWithTextInput';
import CenterIcon from '../../../assets/Images/Vector (3).svg';
import { getSqlData } from '../../Database';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import getDimension from '../../../Helpers/getDimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDebouncer } from '../../../Helpers/useDebouncer';
import RenderTitleRelatedSearch from './RenderTitleRelatedSearch';
import RenderLyricsRelatedSearch from './RenderLyricsRelatedSearch';

const SearchScreen = ({ navigation, route }) => {
    const { i18n } = useTranslation();
    const { thrimurais } = route?.params;
    const [updatedThrimurai, setUpdatedThrimurai] = useState([
        { id: 0, name: 'All' },
        ...thrimurais,
    ]);
    const [searchText, setSearchText] = useState('');
    const debounceVal = useDebouncer(searchText, 1000);
    const [searchResult, setSearchedResult] = useState([]);
    const [rawSongs, setRawSongs] = useState(null);
    const { theme } = useContext(ThemeContext);
    const [recentKeyword, setRecentKeywords] = useState([]);
    const [fktrimuria, setFkTrimuria] = useState(new Set([0]));
    const [isSearched, setIsSearched] = useState(false); // state --> loading, search
    const { screenHeight, screenWidth } = getDimension();
    const tab = [
        {
            name: 'title',
            showVal: 'Title Based',
        },
        {
            name: 'rawSongs',
            showVal: 'Lyrics Based',
        },
    ];

    const [selectedTab, setSelectedTab] = useState(tab[0]?.name);

    const [offset, setoffSet] = useState({
        title: {
            page: 0,
            isfetching: false,
        },
        rawSongs: {
            page: 0,
            isfetching: false,
        },
    });

    useEffect(() => {
        getDataFromSql(debounceVal, selectedTab);
        console.log('🚀 ~ SearchScreen ~ fktrimuria:', fktrimuria);

        return () => {
            setIsSearched(false);
        };
    }, [fktrimuria]);

    useEffect(() => {
        setUpdatedThrimurai(() =>
            thrimurais?.length ? [{ id: 0, name: 'All' }, ...thrimurais] : null
        );
    }, [thrimurais]);

    useEffect(() => {
        getSearchedTexxs();
    }, []);

    const getSearchedTexxs = async () => {
        const data = await AsyncStorage.getItem('recentKeyword');
        setRecentKeywords(JSON.parse(data));
    };

    const normalizeString = (str) => {
        setSearchText(
            () => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            // .replace(/\s/g, '')
        );
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '');
    };

    useEffect(() => {
        console.log(
            'the  offset?.title?.page, offset?.rawSongs?.page==========================------------------------------------------------------------------------------------------------------------------------------------------------------==================================================================================>',
            offset?.title?.page,
            offset?.rawSongs?.page
        );
    }, [offset?.title?.page, offset?.rawSongs?.page]);

    const getDataFromSql = useCallback(
        (searchText, tab) => {
            console.log('🚀 ~ SearchScreen ~ tab:', tab);
            setIsSearched(() => false);
            if (searchText && searchText.length >= 3) {
                if (tab === 'title') {
                    getSqlData(
                        `SELECT * FROM thirumurais WHERE searchTitle LIKE '%${normalizeString(
                            searchText.trim()
                            // setSearchText
                        )}%' and locale='${i18n.language === 'en-IN' ? 'RoI' : i18n.language}' ${
                            !fktrimuria.has(0)
                                ? `and fkTrimuria IN (${[...fktrimuria].join(',')})`
                                : `and fkTrimuria IN (${[...thrimurais.map((item) => item.id)].join(
                                      ','
                                  )})`
                        } GROUP BY titleS limit 40 offset ${offset?.title?.page}  `,
                        (callbacks) => {
                            setSearchedResult((prev) => {
                                if (prev?.length) {
                                    console.log('🚀 ~ setSearchedResult ~ prev:', prev);
                                    // const newArray = [...prev];
                                    // newArray.push(...callbacks);
                                    return callbacks;
                                }
                                return callbacks;
                            });

                            setoffSet((prev) => {
                                console.log('🚀 ~ setoffSet ~ prev:', prev, prev?.title);
                                return {
                                    ...prev,
                                    title: {
                                        ...prev.title,
                                        isfetching: false,
                                    },
                                };
                            });

                            const keys = recentKeyword ? recentKeyword : [];
                            const s = keys?.filter((keys) => keys !== searchText);
                            const updated = [...s, searchText].slice(0, 6);
                            AsyncStorage.setItem('recentKeyword', JSON.stringify(updated));
                        }
                    );
                }

                if (tab === 'rawSongs') {
                    console.log(
                        "🚀 ~ SearchScreen ~ selectedTab === 'rawSong':",
                        selectedTab === 'rawSong'
                    );

                    getSqlData(
                        `SELECT t.prevId, t.titleNo ,ts.thirumuraiId, ts.songNo ,ts.rawSong FROM thirumurais t  JOIN thirumurai_songs ts ON t.prevId = ts.prevId WHERE ts.searchTitle LIKE '%${normalizeString(
                            searchText.trim()
                            // setSearchText
                        )}%'  ${
                            !fktrimuria.has(0)
                                ? `and ts.thirumuraiId IN (${[...fktrimuria].join(',')})`
                                : `and ts.thirumuraiId IN (${[
                                      ...thrimurais.map((item) => item.id),
                                  ].join(',')})`
                        }  AND ts.locale='${
                            i18n.language === 'en-IN' ? 'RoI' : i18n.language
                        }' GROUP BY   ts.thirumuraiId, ts.prevId, ts.songNo ORDER BY ts.thirumuraiId, ts.prevId, ts.songNo ASC  limit 40 offset ${
                            offset?.rawSongs?.page
                        } `,
                        (callbacks) => {
                            setRawSongs((prev) => {
                                if (prev?.length) {
                                    const newArray = [...prev];
                                    newArray.push(...callbacks);
                                    return newArray;
                                }
                                return callbacks;
                            });
                            // setRawSongs([...rawSongs, ...callbacks]);
                            setoffSet((prev) => {
                                console.log('🚀 ~ setoffSet ~ prev 185:', prev);
                                return {
                                    ...prev,
                                    rawSongs: {
                                        ...prev.rawSongs,
                                        isfetching: false,
                                    },
                                };
                            });
                        }
                    );
                }
                setIsSearched(() => true);
            }
        },
        [debounceVal, selectedTab, fktrimuria, offset?.title?.page, offset?.rawSongs?.page]
    );

    const renderRecentSearch = (item) => {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: '#777777',
                    width: 'auto',
                    height: 35,
                    borderRadius: 16,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                }}
                onPress={() => {
                    setSearchText(item);
                    // console.log('🚀 ~ renderRecentSearch ~ onPress:', onPress);
                    setTimeout(() => {
                        getDataFromSql(item, selectedTab);
                    }, 1000);
                }}
            >
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular' }}>{item}</Text>
            </TouchableOpacity>
        );
    };

    const { t } = useTranslation();

    const setFkTrimuriaFunc = (item) => {
        setFkTrimuria((prev) => {
            let updateData = new Set(prev);

            if (item !== 0) {
                if (updateData.has(0)) {
                    updateData.delete(0);
                }
                if (updateData.has(item)) {
                    updateData.delete(item);
                    if (updateData.size === 0) {
                        updateData.add(0);
                    }
                } else {
                    updateData.add(item);
                }
            } else {
                updateData.clear();
                updateData.add(0);
            }
            return updateData;
        });
    };

    const nameMap = {
        'Thrimurai 8': '(2nd bar pink)',
        'Thrimurai 9': '(3rd bar Green)',
        'Thrimurai 10': '(4th bar yellow)',
        'Thrimurai 11': '(4th bar yellow)',
        'Thrimurai 12': '(5th bar pink)',
        'Thrimurai 13': '(6th bar Green)',
        'Thrimurai 14': '(7th bar yellow)',
    };

    const focusRef = useRef();

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, [focusRef.current]);

    return (
        <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
            <Background>
                <View
                    style={{
                        paddingTop: screenHeight * 0.03,
                    }}
                >
                    <HeaderWithTextInput
                        onSubmitEditing={() => getDataFromSql(searchText, selectedTab)}
                        placeholder={`${t('Search for any')} ( முதல்-திருமுறை )`}
                        navigation={navigation}
                        setState={(e) => setSearchText(e)}
                        state={searchText}
                        ref={focusRef}
                    />
                </View>
                <View
                    style={{
                        paddingLeft: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ color: 'white' }}>Search In - </Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={updatedThrimurai}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{
                                    marginLeft: 5,
                                    backgroundColor: !fktrimuria.has(item?.id)
                                        ? theme.searchContext.unSelected.bgColor
                                        : theme.searchContext.selected.bgColor,

                                    height: 30,
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                }}
                                onPress={() => {
                                    setFkTrimuriaFunc(item?.id);
                                }}
                            >
                                <Text
                                    style={{
                                        color: !fktrimuria.has(item?.id)
                                            ? theme.searchContext.unSelected.textColor
                                            : theme.searchContext.selected.textColor,
                                        fontFamily: 'Mulish-Regular',
                                    }}
                                >
                                    {`${item?.id === 0 ? 'All' : ''} `}
                                    {`${
                                        item?.id > 0 && item?.id < 8
                                            ? `${t(`Thrimurai ${item?.id}`)}`
                                            : ''
                                    }`}
                                    {`${
                                        item?.id >= 8 && item?.id !== 10 && item?.id !== 11
                                            ? `${t(nameMap[`Thrimurai ${item?.id}`])}`
                                            : ''
                                    }`}
                                    {`${
                                        item?.id === 10
                                            ? `${t(nameMap[`Thrimurai ${item?.id}`]).split('/')[0]}`
                                            : ''
                                    }`}
                                    {`${
                                        item?.id === 11
                                            ? `${t(nameMap[`Thrimurai ${item?.id}`]).split('/')[1]}`
                                            : ''
                                    }`}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {/* tabs */}
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 8,
                        width: screenWidth,
                        paddingHorizontal: '20',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}
                >
                    <Pressable
                        onPress={() => {
                            setSelectedTab(() => tab[0]?.name);
                        }}
                        style={{
                            backgroundColor:
                                selectedTab !== tab[0]?.name
                                    ? theme.searchContext.unSelected.bgColor
                                    : theme.searchContext.selected.bgColor,
                            width: (screenWidth - 28) / 2,
                            paddingVertical: 5,
                            borderRadius: 20,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            {' '}
                            {tab[0]?.showVal}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setSelectedTab(() => tab[1]?.name);
                        }}
                        style={{
                            backgroundColor:
                                selectedTab !== tab[1]?.name
                                    ? theme.searchContext.unSelected.bgColor
                                    : theme.searchContext.selected.bgColor,

                            width: (screenWidth - 28) / 2,
                            paddingVertical: 5,
                            borderRadius: 20,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            {tab[1]?.showVal}
                        </Text>
                    </Pressable>
                </View>
            </Background>
            {isSearched || searchResult.length || rawSongs?.length ? (
                <ScrollView style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator>
                    {selectedTab === tab[0].name && (
                        <RenderTitleRelatedSearch
                            searchTextVal={debounceVal}
                            getDataFromSql={getDataFromSql}
                            tab={tab}
                            searchResult={searchResult}
                            selectedTab={selectedTab}
                            setoffSet={setoffSet}
                            offset={offset}
                        />
                    )}

                    {selectedTab === tab[1].name && (
                        <RenderLyricsRelatedSearch
                            searchTextVal={debounceVal}
                            getDataFromSql={getDataFromSql}
                            tab={tab}
                            searchResult={rawSongs}
                            selectedTab={selectedTab}
                            setoffSet={setoffSet}
                            offset={offset}
                        />
                    )}
                </ScrollView>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Lora-SemiBold', margin: 5 }}>
                        Recent Searches
                    </Text>
                    <FlatList
                        data={recentKeyword}
                        contentContainerStyle={{ marginTop: 5 }}
                        renderItem={({ item, index }) => renderRecentSearch(item)}
                        horizontal
                    />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <CenterIcon />
                        <Text style={{ color: '#777777', fontFamily: 'Mulish-Regular' }}>
                            Search for any Thirumurai here
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};
export const styles = StyleSheet.create({
    main: { flex: 1 },
    titleText: {
        fontFamily: 'AnekTamil-Bold',
        fontSize: 14,

        // fontWeight: '700',
    },
    searchresult: { fontSize: 18, color: '#222222', fontFamily: 'Lora-Bold' },
});

export default SearchScreen;
