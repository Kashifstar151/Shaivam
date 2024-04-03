import React, { useContext, useState, useEffect, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderAudios from './RenderAudios';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../Context/ThemeContext';
import { getSqlData } from '../Database';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';

const Varakatrimurai = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [authordata, setAuthorData] = useState(null);
    const flatListRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        getSqlData(
            'select * from thirumurais WHERE authorNo IS NOT NULL GROUP BY authorNo ',
            (cb) => {
                setAuthorData(cb);
            }
        );
    }, []);

    const renderContents = (item, index) => {
        return (
            <View
                style={[
                    selectedTitle === index && theme.colorscheme === 'light'
                        ? styles.boxBorder
                        : {},
                    { backgroundColor: theme.cardBgColor, marginBottom: 4 },
                ]}
            >
                <Pressable
                    onPress={
                        selectedTitle !== null && selectedTitle === index
                            ? () => setSelectedTitle(null)
                            : () => setSelectedTitle(index)
                    }
                    style={[{ paddingHorizontal: 20 }]}
                >
                    <View style={[styles.chapterBox]}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={[styles.chapterNameTexts, { color: theme.textColor }]}>
                                {t(item?.author)}
                            </Text>
                        </View>
                        {selectedTitle !== null && selectedTitle === index ? (
                            <TouchableOpacity onPress={() => setSelectedTitle(null)}>
                                <Icon
                                    name="horizontal-rule"
                                    size={24}
                                    color={theme.colorscheme === 'light' ? '#000' : '#fff'}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setSelectedTitle(index)}>
                                <Icon
                                    name="add"
                                    size={24}
                                    color={theme.colorscheme === 'light' ? '#000' : '#fff'}
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
                {selectedTitle == index && (
                    <RenderAudios songs={item} navigation={navigation} varakatimurai={true} />
                )}
            </View>
        );
    };

    return (
        <View style={{ overflow: 'scroll' }}>
            <FlatList
                nestedScrollEnabled
                ref={flatListRef}
                contentContainerStyle={{ marginTop: 20, paddingBottom: 250 }}
                data={authordata}
                renderItem={({ item, index }) => renderContents(item, index)}
            />
        </View>
    );
};
export const styles = StyleSheet.create({
    chapterBox: {
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 50,
        width: Dimensions.get('window').width,
        marginBottom: 4,
        flexDirection: 'row',
    },
    boxBorder: {
        borderBottomColor: '#C0554E',
        borderTopColor: '#C0554E',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    chapterNameTexts: { fontSize: 12, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
});

export default Varakatrimurai;
