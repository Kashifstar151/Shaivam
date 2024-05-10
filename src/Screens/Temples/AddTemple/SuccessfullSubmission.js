import React from 'react';
import { Text, View } from 'react-native';
import { CustomLongBtn } from '../../../components/Buttons';
import { RFValue } from 'react-native-responsive-fontsize';

const SuccessfullSubmission = ({ setStep, navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    padding: 20,
                    gap: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Mulish-Bold',
                        fontSize: RFValue(20, 850),
                        lineHeight: 26,
                        color: '#000',
                        textAlign: 'center',
                    }}
                >
                    Submitted successfully!
                </Text>

                <Text
                    style={{
                        fontFamily: 'Mulish-Medium',
                        fontSize: RFValue(14, 850),
                        lineHeight: 26,
                        color: '#000',
                        textAlign: 'center',
                    }}
                >
                    Our team will go through your submission, validate it and update it on to the
                    app.{' '}
                </Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: 20,
                    elevation: 10,
                    backgroundColor: 'white',

                    // backgroundColor: 'green',
                }}
            >
                <CustomLongBtn
                    onPress={() => setStep()}
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

export default SuccessfullSubmission;
