// new code for animation
import React, { useContext, useRef, useState } from 'react';
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from '../Context/ThemeContext';
import getDimension from '../Helpers/getDimension';
import MapIconSVG from './SVGs/MapIconSVG';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedRightSideView = ({ children, heading, RightIcon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { screenWidth, screenHeight } = getDimension();

    const animatedEffect = () => {
        LayoutAnimation.easeInEaseOut();
        setIsOpen(!isOpen);
    };

    const toggleStatusBar = () => {
        animatedEffect();
    };
    return (
        <>
            {isOpen ? (
                <Animated.View
                    style={[
                        styles.openBtnWrapper,
                        {
                            top: screenHeight * 0.2,
                            width: screenWidth * 0.75,
                            maxHeight: screenHeight * 0.6,
                            backgroundColor: theme.colorscheme === 'light' ? '#FFF5F5' : '#333333',
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.rowFlexDir,
                            styles.justifyContentBtwn,
                            styles.bottomBorder,
                            {
                                paddingBottom: 5,
                            },
                        ]}
                    >
                        <View style={styles.rowFlexDir}>
                            <TouchableOpacity style={styles.InsiderSettingButton}>
                                {RightIcon}
                            </TouchableOpacity>
                            <Text
                                style={[
                                    styles.headingText,
                                    {
                                        width: screenWidth * 0.5,
                                    },
                                ]}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {heading}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.clearIcon} onPress={toggleStatusBar}>
                            <Icon
                                name="clear"
                                size={24}
                                color={theme.colorscheme === 'light' ? '#222222' : '#222222'}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView bounces={false} style={styles.childrenWrapper}>
                        {children}
                    </ScrollView>
                </Animated.View>
            ) : (
                <Animated.View
                    style={[
                        styles.openBtnWrapper,
                        {
                            top: screenHeight * 0.2,
                            maxWidth: screenWidth * 0.4,
                            backgroundColor: theme.colorscheme === 'light' ? '#FFF5F5' : '#333333',
                            color: theme.colorscheme === 'light' ? '#C1544E' : '#fff',
                        },
                    ]}
                >
                    <Pressable onPress={toggleStatusBar}>
                        <View style={styles.rowFlexDir}>
                            <View style={styles.rowFlexDir}>
                                <TouchableOpacity style={styles.InsiderSettingButton}>
                                    {RightIcon}
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        styles.headingText,
                                        {
                                            backgroundColor:
                                                theme.colorscheme === 'light'
                                                    ? '#FFF5F5'
                                                    : '#333333',
                                        },
                                    ]}
                                >
                                    {heading}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </Animated.View>
            )}
        </>
    );
};

export const styles = StyleSheet.create({
    rowFlexDir: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InsiderSettingButton: { flexDirection: 'row', alignItems: 'center' },
    clearIcon: { alignItems: 'center' },
    openBtnWrapper: {
        position: 'absolute',

        right: -3,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: '#C1544E',
        overflow: 'hidden',
        borderWidth: 2,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    justifyContentBtwn: {
        justifyContent: 'space-between',
    },
    headingText: {
        zIndex: 10,
    },

    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: '#FFD9D9',
    },
    childrenWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});

export default AnimatedRightSideView;
