import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddTempleHomePageLogo from '../../../../assets/Images/Temple/AddTempleHomePage.svg';
import { CustomLongBtn } from '../../../components/Buttons';
import { RFValue } from 'react-native-responsive-fontsize';

export const EmptyList = ({ onPressOfBtn, navigation }) => (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -50,
        }}
    >
        <AddTempleHomePageLogo />
        <View
            style={{
                paddingTop: 15,
                width: '90%',
                gap: 4,
            }}
        >
            <Text style={[style.emptyListTextColor, style.emptyListHeading]}>
                Submit your first entry here
            </Text>
            <Text style={[style.emptyListTextColor, style.emptyListSubHeading]}>
                Once submitted, our admin will look into it and the add it into the database
            </Text>
        </View>

        <View
            style={{
                width: '100%',
                paddingTop: 15,
            }}
        >
            <CustomLongBtn
                onPress={onPressOfBtn}
                text={'Add a Temple'}
                textStyle={{
                    color: '#4C3600',
                    fontFamily: 'Mulish-Bold',
                }}
                containerStyle={{
                    backgroundColor: '#FCB300',
                }}
            />
        </View>
    </View>
);

const style = StyleSheet.create({
    emptyListHeading: {
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(18, 850),
    },
    emptyListTextColor: {
        textAlign: 'center',
        color: '#000',
    },
    emptyListSubHeading: {
        fontFamily: 'Mulish',
        fontSize: RFValue(14, 850),
        textAlign: 'center',
        color: '#000',
        lineHeight: 18,
    },
});
