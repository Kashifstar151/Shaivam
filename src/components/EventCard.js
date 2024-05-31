import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenBookSVG from './SVGs/OpenBookSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { colors } from '../Helpers';

const EventCard = ({ date, timing, title, theme, item, header, day, dateNo, Icon }) => {
    console.log("🚀 ~ EventCard ~ Icon:", item?.attributes?.category)
    let d =
        header == 'Festivals'
            ? moment(item?.attributes?.calendar_from_date)
            : moment(item?.attributes?.start_date);
    let dayname = d.format('ddd');
    // let day = d.format('DD');
    // console.log("🚀 ~ EventCard ~ day:", day)
    return (
        <View
            style={[
                styles.topContainer,
                {
                    backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
                },
                styles.shadowProps,
            ]}
        >
            <View>
                <Text
                    style={{
                        color: theme.colorscheme === 'light' ? colors.grey6 : colors.nobalGrey,
                        fontSize: RFValue(12, 800),
                    }}
                >
                    {/* {header === 'Festivals' ? moment(item?.attributes?.calendar_from_date).format('ddd') : dayname ? dayname : date.day} */}
                    {day}
                </Text>
                <Text
                    style={{
                        color: theme.colorscheme === 'light' ? colors.mineGrey : theme.textColor,
                        fontSize: RFValue(20, 800),
                        fontWeight: '600',
                    }}
                >
                    {/* {header === 'Festivals' ? moment(item?.attributes?.calendar_from_date).format('DD') : item?.start_date ? moment(item?.start_date).format('DD') : moment(item?.attributes?.start_date).format('DD')} */}
                    {dateNo}
                </Text>
                {/* <Text
                    style={{
                        color: theme.colorscheme === 'light' ? colors.mineGrey : theme.textColor,
                        fontSize: RFValue(20, 800),
                        fontWeight: '600',
                    }}
                >
                    {item?.attributes?.SchedulaType ? item?.attributes?.SchedulaType : 'regular'}
                </Text> */}
            </View>
            <View style={{ height: 30, borderRightWidth: 1, borderRightColor: '#EAEAEA' }}></View>
            {Icon ? Icon : <OpenBookSVG fill={theme.colorscheme === 'light' ? '#4C3600' : '#fff'} />}
            <View style={{ rowGap: 5, justifyContent: 'center', rowGap: 4, width: '75%' }}>
                <Text
                    style={{
                        fontWeight: '600',

                        color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                        fontSize: RFValue(12, 800),
                    }}
                >
                    {title}
                </Text>
                {
                    timing == null ? <></> :
                        <Text
                            style={{
                                fontWeight: '600',
                                color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                                fontSize: RFValue(12, 800),
                            }}
                        >
                            {timing}
                        </Text>
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        padding: 15,
        flexDirection: 'row',
        columnGap: 16,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
    },
    shadowProps: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default EventCard;
