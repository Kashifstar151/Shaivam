import React, { useContext, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../Context/ThemeContext';
import { colors } from '../../Helpers';
import RenderThalam from './ThrimuraiHeadingPage/RenderThalam';

const Thalamurai = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const nadu = [
        'சோழநாடு காவிரி வடகரை',
        'சோழநாடு காவிரித் தென்கரை',
        'ஈழநாடு',
        'பாண்டியநாடு',
        'மலைநாடு',
        'கொங்குநாடு',
        'நடுநாடு',
        'தொண்டைநாடு',
        'துளுவநாடு',
        'வடநாடு',
        'பொது',
        'பிற்சேர்க்கை'
    ];
    const ThalamuraiHeaders = ['Nadu', 'Thalam']
    const [ThalamHeaders, setThalamHeaders] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedHeader, setSelectedHeader] = useState(null)
    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: 10, paddingBottom: 250 }}
                data={ThalamuraiHeaders}
                renderItem={({ item, index }) => (
                    <>
                        <View style={[styles.chapterBox, { backgroundColor: theme.cardBgColor }]}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[styles.chapterNameTexts, { color: theme.textColor }]}>
                                    {item}
                                </Text>
                            </View>
                            {ThalamHeaders !== null && ThalamHeaders == index ? (
                                <TouchableOpacity onPress={() => setThalamHeaders(null)}>
                                    <Icon
                                        name="horizontal-rule"
                                        size={24}
                                        color={theme.colorscheme === 'light' ? '#000' : colors.grey1}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setThalamHeaders(index)}>
                                    <Icon
                                        name="add"
                                        size={24}
                                        color={theme.colorscheme === 'light' ? '#000' : colors.grey1}
                                    />
                                </TouchableOpacity>
                            )}

                        </View>
                        {
                            ThalamHeaders == index &&
                            <FlatList data={nadu} renderItem={({ item, index }) => <RenderThalam item={item} index={index} navigation={navigation} />} />
                        }
                    </>
                )}
            />
        </View>
    )
}
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
})
export default Thalamurai