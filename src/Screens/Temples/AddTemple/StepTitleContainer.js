import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const StepTitleContainer = ({ step, title, subtitle, titleColor, stepColor, subtitleColor }) => {
    return (
        <View style={styles.topWrapper}>
            <Text
                style={[
                    styles.stepStyle,
                    {
                        color: stepColor,
                    },
                ]}
            >{`Step ${step}`}</Text>
            <View
                style={{
                    gap: 4,
                }}
            >
                <Text
                    style={[
                        styles.title,
                        {
                            color: titleColor,
                        },
                    ]}
                >
                    {title}
                </Text>
                <Text
                    style={[
                        styles.subTitle,
                        {
                            color: subtitleColor,
                        },
                    ]}
                >
                    {subtitle}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topWrapper: {
        paddingVertical: 15,
        gap: 10,
    },
    stepStyle: {
        // color: '',
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(14, 850),
        lineHeight: 18,
    },
    title: {
        // color: '#000',
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(16, 850),
        lineHeight: 21,
    },
    subTitle: {
        // color: '#777777',
        fontFamily: 'Mulish',
        fontSize: RFValue(14, 850),
        lineHeight: 18,
    },
});

export default StepTitleContainer;
