import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { renderResult } from './CommonFunctionComponent';
import { useNavigation } from '@react-navigation/native';
import { RouteTexts } from '../../../navigation/RouteText';

const RenderLyricsRelatedSearch = ({
    searchTextVal,
    selectedTab,
    getDataFromSql,
    tab,
    searchResult,
    setoffSet,
    offset,
}) => {
    const navigation = useNavigation();
    useEffect(() => {
        getDataFromSql(searchTextVal, selectedTab);
    }, [getDataFromSql, selectedTab]);
    const [result, setResult] = useState(searchResult);

    useEffect(() => {
        setResult(() => searchResult);
    }, [searchResult]);
    return (
        <View>
            <FlatList
                key={(item) => {
                    return item?.id;
                }}
                contentContainerStyle={{ marginTop: 10, paddingBottom: 100 }}
                data={result}
                renderItem={({ item, index }) =>
                    renderResult(item, index, selectedTab, searchTextVal, () =>
                        navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                            data: item,
                            searchedword: searchTextVal,
                            searchScreen: true,
                            songNo: item?.songNo,
                        })
                    )
                }
                windowSize={40}
                keyExtractor={(item, index) => index}
                maxToRenderPerBatch={40}
                updateCellsBatchingPeriod={20}
                removeClippedSubviews={true}
                onEndReachedThreshold={0.8}
                onEndReached={() => {
                    if (!(searchResult?.length < 40)) {
                        setoffSet((prev) => {
                            if (searchResult?.length && prev[selectedTab]?.isHavingMore) {
                                return {
                                    ...prev,
                                    [selectedTab]: {
                                        ...prev[selectedTab],
                                        page: prev[selectedTab]?.page + 40,
                                        isfetching: true,
                                    },
                                };
                            } else {
                                return {
                                    ...prev,
                                    [selectedTab]: {
                                        ...prev[selectedTab],
                                        // page: prev[selectedTab]?.page + 40,
                                        // isfetching: true,
                                        isHavingMore: false,
                                    },
                                };
                            }
                        });
                    }
                }}
                ListFooterComponent={
                    offset?.['rawSongs']?.isfetching && <ActivityIndicator size={'small'} />
                }
            />
        </View>
    );
};

export default RenderLyricsRelatedSearch;
