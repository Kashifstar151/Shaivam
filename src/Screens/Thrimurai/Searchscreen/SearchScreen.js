import React, { useContext, useEffect, useState } from 'react';
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

const SearchScreen = ({ navigation, route }) => {
    const { i18n } = useTranslation();
    const { thrimurais } = route?.params;
    const updatedThrimurai = thrimurais ? [{ id: 0, name: 'All' }, ...thrimurais] : null;
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchedResult] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const [rawSongs, setRawSongs] = useState(null);
    const { theme } = useContext(ThemeContext);

    const [fktrimuria, setFkTrimuria] = useState(new Set([0]));
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        getDataFromSql();

        return () => {
            setIsSearched(false);
        };
    }, [fktrimuria]);

    const getDataFromSql = (e) => {
        setIsSearched(false);

        if (searchText && searchText.length >= 2) {
            getSqlData(
                `SELECT * FROM thirumurais WHERE searchTitle LIKE '%${searchText}%' and locale='${
                    i18n.language === 'en-IN' ? 'RoI' : i18n.language
                }' ${
                    !fktrimuria.has(0) ? `and fkTrimuria IN (${[...fktrimuria].join(',')})` : ''
                } GROUP BY titleS  ;`,
                // `SELECT * FROM thirumurais WHERE search_title='%திருஞானசம்பந்தர்தேவாரம்-1.031-திருக்குரங்கணின்முட்டம்-விழுநீர்மழுவாள்படை%' LIMIT 10 OFFSET 0;`,
                (callbacks) => {
                    setSearchedResult(callbacks);
                }
            );
            getSqlData(
                `SELECT * FROM thirumurai_songs WHERE searchTitle LIKE '%${searchText}%' ${
                    !fktrimuria.has(0) ? `and thirumuraiId IN (${[...fktrimuria].join(',')})` : ''
                } and locale='${
                    i18n.language === 'en-IN' ? 'RoI' : i18n.language
                }' ORDER BY thirumuraiId,prevId,songNo ASC `,
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
                        fontWeight: key === 'title' ? '700' : '400',
                    }}
                    highlightStyle={{
                        fontFamily: 'AnekTamil-Bold',
                        fontSize: 14,
                        color: theme.textColor,
                        backgroundColor: theme.colorscheme === 'dark' ? '#A47300' : '#F8E3B2',
                    }}
                    searchWords={[`${searchText}`]}
                    textToHighlight={textContent}
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

    const renderResult = (item, index, key) => {
        console.log("🚀 ~ renderResult ~ item:", JSON.stringify(item, 0, 2))
        return (
            <Pressable
                style={{ marginVertical: 10 }}
                onPress={() =>
                    navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                        data: item,
                        searchedword: searchText,
                        searchScreen: true
                    })
                }
            >
                {key == 'title' ? null : <Text>{item?.songNo}</Text>}
                {highlight(item, index, key)}
                {key !== 'title' ? null : <Text>सम्पूर्ण ऋग्वेद पारायणम् Complete ...</Text>}
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

    return (
        <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
            <Background>
                <HeaderWithTextInput
                    onSubmitEditing={getDataFromSql}
                    placeholder={`${t('Search for any')} ( முதல்-திருமுறை )`}
                    navigation={navigation}
                    setState={(e) => setSearchText(e)}
                    state={searchText}
                    setOnFocus={setOnFocus}
                />
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
                                    {`${item?.id > 0 && item?.id < 8
                                        ? `${t(`Thrimurai ${item?.id}`)}`
                                        : ''
                                        }`}
                                    {`${item?.id >= 8 && item?.id !== 10 && item?.id !== 11
                                        ? `${t(nameMap[`Thrimurai ${item?.id}`])}`
                                        : ''
                                        }`}
                                    {`${item?.id === 10
                                        ? `${t(nameMap[`Thrimurai ${item?.id}`]).split('/')[0]}`
                                        : ''
                                        }`}
                                    {`${item?.id === 11
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CenterIcon />
                    <Text style={{ color: '#777777', fontFamily: 'Mulish-Regular' }}>
                        Search for any Thirumurai here
                    </Text>
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

        fontWeight: '700',
    },
    searchresult: { fontSize: 18, color: '#222222', fontFamily: 'Lora-Bold' },
});

export default SearchScreen;
