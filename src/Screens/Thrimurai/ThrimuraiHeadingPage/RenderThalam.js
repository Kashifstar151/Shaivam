import { t } from 'i18next'
import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { ThemeContext } from '../../../Context/ThemeContext'
import RenderAudios from '../RenderAudios'
import RenderTitle from './RenderTitle'
import { colors } from '../../../Helpers';
import RenderTitle2 from './RenderTitle2';

const RenderThalam = ({ item, index, navigation, ThalamHeaders, type }) => {
    // console.log('🚀 ~ file: RenderThalam.js:12 ~ RenderThalam ~ type:', type);
    const { theme } = useContext(ThemeContext);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    return (
        <View>
            <View style={[styles.chapterBox, { backgroundColor: theme.cardBgColor }]}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.chapterNameTexts, { color: theme.textColor }]}>
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
            {
                selectedTitle == index && (
                    // <RenderTitle
                    //     data={item}
                    //     navigation={navigation}
                    //     thalam={true}
                    //     ThalamHeaders={ThalamHeaders}
                    //     // type={"Thalam_Nadu"} // type --> panmurai, Thalam_Nadu, Thalam_Temple , varalatrimurai, akarthi ,
                    //     // query={ }
                    // />

                    <RenderTitle2
                        data={item}
                        navigation={navigation}
                        thalam={true}
                        type={type} // type --> panmurai, Thalam_Nadu, Thalam_Temple , varalatrimurai, akarthi ,
                        query={`Select * from thirumurais where ${
                            type === 'thalam_nadu' ? 'country' : 'thalam'
                        }='${item}' GROUP BY thalam ORDER BY  titleNo ASC LIMIT ${pageSize} OFFSET 0`}
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
})
export default RenderThalam