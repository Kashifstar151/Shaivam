import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, UIManager, Platform, LayoutAnimation, StatusBar, Dimensions, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Entypo'
import Background from '../../components/Background'
import HeadingText from '../../components/HeadingText'
import SearchInput from '../../components/SearchInput'
import HeadingComponent from '../Temples/Common/HeadingComponent'
import InActiveCalender from "../../assets/Images/UnactiveCalender.svg"
import ActiveStar from "../../assets/Images/ActiveStar.svg"
import InActiveStar from "../../assets/Images/UnactiveStart.svg"
import ActiveCalender from "../../assets/Images/CalenderAct.svg"
import { Calendar, LocaleConfig, WeekCalendar, ExpandableCalendar } from 'react-native-calendars';
import CustomCalender from './CustomCalender'
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Calender = () => {
    const data = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ]
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCalendar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };
    const [selectedHeader, setSelectedheader] = useState()
    const [fullScreen, setFullScreen] = useState(false)
    const [selected, setSelected] = useState('2024-03-13')
    const marked = useMemo(() => ({
        [selected]: {
            marked: true,
            dotColor: 'black',
            customStyles: {
                container: {
                    backgroundColor: '#FCB300',
                    height: 40,
                    borderRadius: 5,
                },
                text: {
                    color: 'black',
                    fontFamily: 'Mulish-Bold'
                },
            },
        }
    }), [selected]);
    const RenderItem = () => (
        <View style={styles.shadowProps}>
            <View style={styles.itemDateContainer}>

                <Text style={styles.itemText}>sjkdhfcjk</Text>
            </View>
        </View>
    )
    // LocaleConfig.locales['fr']
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ flex: 1, }}>
                <Background >
                    <View>
                        <View style={styles.HeadeingContainer}>
                            <HeadingText text={'Calenders'} nandiLogo={true} />
                        </View>
                        <View style={styles.SearchInputContainer}>
                            <View style={{ width: '84%' }}>
                                <SearchInput placeholder={'Search for Festivals/events'} />
                            </View>
                            <TouchableOpacity style={styles.AddBtnContainer}>
                                <Icon name='plus' size={28} color='#222222' />
                            </TouchableOpacity>
                        </View>

                        <FlatList contentContainerStyle={{ paddingHorizontal: 15, marginVertical: 10 }} horizontal data={data} renderItem={({ item, index }) => (
                            <HeadingComponent selectedHeader={selectedHeader} setHeader={setSelectedheader} item={item} index={index} />
                        )} />
                    </View>
                    <View style={{ height: 100 }}>

                    </View>
                </Background>
                <View style={{ position: 'absolute', top: '70%', flex: 1, width: Dimensions.get('screen').width }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', elevation: 10, alignSelf: 'center', }}>
                        {
                            fullScreen ?
                                <View style={[styles.calenderContainer, styles.shadowProps]}>
                                    <Calendar
                                        theme={{
                                            arrowStyle: { backgroundColor: '#EDEDED', borderRadius: 20 },
                                            arrowColor: '#777777',
                                            // calendarBackground: '#222',
                                            dayTextColor: '#222222',
                                            textDayFontFamily: 'Mulish-Bold',
                                            textDisabledColor: 'grey',
                                            monthTextColor: '#222222',
                                            textDayFontWeight: '600',
                                            textMonthFontWeight: '600'

                                        }}
                                        onDayPress={(day) => setSelected(day?.dateString)}
                                        markingType='custom'
                                        markedDates={marked}
                                        style={styles.calenderTheme}
                                    />
                                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setFullScreen(false)}>
                                        <Icon name='chevron-up' size={23} />
                                    </TouchableOpacity>
                                </View> :
                                <CustomCalender setFullScreen={setFullScreen} />
                        }
                    </View>
                    <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold' }}>Today, Oct 06, 2023</Text>
                    </View>
                    {
                        RenderItem()
                    }
                </View>
            </View>
        </ScrollView>
    )
}
export const styles = StyleSheet.create({
    HeadeingContainer: { paddingHorizontal: 15, justifyContent: 'center', marginVertical: 15, paddingTop: Platform.OS = 'ios' ? StatusBar.currentHeight + 20 : 0 },
    SearchInputContainer: { flexDirection: 'row', },
    AddBtnContainer: { backgroundColor: '#FCB300', height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    calenderContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        //  elevation: 2, 
    },
    shadowProps: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    calenderTheme: {
        width: Dimensions.get('window').width - 30, borderRadius: 10, elevation: 20,
    },
    itemText: { fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' },
    itemDateContainer: { paddingHorizontal: 15, borderRightWidth: 1, borderRightColor: 'grey' }
})
export default Calender