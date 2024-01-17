import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderAudios from './RenderAudios';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../Context/ThemeContext';
import { getSqlData } from '../Database';
import { useTranslation } from 'react-i18next';

const Varakatrimurai = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [authordata, setAuthorData] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        getSqlData(
            'select * from thirumurais WHERE author NOT NULL and author in ("திருஞானசம்பந்தர்","திருநாவுக்கரசர்","சுந்தரர்") GROUP BY author ',
            (cb) => {
                setAuthorData(cb);
            }
        );
    }, []);
    const renderContents = (item, index) => {
        return (
            <>
                <View style={[styles.chapterBox, { backgroundColor: theme.backgroundColor }]}>
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
                {selectedTitle == index && (
                    <View style={{ marginTop: 10 }}>
                        {/* <FlatList data={item?.title} renderItem={({ item, index }) => renderTitle(item, index)} /> */}
                        <RenderAudios songs={item} navigation={navigation} />
                    </View>
                )}
            </>
        );
    };

    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: 20, overflow: 'scroll' }}
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
        paddingHorizontal: 20,
    },
    chapterNameTexts: { fontSize: 12, fontWeight: '600' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
});

export default Varakatrimurai;