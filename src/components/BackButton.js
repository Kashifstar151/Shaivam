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
    nandiLogo
}) => {
    console.log(Platform, 'Platform.OS');
    return (
        <View
            style={{
                paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 0,
                paddingHorizontal: 15,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 30 : 10,
                }}
            >
                <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 5 }}>
                    {buttonDisable ? null : (
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={() => navigation.goBack()}
                        >
                            {!color ? <WhiteBackButton /> : <BackIcon />}
                        </TouchableOpacity>
                    )}

                    <View>
                        {middleText && (
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF' }}>
                                    {middleText}
                                </Text>
                            </View>
                        )}
                        {secondMiddleText && (
                            <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {rightIcon && (
                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                            <Icon name="sharealt" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                    {
                        nandiLogo == false ? null : <NandiLogo />
                    }

                </View>
            </View>
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
        </View>
    );
};

export default BackButton;
