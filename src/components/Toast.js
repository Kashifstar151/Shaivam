import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';
import DownloadIcon from '../assets/Images/download.svg';
import ErrorIcon from '../assets/Images/Error.svg';

export const AnimatedToast = ({ state, text, svg, time = 2000, type }) => {
    const [animateInState, setAnimateInState] = useState();
    const animatedVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setAnimateInState(state);
    }, [state]);

    useEffect(() => {
        const animateIn = () => {
            Animated.spring(animatedVal, {
                toValue: 1,
                stiffness: 200,
                damping: 10,
                useNativeDriver: false,
            }).start(() => setTimeout(animateOut, time));
        };
        const animateOut = () => {
            Animated.spring(animatedVal, {
                toValue: 0,
                stiffness: 100,
                damping: 10,
                useNativeDriver: false,
            }).start(() => {
                setAnimateInState(false);
            });
        };

        if (animateInState !== undefined) {
            animateIn();
        }
    }, [state, animateInState, animatedVal, time]);

    if (type === 'SUCCESS') {
        return (
            <Animated.View
                style={[
                    {
                        marginBottom: 10,
                        alignSelf: 'center',
                        borderRadius: 10,
                        backgroundColor: '#EFF9ED',
                        borderColor: '#9CCFAB',
                        height: 60,
                        width: Dimensions.get('window').width - 20,
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        position: 'absolute',
                        bottom: 10,
                    },
                    {
                        transform: [
                            {
                                translateX: animatedVal.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-Dimensions.get('window').width, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                {svg ?? <DownloadIcon />}
                <Text style={{ marginHorizontal: 10, color: 'black', fontWeight: '600' }}>
                    {text ? text : 'Successfully done'}
                </Text>
            </Animated.View>
        );
    }

    if (type === 'ERROR') {
        return (
            <Animated.View
                style={[
                    {
                        marginBottom: 10,
                        alignSelf: 'center',
                        borderRadius: 10,
                        backgroundColor: '#F9EEED',
                        borderColor: '#D48883',
                        height: 60,
                        width: Dimensions.get('window').width - 20,
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        position: 'absolute',
                        bottom: 30,
                    },
                    {
                        transform: [
                            {
                                translateX: animatedVal.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-Dimensions.get('window').width, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                {svg ?? <ErrorIcon />}
                <Text style={{ marginHorizontal: 10, color: 'black', fontWeight: '600' }}>
                    {text ? text : 'Successfully done'}
                </Text>
            </Animated.View>
        );
    }
};
