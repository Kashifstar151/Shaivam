import React, { useContext, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    UIManager,
    Platform,
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
import PushNotification, { Importance } from 'react-native-push-notification';
import moment from 'moment';
import {
    useGetFestivalListQuery,
    useGetListQuery,
    useGetRecurringEventListQuery,
    useGetRecurringEventMonthlyQuery
} from '../../store/features/Calender/CalenderApiSlice';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Calender = ({ navigation }) => {
    const data1 = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ];
    const [selectMonth, setSelectMonth] = useState(new Date().toISOString());
    const [searchText, setSearchText] = useState(null);
    const [eventCategory, setEventCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [startDate, setStartDate] = useState('')
    const [todayEvent, setTodayEvent] = useState([])
    const [endDate, setEndDate] = useState('')
    const flatListRef = useRef(null)
    const {
        data: regularEvent,
        isFetching: isFetchingRegular,
        refetch: refetchRegular,
        isSuccess: regularSuccess
    } = useGetListQuery({ selectedLocation, selectMonth }, { skip: !selectMonth });
    const {
        data: recurringEventList,
        isFetching: isFetchingRecurring,
        refetch: refetchRecurring,
        isSuccess: recurringSuccess

    } = useGetRecurringEventListQuery({ selectedLocation });
    const {
        data: festivalEvents,
        isFetching: isfestivaldataFetching,
        refetch: refetchFestival,
        isSuccess: isFestivalSuccess

    } = useGetFestivalListQuery();
    // console.log("🚀 ~ Calender ~ recurringEventList:", recurringEventList)
    const {
        data: monthRecurringEventList,
        isFetching: isFetchingMonthly,
        refetch: refetchMonthly,
        isSuccess: recurringMonthlySuccess

    } = useGetRecurringEventMonthlyQuery({ selectedLocation });
    const [weekly, setWeekly] = useState([]);
    const [regular, setRegular] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [prevNext, setPrevNext] = useState(0)
    const bottomSheetRef = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const disableMonthChangeValRef = useRef();
    const [disableMonthChangeVal, setDisableMonthChangeVal] = useState(false);
    const [notificationOnEvent, setNotificationEvents] = useState([])
    const { theme } = useContext(ThemeContext);
    const [scrollIndex, setScrollIndex] = useState(0)
    const [trigger, setTrigger] = useState(false)
    const clearStates = () => {
        setWeekly([]);
        setRegular([]);
        setMonthly([]);
        setMainData([]);
        // setTodayEvent([])
    };
    useFocusEffect(
        useCallback(() => {
            return () => bottomSheetRef.current?.close();
        }, [])
    );

    // Refetch data when location changes
    useEffect(() => {
        refetchRegular();
        refetchRecurring();
        refetchMonthly();
    }, [prevNext]);

    // useEffect(() => {
    //     if (prevNext == 0) {
    //         setEndDate(String(moment().add(prevNext, "months").endOf("month")));
    //         setStartDate(String(moment(new Date()).format("YYYY-MM-DD")));
    //         return;
    //     }
    //     console.log("prevNext is", prevNext);
    //     setEndDate(String(moment().add(prevNext, "months").endOf("month")));
    //     setStartDate(String(moment().add(prevNext, "months").startOf("month").format("YYYY-MM-DD")));
    //     setTrigger(!trigger)
    // }, [prevNext]);
    useEffect(() => {
        getScheduleNotification()
    }, [])
    const getScheduleNotification = () => {
        PushNotification.getScheduledLocalNotifications(callbacks => {
            console.log("🚀 ~ getScheduleNotification ~ callbacks:", callbacks)
            setNotificationEvents(callbacks)
        })
    }
    useEffect(() => {
        if (regularEvent && regularSuccess) {
            setRegular([]);
            const data = regularEvent.data.map(event => ({
                ...event,
                start_date: event.attributes.start_date,
                end_date: event.attributes.end_date
            }));
            setRegular(data);
            setChanged(!changed);
        }
    }, [regularEvent, prevNext, selectedLocation, selectMonth]);

    // Process recurring event list
    useEffect(() => {
        if (recurringEventList && recurringSuccess) {
            setWeekly([]);
            const data = [];
            const cDate = moment().startOf("day");
            // console.log("🚀 ~ useEffect ~ prevNext:", prevNext)
            for (let event of recurringEventList?.data) {
                // console.log(event.attributes.Day)
                // console.log(event.attributes.Name)
                // console.log("prevNext", prevNext)
                // console.log("event is ==>", event);
                const start = moment().add(prevNext, "months").startOf("month").format("YYYY-MM-DD")
                let dateSplit = start.split("-")
                // console.log("🚀 ~ file: events-important-events-of-this-year.jsx:119 ~ useEffect ~ dateSplit:", dateSplit)
                const days = getDaysInMonth(dateSplit[1], dateSplit[0], event.attributes.Day)
                for (let day of days) {
                    if (day >= cDate) {
                        let out = JSON.parse(JSON.stringify(event))
                        // handling the first index ...
                        let finalizedDate = day
                        out.start_date = finalizedDate
                        out.end_date = finalizedDate
                        out.attributes.images = event.attributes.File
                        data.push(out)

                    }
                }
            }
            // console.log("🚀 ~ useEffect ~ days:", data)
            setWeekly(data);
            setChanged(!changed);
        }
    }, [recurringEventList, prevNext]);

    // Process regular events


    // Process monthly recurring events
    useEffect(() => {
        if (monthRecurringEventList && recurringMonthlySuccess) {
            setMonthly([]);
            const cDate = moment().startOf("day");
            const data = [];
            const start = moment().add(prevNext, 'months').startOf("month").format("YYYY-MM-DD");
            // console.log("🚀 ~ useEffect ~ start:", start)
            const [year, month] = start.split("-");
            monthRecurringEventList.data.forEach(event => {
                const days = getDaysInMonth(month, year, event.attributes.Day);
                const finalizedDate = findFinalizedDate(days, event.attributes.Days, cDate);
                if (finalizedDate) {
                    const eventCopy = {
                        ...event,
                        start_date: finalizedDate,
                        end_date: finalizedDate
                    };
                    data.push(eventCopy);
                }
            });
            // console.log("🚀 ~ useEffect ~ data:", JSON.stringify(data, 0, 2))
            setMonthly(data);
            setChanged(!changed);
        }
    }, [monthRecurringEventList, prevNext, selectedLocation]);

    // Combine all events into a sorted list
    useEffect(() => {
        setMainData([])
        let today = []
        const allEvents = [...regular, ...monthly,];
        const sortedEvents = allEvents.sort((a, b) => moment(a.start_date).diff(moment(b.start_date)));
        sortedEvents?.map((item) => {
            if (moment(item?.start_date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                // setTodayEvent(prev => [...prev, item])
                today.push(item)
            }
        })
        setTodayEvent(today)
        setMainData(sortedEvents);
    }, [changed]);

    const selectFilter = (item) => {
        setSelectedFilter(item);
        bottomSheetRef.current.open();
    };

    const findFinalizedDate = (days, daysType, cDate) => {
        console.log("🚀 ~ findFinalizedDate ~ days:", days, daysType, cDate)
        let finalizedDate = null;

        switch (daysType) {
            case "one":
                finalizedDate = days[0] && days[0] >= cDate ? days[0] : null;
                break;
            case "two":
                finalizedDate = days[1] && days[1] >= cDate ? days[1] : null;
                break;
            case "three":
                finalizedDate = days[2] && days[2] >= cDate ? days[2] : null;
                break;
            case "four":
                finalizedDate = days[3] && days[3] >= cDate ? days[3] : null;
                break;
            case "last":
                const lastDay = days[4] || days[days.length - 1];
                finalizedDate = lastDay && lastDay >= cDate ? lastDay : null;
                break;
        }
        console.log('finalizedDate', finalizedDate)
        return finalizedDate;
    };

    const getDaysInMonth = (month, year, dayOfWeek) => {
        const daysInMonth = moment(`${year}-${month}-01`).daysInMonth();
        const firstDayOfMonth = moment(`${year}-${month}-01`);
        const days = [];
        for (let i = 0; i < daysInMonth; i++) {
            const day = firstDayOfMonth.clone().add(i, "days");
            const dayName = day.format("dddd");

            if (dayName === dayOfWeek) {
                days.push(day.toDate());
            }
        }

        return days;
    };
    const selectdateHandler = (res) => {
        // mainData?.map((item, index) => {
        const foundIndex = mainData.findIndex((item) =>
            moment(item.start_date).isSame(res?.dateString, 'day')
        );
        console.log("🚀 ~ //mainData?.map ~ foundIndex:", foundIndex)
        if (foundIndex !== -1 && foundIndex < mainData.length) {
            setScrollIndex(foundIndex);
            flatListRef.current?.scrollToIndex({
                animated: true,
                index: foundIndex
            });
        }
        // if (moment(item.start_date).get('D') === moment(res?.dateString).get('D')) {
        //     // alert(true)
        //     setScrollIndex(index)
        //     flatListRef?.current?.scrollToIndex({
        //         animated: true,
        //         index: index,
        //     });
        // }
        // })
    }
    const EventNavigation = (item) => {
        if (selectedHeader == data1[0].name) {
            navigation.navigate(RouteTexts.WEBSIRE_VIEW, {
                item: item
            })
        } else {
            navigation.navigate(RouteTexts.EVENT_DETAILS, {
                item: item,
            })
        }
    }
    const getItemLayOut = (item, index) => {
        // console.log("🚀 ~ getItemLayOut ~ index:", index, JSON.stringify(item, 0, 2))
        return { length: 100, offset: 100 * index, index };
    };
    const [selectedHeader, setSelectedHeader] = useState(data1[0].name);
    const marked = useMemo(() => {
        const markedDates = {};
        regularEvent?.data?.forEach(item => {
            const date = item.attributes.start_date;
            markedDates[date] = {
                marked: true,
                dotColor: '#FCB300',
                customStyles: {
                    container: { borderRadius: 5 },
                    text: { color: 'black', fontFamily: 'Mulish-Bold' }
                }
            };
        });
        return markedDates;
    }, [regular]);

    return (
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
                            <SearchInput placeholder={'Search for Festivals/events'} setState={setSearchText} />
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
                                setHeader={setSelectedHeader}
                                item={item}
                                index={index}
                            />
                        )}
                    />
                </View>
            </Background>
            <View
                style={{
                    marginTop: 10,
                    flex: 1,
                }}>
                <Calendar
                    pinchGestureEnabled={false}
                    disableMonthChange={isFetchingRegular}
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

                    onDayPress={(item) => selectdateHandler(item)}
                    key={selectMonth}
                    enableSwipeMonths={false}
                    disableArrowLeft={isFetchingRegular || disableMonthChangeVal}
                    disableArrowRight={isFetchingRegular || disableMonthChangeVal}
                    displayLoadingIndicator={isFetchingRegular || disableMonthChangeVal}
                    onMonthChange={(month) => {
                        setDisableMonthChangeVal(() => true);
                        if (disableMonthChangeValRef.current) {
                            clearTimeout(disableMonthChangeValRef.current);
                        }
                        disableMonthChangeValRef.current = setTimeout(() => {
                            setDisableMonthChangeVal(() => false);
                            setSelectMonth(new Date(month.dateString).toISOString());
                            if (month?.month > selectMonth?.split('-')[1]) {
                                setPrevNext(prev => prev + 1)
                            } else {
                                setPrevNext(prev => prev - 1)

                            }
                        }, 1000);
                    }}
                    markingType="custom"
                    markedDates={marked}
                    style={styles.calenderTheme}
                />

                {selectedHeader === 'Events' && (
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            onPress={() => selectFilter('Event')}
                            style={
                                eventCategory
                                    ? [styles.filterButton, { borderColor: colors.commonColor }]
                                    : styles.filterButton
                            }
                        >
                            <Text
                                style={
                                    eventCategory
                                        ? [styles.filtertext, { color: colors.commonColor }]
                                        : styles.filtertext
                                }
                            >
                                {eventCategory == null ? 'Event Category' : eventCategory.name}
                            </Text>
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={20}
                                color="rgba(119, 119, 119, 1)"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => (selectedLocation !== null ? setSelectedLocation(null) : selectFilter('Location'))}
                            style={{
                                marginHorizontal: 15,
                                flexDirection: 'row',
                                borderColor: selectedLocation !== null ? '#C1554E' : 'rgba(229, 229, 229, 1)',
                                borderWidth: 1,
                                borderRadius: 20,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text style={styles.filtertext}>{selectedLocation !== null ? selectedLocation.name : 'Location'}</Text>
                            {selectedLocation !== null ? (
                                <AntDesign name="close" size={20} color="rgba(119, 119, 119, 1)" />
                            ) : (
                                <MaterialIcons name="keyboard-arrow-down" size={20} color="rgba(119, 119, 119, 1)" />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                {
                    todayEvent?.length > 0 && selectedHeader !== data1[0].name &&
                    <>
                        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                                Today
                            </Text>
                        </View>
                        <FlatList
                            data={todayEvent}
                            key={(item, index) => index}
                            contentContainerStyle={{ paddingBottom: 10 }}
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
                                        date={moment(item.start_date).get('D')}
                                        timing={`${moment(item.start_date ? item.start_date : item?.attributes?.start_date).format('MMMM DD YYYY')} - ${moment(item.end_date ? item.end_date : item?.attributes?.end_date).format('MMMM DD YYYY')}`}
                                        title={selectedHeader == data1[0].name ? item?.attributes?.Calendar_title : item.attributes.title}
                                        item={item}
                                        theme={{
                                            textColor: theme.textColor,
                                            colorscheme: theme.colorscheme,
                                        }}
                                    />
                                </ElevatedCard>
                            )}
                        />
                    </>
                }
                <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                        This Month
                    </Text>
                </View>
                <FlatList
                    getItemLayout={getItemLayOut}
                    initialScrollIndex={scrollIndex}
                    data={selectedHeader == data1[0].name ? festivalEvents?.data : mainData}
                    key={(item, index) => index}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <ElevatedCard
                            navigation={() =>
                                EventNavigation(item)
                            }
                            theme={{ colorscheme: theme.colorscheme }}
                        >
                            <EventCard
                                date={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).get('D') : moment(item.start_date).get('D')}
                                timing={selectedHeader == data1[0].name ? '' : `${moment(item.start_date ? item.start_date : item?.attributes?.start_date).format('MMMM DD YYYY')} - ${moment(item.end_date ? item.end_date : item?.attributes?.end_date).format('MMMM DD YYYY')}`}
                                title={selectedHeader == data1[0].name ? item?.attributes?.Calendar_title : item.attributes.title}
                                item={item}
                                header={selectedHeader}
                                theme={{
                                    textColor: theme.textColor,
                                    colorscheme: theme.colorscheme,
                                }}
                            />
                        </ElevatedCard>
                    )}
                />
                <RBSheet height={500} closeOnDragDown ref={bottomSheetRef}>
                    {selectedFilter === 'Event' ? (
                        <>
                            <EventSelectionType
                                setEventCategory={setEventCategory}
                                eventCategory={eventCategory}
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
                                    navigation={() => alert(eventCategory)}
                                />
                            </View>
                        </>
                    ) : selectedFilter === 'Add Event' ? (
                        <SubmitEnteries
                            navigation={navigation}
                            setSelectedEvent={setSelectedFilter}
                            selectedEvent={selectedFilter}
                            closeSheet={() => bottomSheetRef.current.close()}
                        />
                    ) : (
                        <LocationSelection calendar={true} setSelected={setSelectedLocation} close={bottomSheetRef} />
                    )}
                </RBSheet>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    calenderTheme: {
        borderRadius: 10,
        height: 'auto',
        elevation: 4,
        shadowColor: colors.grey8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center',
    },
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
