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
    ActivityIndicator,
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
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
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
import { useTranslation } from 'react-i18next';
import { useDebouncer } from '../../Helpers/useDebouncer';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Calender = ({ navigation }) => {
    const isFocused = useIsFocused()
    const { t } = useTranslation()
    const data1 = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ];
    const [selectMonth, setSelectMonth] = useState(new Date().toISOString());
    const [searchText, setSearchText] = useState('');
    const [eventCategory, setEventCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [startDate, setStartDate] = useState('')
    const [todayEvent, setTodayEvent] = useState([])
    const [showLoader, setShowLoader] = useState(false)
    const [endDate, setEndDate] = useState('')
    const flatListRef = useRef(null)
    const {
        data: regularEvent,
        isFetching: isFetchingRegular,
        refetch: refetchRegular,
        isSuccess: regularSuccess
    } = useGetListQuery({ selectedLocation, selectMonth, eventCategory }, { skip: !selectMonth });
    // console.log("🚀 ~ regularEvent:", regularEvent)
    const {
        data: recurringEventList,
        isFetching: isFetchingRecurring,
        refetch: refetchRecurring,
        isSuccess: recurringSuccess

    } = useGetRecurringEventListQuery({ selectedLocation, eventCategory });
    // console.log("🚀 ~ recurringEventList:", recurringEventList)
    const {
        data: festivalEvents,
        isFetching: isfestivaldataFetching,
        refetch: refetchFestival,
        isSuccess: isFestivalSuccess

    } = useGetFestivalListQuery({ selectMonth });
    // console.log("🚀 ~ Calender ~ recurringEventList:", JSON.stringify(regularEvent, 0, 2))
    const {
        data: monthRecurringEventList,
        isFetching: isFetchingMonthly,
        refetch: refetchMonthly,
        isSuccess: recurringMonthlySuccess

    } = useGetRecurringEventMonthlyQuery({ selectedLocation, eventCategory });
    // console.log("🚀 ~ monthRecurringEventList:", monthRecurringEventList)
    const [weekly, setWeekly] = useState([]);
    const [regular, setRegular] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [selectedList, setSelecetedList] = useState([])
    const [prevNext, setPrevNext] = useState(0)
    const bottomSheetRef = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const disableMonthChangeValRef = useRef();
    const [disableMonthChangeVal, setDisableMonthChangeVal] = useState(false);
    const [notificationOnEvent, setNotificationEvents] = useState([])
    const { theme } = useContext(ThemeContext);
    const [filteredData, setFilteredData] = useState([])
    const debounceVal = useDebouncer(searchText, 500);
    // const [scrollIndex, setScrollIndex] = useState(0)
    // const [trigger, setTrigger] = useState(false)
    // const clearStates = () => {
    //     setWeekly([]);
    //     setRegular([]);
    //     setMonthly([]);
    //     setMainData([]);
    //     // setTodayEvent([])
    // };
    useEffect(() => {
        setWeekly([]);
        setRegular([]);
        setMonthly([]);
        setMainData([]);
    }, [prevNext])
    useFocusEffect(
        useCallback(() => {
            return () => bottomSheetRef.current?.close();
        }, [])
    );
    useEffect(() => {
        getScheduleNotification()
    }, [isFocused])

    const getScheduleNotification = () => {
        PushNotification.getScheduledLocalNotifications(callbacks => {
            console.log("🚀 ~ getScheduleNotification ~ callbacks:", callbacks)
            setNotificationEvents(callbacks)
        })
    }
    useEffect(() => {

        // console.log("🚀 ~ useEffect ~ regularEvent:", regularEvent)
        if (regularEvent && regularSuccess) {
            setShowLoader(true)
            // alert('regular event')
            // console.log('recurringEventList?.meta?.pagination?.total regular', regularEvent?.meta?.pagination?.total)

            setRegular([]);
            const data = regularEvent.data.map(event => ({
                ...event,
                start_date: event.attributes.start_date,
                end_date: event.attributes.end_date
            }));
            setRegular(data);
            setChanged(!changed);
        }
    }, [regularEvent, prevNext, selectedLocation, eventCategory, regularSuccess]);

    // Process recurring event list
    useEffect(() => {
        // console.log("🚀 ~ useEffect ~ recurringEventList:", recurringEventList)
        if (recurringEventList && recurringSuccess) {
            const data = []
            // alert('recurring event weekly')
            const cDate = moment().startOf("day");
            for (let event of recurringEventList?.data) {
                const start = moment().add(prevNext, "months").startOf("month").format("YYYY-MM-DD")
                let dateSplit = start.split("-")
                const days = getDaysInMonth(dateSplit[1], dateSplit[0], event.attributes.day)
                console.log("🚀 ~ useEffect ~ days:", days)
                for (let day of days) {
                    if (day >= cDate) {
                        console.log('running')
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
            setWeekly(data);
            setChanged(!changed);
        }
    }, [recurringEventList, prevNext, selectedLocation, eventCategory, recurringSuccess]);

    // Process regular events


    // Process monthly recurring events
    useEffect(() => {
        // clearStates()
        // console.log("🚀 ~ useEffect ~ monthRecurringEventList:", monthRecurringEventList)
        if (monthRecurringEventList && recurringMonthlySuccess) {
            // alert('recurring event monthly')

            // console.log('recurringEventList?.meta?.pagination?.total month recurring', monthRecurringEventList?.meta?.pagination?.total)

            setMonthly([]);
            const cDate = moment().startOf("day");
            const data = [];
            const start = moment().add(prevNext, 'months').startOf("month").format("YYYY-MM-DD");
            // const [year, month] = start.split("-");
            for (let event of monthRecurringEventList?.data) {
                const start = moment().add(prevNext, "months").startOf("month").format("YYYY-MM-DD")
                let dateSplit = start.split("-")
                const days = getDaysInMonth(dateSplit[1], dateSplit[0], event.attributes.day)
                let finalizedDate = null
                switch (event?.attributes?.days) {
                    case "one":
                        if (days[0] && days[0] >= cDate) {
                            // handling the first index ...
                            finalizedDate = moment(days[0])
                        }
                        break
                    case "two":
                        // handling the 2nd Index ...
                        if (days[1] && days[1] >= cDate) {
                            finalizedDate = moment(days[1])
                        }
                        break
                    case "three":
                        // handling the 3rd index ...
                        if (days[2] && days[2] >= cDate) {
                            finalizedDate = moment(days[2])
                        }
                        break
                    case "four":
                        // handling the 4th index ...
                        if (days[3] && days[3] >= cDate) {
                            finalizedDate = moment(days[3])
                        }
                        break
                    case "last":
                        // handling the last index ....
                        let trig = false
                        if (days[4] && days[4] >= cDate) {
                            trig = true
                            finalizedDate = moment(days[4])
                        }
                        if (!trig) {
                            let index = days.length - 1
                            if (days[index] && days[index] >= cDate) {
                                trig = true
                                finalizedDate = moment(days[index])
                            }
                        }
                        break
                }
                if (finalizedDate) {
                    let out = JSON.parse(JSON.stringify(event))
                    out.start_date = finalizedDate
                    out.end_date = finalizedDate
                    out.attributes.images = event.attributes.File
                    // data event push ...
                    data.push(out)

                }
            }
            setMonthly(data);
            setChanged(!changed);
        }
    }, [monthRecurringEventList, prevNext, selectedLocation, eventCategory, recurringMonthlySuccess]);

    // Combine all events into a sorted list
    useEffect(() => {
        // clearStates()
        setMainData([])
        // alert('main data')
        let today = []
        const allEvents = []
        if (weekly) {
            for (let w of weekly) {
                allEvents.push(w)
            }
        }
        if (monthly) {
            for (let m of monthly) {
                allEvents.push(m)
            }
        }
        if (regular) {
            for (let r of regular) {
                allEvents.push(r)
            }
        }
        let sortedEvents = allEvents.sort((a, b) => moment(a.start_date) - moment(b.start_date));
        setMainData(sortedEvents)
        setShowLoader(false)
        sortedEvents?.map((item) => {
            if (moment(item?.start_date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                // setTodayEvent(prev => [...prev, item])
                today.push(item)
            }
        })
        setTodayEvent(today)
        // setMainData(sortedEvents);
    }, [changed]);

    useEffect(() => {
        let data = []
        if (selectedHeader == data1[1].name) {
            data = mainData.filter((item) => item?.attributes?.title?.includes(searchText))
            // console.log("🚀 ~ useEffect ~ data:", data)
            setFilteredData(data)
        } else {
            data = festivalEvents?.data?.filter((item) => item?.attributes?.Calendar_title?.includes(searchText))
            setFilteredData(data)
        }
    }, [debounceVal])
    useEffect(() => {
        // console.log('setFilteredData', searchText)
    }, [searchText])

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

    function getDaysInMonth(month, year, dayOfWeek) {
        console.log("🚀 ~ getDaysInMonth ~ month:", month, year)
        const daysInMonth = moment(`${year}-${month}-01`).daysInMonth();
        //get the number of days in the month. ⤴️
        const firstDayOfMonth = moment(`${year}-${month}-01`);
        // first day of the given month and year ⤴️
        const days = [];

        for (let i = 0; i < daysInMonth; i++) {
            const day = firstDayOfMonth.clone().add(i, "days");
            // clone the first day of the month and add the number of days to it ⤴️
            const dayName = day.format("dddd");
            console.log("dayName", dayName);
            // get the day of the week based on the day of the month ⤴️


            if (dayName === dayOfWeek) {
                days.push(day.toDate());
                // push the day of the week to the days array ⤴️
            }
        }

        return days;
    }
    const selectdateHandler = (res) => {
        console.log("🚀 ~ selectdateHandler ~ res:", res)
        // mainData?.map((item, index) => {
        if (selectedHeader === data1[1].name) {
            let arr = mainData?.filter((item) =>
                moment(item?.start_date).format('YYYY-MM-DD') == res?.dateString
            )
            console.log(arr.length, 'onsole.log(arr.length)')
            setSelecetedList(arr)
        } else {
            let arr = festivalEvents?.data?.filter((item) =>
                moment(item?.attributes?.calendar_from_date).format('YYYY-MM-DD') == res?.dateString
            )
            setSelecetedList(arr)
            console.log(arr.length, 'onsole.log(arr.length)')

        }
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
        return { length: 100, offset: 100 * index, index };
    };

    const [selectedHeader, setSelectedHeader] = useState(data1[0].name);
    const marked = useMemo(() => {
        const markedDates = {};
        if (selectedHeader == data1[0].name) {
            festivalEvents?.data?.forEach(item => {
                const date = moment(item?.attributes?.calendar_from_date).format('YYYY-MM-DD');
                console.log("🚀 ~ marked ~ date:", date)
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
            // console.log(mainData, '================>')
        } else {
            mainData?.forEach(item => {
                const date = moment(item?.start_date).format('YYYY-MM-DD');
                // console.log("🚀 ~ marked ~ date: in evebt", date)
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

        }
    }, [selectedHeader, festivalEvents]);



    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }} >
            <Background>
                <View
                    style={{
                        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 0,
                    }}>
                    <View style={styles.HeadeingContainer}>
                        <HeadingText text={t('Calendar')} nandiLogo={true} />
                    </View>
                    <View style={styles.SearchInputContainer}>
                        <View style={{ width: '84%' }}>
                            <SearchInput placeholder={t('Search for Festivals/Events')} setState={setSearchText} />
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
                            marginVertical: 5,
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
            <ScrollView>
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
                            // alert(month.month)
                            setDisableMonthChangeVal(() => true);
                            if (disableMonthChangeValRef.current) {
                                clearTimeout(disableMonthChangeValRef.current);
                            }
                            disableMonthChangeValRef.current = setTimeout(() => {
                                setDisableMonthChangeVal(() => false);
                                // alert(selectMonth?.split('-')[1])
                                setSelectMonth(new Date(month.dateString).toISOString());
                                if (month?.month > selectMonth?.split('-')[1]) {
                                    setPrevNext(prev => prev + 1)
                                    // alert(prevNext)
                                    setShowLoader(true)
                                } else {
                                    setPrevNext(prev => prev - 1)
                                    setShowLoader(true)
                                    // alert(prevNext)
                                }
                            }, 1000);
                        }}
                        // onPressArrowLeft={() => {
                        //     setPrevNext(prev => prev - 1)
                        // }}
                        // onPressArrowRight={() => {
                        //     setPrevNext(prev => prev + 1)
                        // }}
                        markingType="custom"
                        markedDates={marked}
                        style={styles.calenderTheme}
                    />

                    {selectedHeader === 'Events' && (
                        <View style={styles.filterContainer}>
                            <TouchableOpacity
                                onPress={() => (eventCategory !== null ? setEventCategory(null) : selectFilter('Event'))}
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
                                    {eventCategory == null ? t('Event Category') ? t('Event Category') : 'Event Category' : eventCategory}
                                </Text>

                                {eventCategory !== null ? (
                                    <AntDesign name="close" size={20} color="rgba(119, 119, 119, 1)" />
                                ) : (
                                    <MaterialIcons
                                        name="keyboard-arrow-down"
                                        size={20}
                                        color="rgba(119, 119, 119, 1)"
                                    />
                                )}
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
                                }}>
                                <Text style={styles.filtertext}>{selectedLocation !== null ? selectedLocation?.name?.substring(0, 25) : t('Location') ? t('Location') : 'Location'}</Text>
                                {selectedLocation !== null ? (
                                    <AntDesign name="close" size={20} color="rgba(119, 119, 119, 1)" />
                                ) : (
                                    <MaterialIcons name="keyboard-arrow-down" size={20} color="rgba(119, 119, 119, 1)" />
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                    {
                        selectedList?.length > 0 &&
                        <>
                            <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                                    Selected Events
                                </Text>
                            </View>
                            <FlatList
                                getItemLayout={getItemLayOut}
                                ref={flatListRef}
                                data={selectedList}
                                key={(item, index) => index}
                                contentContainerStyle={{ paddingBottom: 10 }}
                                renderItem={({ item, index }) => (
                                    <ElevatedCard
                                        theme={{ colorscheme: theme.colorscheme }}
                                    >
                                        <EventCard
                                            date={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).get('D') : moment(item.start_date).get('D')}
                                            dateNo={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).format('DD') : moment(item.start_date).format('DD')}
                                            day={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).format('ddd') : moment(item.start_date).format('ddd')}
                                            timing={selectedHeader == data1[0].name ? null : `${moment(item.start_date ? item.start_date : item?.attributes?.start_date).format('MMMM DD YYYY')} - ${moment(item.end_date ? item.end_date : item?.attributes?.end_date).format('MMMM DD YYYY')}`}
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
                        </>
                    }
                    {
                        notificationOnEvent?.length > 0 && selectedHeader == data1[1].name &&
                        <>
                            <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                                    {t('Notification Turned on')}
                                </Text>
                            </View>
                            <FlatList
                                data={notificationOnEvent}
                                key={(item, index) => index}
                                contentContainerStyle={{ paddingBottom: 10 }}
                                renderItem={({ item, index }) => (
                                    <ElevatedCard
                                        // navigation={() =>
                                        //     navigation.navigate(RouteTexts.EVENT_DETAILS, {
                                        //         item: item,
                                        //     })
                                        // }
                                        theme={{ colorscheme: theme.colorscheme }}
                                    >
                                        <EventCard
                                            date={moment(item.date).get('D')}
                                            dateNo={moment(item?.date).format('DD')}
                                            day={moment(item?.date).format('ddd')}
                                            timing={`${moment(item.date).format('MMMM DD YYYY')} - ${moment(item.date).format('MMMM DD YYYY')}`}
                                            title={item?.message}
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
                    {
                        todayEvent?.length > 0 && selectedHeader !== data1[0].name &&
                        <>
                            <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                                    {t('Today')}
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
                                            dateNo={moment(item.start_date ? item.start_date : item?.attributes?.start_date).format('DD')}
                                            day={moment(item.start_date ? item.start_date : item?.attributes?.start_date).format('ddd')}
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
                    {
                        showLoader ? <View style={{ height: 200, width: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} />
                        </View> :
                            <>
                                <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold', color: '#222222' }}>
                                        {t('This Month')}
                                    </Text>
                                </View>
                                <FlatList
                                    getItemLayout={getItemLayOut}
                                    ref={flatListRef}
                                    data={selectedHeader == data1[0].name ? searchText == '' ? festivalEvents?.data : filteredData : searchText == '' ? mainData : filteredData}
                                    key={(item, index) => index}
                                    contentContainerStyle={{ paddingBottom: 100 }}
                                    renderItem={({ item, index }) => (
                                        <ElevatedCard
                                            navigation={() =>
                                                EventNavigation(item)
                                            }
                                            theme={{ colorscheme: theme.colorscheme }}
                                        >
                                            <EventCard
                                                date={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).get('D') : moment(item.start_date).get('D')}
                                                dateNo={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).format('DD') : moment(item.start_date).format('DD')}
                                                day={selectedHeader == data1[0].name ? moment(item?.attributes?.calendar_from_date).format('ddd') : moment(item.start_date).format('ddd')}
                                                timing={selectedHeader == data1[0].name ? null : `${moment(item.start_date ? item.start_date : item?.attributes?.start_date).format('MMMM DD YYYY')} - ${moment(item.end_date ? item.end_date : item?.attributes?.end_date).format('MMMM DD YYYY')}`}
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
                            </>
                    }
                    <RBSheet height={500} closeOnDragDown ref={bottomSheetRef}>
                        {selectedFilter === 'Event' ? (
                            <>
                                <EventSelectionType
                                    setCategory={setEventCategory}
                                    category={eventCategory}
                                    bottomSheetRef={bottomSheetRef}
                                />
                                {/* <View
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
                                        navigation={() => bottomSheetRef?.current?.close()}
                                    />
                                </View> */}
                            </>
                        ) : selectedFilter === 'Add Event' ? (
                            <SubmitEnteries
                                navigation={navigation}
                                setSelectedEvent={setSelectedFilter}
                                selectedEvent={selectedFilter}
                                closeSheet={() => bottomSheetRef.current.close()}
                            />
                        ) : (
                            <LocationSelection selectedLocation={selectedLocation} calender={true} setSelected={setSelectedLocation} close={bottomSheetRef} />
                        )}
                    </RBSheet>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    HeadeingContainer: { paddingHorizontal: 15, justifyContent: 'center', marginVertical: 10 },
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
        marginVertical: 20,
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
