import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';
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
import { ExpandableCalendar, CalendarProvider, Calendar } from 'react-native-calendars';
import CustomCalender from './CustomCalender';
import { colors } from '../../Helpers';
import ElevatedCard from '../../components/ElevatedCard';
import EventCard from '../../components/EventCard';
import { ThemeContext } from '../../Context/ThemeContext';
import EventSelectionType from './EventSelectionType';
import { useFocusEffect } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ButtonComp from '../Temples/Common/ButtonComp';
import LocationSelection from './LocationSelection';
import { RouteTexts } from '../../navigation/RouteText';
import SubmitEnteries from './SubmitEnteries';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useGetListQuery } from '../../store/features/Calender/CalenderApiSlice';
import DatePickerCalender from './DatePickerCalender';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Calender = ({ navigation }) => {
    const data1 = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ];
    const [selectMonth, setSelectMonth] = useState(new Date().toISOString());
    const [searchText, setSearchText] = useState(null)

    const [eventCaetgory, setEventCategory] = useState(null);
    const [todaysEvent, setTodaysEvent] = useState(null);
    const { data, isLoading, isFetching, isSuccess, refetch } = useGetListQuery(selectMonth);
    console.log('🚀 ~ Calender ~ isSuccess:', isSuccess, isLoading);
    // console.log("🚀 ~ Calender ~ authState:", JSON.stringify(data?.data, 0, 2))
    useEffect(() => {
        if (isSuccess) {
            data?.data?.map((item) => {
                if (item?.attributes?.start_date == moment().format('YYYY-MM-DD')) {
                    setTodaysEvent(item);
                    // alert(true)
                }
            });
            // You can also set state here to trigger a re-render if necessary
        }
    }, [data, isSuccess]);
    const bottomSheetRef = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [disableMonthChangeVal, setDisableMonthChangeVal] = useState(false);
    const disableMonthChangeValRef = useRef();

    const { theme } = useContext(ThemeContext);
    useFocusEffect(
        React.useCallback(() => {
            return () => bottomSheetRef.current?.close();
        }, [])
    );
    // const eventData = [
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    //     {
    //         date: { day: 'THU', dateNo: '06' },
    //         title: 'முதல்-திருமுறை - Pradhosham',
    //         timing: '8:00pm - 11:00pm',
    //     },
    // ];
    const [selectedHeader, setSelectedheader] = useState(data1[0]?.name);
    // const [selected, setSelected] = useState('2024-04-13');
    const marked = useMemo(() => {
        console.log('daata'?.data?.data);
        const markedDates = {};
        let arr = [];
        data?.data?.map((item) => {
            arr.push(item?.attributes?.start_date);
        });
        console.log('🚀 ~ marked ~ arr:', arr);
        arr.forEach((date) => {
            markedDates[date] = {
                marked: true,
                dotColor: '#FCB300',
                customStyles: {
                    container: {
                        // backgroundColor: '#FCB300',
                        // height: 30,
                        borderRadius: 5,
                    },
                    text: {
                        color: 'black',
                        fontFamily: 'Mulish-Bold',
                    },
                },
            };
        });
        return markedDates;
    }, [startDate, data]);
    const selectFilter = (item) => {
        setSelectedFilter(item);
        bottomSheetRef?.current?.open();
    };

    return (
        <>
            {/* {isFetching ? null : ( */}
            <ScrollView nestedScrollEnabled style={{ backgroundColor: '#fff', flex: 1 }}>
                <Background>
                    <View
                        style={{
                            paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 0,
                        }}
                    >
                        <View style={styles.HeadeingContainer}>
                            <HeadingText text={'Calender'} nandiLogo={true} />
                        </View>
                        <View style={styles.SearchInputContainer}>
                            <View style={{ width: '84%' }}>
                                <SearchInput placeholder={'Search for Festivals/events'} />
                            </View>
                            <TouchableOpacity
                                style={styles.AddBtnContainer}
                                onPress={() => selectFilter('Add Event')}
                            >
                                <Icon name="plus" size={20} color="#222222" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            contentContainerStyle={{
                                paddingHorizontal: 15,
                                marginVertical: 10,
                            }}
                            horizontal
                            data={data1}
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
                        flex: 1,

                        // backgroundColor: "red"
                    }}
                >
                    {/* <CalendarProvider
                        style={[styles.calenderContainer, styles.shadowProps]}
                        date={selectMonth}
                    >
                        <ExpandableCalendar
                            context={{ date: selectMonth ?? new Date() }}
                            theme={{
                                arrowColor: '#222222',
                                dayTextColor: '#222222',
                                textDayFontFamily: 'Mulish-Bold',
                                textDisabledColor: 'grey',
                                monthTextColor: '#222222',
                                textDayFontWeight: '600',
                                textMonthFontWeight: '600',
                                calendarBackground: '#FFFFFF',
                                todayBackgroundColor: 'white',
                                selectedDayBackgroundColor: 'white',
                                selectedDayTextColor: 'black',
                                textDayFontSize: 11,
                                textDayStyle: { fontsize: 11 },
                            }}
                            current={selectMonth}
                            key={selectMonth}
                            enableSwipeMonths={false}
                            disableArrowLeft={isFetching || disableMonthChangeVal}
                            disableArrowRight={isFetching || disableMonthChangeVal}
                            displayLoadingIndicator={isFetching || disableMonthChangeVal}
                            onMonthChange={(month) => {
                                setDisableMonthChangeVal(() => true);
                                if (disableMonthChangeValRef.current) {
                                    clearTimeout(disableMonthChangeValRef.current);
                                }
                                disableMonthChangeValRef.current = setTimeout(() => {
                                    setDisableMonthChangeVal(() => false);
                                    setSelectMonth(() => new Date(month?.dateString).toISOString());
                                    // setDate(() => new Date(month?.dateString).toISOString());
                                }, 1000);
                            }}
                            markingType="custom"
                            markedDates={marked}
                            style={styles.calenderTheme}
                        />
                    </CalendarProvider> */}
                    <Calendar
                        pinchGestureEnabled={false}
                        disableMonthChange={isFetching}
                        // horizontal={false}
                        // initialDate={new Date()}
                        // date={new Date()}
                        theme={{
                            arrowColor: '#222222',
                            dayTextColor: '#222222',
                            textDayFontFamily: 'Mulish-Bold',
                            textDisabledColor: 'grey',
                            monthTextColor: '#222222',
                            textDayFontWeight: '600',
                            textMonthFontWeight: '600',
                            calendarBackground: '#FFFFFF',
                            todayBackgroundColor: 'white',
                            selectedDayBackgroundColor: 'white',
                            selectedDayTextColor: 'black',
                            textDayFontSize: 11,
                            textDayStyle: { fontsize: 11 },
                        }}
                        current={selectMonth}
                        key={selectMonth}
                        enableSwipeMonths={false}
                        disableArrowLeft={isFetching || disableMonthChangeVal}
                        disableArrowRight={isFetching || disableMonthChangeVal}
                        displayLoadingIndicator={isFetching || disableMonthChangeVal}
                        onMonthChange={(month) => {
                            setDisableMonthChangeVal(() => true);
                            if (disableMonthChangeValRef.current) {
                                clearTimeout(disableMonthChangeValRef.current);
                            }
                            disableMonthChangeValRef.current = setTimeout(() => {
                                setDisableMonthChangeVal(() => false);
                                setSelectMonth(() => new Date(month?.dateString).toISOString());
                                // setDate(() => new Date(month?.dateString).toISOString());
                            }, 1000);
                        }}
                        markingType="custom"
                        markedDates={marked}
                        style={styles.calenderTheme}
                    />

                    {selectedHeader == 'Events' && (
                        <View style={styles.filterContainer}>
                            <TouchableOpacity
                                onPress={() => selectFilter('Event')}
                                style={
                                    eventCaetgory?.name
                                        ? [styles.filterButton, { borderColor: colors.commonColor }]
                                        : styles.filterButton
                                }
                            >
                                <Text
                                    style={
                                        eventCaetgory?.name
                                            ? [styles.filtertext, { color: colors.commonColor }]
                                            : styles.filtertext
                                    }
                                >
                                    {eventCaetgory == null ? 'Event Category' : eventCaetgory?.name}
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-down"
                                    size={20}
                                    color="rgba(119, 119, 119, 1)"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectFilter('Location')}
                                style={{
                                    marginHorizontal: 15,
                                    flexDirection: 'row',
                                    borderColor: 'rgba(229, 229, 229, 1)',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                }}
                            >
                                <Text style={styles.filtertext}>Location</Text>
                                <MaterialIcons
                                    name="keyboard-arrow-down"
                                    size={20}
                                    color="rgba(119, 119, 119, 1)"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    {todaysEvent !== null && (
                        <View style={{ paddingHorizontal: 0, marginVertical: 15 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Lora-Bold',
                                    color: '#222222',
                                    marginHorizontal: 20,
                                    marginBottom: 15,
                                }}
                            >
                                Today {moment().format('MMMM Do YYYY,')}
                            </Text>
                            <ElevatedCard
                                navigation={() =>
                                    navigation.navigate(RouteTexts.EVENT_DETAILS, {
                                        item: todaysEvent,
                                    })
                                }
                                theme={{ colorscheme: theme.colorscheme }}
                            >
                                <EventCard
                                    date={moment(todaysEvent?.start_date).get('D')}
                                    timing={`${moment(todaysEvent?.attributes?.start_date).format(
                                        'MMMM DD YYYY'
                                    )} -${moment(todaysEvent?.attributes?.end_date).format(
                                        'MMMM DD YYYY'
                                    )} `}
                                    title={todaysEvent?.attributes?.title}
                                    item={todaysEvent}
                                    theme={{
                                        textColor: theme.textColor,
                                        colorscheme: theme.colorscheme,
                                    }}
                                />
                            </ElevatedCard>
                        </View>
                    )}
                    <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                            This Month
                        </Text>
                    </View>

                    <FlatList
                        data={data?.data}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        renderItem={({ item, index }) => (
                            <ElevatedCard
                                navigation={() =>
                                    navigation.navigate(RouteTexts.EVENT_DETAILS, {
                                        item: item,
                                    })
                                }
                                theme={{ colorscheme: theme.colorscheme }}
                            >
                                <EventCard
                                    date={moment(item?.start_date).get('D')}
                                    timing={`${moment(item?.attributes?.start_date).format(
                                        'MMMM DD YYYY'
                                    )} -${moment(item?.attributes?.end_date).format(
                                        'MMMM DD YYYY'
                                    )} `}
                                    title={item?.attributes?.title}
                                    item={item}
                                    theme={{
                                        textColor: theme.textColor,
                                        colorscheme: theme.colorscheme,
                                    }}
                                />
                            </ElevatedCard>
                        )}
                    />
                    <RBSheet height={500} closeOnDragDown ref={bottomSheetRef}>
                        {selectedFilter == 'Event' ? (
                            <>
                                <EventSelectionType
                                    setEventCategory={setEventCategory}
                                    eventCaetgory={eventCaetgory}
                                />
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        position: 'absolute',
                                        bottom: 10,
                                    }}
                                >
                                    <ButtonComp
                                        color={true}
                                        text="Search"
                                        navigation={() => alert(eventCaetgory)}
                                    />
                                </View>
                            </>
                        ) : selectedFilter == 'Add Event' ? (
                            <SubmitEnteries
                                navigation={navigation}
                                setSelectedEvent={setSelectedEvent}
                                selectedEvent={selectedEvent}
                                closeSheet={() => bottomSheetRef.current.close()}
                            />
                        ) : (
                            <LocationSelection />
                        )}
                    </RBSheet>
                </View>
            </ScrollView>
            {/* )} */}
        </>
    );
};
export const styles = StyleSheet.create({
    HeadeingContainer: { paddingHorizontal: 15, justifyContent: 'center', marginVertical: 15 },
    SearchInputContainer: { flexDirection: 'row' },
    AddBtnContainer: {
        backgroundColor: '#FCB300',
        height: 55,
        width: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calenderContainer: {
        // backgroundColor: 'red',
        marginHorizontal: 3,
        alignSelf: 'center',
        borderRadius: 10,
        width: Dimensions.get('window').width - 20
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
        borderRadius: 10,
        height: 'auto', elevation: 4,
        shadowColor: colors.grey8, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 4, width: Dimensions.get('window').width - 20, alignSelf: 'center'

    },
    itemContainer: {
        height: 75,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemText: { fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' },
    itemDateContainer: {
        paddingHorizontal: 15,
        borderRightWidth: 1,
        borderRightColor: colors.grey3,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemDateText: { fontSize: 20, fontFamily: 'Mulish-Bold', color: '#222222' },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    filterButton: {
        flexDirection: 'row',
        borderColor: 'rgba(229, 229, 229, 1)',
        borderWidth: 1,
        borderRadius: 20,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    filtertext: { fontFamily: 'Mulish-Regular', fontSize: 12, color: 'rgba(119, 119, 119, 1)' },
});
export default Calender;
