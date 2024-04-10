import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from '../../../components/BackButton';
import SearchInput from '../../../components/SearchInput';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { RouteTexts } from '../../../navigation/RouteText';
import RenderAudios from '../RenderAudios';
import Varakatrimurai from '../Varakatrimurai';
import { decode } from 'react-native-base64';
import { useIsFocused } from '@react-navigation/native';
import RenderTitle from './RenderTitle';
import Background from '../../../components/Background';
import ThrimuraiHeader from './ThrimuraiHeader';
import { getSqlData } from '../../Database';
import PanmuraiLogo from '../../../components/SVGs/PanmuraiLogo';
import { colors } from '../../../Helpers';
import ThalamuraiLogo from '../../../components/SVGs/ThalamuraiLogo';
import ValarutramuraiLogo from '../../../components/SVGs/ValarutramuraiLogo';
import AkarthiLogo from '../../../components/SVGs/AkarthiLogo';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Thalamurai from '../Thalamurai';

const RenderContents = ({
    item,
    index,
    selectedTitle,
    setSelectedTitle,
    navigation,
    range,
    setRange,
    flagShowAudio,
}) => {
    const { theme } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const query = `SELECT (
  (SELECT CAST(titleNo AS TEXT) FROM thirumurais WHERE fkTrimuria=${item?.prevId} AND titleNo IS NOT NULL ORDER BY titleNo ASC LIMIT 1)  || '-' ||  (SELECT CAST(titleNo AS TEXT) FROM thirumurais WHERE fkTrimuria=${item.prevId} ORDER BY titleNo DESC LIMIT 1)
) AS result;`;

        let rangeStr;
        getSqlData(query, (clk) => {
            console.log('🚀 ~ getSqlData ~ clk:', clk);
            const rangeArr = clk[0].result.split('-');
            if (rangeArr[1].length === 3) {
                rangeStr = `${item.prevId}.00${rangeArr[0]} - ${item.prevId}.${rangeArr[1]}`;
            } else if (rangeArr[1].length === 2) {
                rangeStr = `${item.prevId}.00${rangeArr[0]} - ${item.prevId}.0${rangeArr[1]}`;
            } else if (rangeArr[1].length === 1) {
                rangeStr = `${item.prevId}.00${rangeArr[0]} - ${item.prevId}.00${rangeArr[1]}`;
            }
            setRange((prev) => ({ ...prev, [item.prevId]: rangeStr }));
        });
    }, []);

    // console.log('the click ==>', item);
    return (
        <View
            style={[
                selectedTitle === index && theme.colorscheme === 'light' ? styles.boxBorder : {},
                { backgroundColor: theme.cardBgColor, marginBottom: 4 },
            ]}
        >
            {!flagShowAudio && (
                <Pressable
                    onPress={
                        selectedTitle !== null && selectedTitle == index
                            ? (onPress = () => setSelectedTitle(null))
                            : () => setSelectedTitle(index)
                    }
                    style={{ paddingHorizontal: 20 }}
                >
                    <View style={[styles.chapterBox]}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={[styles.chapterNameTexts, { color: theme.textColor }]}>
                                {t(item.name)}
                            </Text>
                            <Text style={styles.chapterTexts}>
                                {range[item.prevId]}
                                {/* {item.prevId} */}
                            </Text>
                        </View>
                        {selectedTitle !== null && selectedTitle == index ? (
                            <TouchableOpacity onPress={() => setSelectedTitle(null)}>
                                <Icon
                                    name="horizontal-rule"
                                    size={24}
                                    color={theme.colorscheme === 'light' ? '#000' : colors.grey1}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setSelectedTitle(index)}>
                                <Icon
                                    name="add"
                                    size={24}
                                    color={theme.colorscheme === 'light' ? '#000' : colors.grey1}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View
                        style={
                            selectedTitle === index && {
                                backgroundColor: '#EAEAEA',
                                height: 1,
                                marginBottom: 10,
                            }
                        }
                    ></View>
                </Pressable>
            )}
            {selectedTitle == index && (
                <RenderTitle data={item} navigation={navigation} flagShowAudio={flagShowAudio} />
            )}

            {flagShowAudio && <RenderAudios songs={item} navigation={navigation} />}
        </View>
    );
};
const ThrimuraiHeadingPage = ({ route, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [range, setRange] = useState({});
    const isFocuced = useIsFocused;
    const { page, list, query, prevId, flagShowAudio, name } = route.params;
    // //console.log('🚀 ~ ThrimuraiHeadingPage ~ prevId:', prevId);
    const headerData = [
        {
            name: 'Panmurai',
            Icon: <PanmuraiLogo fill={theme.iconHeadingColor.inactive} />,
            activeIcon: <PanmuraiLogo fill={theme.iconHeadingColor.active} />,
        },
        {
            name: 'Thalamurai',
            Icon: <ThalamuraiLogo fill={theme.iconHeadingColor.inactive} />,
            activeIcon: <ThalamuraiLogo fill={theme.iconHeadingColor.active} />,
        },
        {
            name: 'Varalatrumurai',
            Icon: <ValarutramuraiLogo fill={theme.iconHeadingColor.inactive} />,
            activeIcon: <ValarutramuraiLogo fill={theme.iconHeadingColor.active} />,
        },
        {
            name: 'Agarathi',
            Icon: <AkarthiLogo fill={theme.iconHeadingColor.inactive} />,
            activeIcon: <AkarthiLogo fill={theme.iconHeadingColor.active} />,
        },
    ];
    const [selectedHeader, setSelectedheader] = useState(
        prevId == '=10' ? headerData[3] : headerData[0]
    );
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [searchedText, setSearchedText] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    / Get latest DB from the disk /;
    const [thrimurais, setThrimurais] = useState(null);
    console.log('🚀 ~ ThrimuraiHeadingPage ~ thrimurais:', thrimurais);
    useEffect(() => {
        retrieveData(query);
    }, []);
    const { t } = useTranslation();
    const retrieveData = async () => {
        setShowLoading(true);
        const query = `SELECT name ,prevId FROM  category WHERE prevId${prevId}`;
        getSqlData(query, (callbacks) => {
            setShowLoading(false);
            setThrimurais(callbacks);
        });
    };
    return (
        <View style={[styles.main, { backgroundColor: 'red' }]}>
            <View>
                <Background>
                    <BackButton navigation={navigation} color={true} middleText={name} />
                    <SearchInput
                        setState={setSearchedText}
                        state={searchedText}
                        setOnFocus={() =>
                            navigation.navigate(RouteTexts.SEARCH_SCREEN, {
                                query1: `SELECT * FROM thirumurais WHERE search_thirumurai_title LIKE`,
                                query2: `AND fkTrimuria <=7 LIMIT 10 OFFSET 0`,
                                allThirumirai: false,
                            })
                        }
                        // placeholder={'Search for anything (Eg - தோடுடைய செவியன்) '}
                        placeholder={t('Search for any Thirumurai here')}
                        styleOverwrite={{ paddingTop: 10 }}
                    />
                    {prevId == '<=7' && (
                        <FlatList
                            contentContainerStyle={{
                                marginTop: 10,
                                width: '100%',
                                flexGrow: 1,
                            }}
                            data={headerData}
                            renderItem={({ item, index }) => (
                                <ThrimuraiHeader
                                    selectedHeader={selectedHeader}
                                    setSelectedheader={setSelectedheader}
                                    item={item}
                                />
                            )}
                            horizontal
                        />
                    )}
                    {prevId == '=10' && (
                        <FlatList
                            contentContainerStyle={{ marginTop: 10 }}
                            data={headerData.reverse()}
                            renderItem={({ item, index }) => (
                                <ThrimuraiHeader
                                    selectedHeader={selectedHeader}
                                    setSelectedheader={setSelectedheader}
                                    item={item}
                                />
                            )}
                            horizontal
                        />
                    )}
                </Background>
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'blue',
                }}
            >
                {showLoading ? (
                    // <Modal transparent presentationStyle='overFullScreen'>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'small'} />
                    </View>
                ) : (
                    <View style={{ backgroundColor: theme.backgroundColor }}>
                        {selectedHeader.name == 'Agarathi' ? (
                            <View style={{ marginTop: 10 }}>
                                <RenderAudios
                                    akarthi={true}
                                    navigation={navigation}
                                    prevId={prevId}
                                />
                            </View>
                        ) : selectedHeader.name == 'Varalatrumurai' ? (
                            <Varakatrimurai navigation={navigation} />
                        ) : selectedHeader?.name == 'Thalamurai' ? (
                            <Thalamurai navigation={navigation} />
                        ) : (
                            <FlatList
                                contentContainerStyle={{ marginTop: 10, paddingBottom: 250 }}
                                data={thrimurais}
                                renderItem={({ item, index }) => (
                                    // renderContents(item, index)
                                    <RenderContents
                                        item={item}
                                        index={index}
                                        selectedTitle={selectedTitle}
                                        setSelectedTitle={setSelectedTitle}
                                        navigation={navigation}
                                        range={range}
                                        setRange={setRange}
                                        flagShowAudio={flagShowAudio}
                                    />
                                )}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    mainContainer: {
        shadowColor: '#FFFFFF',
        shadowOffset: { height: 8, width: 10 },
        shadowOpacity: 0.6,
        height: 1,
        width: '100%',
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    headerBox: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#EDEDED',
        borderRadius: 20,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#777777',
        fontSize: 12,
        fontFamily: 'Mulish-regular',
        // fontWeight: '500',
        marginHorizontal: 5,
    },
    selectedHeaderBox: {
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#C1554E',
        borderRadius: 20,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#72322E',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    chapterBox: {
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 60,
        flexDirection: 'row',
    },
    chapterNameTexts: { fontSize: 14, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
    titleText: {
        fontFamily: 'AnekTamil-Regular',
        fontSize: 14,
        // fontWeight: '500'
    },
    boxBorder: {
        borderBottomColor: '#C0554E',
        borderTopColor: '#C0554E',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
});
export default ThrimuraiHeadingPage;
