import React, { useContext } from 'react';
import { Platform, Dimensions, Image, ImageBackground, StatusBar, View } from 'react-native';
// import colorConst from '../Helpers/colors';
import { ThemeContext } from '../Context/ThemeContext';

const Background = (props) => {
    const { theme } = useContext(ThemeContext);
    return (
        <View
            style={{
                paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 10 : 0,
                borderBottomColor: theme.colorscheme !== 'dark' ? '#8F3630' : '',
                borderBottomWidth: theme.colorscheme !== 'dark' ? 1 : 0,
                width: '100%',
            }}
        >
            <ImageBackground
                source={
                    theme.colorscheme === 'light'
                        ? require('../../assets/Images/Background.png')
                        : require('../../assets/Images/BackgroundCommon.png')
                }
                style={{
                    paddingVertical: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 0,
                    borderRadius: 10,
                    width: '100%',
                }}
            >
                {/* <View style={{ backgroundColor: '#AA4A44', position: 'absolute', height: 220, width: '100%' }}> */}
                {props.children}
                {/* </View> */}
            </ImageBackground>
        </View>
    );
};

export default Background;
