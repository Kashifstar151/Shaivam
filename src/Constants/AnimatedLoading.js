import LottieView from 'lottie-react-native'
import React from 'react'
import { Modal, View } from 'react-native'

const AnimatedLoading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Modal presentationStyle='fullScreen' transparent>
                <LottieView style={{ height: 300, width: '100%' }} m source={require('../assets/JSON/Animation - 1701017760884.json')} />
            </Modal>
        </View>
    )
}

export default AnimatedLoading