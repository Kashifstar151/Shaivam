import React from 'react'
import { Platform, Dimensions, Image, ImageBackground, StatusBar, View } from 'react-native'
import colorConst from '../Helpers/colors';

const Background = (props) => {
    return (
        <View
            style={{
                marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
                borderBottomColor: '#8F3630',
                borderBottomWidth: 1,
            }}
        >
            <ImageBackground
                source={
                    colorConst.colorscheme === 'light'
                        ? require('../../assets/Images/Background.png')
                        : require('../../assets/Images/BackgroundCommon.png')
                }
                style={{
                    paddingVertical: 0,
                    borderRadius: 10,
                    width: Dimensions.get('window').width,
                    backgroundColor: 'red',
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
