import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import OMIcon from '../../assets/Images/om 2.svg';
import ButtonComp from '../Temples/Common/ButtonComp';

const OmChanting = ({ close, setPaused, setOmPlayTiming }) => {
    // console.log("🚀 ~ OmChanting ~ setPaused:", setPaused)
    const [showTimer, setShowTimer] = useState(false);
    const [timing, setTiming] = useState(15)
    const onSubmit = () => {
        setOmPlayTiming(timing * 60000)
        setPaused(true)
    }
    return (
        <>
            {showTimer ? (
                <View
                    style={{
                        paddingHorizontal: 10,
                        flex: 1,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        backgroundColor: '#fff',
                    }}
                >
                    <View style={styles.topConatiner}>
                        <Text style={styles.title}>Om Namah Shivaya Chant</Text>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Feather name="x" size={26} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={styles.text}>Set Om Timer</Text>
                        <Text
                            style={{ color: '#777777', fontSize: 12, fontFamily: 'Mulish-Regular' }}
                        >
                            This can be changed if required in the More options
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 30,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setTiming(timing - 1)}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#4C3600',
                                borderWidth: 1,
                                backgroundColor: '#F3DAA0',
                                height: 50,
                                width: 50,
                                borderRadius: 15,
                            }}
                        >
                            <AntDesign name="minus" size={25} />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 32, fontFamily: 'Mulish-Bold' }}>{timing}</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Mulish-Regular' }}>
                                Minutes
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setTiming(timing + 1)}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#4C3600',
                                borderWidth: 1,
                                backgroundColor: '#F3DAA0',
                                height: 50,
                                width: 50,
                                borderRadius: 15,
                            }}
                        >
                            <AntDesign name="plus" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                        <ButtonComp
                            color={true}
                            text="Continue"
                            navigation={() => onSubmit()}
                        />
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        paddingHorizontal: 10,
                        flex: 1,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={[styles.iconContainer, { position: 'absolute', top: 10 }]}
                        onPress={() => close?.current?.close()}
                    >
                        <Feather name="x" size={24} />
                    </TouchableOpacity>
                    <View style={{ marginVertical: 30, alignSelf: 'center' }}>
                        <OMIcon />
                    </View>
                    <Text style={{ fontSize: 20, color: '#222222', fontFamily: 'Mulish-Bold' }}>
                        Om Namah Shivaya Chant
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: 'Mulish-SemiBold',
                            marginVertical: 20,
                            marginHorizontal: 20,
                            color: 'black',
                            textAlign: 'center',
                        }}
                    >
                        {`Here, you can set a timer for your Om meditation. \n This can be changed later in the More options`}
                    </Text>
                    <View style={{ position: 'absolute', bottom: 10 }}>
                        <ButtonComp
                            color={true}
                            text="Continue"
                            navigation={() => setShowTimer(true)}
                        />
                    </View>
                </View>
            )}
        </>
    );
};
export const styles = StyleSheet.create({
    iconContainer: { position: 'absolute', right: 10, top: 0 },
    topConatiner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    errorContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: '#C1554E',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: { marginVertical: 10, fontFamily: 'Mulish-Regular', fontSize: 18, color: '#222222' },
    title: { color: '#777777', fontFamily: 'Mulish-Bold' },
    cancelButton: {
        width: '42%',
        height: 50,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: { color: '#222222', fontFamily: 'Lora-Bold', fontWeight: '700', fontSize: 16 },

    submitButton: {
        borderRadius: 10,
        backgroundColor: '#FCB300',
        width: '46%',
        height: 50,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default OmChanting;
