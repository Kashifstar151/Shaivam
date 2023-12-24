import React from 'react'
import { Platform, Dimensions, Image, ImageBackground, StatusBar, View } from 'react-native'

const Background = props => {
    return (
        <View style={{ marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0, borderBottomColor: '#8F3630', borderBottomWidth: 1 }}>
            <ImageBackground source={require('../../assets/Images/Background.png')} style={{ paddingVertical: 0, borderRadius: 10, width: Dimensions.get('window').width }}>
                {/* <View style={{ backgroundColor: '#AA4A44', position: 'absolute', height: 220, width: '100%' }}> */}
                {props.children}
                {/* </View> */}
            </ImageBackground>
        </View>
    )
}

export default Background