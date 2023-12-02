import React from 'react'
import { Platform, Dimensions, Image, ImageBackground, StatusBar, View } from 'react-native'

const Background = props => {
    return (
        <View style={{ marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0 }}>
            <ImageBackground source={require('../../assets/Images/Background.png')} style={{ height: 200, borderRadius: 10, width: Dimensions.get('window').width }} imageStyle={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} >
                {/* <View style={{ backgroundColor: '#AA4A44', position: 'absolute', height: 220, width: '100%' }}> */}
                {props.children}
                {/* </View> */}
            </ImageBackground>
        </View>
    )
}

export default Background