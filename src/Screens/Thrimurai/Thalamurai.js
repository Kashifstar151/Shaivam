import React, { useContext, useState } from 'react';
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
import temples from '../../../assets/data/temples.json';
import region from '../../../assets/data/region.json';
import ThalamSVG from '../../components/SVGs/ThalamSVG';
import NaduSVG from '../../components/SVGs/NaduSVG';

const Thalamurai = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const nadu = region;
    const Thalam = temples;
    const ThalamuraiHeaders = ['Nadu', 'Thalam'];
    const [ThalamHeaders, setThalamHeaders] = useState(null);
    const { t } = useTranslation();
    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: 10, paddingBottom: 250 }}
                data={ThalamuraiHeaders}
                renderItem={({ item, index }) => (
                    <>
                        <Pressable
                            onPress={
                                ThalamHeaders !== null && ThalamHeaders == index
                                    ? () => setThalamHeaders(null)
                                    : () => setThalamHeaders(index)
                            }
                            style={[styles.chapterBox, { backgroundColor: theme.cardBgColor }]}
                        >
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
                                <Text style={[styles.chapterNameTexts, { color: theme.textColor }]}>
                                    {t(item)}
                                </Text>
                            </View>
                            {ThalamHeaders !== null && ThalamHeaders == index ? (
                                <TouchableOpacity onPress={() => setThalamHeaders(null)}>
                                    <Icon
                                        name="horizontal-rule"
                                        size={24}
                                        color={
                                            theme.colorscheme === 'light' ? '#000' : colors.grey1
                                        }
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setThalamHeaders(index)}>
                                    <Icon
                                        name="add"
                                        size={24}
                                        color={
                                            theme.colorscheme === 'light' ? '#000' : colors.grey1
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                        </Pressable>
                        {ThalamHeaders == index && (
                            <FlatList
                                data={ThalamHeaders == 0 ? nadu : Thalam}
                                renderItem={({ item, index }) => (
                                    <RenderThalam
                                        item={item}
                                        index={index}
                                        navigation={navigation}
                                        ThalamHeaders={ThalamHeaders}
                                    />
                                )}
                            />
                        )}
                    </>
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
        width: Dimensions.get('window').width,
        marginBottom: 4,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    chapterNameTexts: { fontSize: 14, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
});
export default Thalamurai;
