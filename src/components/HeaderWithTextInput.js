import React, { useContext } from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import NandiLogo from '../../src/assets/Images/NandiLogo.svg';
import { colors } from '../Helpers';
import BackIcon from '../../src/assets/Images/BackIcon.svg';
import WhiteBackButton from '../../src/assets/Images/arrow (1) 1.svg';
import { ThemeContext } from '../Context/ThemeContext';

const HeaderWithTextInput = React.forwardRef(
    (
        { navigation, color, rightIcon, setState, state, setOnFocus, placeholder, onSubmitEditing },
        ref
    ) => {
        const { theme } = useContext(ThemeContext);
        return (
            <View
                style={{
                    paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 40 : 0,
                    paddingHorizontal: 15,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                    <View
                        style={
                            color
                                ? [
                                      styles.inputcontainer,
                                      {
                                          backgroundColor: '#F3F3F3',
                                      },
                                  ]
                                : [
                                      styles.inputcontainer,
                                      { backgroundColor: theme.searchBox.bgColor },
                                  ]
                        }
                    >
                        <Icon name="search1" size={28} color={color ? '#777777' : colors.grey1} />
                        <TextInput
                            onSubmitEditing={onSubmitEditing}
                            placeholder={placeholder}
                            onChangeText={(e) => setState(e)}
                            placeholderTextColor={theme.searchBox.textColor}
                            value={state}
                            ref={ref}
                            style={{
                                fontSize: 12,
                                paddingHorizontal: 5,
                                color: theme.searchBox.textColor,
                                width: '90%',
                            }}
                        />
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 5 }}>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.goBack()}>
                    {!color ? <WhiteBackButton /> : <BackIcon />}
                </TouchableOpacity>
                <View>
                    {
                        middleText &&
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF' }}>{middleText}</Text>
                        </View>
                    }
                    {
                        secondMiddleText && <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF' }}>{secondMiddleText}</Text>
                        </View>
                    }

                </View> */}
                    {/* </View> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {rightIcon && (
                            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                <Icon name="sharealt" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                        <NandiLogo />
                    </View>
                </View>
                {/* <Text style={{ marginHorizontal: 10, fontFamily: 'Lora-Regular', fontSize: 24, fontWeight: '700', color: 'white' }}>{firstText}</Text> */}
            </View>
        );
    }
);
export const styles = StyleSheet.create({
    inputcontainer: {
        width: '80%',
        marginHorizontal: 5,
        borderRadius: 10,
        paddingHorizontal: 10,

        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default HeaderWithTextInput;
