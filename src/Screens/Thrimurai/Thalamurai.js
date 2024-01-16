import React, { useContext, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../../Context/ThemeContext';
import { colors } from '../../Helpers';
import RenderThalam from './ThrimuraiHeadingPage/RenderThalam';
import { useTranslation } from 'react-i18next';

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
        'பிற்சேர்க்கை',
    ];
    const Thalam = [
        'அகத்தியான்பள்ளி',
        'அச்சிறுப்பாக்கம்',
        'அஞ்சைக்களம்',
        'அண்ணாமலை',
        'அதிகை',
        'அம்பர் மாகாளம்',
        'அம்பர்ப்பெருந்திருக்கோயில்',
        'அரசிலி',
        'அரதைப்பெரும்பாழி',
        'அரிசிற்கரைப்புத்தூர்',
        'அவளிவணல்லூர்',
        'அவிநாசி',
        'அழுந்தூர்',
        'அறையணிநல்லூர்',
        'அனேகதங்காவதம்',
        'அன்பில்ஆலந்துறை',
        'அன்னியூர்',
        'ஆக்கூர்',
        'ஆடானை',
        'ஆப்பனூர்',
        'ஆப்பாடி',
        'ஆமாத்தூர்',
        'ஆரூர்',
        'ஆரூர் அரநெறி',
        'ஆரூர் பரவையுன்மண்டலி',
        'ஆலங்காடு',
        'ஆலம்பொழில்',
        'ஆலவாய் (மதுரை)',
        'ஆவடுதுறை',
        'ஆவூர் பசுபதீச்சுரம்',
        'ஆனைக்கா',
        'இடும்பாவனம்',
        'இடைக்கழி',
        'இடைச்சுரம்',
        'இடைமருதூர்',
        'இடையாறு',
        'இந்திரநீலப்பருப்பதம்',
        'இராமனதீச்சுரம்',
        'இராமேச்சுரம்',
        'இரும்பூளை (ஆலங்குடி)',
        'இரும்பைமாகாளம்',
        'இலம்பையங்கோட்டூர்',
        'இன்னம்பர்',
        'ஈங்கோய்மலை',
        'உசாத்தானம்',
        'உத்தரகோசமங்கை',
        'ஊறல் (தக்கோலம்)',
        'எதிர்கொள்பாடி',
        'எருக்கத்தம்புலியூர்',
        'எறும்பியூர்',
        'ஏடகம்',
        'ஐயாறு',
        'ஒத்தூர்',
        'ஒற்றியூர்',
        'ஓணகாந்தன்தளி',
        'ஓமாம்புலியூர்',
        'கங்கை கொண்ட சோளேச்சரம்',
        'கச்சிஅனேகதங்காவதம்',
        'கச்சிஏகம்பம் (காஞ்சிபுரம்)',
        'கச்சிநெறிக்காரைக்காடு',
        'கச்சிமேற்றளி',
        'கச்சூர் ஆலக்கோவில்',
        'கஞ்சனூர்',
        'கடம்பந்துறை (குளித்தலை)',
        'கடம்பூர்',
        'கடவூர் மயானம்',
        'கடவூர் வீரட்டம்',
        'கடிக்குளம்',
        'கடுவாய்க்கரைப்புத்தூர்',
        'கடைமுடி',
        'கண்டியூர்',
        'கண்ணார்கோவில்',
        'கயிலாயம் (நொடித்தான்மலை)',
        'கரவீரம்',
        'கருகாவூர்',
        'கருக்குடி',
        'கருப்பறியலூர்',
        'கருவிலி',
        'கருவூரானிலை',
        'கலயநல்லூர்',
        'கலிக்காமூர்',
        'கழிப்பாலை',
        'கழுக்குன்றம்',
        'களந்தை ஆதித்தேச்சரம்',
        'களர்',
        'கள்ளில்',
        'கற்குடி',
        'கன்றாப்பூர்',
        'காளத்தி',
        'காறாயில்',
        'கானப்பேர் (காளையார்கோவில்)',
        'கானாட்டுமுள்ளூர்',
        'கானூர்',
        'கீழைத்திருக்காட்டுப்பள்ளி',
        'கீழ்க்கோட்டூர் மணியம்பலம்',
        'கீழ்வேளூர்',
        'குடந்தை கீழ்க்கோட்டம்',
        'குடந்தைக்காரோணம்',
        'குடமூக்கு (கும்பகோணம்)',
        'குடவாயில்',
        'குரக்குக்கா',
        'குரங்கணில்முட்டம்',
        'குருகாவூர்',
        'குறுக்கை',
    ];
    const ThalamuraiHeaders = ['Nadu', 'Thalam'];
    const [ThalamHeaders, setThalamHeaders] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedHeader, setSelectedHeader] = useState(null);
    const { t } = useTranslation();
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
                        </View>
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
export default Thalamurai