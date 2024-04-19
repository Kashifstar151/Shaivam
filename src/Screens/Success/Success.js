import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { RouteTexts } from "../../navigation/RouteText";
import ButtonComp from "../Temples/Common/ButtonComp";

const Success = ({ navigation }) => {
    const animationref = useRef(null)
    useEffect(() => {
        animationref.current?.play();

        // Or set a specific startFrame and endFrame with:
        animationref.current?.play(30, 120);
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView ref={animationref} source={require('../../assets/JSON/SuccessGIF.json')} style={{ height: 200, width: 200 }} />
            <Text style={{ fontFamily: 'Mulish-Bold', fontSize: 20, color: '#222222' }}>Submitted successfully!</Text>
            <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 14, color: '#222222' }}>Our team will go through your submission, validate it and update it on to the app.</Text>
            <View style={{ position: 'absolute', bottom: 20 }}>
                <ButtonComp color={true} text={'Submit'} navigation={() => navigation.navigate(RouteTexts.BOTTOM_TABS)} />
            </View>
        </View>
    );
};

export default Success;
