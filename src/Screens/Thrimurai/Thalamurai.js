import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../Context/ThemeContext';
import { colors } from '../../Helpers';
import RenderThalam from './ThrimuraiHeadingPage/RenderThalam';
import { useTranslation } from 'react-i18next';
import ThalamSVG from '../../components/SVGs/ThalamSVG';
import NaduSVG from '../../components/SVGs/NaduSVG';
import { getSqlData } from '../Database';

const Thalamurai = ({ navigation, prevId }) => {
    const { theme } = useContext(ThemeContext);
    const ThalamuraiHeaders = ['Nadu', 'Thalam'];
    const [ThalamHeaders, setThalamHeaders] = useState(null);
    const { t } = useTranslation();
    const [data, setData] = useState([]);

    const thalamQuery = `SELECT GROUP_CONCAT( thalam,";" ) AS thalams
    FROM (
      SELECT thalam
      FROM thirumurais
      WHERE fkTrimuria ${prevId} AND thalam IS NOT NULL AND thalam != ''
      GROUP BY thalam
      ORDER BY thalam ASC
    )`;
    const naduQuery = `SELECT GROUP_CONCAT( country,";") AS countries
    FROM (
      SELECT country
      FROM thirumurais
      WHERE fkTrimuria ${prevId} AND country IS NOT NULL AND country != ''
      GROUP BY country
      ORDER BY country ASC
    )`;

    useEffect(() => {
        if (ThalamHeaders == 0) {
            // nadu
            getSqlData(naduQuery, (naduData) => {
                setData(naduData[0].countries.split(';'));
            });
        } else if (ThalamHeaders == 1) {
            // thalam
            getSqlData(thalamQuery, (thalamData) => {
                setData(thalamData[0].thalams.split(';'));
            });
        }
    }, [ThalamHeaders, prevId]);

    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: 10, paddingBottom: 250 }}
                data={ThalamuraiHeaders}
                renderItem={({ item, index }) => (
                    <View
                        style={[
                            ThalamHeaders === index && theme.colorscheme === 'light'
                                ? styles.boxBorder
                                : {},
                            { backgroundColor: theme.cardBgColor, marginBottom: 4 },
                        ]}
                    >
                        <Pressable
                            onPress={
                                ThalamHeaders !== null && ThalamHeaders == index
                                    ? () => setThalamHeaders(null)
                                    : () => setThalamHeaders(index)
                            }
                            style={[{ backgroundColor: theme.cardBgColor, paddingHorizontal: 20 }]}
                        >
                            <View style={[styles.chapterBox]}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        gap: 10,
                                        alignItems: 'center',
                                    }}
                                >
                                    {item !== 'Nadu' ? (
                                        <ThalamSVG fill={theme.textColor} />
                                    ) : (
                                        <NaduSVG fill={theme.textColor} />
                                    )}
                                    <Text
                                        style={[
                                            styles.chapterNameTexts,
                                            { color: theme.textColor },
                                        ]}
                                    >
                                        {t(item)}
                                    </Text>
                                </View>
                                {ThalamHeaders !== null && ThalamHeaders == index ? (
                                    <TouchableOpacity onPress={() => setThalamHeaders(null)}>
                                        <Icon
                                            name="horizontal-rule"
                                            size={24}
                                            color={
                                                theme.colorscheme === 'light'
                                                    ? '#000'
                                                    : colors.grey1
                                            }
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setThalamHeaders(index)}>
                                        <Icon
                                            name="add"
                                            size={24}
                                            color={
                                                theme.colorscheme === 'light'
                                                    ? '#000'
                                                    : colors.grey1
                                            }
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View
                                style={
                                    ThalamHeaders === index && {
                                        backgroundColor: '#EAEAEA',
                                        height: 1,
                                        marginBottom: 10,
                                    }
                                }
                            ></View>
                        </Pressable>
                        {ThalamHeaders == index && (
                            <FlatList
                                data={data}
                                renderItem={({ item, index }) => (
                                    <RenderThalam
                                        item={item}
                                        prevId={prevId}
                                        index={index}
                                        navigation={navigation}
                                        ThalamHeaders={ThalamHeaders}
                                    />
                                )}
                            />
                        )}
                    </View>
                )}
            />
        </View>
    );
};
export const styles = StyleSheet.create({
    chapterBox: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        marginBottom: 4,
        flexDirection: 'row',
    },
    boxBorder: {
        borderBottomColor: '#C0554E',
        borderTopColor: '#C0554E',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    chapterNameTexts: { fontSize: 15, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
});
export default Thalamurai;
