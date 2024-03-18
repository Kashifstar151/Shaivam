// setting the type of the marker you pressed
// callback function for naving to page which has the temple details
import { StackActions, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CardForNearByTemple from './CardForNearByTemple';
import bgImg from '../../../assets/Images/Background.png';
import bgImgDark from '../../../assets/Images/BackgroundCommon.png';
import { ThemeContext } from '../../Context/ThemeContext';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import DownArrowSVG from '../../components/SVGs/DownArrowSVG';
import SearchTemple from './SearchTemple';
import FavSVG from '../../components/SVGs/FavSVG';
import SearchSVG from '../../components/SVGs/SearchSVG';
import ShareSVG from '../../components/SVGs/ShareSVG';
import TempleCard from './TempleCard';
const TempleDetails = ({ navigation }) => {
    const route = useRoute();
    const { data, locationName } = route?.params;
    console.log('🚀 ~ TempleDetails ~ data:', data);
    const { theme } = useContext(ThemeContext);
    console.log('🚀 ~ NearByPage ~ state:', data);
    const popAction = StackActions.pop(1);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
                resizeMode="cover"
                style={{ width: '100%', height: 50 }}
            />

            <View
                style={[
                    styles.wholeContainerWrapper,
                    {
                        backgroundColor: 'white',
                        flex: 1,
                    },
                ]}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 20,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                    }}
                >
                    <DownArrowSVG fill={'#000'} width={20} height={20} />
                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                        <SearchSVG fill={'#000'} width={17} height={17} />
                        <FavSVG fill={'#000'} width={14} height={20} />
                        <ShareSVG fill={'#000'} width={18} height={18} />
                    </View>
                </View>
                <View>
                    <TempleCard
                        dataSet={{
                            templeName: 'Brahmalingeshwara',
                            flag: 1,
                            templeType: 'Jyotirlingas/Thirumurai Temples',
                            coordinate: {
                                latitude: '26.868851939300207',
                                longitude: '80.91296407698843',
                            },
                        }}
                        showButton={false}
                        showMargin={false}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    map: {
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    wholeContainerWrapper: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
        marginTop: -12,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    contWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    },
    textContWrapper: {
        height: 14,
        width: 14,
        borderRadius: 2,
        justifyContent: 'center',
    },

    textStyleForCont: {
        alignSelf: 'center',
        paddingVertical: 'auto',
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 16,
    },
});

export default TempleDetails;
