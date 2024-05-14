import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomLongBtn } from '../../../components/Buttons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { resetTheState } from '../../../store/features/Temple/TempleSlice';

const SuccessfullSubmission = ({ setStep, navigation }) => {
    const dispatch = useDispatch();
    return (
        <View style={style.topContainerWrapper}>
            <View
                style={{
                    padding: 20,
                    gap: 20,
                }}
            >
                <Text style={style.mainMsg}>Submitted successfully!</Text>

                <Text style={style.subDetails}>
                    Our team will go through your submission, validate it and update it on to the
                    app.
                </Text>
            </View>

            <View style={style.btnWrapper}>
                <CustomLongBtn
                    onPress={() => {
                        setStep();
                        dispatch(resetTheState());
                    }}
                    text={'Done'}
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
};

const style = StyleSheet.create({
    topContainerWrapper: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainMsg: {
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(20, 850),
        lineHeight: 26,
        color: '#000',
        textAlign: 'center',
    },

    subDetails: {
        fontFamily: 'Mulish-Medium',
        fontSize: RFValue(14, 850),
        lineHeight: 26,
        color: '#000',
        textAlign: 'center',
    },
    btnWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        elevation: 10,
        backgroundColor: 'white',
    },
});

export default SuccessfullSubmission;
