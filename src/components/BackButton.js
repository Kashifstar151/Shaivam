import React from 'react';
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import BackIcon from '../../src/assets/Images/BackIcon.svg';
import WhiteBackButton from '../../src/assets/Images/arrow (1) 1.svg';
import NandiLogo from '../../src/assets/Images/NandiLogo.svg';

const BackButton = ({
    secondText,
    firstText,
    middleText,
    color,
    navigation,
    secondMiddleText,
    rightIcon,
    buttonDisable,
    nandiLogo,
}) => {
    return (
        <View
            style={{
                paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 10,
                paddingHorizontal: 15,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 30 : 0,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttonDisable ? null : (
                            <TouchableOpacity
                                style={{ alignSelf: 'center' }}
                                onPress={() => navigation.goBack()}
                            >
                                {!color ? <WhiteBackButton /> : <BackIcon />}
                            </TouchableOpacity>
                        )}

                        <View>
                            {firstText && (
                                <Text
                                    style={{
                                        marginHorizontal: 10,
                                        fontFamily: 'Lora-Regular',
                                        fontSize: 24,
                                        fontWeight: '700',
                                        color: 'white',
                                    }}
                                >
                                    {firstText}
                                </Text>
                            )}
                            {middleText && (
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        {middleText}
                                    </Text>
                                </View>
                            )}

                            {secondMiddleText && (
                                <View
                                    style={{
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        {secondMiddleText}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        {rightIcon && (
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 5,
                                    alignSelf: 'center',
                                }}
                            >
                                <Icon name="sharealt" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                        {nandiLogo == false ? null : <NandiLogo />}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BackButton;
