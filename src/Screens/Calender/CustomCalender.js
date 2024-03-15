import moment from 'moment/moment';
import React, { useState } from 'react';

import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

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
            style={{
                padding: 10,
                height: 150,
                width: Dimensions.get('window').width - 30,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                elevation: 10,
            }}
        >
            <View
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
            </Swiper>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setFullScreen(true)}>
                <Icon name="chevron-down" size={23} />
            </TouchableOpacity>
        </View>
    );
};

export default CustomCalender;
