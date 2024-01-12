import React from 'react';
import { Text, View } from 'react-native';
import OpenBookSVG from './SVGs/OpenBookSVG';

const EventCard = ({ date, timing, title, theme }) => {
    return (
        <View
            style={{
                padding: 18,
                flexDirection: 'row',
                columnGap: 16,
                alignItems: 'center',
                backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
                borderRadius: 10,
            }}
        >
            <View>
                <Text style={{ color: theme.textColor }}>{date.day}</Text>
                <Text style={{ color: theme.textColor, fontSize: 20, fontWeight: '600' }}>
                    {date.dateNo}
                </Text>
            </View>
            <View style={{ height: 30, borderRightWidth: 1, borderRightColor: '#EAEAEA' }}></View>
            <OpenBookSVG fill={theme.colorscheme === 'light' ? '#4C3600' : '#fff'} />
            <View style={{ rowGap: 5, justifyContent: 'center', rowGap: 4 }}>
                <Text
                    style={{
                        fontWeight: '600',
                        color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        fontWeight: '600',
                        color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                    }}
                >
                    {timing}
                </Text>
            </View>
        </View>
    );
};

export default EventCard;