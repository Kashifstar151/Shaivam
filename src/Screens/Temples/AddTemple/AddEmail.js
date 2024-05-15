import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AlertSVG from '../../../../assets/Images/AlertSVG.svg';
import { CustomLongBtn } from '../../../components/Buttons';
import getDimension from '../../../Helpers/getDimension';
import EmailSVG from '../../../components/SVGs/EmailSVG';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../../Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEmail = ({ setStep, setEmail, navigation }) => {
    const { screenHeight, screenWidth } = getDimension();
    const [localEmail, setLocalEmail] = useState('');
    const submitHandler = () => {
        if (localEmail.length > 10) {
            setEmail(() => localEmail);
            AsyncStorage.setItem('email', localEmail);
            setStep();
        }
    };
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <BlurView
                blurType="dark"
                blurAmount={1}
                blurRadius={10}
                style={styles.contentWrap}
            ></BlurView>
            <View style={styles.topWrapper}>
                <View
                    style={[
                        styles.innerWrapper,
                        {
                            width: screenWidth * 0.85,
                            // height: screenHeight * 0.35,
                        },
                    ]}
                >
                    {/* <AlertSVG /> */}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 20,
                        }}
                    >
                        <EmailSVG width={40} height={40} />
                        <View style={{}}>
                            <Text style={styles.mainLine}>Please add you email</Text>
                            <Text style={styles.subLine}>Email is required</Text>
                        </View>
                    </View>

                    <TextInput
                        value={localEmail}
                        onChangeText={(val) => setLocalEmail(val)}
                        placeholder="Enter the email"
                        style={{
                            backgroundColor: 'red',
                            width: '100%',
                            borderRadius: 10,
                            paddingLeft: 20,
                            backgroundColor: '#F3F3F3',
                            color: '#222222',
                        }}
                        placeholderTextColor={colors.grey5}
                    />

                    <CustomLongBtn
                        // onPress={handleModalAction}
                        onPress={submitHandler}
                        text={'Submit'}
                        textStyle={{
                            color: '#4C3600',
                            fontFamily: 'Mulish-Bold',
                        }}
                        containerStyle={{
                            backgroundColor: '#FCB300',
                            alignSelf: 'center',
                            marginBottom: 5,
                            width: '100%',
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentWrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    topWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    innerWrapper: {
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },
    mainLine: {
        color: 'black',
        fontFamily: 'Mulish-Bold',
        fontSize: 18,
    },
    subLine: {
        color: '#777777',
        fontFamily: 'Mulish-Regular',
        fontSize: 14,
        lineHeight: 18,
    },
});

export default AddEmail;