import React, { useContext, useMemo, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    UIManager,
    Platform,
    LayoutAnimation,
    StatusBar,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Background from '../../components/Background';
import HeadingText from '../../components/HeadingText';
import SearchInput from '../../components/SearchInput';
import HeadingComponent from '../Temples/Common/HeadingComponent';
import InActiveCalender from '../../assets/Images/UnactiveCalender.svg';
import ActiveStar from '../../assets/Images/ActiveStar.svg';
import InActiveStar from '../../assets/Images/UnactiveStart.svg';
import ActiveCalender from '../../assets/Images/CalenderAct.svg';
import { Calendar, LocaleConfig, WeekCalendar, ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import CustomCalender from './CustomCalender';
import { colors } from '../../Helpers';
import ElevatedCard from '../../components/ElevatedCard';
import EventCard from '../../components/EventCard';
import { ThemeContext } from '../../Context/ThemeContext';
import BottomSheet from '@gorhom/bottom-sheet';
import EventSelectionType from './EventSelectionType';
import { useFocusEffect } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ButtonComp from '../Temples/Common/ButtonComp';
import LocationSelection from './LocationSelection';
import { RouteTexts } from '../../navigation/RouteText';
import SubmitEnteries from './SubmitEnteries';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Calender = ({ navigation }) => {
    const data = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ];
    // const [isExpanded, setIsExpanded] = useState(false);
    const bottomSheetRef = useRef(null)
    const [selectedFilter, setSelectedFilter] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const { theme } = useContext(ThemeContext);
    useFocusEffect(
        React.useCallback(() => {
            return () => bottomSheetRef.current?.close();
        }, [])
    );
    const eventData = [
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
    ];
    const [selectedHeader, setSelectedheader] = useState();
    const [fullScreen, setFullScreen] = useState(false);
    const [selected, setSelected] = useState('2024-03-13');
    const marked = useMemo(
        () => ({
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
                        fontFamily: 'Mulish-Bold',
                    },
                },
            },
        }),
        [selected]
    );
    const RenderItem = () => (
        <View style={[styles.shadowProps, styles.itemContainer]}>
            <View style={styles.itemDateContainer}>
                <Text style={styles.itemText}>THU</Text>
                <Text style={styles.itemDateText}>06</Text>
            </View>
        </View>
    );
    const selectFilter = (item) => {
        // alert(item)
        setSelectedFilter(item)
        bottomSheetRef?.current?.open()
    }
    return (
        <ScrollView nestedScrollEnabled style={{ backgroundColor: '#fff', flex: 1 }}>
            {/* <View style={{ backgroundColor: 'red' }}> */}
            <Background>
                <View>
                    <View style={styles.HeadeingContainer}>
                        <HeadingText text={'Calenders'} nandiLogo={true} />
                    </View>
                    <View style={styles.SearchInputContainer}>
                        <View style={{ width: '84%' }}>
                            <SearchInput placeholder={'Search for Festivals/events'} />
                        </View>
                        <TouchableOpacity style={styles.AddBtnContainer} onPress={() => selectFilter('Add Event')}>
                            <Icon name="plus" size={28} color="#222222" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 15, marginVertical: 10 }}
                        horizontal
                        data={data}
                        renderItem={({ item, index }) => (
                            <HeadingComponent
                                selectedHeader={selectedHeader}
                                setHeader={setSelectedheader}
                                item={item}
                                index={index}
                            />
                        )}
                    />
                </View>
                <View style={{ height: 100 }}></View>
            </Background>
            <View
                style={{
                    marginTop: -100,
                    // width: Dimensions.get('screen').width,
                    flex: 1,
                }}>
                {/* <View
                    style={{
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        padding: 5,
                        backgroundColor: "#ffffff"
                        // alignSelf: 'center',
                    }}
                > */}
                {/* <View style={{ padding: 5, borderRadius: 10, backgroundColor: 'red', width: Dimensions.get('window').width - 20 }}> */}
                <CalendarProvider style={[styles.calenderContainer, styles.shadowProps,]} date={new Date().toISOString()}>
                    <ExpandableCalendar
                        theme={{
                            arrowColor: '#222222',
                            dayTextColor: '#222222',
                            textDayFontFamily: 'Mulish-Bold',
                            textDisabledColor: 'grey',
                            monthTextColor: '#222222',
                            textDayFontWeight: '600',
                            textMonthFontWeight: '600',
                            calendarBackground: "#FFFFFF",

                        }}
                        onDayPress={(day) => setSelected(day?.dateString)}
                        markingType="custom"
                        markedDates={marked}
                        style={styles.calenderTheme} />
                </CalendarProvider>
                {
                    selectedHeader == 'Events' &&
                    <View style={styles.filterContainer}>
                        <TouchableOpacity onPress={() => selectFilter('Event')} style={{ flexDirection: 'row', borderColor: 'rgba(229, 229, 229, 1)', borderWidth: 1, borderRadius: 20, height: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={styles.filtertext}>Event Category</Text>
                            <MaterialIcons name='keyboard-arrow-down' size={20} color='rgba(119, 119, 119, 1)' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectFilter('Location')} style={{ marginHorizontal: 15, flexDirection: 'row', borderColor: 'rgba(229, 229, 229, 1)', borderWidth: 1, borderRadius: 20, height: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={styles.filtertext}>Location</Text>
                            <MaterialIcons name='keyboard-arrow-down' size={20} color='rgba(119, 119, 119, 1)' />
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ paddingHorizontal: 20, marginVertical: 15, }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                        Today, Oct 06, 2023
                    </Text>
                </View>
                <FlatList
                    data={eventData}
                    renderItem={({ item, index }) => (
                        <ElevatedCard navigation={() => navigation.navigate(RouteTexts.EVENT_DETAILS)} theme={{ colorscheme: theme.colorscheme }}>
                            <EventCard
                                date={item.date}
                                timing={item.timing}
                                title={item.title}
                                theme={{
                                    textColor: theme.textColor,
                                    colorscheme: theme.colorscheme,
                                }}
                            />
                        </ElevatedCard>
                    )}
                />
                <RBSheet height={500} closeOnDragDown ref={bottomSheetRef}>
                    {
                        selectedFilter == 'Event' ? <>
                            <EventSelectionType />
                            <View style={{ justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 10 }}>
                                <ButtonComp color={true} text='Search' navigation={() => bottomSheetRef?.current?.close()} />
                            </View>
                        </> :
                            selectedFilter == 'Add Event' ?
                                <SubmitEnteries navigation={navigation} setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} closeSheet={() => bottomSheetRef.current.close()} />
                                :
                                <LocationSelection />
                    }
                </RBSheet>
                {/* <BottomSheet snapPoints={['50%']} ref={bottomSheetRef} >
                    <SubmitEnteries setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} closeSheet={() => bottomSheetRef.current.close()} />
                </BottomSheet> */}
            </View>
        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    HeadeingContainer: { paddingHorizontal: 15, justifyContent: 'center', marginVertical: 15 },
    SearchInputContainer: { flexDirection: 'row' },
    AddBtnContainer: {
        backgroundColor: '#FCB300',
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calenderContainer: {
        // backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 10,
        //  elevation: 2, 
    },
    shadowProps: {
        elevation: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    calenderTheme: {
        width: Dimensions.get('window').width - 20, borderRadius: 10,
    },
    itemContainer: { height: 75, backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, alignItems: 'center', flexDirection: 'row' },
    itemText: { fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' },
    itemDateContainer: { paddingHorizontal: 15, borderRightWidth: 1, borderRightColor: colors.grey3, width: '25%', justifyContent: 'center', alignItems: 'center' },
    itemDateText: { fontSize: 20, fontFamily: 'Mulish-Bold', color: '#222222' },
    filterContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
    filtertext: { fontFamily: 'Mulish-Regular', fontSize: 12, color: 'rgba(119, 119, 119, 1)' }
});
export default Calender;
