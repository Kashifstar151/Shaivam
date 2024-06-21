import { BlurView } from '@react-native-community/blur';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AlertSVG from '../../../../assets/Images/AlertSVG.svg';
import { CustomLongBtn } from '../../../components/Buttons';
import getDimension from '../../../Helpers/getDimension';
import { ThemeContext } from '../../../Context/ThemeContext';

const PromptToCancel = ({ setStep, navigation }) => {
    const { screenHeight, screenWidth } = getDimension();
    const { theme } = useContext(ThemeContext);

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
                            height: screenHeight * 0.35,
                        },
                    ]}
                >
                    <AlertSVG />
                    <View>
                        <Text style={styles.mainLine}>Are you sure you want stop ?</Text>
                        <Text style={styles.subLine}>All your entered data will be lost</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <CustomLongBtn
                                onPress={() => setStep(1)}
                                text={'Cancel'}
                                textStyle={{
                                    color: '#4C3600',
                                    fontFamily: 'Mulish-Bold',
                                }}
                                containerStyle={{
                                    // backgroundColor: '#FCB300',
                                    alignSelf: 'center',
                                    marginBottom: 5,
                                    width: '100%',
                                }}
                            />

                            {/* <Text>1</Text> */}
                        </View>
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            {/* <Text>2</Text> */}
                            <CustomLongBtn
                                // onPress={handleModalAction}
                                onPress={() => setStep()}
                                text={'Yes, I’m sure'}
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
        paddingVertical: 50,
    },
    mainLine: {
        color: 'black',
        fontFamily: 'Mulish-Bold',
        fontSize: 18,
    },
    subLine: {
        color: '#777777',
        textAlign: 'center',
        fontFamily: 'Mulish-Regular',
        fontSize: 14,
        lineHeight: 18,
    },
});

export default PromptToCancel;
