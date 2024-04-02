import { t } from 'i18next';
import React, { useContext, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../../Context/ThemeContext';
import RenderAudios from '../RenderAudios';
import RenderTitle from './RenderTitle';
import { colors } from '../../../Helpers';

const RenderThalam = ({ item, index, navigation, ThalamHeaders }) => {
    const { theme } = useContext(ThemeContext);
    const [selectedTitle, setSelectedTitle] = useState(null);
    return (
        <View style={[{ backgroundColor: theme.cardBgColor, marginBottom: 4 }]}>
            <Pressable
                onPress={
                    selectedTitle !== null && selectedTitle == index
                        ? () => setSelectedTitle(null)
                        : () => setSelectedTitle(index)
                }
            >
                <View style={[styles.chapterBox]}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text
                            style={[
                                styles.chapterNameTexts,
                                { color: selectedTitle === index ? '#C1554E' : theme.textColor },
                            ]}
                        >
                            {t(item)}
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
            </Pressable>
            {
                selectedTitle == index && (
                    <RenderTitle
                        data={item}
                        navigation={navigation}
                        thalam={true}
                        ThalamHeaders={ThalamHeaders}
                    />
                )
                // <RenderAudios ThalamHeaders={ThalamHeaders} songs={item} navigation={navigation} thalam={true} />
            }
        </View>
    );
};
export const styles = StyleSheet.create({
    chapterBox: {
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingVertical: 10,
        width: Dimensions.get('window').width,
        marginBottom: 4,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    chapterNameTexts: { fontSize: 11, fontWeight: '400' },
    chapterTexts: { fontSize: 12, fontWeight: '500', color: '#777777', marginTop: 5 },
});
export default RenderThalam;
