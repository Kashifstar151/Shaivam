import { BlurView } from '@react-native-community/blur';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertSVG from '../../../../assets/Images/AlertSVG.svg';
import { CustomLongBtn } from '../../../components/Buttons';
import getDimension from '../../../Helpers/getDimension';
import EmailSVG from '../../../components/SVGs/EmailSVG';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../../Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { RouteTexts } from '../../../navigation/RouteText';
import BackBtnSVG from '../../../components/SVGs/BackBtnSvg';
import { ThemeContext } from '../../../Context/ThemeContext';
// import BackBtnSvg from '../../../components/SVGs/BackBtnSvg';

const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const AddEmail = ({ setStep, setEmail, navigation }) => {
    const { screenHeight, screenWidth } = getDimension();
    const [localEmail, setLocalEmail] = useState('');
    const [error, setError] = useState({
        state: false,
        msg: '',
    });
    const { theme } = useContext(ThemeContext);
    const submitHandler = () => {
        if (emailReg.test(localEmail)) {
            setEmail(() => localEmail);
            AsyncStorage.setItem('email', localEmail);
            setStep();
        } else {
            setError(() => {
                return {
                    state: true,
                    msg: 'Please enter valid email',
                };
            });
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
                <TouchableOpacity
                    onPress={() => navigation.navigate(RouteTexts.TEMPLE_TABS_NAVIGATE)}
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                    }}
                >
                    <BackBtnSVG width={24} height={24} fill={'#fff'} />
                </TouchableOpacity>

                <View
                    style={[
                        styles.innerWrapper,
                        {
                            width: screenWidth * 0.85,
                            backgroundColor: theme.colorscheme === 'light' ? '#FFFFFF' : '#222222',
                            // height: screenHeight * 0.35,
                        },
                    ]}
                >
                    {/* <AlertSVG /> */}
                    {/* <View
                        style={{
                            backgroundColor: 'red',
                            width: '100%',
                            flexDirection: 'row',
                        }}
                    > */}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 20,
                        }}
                    >
                        <EmailSVG
                            width={40}
                            height={40}
                            fill={theme.colorscheme === 'light' ? '#000' : '#fff'}
                        />
                        <View style={{}}>
                            <Text
                                style={[
                                    styles.mainLine,
                                    {
                                        color: theme.colorscheme === 'light' ? '#000' : '#fff',
                                    },
                                ]}
                            >
                                Please add you email
                            </Text>
                            <Text
                                style={[
                                    styles.subLine,
                                    {
                                        color: theme.colorscheme === 'light' ? '#000' : '#fff7',
                                    },
                                ]}
                            >
                                Email is required
                            </Text>
                        </View>
                    </View>

                    {/* <View
                            style={
                                {
                                    // backgroundColor: 'green',
                                }
                            }
                        > */}
                    {/* </View> */}
                    {/* </View> */}

                    <TextInput
                        value={localEmail}
                        onChangeText={(val) => {
                            setLocalEmail(val);
                            if (error.state) {
                                setError(() => ({
                                    state: false,
                                    msg: '',
                                }));
                            }
                        }}
                        placeholder="Enter the email"
                        style={{
                            backgroundColor: 'red',
                            width: '100%',
                            borderRadius: 10,
                            paddingLeft: 20,
                            backgroundColor: theme.colorscheme === 'light' ? '#F3F3F3' : '#333333',
                            color: theme.colorscheme === 'light' ? '#222222' : '#fff9',
                        }}
                        placeholderTextColor={
                            theme.colorscheme === 'light' ? colors.grey5 : '#fff5'
                        }
                    />

                    {error?.state && <Text style={styles.errorText}>{error.msg}</Text>}

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
    errorText: {
        fontFamily: 'Mulish',
        fontSize: RFValue(12, 850),
        lineHeight: 18,
        color: 'red',
        textAlign: 'left',
        width: '100%',
        marginTop: -10,
        paddingLeft: 5,
    },
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
