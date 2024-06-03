import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
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
import HighlightedText from './HighlightedText';
import { RouteTexts } from '../../../navigation/RouteText';
import { useTranslation } from 'react-i18next';
import HighlightText from '@sanar/react-native-highlight-text';
import getDimension from '../../../Helpers/getDimension';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation, route }) => {
    const { i18n } = useTranslation();
    const { thrimurais } = route?.params;
    const updatedThrimurai = thrimurais.length ? [{ id: 0, name: 'All' }, ...thrimurais] : null;
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchedResult] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const [rawSongs, setRawSongs] = useState(null);
    const { theme } = useContext(ThemeContext);
    const [recentKeyword, setRecentKeywords] = useState([]);
    const [fktrimuria, setFkTrimuria] = useState(new Set([0]));
    const [isSearched, setIsSearched] = useState(false);
    const { screenHeight } = getDimension();

    useEffect(() => {
        getDataFromSql(searchText);

        return () => {
            setIsSearched(false);
        };
    }, [fktrimuria]);
    useEffect(() => {
        getSearchedTexxs();
    }, []);
    const getSearchedTexxs = async () => {
        const data = await AsyncStorage.getItem('recentKeyword');
        // console.log("🚀 ~ getSearchedTexxs ~ data:", data)
        setRecentKeywords(JSON.parse(data));
    };
    const normalizeString = (str) => {
        setSearchText(str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    const getDataFromSql = (searchText) => {
        setIsSearched(false);
        if (searchText && searchText.length >= 3) {
            getSqlData(
                `SELECT * FROM thirumurais WHERE searchTitle LIKE '%${normalizeString(
                    searchText.trim()
                )}%' and locale='${i18n.language === 'en-IN' ? 'RoI' : i18n.language}' ${
                    !fktrimuria.has(0)
                        ? `and fkTrimuria IN (${[...fktrimuria].join(',')})`
                        : `and fkTrimuria IN (${[...thrimurais.map((item) => item.id)].join(',')})`
                } GROUP BY titleS;`,
                (callbacks) => {
                    setSearchedResult(callbacks);
                    const keys = recentKeyword ? recentKeyword : [];
                    const s = keys?.filter((keys) => keys !== searchText);
                    const updated = [...s, searchText].slice(0, 6);
                    AsyncStorage.setItem('recentKeyword', JSON.stringify(updated));
                }
            );
            getSqlData(
                `SELECT t.prevId, t.titleNo ,ts.thirumuraiId, ts.songNo ,ts.rawSong FROM thirumurais t  JOIN thirumurai_songs ts ON t.prevId = ts.prevId WHERE ts.searchTitle LIKE '%${normalizeString(
                    searchText.trim()
                )}%'  ${
                    !fktrimuria.has(0)
                        ? `and ts.thirumuraiId IN (${[...fktrimuria].join(',')})`
                        : `and ts.thirumuraiId IN (${[...thrimurais.map((item) => item.id)].join(
                              ','
                          )})`
                }  AND ts.locale='${
                    i18n.language === 'en-IN' ? 'RoI' : i18n.language
                }' GROUP BY   ts.thirumuraiId, ts.prevId, ts.songNo ORDER BY ts.thirumuraiId, ts.prevId, ts.songNo ASC`,
                (callbacks) => {
                    setRawSongs(callbacks);
                }
            );

            setIsSearched(true);
        }
    };
    // const highlight = (item, index, key) => {
    //     // console.log("🚀 ~ highlight ~ item:", JSON.stringify(item))
    //     const textContent = key === 'title' ? item?.title : item?.rawSong;
    //     const cleanedText = textContent.replace(/\s+/g, ' ').trim();
    //     const parts = cleanedText.split(' ');
    //     return (
    //         <View
    //             style={{
    //                 flexDirection: 'row',
    //                 maxWidth: Dimensions.get('window').width - 30,
    //                 flexWrap: 'wrap',
    //             }}
    //         >
    //             {key == 'title'
    //                 ? parts?.map((res, i) => <HighlightedText text={res} highlight={searchText} />)
    //                 : parts?.map((res, i) => (
    //                       <HighlightedText text={res} highlight={searchText} lyrics={true} />
    //                   ))}
    //         </View>
    //     );
    // };

    const highlight = (item, index, key) => {
        const textContent = key === 'title' ? item?.title : item?.rawSong;
        const generateSubstrings = (str) => {
            const substrings = new Set();
            const length = str.length;

            for (let i = 0; i < length; i++) {
                for (let j = i + 3; j <= length; j++) {
                    substrings.add(str.slice(i, j));
                    console.log('the string added ==>', str.slice(i, j));
                }
            }

            //   console.log("from the funtion ==>", substrings)

            return Array.from(substrings).filter((sub) => sub.length > 2);
        };
        // const parts = textContent.split('\r\n');
        return (
            <View
                style={{
                    flexDirection: 'row',
                    maxWidth: Dimensions.get('window').width - 30,
                    flexWrap: 'wrap',
                }}
            >
                <HighlightText
                    style={{
                        fontFamily: 'AnekTamil-Bold',
                        fontSize: 14,
                        color: theme.textColor,
                        // fontWeight: key === 'title' ? '700' : '400',
                    }}
                    highlightStyle={{
                        fontFamily: 'AnekTamil-Bold',
                        fontSize: 14,
                        color: theme.textColor,
                        backgroundColor: theme.colorscheme === 'dark' ? '#A47300' : '#F8E3B2',
                    }}
                    // searchWords={[`${searchText}`]}
                    searchWords={generateSubstrings(searchText)}
                    textToHighlight={textContent}
                    autoEscape={true}
                />
                {/* {key == 'title'
                    ? parts?.map((statement, i) => {
                        return (
                            <Text>
                                {statement.split(' ').map((words, idx) => (
                                    <HighlightedText text={words} highlight={searchText} />
                                ))}
                            </Text>
                        );
                    }) :
                    : parts?.map((statement, i) => {
                        return (
                            <Text>
                                {statement.split(' ').map((words, idx) => (
                                    <HighlightedText
                                        text={words}
                                        highlight={searchText}
                                        lyrics={true}
                                    />
                                ))}
                            </Text>
                    );
                    })}
                } */}
            </View>
        );
    };
    const renderRecentSearch = (item) => {
        console.log('🚀 ~ renderRecentSearch ~ item:', item);
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
                    setTimeout(() => {
                        getDataFromSql(item);
                    }, 1000);
                    // getDataFromSql()
                }}
            >
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular' }}>{item}</Text>
            </TouchableOpacity>
        );
    };
    function minTwoDigits(n) {
        return (n < 10 ? '0' : '') + n;
    }

    const renderThirumuraiId = (id) => {
        if (id < 9) {
            return id;
        } else if (id == 9) {
            return '8K';
        } else if (id == 10 || id == 11) {
            return 9;
        } else if (id == 12) {
            return 10;
        } else if (id == 13) {
            return 11;
        } else {
            return 12;
        }
    };
    const renderResult = (item, index, key) => {
        if (key === 'title') {
            console.log('🚀 ~ renderResult ~ item:', JSON.stringify(item, 0, 2));
        }
        return (
            <Pressable
                style={{ marginVertical: 10 }}
                onPress={() =>
                    navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                        data: item,
                        searchedword: searchText,
                        searchScreen: true,
                        songNo: item?.songNo,
                    })
                }
            >
                {key == 'title' ? null : (
                    <Text>
                        {`${renderThirumuraiId(item?.thirumuraiId)}.${minTwoDigits(
                            item?.titleNo
                        )}.${minTwoDigits(item?.songNo)}`}
                    </Text>
                )}
                {highlight(item, index, key)}
            </Pressable>
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
                        onSubmitEditing={() => getDataFromSql(searchText)}
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
            </Background>
            {isSearched ? (
                // searchResult?.length > 0 || rawSongs?.length > 0 ?
                isSearched && !(searchResult?.error && rawSongs?.error) ? (
                    <ScrollView style={{ paddingHorizontal: 10 }}>
                        <FlatList
                            key={(item) => item?.id}
                            contentContainerStyle={{ marginTop: 10 }}
                            data={searchResult}
                            renderItem={({ item, index }) => renderResult(item, index, 'title')}
                        />
                        <FlatList
                            contentContainerStyle={{ marginTop: 10 }}
                            data={rawSongs}
                            renderItem={({ item, index }) => renderResult(item, index, 'rawSong')}
                        />
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CenterIcon />
                        <Text style={{ color: '#777777', fontFamily: 'Mulish-Regular' }}>
                            No Result found
                        </Text>
                    </View>
                )
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
