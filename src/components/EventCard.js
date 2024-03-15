import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenBookSVG from './SVGs/OpenBookSVG';
import { RFValue } from 'react-native-responsive-fontsize';

const EventCard = ({ date, timing, title, theme }) => {
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
                <Text style={{ color: theme.textColor, fontSize: RFValue(12, 800) }}>
                    {date.day}
                </Text>
                <Text
                    style={{
                        color: theme.textColor,
                        fontSize: RFValue(20, 800),
                        fontWeight: '600',
                    }}
                >
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
                        fontSize: RFValue(14, 800),
                    }}
                >
                    {title}
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
    },
});

export default EventCard;
