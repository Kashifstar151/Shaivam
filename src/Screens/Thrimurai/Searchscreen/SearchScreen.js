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

const SearchScreen = ({ navigation, route }) => {
    const { thrimurais } = route?.params;
    const [searchText, setSearchText] = useState();
    const [searchResult, setSearchedResult] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const [rawSongs, setRawSongs] = useState(null);
    const { theme } = useContext(ThemeContext);

    const [fktrimuria, setFkTrimuria] = useState(null);

    const setIndexOfFkTrimurai = (idx) => {
        if (idx !== fktrimuria) {
            setFkTrimuria(idx);
        } else {
            setFkTrimuria(null);
        }
    };

    useEffect(() => {
        getDataFromSql();
    }, [fktrimuria]);

    const getDataFromSql = (e) => {
        if (searchText && searchText.length >= 2) {
            getSqlData(
                `SELECT * FROM thirumurais WHERE searchTitle LIKE '%${searchText}%' LIMIT 10 ;`,
                // `SELECT * FROM thirumurais WHERE search_title='%திருஞானசம்பந்தர்தேவாரம்-1.031-திருக்குரங்கணின்முட்டம்-விழுநீர்மழுவாள்படை%' LIMIT 10 OFFSET 0;`,
                (callbacks) => {
                    // console.log("🚀 ~ getDataFromSql ~ callbacks:", JSON.stringify(callbacks, 0, 2))
                    setSearchedResult(callbacks);
                }
            );
            getSqlData(
                `SELECT * FROM thirumurai_songs WHERE searchTitle LIKE '%${searchText}%' ${
                    fktrimuria ? `and fkTrimuria=${fktrimuria}` : ''
                }  ORDER BY songNo ASC LIMIT 10 OFFSET 0;`,
                (callbacks) => {
                    setRawSongs(callbacks);
                    console.log('🚀 ~ getDataFromSql ~ callbacks:', callbacks);
                    // setSearchText(e)
                }
            );
        }
    };
    const highlight = (item, index, key) => {
        // console.log("🚀 ~ highlight ~ item:", JSON.stringify(item))
        const textContent = key === 'title' ? item?.title : item?.rawSong;
        const cleanedText = textContent.replace(/\s+/g, ' ').trim();
        const parts = cleanedText.split(' ');
        return (
            <View
                style={{
                    flexDirection: 'row',
                    maxWidth: Dimensions.get('window').width - 30,
                    flexWrap: 'wrap',
                }}
            >
                {key == 'title'
                    ? parts?.map((res, i) => <HighlightedText text={res} highlight={searchText} />)
                    : parts?.map((res, i) => (
                          <HighlightedText text={res} highlight={searchText} lyrics={true} />
                      ))}
            </View>
        );
    };

    const renderResult = (item, index, key) => {
        return (
            <Pressable
                style={{ marginVertical: 10 }}
                onPress={() =>
                    navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                        data: item,
                    })
                }
            >
                {key == 'title' ? null : <Text>Lyrics</Text>}
                {highlight(item, index, key)}
                {key !== 'title' ? null : <Text>सम्पूर्ण ऋग्वेद पारायणम् Complete ...</Text>}
            </Pressable>
        );
    };
    return (
        <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
            <Background>
                <HeaderWithTextInput
                    onSubmitEditing={getDataFromSql}
                    placeholder={'Search for any( முதல்-திருமுறை )'}
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
                    <Text style={{ color: 'white' }}>Search In -</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={thrimurais}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{
                                    marginLeft: 5,
                                    // backgroundColor: theme.searchBox.bgColor,
                                    backgroundColor:
                                        fktrimuria !== item?.id
                                            ? theme.searchContext.unSelected.bgColor
                                            : theme.searchContext.selected.bgColor,

                                    height: 30,
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                }}
                                onPress={() => {
                                    setIndexOfFkTrimurai(item?.id);
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            fktrimuria !== item?.id
                                                ? theme.searchContext.unSelected.textColor
                                                : theme.searchContext.selected.textColor,
                                        fontFamily: 'Mulish-Regular',
                                    }}
                                >{`Thrimurai ${item?.id}`}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Background>
            {searchResult?.length > 0 || rawSongs?.length > 0 ? (
                <ScrollView style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    <Text style={styles.searchresult}>Search Result({searchResult?.length})</Text>
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