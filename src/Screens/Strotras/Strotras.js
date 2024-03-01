import { Dimensions, FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useState } from 'react';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import SearchInput from '../../components/SearchInput';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../Context/ThemeContext';
import PlayButton from "../../assets/Images/play (2).svg"
import Alphabetical from "../../assets/Images/alphabetic-ascending 1.svg"
import { RFValue } from 'react-native-responsive-fontsize';


const Strotas = ({ navigation }) => {
    const [searchText, setSearchText] = useState(null)
    const [selectedHeader, setSelectedheader] = useState('Most listened')
    const { t, i18n } = useTranslation();
    const header = [{ name: 'Most listened', icon: <PlayButton /> }, { name: 'Alphabetical', icon: <Alphabetical /> }]
    const { theme } = useContext(ThemeContext);
    return (
        <View style={{ flex: 1 }}>
            <Background>

                <BackButton navigation={navigation} color={true} middleText={'Stotras'} />
                <SearchInput
                    setState={setSearchText}
                    state={searchText}
                    // setOnFocus={() =>
                    //     navigation.navigate(RouteTexts.SEARCH_SCREEN, {
                    //         query1: `SELECT * FROM thirumurais WHERE search_thirumurai_title LIKE`,
                    //         query2: `AND fkTrimuria <=7 LIMIT 10 OFFSET 0`,
                    //         allThirumirai: false,
                    //     })
                    // }
                    placeholder={t('Search for anything (Eg - தோடுடைய செவியன்)')}
                    // placeholder={t('Search for any Thirumurai here')}
                    styleOverwrite={{ paddingTop: 10 }}
                />
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 10, marginVertical: 10 }}
                    data={header} horizontal renderItem={({ item, index }) => (
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                marginRight: 8,
                                // elevation: {
                                elevation: 5,
                                backgroundColor: selectedHeader == item?.name ? theme.searchContext.selected.bgColor : theme.searchContext.unSelected.bgColor,




                                // height: 30,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                width: Dimensions.get('window').width / 2.2
                            }}
                            onPress={() => {
                                setSelectedheader(item.name);
                            }}
                        >
                            {item.icon}
                            <Text
                                style={{
                                    marginHorizontal: 10,
                                    color: selectedHeader == item?.name ? theme.searchContext.selected.textColor : theme.searchContext.unSelected.textColor,

                                    fontFamily: 'Mulish-Bold',
                                    fontSize: RFValue(10)
                                    // fontWeight: '600'

                                }}
                            >{item.name}</Text>
                        </Pressable>
                    )} />
            </Background>
        </View>
    );
};

export default Strotas;
