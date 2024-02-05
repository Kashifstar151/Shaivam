import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../../Helpers';
import { getSqlData } from '../../Database';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { RouteTexts } from '../../../navigation/RouteText';
import RenderAudios2 from '../RenderAudios2';

const RenderEachTitle = ({
    item,
    index,
    navigation,
    selectedChapter,
    setSelectedChapter,
    thalam,
    flagShowAudio,
    // ThalamHeaders,
    type,
}) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [pageSize, setPageSize] = useState(0);

    const query = {
        panmurai: `SELECT * FROM thirumurais WHERE  fkTrimuria='${item?.fkTrimuria}' AND pann='${item?.pann}' and locale='${i18n.language}' ORDER BY  titleNo `,
        thalam: `Select * from thirumurais WHERE thalam='${item?.thalam}' and locale='${i18n.language}'ORDER BY  title ASC LIMIT 10 OFFSET ${pageSize}`,
    };

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
                        }}
                        onPress={() => {
                            if (type === 'thalam_temple') {
                                navigation.navigate(RouteTexts?.THRIMURAI_SONG, {
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
                                {type === 'thalam_nadu' && t(item?.thalam)}
                                {type === 'thalam_temple' && t(item?.title)}
                                {type !== 'thalam_nadu' &&
                                    type !== 'Thalam_Temple' &&
                                    t(item?.pann)}
                            </Text>
                        </View>
                        {type === 'thalam_nadu' ||
                        (type !== 'thalam_nadu' && type !== 'thalam_temple') ? (
                            selectedChapter !== null && selectedChapter == index ? (
                                <TouchableOpacity onPress={() => setSelectedChapter(null)}>
                                    {
                                        <Icon
                                            name="keyboard-arrow-down"
                                            size={24}
                                            color={
                                                theme.colorscheme === 'light'
                                                    ? '#000'
                                                    : colors?.grey1
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
                                                    : colors?.grey1
                                            }
                                        />
                                    }
                                </TouchableOpacity>
                            )
                        ) : null}
                    </Pressable>
                    {selectedChapter == index && (
                        <View style={{ marginBottom: 10 }}>
                            {/* <FlatList renderItem={({ item, index }) => renderAudios(item, index)} data={item.songLyrics} /> */}
                            {/* <RenderAudios thalam={thalam} songs={item} navigation={navigation} /> */}
                            <RenderAudios2
                                type={type}
                                query={
                                    query[
                                        type === 'thalam_nadu' || type === 'thalam_temple'
                                            ? 'thalam'
                                            : type
                                    ]
                                }
                                songs={item}
                                navigation={navigation}
                            />
                        </View>
                    )}
                </>
            ) : (
                <RenderAudios2
                    songs={item}
                    type={type}
                    query={`SELECT * FROM thirumurais WHERE  fkTrimuria='${item?.fkTrimuria}' AND pann='${item?.pann}' and locale='${i18n.language}' ORDER BY  titleNo `}
                    navigation={navigation}
                />
                // <RenderAudios2 songs={item} navigation={navigation} />
                // <Text>The 8 the col </Text>
            )}
        </>
    );
};

const RenderTitle2 = ({ navigation, type, flagShowAudio, query }) => {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [TitleData, setTitleData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        getDtataFromSql(query);
    }, []);
    const getDtataFromSql = async (query) => {
        setShowLoading(true);
        getSqlData(query, (callbacks) => {
            setShowLoading(false);
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
                            item={item}
                            index={index}
                            navigation={navigation}
                            selectedChapter={selectedChapter}
                            setSelectedChapter={setSelectedChapter}
                            flagShowAudio={flagShowAudio}
                            type={type}
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
export default RenderTitle2;
