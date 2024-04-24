import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenBookSVG from './SVGs/OpenBookSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { colors } from '../Helpers';

const EventCard = ({ date, timing, title, theme, item }) => {
    let d = moment(item?.attributes?.start_date);
    let dayname = d.format('ddd');
    let day = d.format('DD');
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
                    {dayname ? dayname : date.day}
                </Text>
                <Text
                    style={{
                        color: theme.colorscheme === 'light' ? colors.mineGrey : theme.textColor,
                        fontSize: RFValue(20, 800),
                        fontWeight: '600',
                    }}
                >
                    {day ? day : date.dateNo}
                </Text>
            </View>
            <View style={{ height: 30, borderRightWidth: 1, borderRightColor: '#EAEAEA' }}></View>
            <OpenBookSVG fill={theme.colorscheme === 'light' ? '#4C3600' : '#fff'} />
            <View style={{ rowGap: 5, justifyContent: 'center', rowGap: 4 }}>
                <Text
                    style={{
                        fontWeight: '600',

                        color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                        fontSize: RFValue(12, 800),
                    }}
                >
                    {title?.substring(0, 30)}
                </Text>
                <Text
                    style={{
                        fontWeight: '600',
                        color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                        fontSize: RFValue(12, 800),
                    }}
                >
                    {timing}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        padding: 18,
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
