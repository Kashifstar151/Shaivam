import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import bgImg from '../../../assets/Images/Background.png';
import getDimension from '../../Helpers/getDimension';
import PlayBtnSVG from '../../components/SVGs/PlayBtnSVG';
import { CustomButton } from '../../components/Buttons';
import { useTranslation } from 'react-i18next';

const Quiz = () => {
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
    });
    const { t } = useTranslation();

    const { screenWidth } = getDimension();
    return (
        <View
            style={{
                height: dimension.width + 20,
                justifyContent: 'center',
                paddingVertical: 10,
                marginTop: 10,
                marginBottom: 30,
            }}
        >
            <Text
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setDimension({ width, height });
                }}
                style={{
                    transform: [{ rotate: '-90deg' }],
                    color: '#B6B6B6',
                    position: 'absolute',
                    left: 0,
                    fontWeight: '700',
                    letterSpacing: 3,
                }}
            >
                QUIZ
            </Text>

            <ImageBackground
                source={bgImg}
                resizeMode="cover"
                style={{
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    overflow: 'hidden',
                    padding: 15,
                    width: screenWidth - dimension.height * 2.5,
                    position: 'absolute',
                    right: 0,
                    // alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ gap: 3, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Lora-Bold', color: 'white' }}>
                            {t('Take the Shaivam Quiz')}
                        </Text>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            {t('Test your knowledge on Shiva')}
                        </Text>
                    </View>
                    <CustomButton
                        onPress={() => {
                            // write the function that we have used in the temple module to get the current location and set the name of the location in the near by place name
                        }}
                        style={{
                            margin: 10,
                            shadowColor: 'black',
                            alignSelf: 'center',
                            borderRadius: 10,
                            borderColor: '#C1554E',
                            borderWidth: 1,
                        }}
                        text={t('Take Quiz')}
                        backgroundColor={'#FCB300'}
                        textColor={'#4C3600'}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default Quiz;
