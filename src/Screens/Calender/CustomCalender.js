import moment from 'moment/moment';
import React, { useMemo, useState } from 'react';

import { View, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import { Agenda, Calendar, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import ElevatedCard from '../../components/ElevatedCard';
import EventCard from '../../components/EventCard';

// import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';

const CustomCalender = ({ setFullScreen }) => {
    const [week, setWeek] = useState(0);
    const [value, setValue] = useState(new Date());
    const [index, setIndex] = useState(1);

    const weeks = React.useMemo(() => {
        const start = moment().add(week, 'weeks').startOf('week');
        return [-1, 0, 1].map((adj) => {
            return Array.from({ length: 7 }).map((_, index) => {
                const date = moment(start).add(adj, 'week').add(index, 'day');
                return {
                    weekDay: date.format('ddd'),
                    date: date.toDate(),
                };
            });
        });
    }, [week]);
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
    const formatDate = (date) => {
        // Check if the date is today
        if (moment().isSame(date, 'day')) {
            // Format it as "Today, MMM DD, YYYY" if it is today
            return `Today, ${date.format('MMM DD, YYYY')}`;
        } else {
            // Otherwise, just format it as "MMM DD, YYYY"
            return date.format('MMM DD, YYYY');
        }
    };
    const changeWeeksCalnder = (index) => {
        if (index == 1) {
            return;
        }
        setTimeout(() => {
            const newIndex = index - 1;
            const newWeek = week + newIndex;
            setWeek(newWeek);
            setValue(moment(value).add(newIndex, 'week'));
        }, 200);
    };

    return (
        <View
            style={[styles.shadowProps, styles.calenderContainer]}>
            {/* <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#EDEDED',
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon name="chevron-left" size={22} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Mulish-Bold', color: '#222' }}>
                    {formatDate(moment())}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#EDEDED',
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon name="chevron-right" size={22} />
                </TouchableOpacity>
            </View>
            <Swiper
                loop={false}
                index={index}
                showsPagination={false}
                onIndexChanged={(inde) => {
                    changeWeeksCalnder(inde);
                }}
            >
                {weeks.map((dates, index) => (
                    <View style={{ flexDirection: 'row' }}>
                        {dates.map((item, i) => (
                            <TouchableOpacity
                                style={{
                                    height: 65,
                                    width: 41,
                                    backgroundColor: '#FCB300',
                                    marginHorizontal: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Mulish-SemiBold',
                                        fontSize: 10,
                                        color: '#777777',
                                    }}
                                >
                                    {item.weekDay}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Mulish-Bold',
                                        fontSize: 14,
                                        color: '#222222',
                                    }}
                                >
                                    {item.date.getDate()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

            </Swiper> */}
            <CalendarProvider date={new Date().toISOString()}>
                <ExpandableCalendar
                    theme={{
                        arrowColor: '#777777',
                        dayTextColor: '#222222',
                        textDayFontFamily: 'Mulish-Bold',
                        textDisabledColor: 'grey',
                        monthTextColor: '#222222',
                        textDayFontWeight: '600',
                        textMonthFontWeight: '600',
                        backgroundColor: '#FFFFFF',

                    }}
                    onDayPress={(day) => setSelected(day?.dateString)}
                    markingType="custom"
                    markedDates={marked}
                    style={styles.calenderTheme} />
            </CalendarProvider>
            {/* <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setFullScreen(true)}>
                <Icon name="chevron-down" size={23} />
            </TouchableOpacity> */}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    calenderTheme: {
        width: Dimensions.get('window').width - 30, borderRadius: 10, backgroundColor: '#FFFFFF',
    },
    calenderContainer: {
        alignSelf: 'center',
        // backgroundColor: '#FFFFFF',
        padding: 5,
        borderRadius: 10,
        //  elevation: 2, 
        width: Dimensions.get('window').width - 20,
    },
    shadowProps: {
        elevation: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
export default CustomCalender;
