import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import bgImg from '../../../assets/Images/Background.png';
import PlayBtnSVG from '../../components/SVGs/PlayBtnSVG';
import { RouteTexts } from '../../navigation/RouteText';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { styles } from './OmChanting';

const OmChant = ({ navigation, onPress, isPlaying }) => {
    console.log('🚀 ~ OmChant ~ isPlaying:', isPlaying);
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
    });

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const { t } = useTranslation();
    useEffect(() => {
        const updateItemWidth = () => {
            setScreenWidth(Dimensions.get('window').width);
        };
        const subscription = Dimensions.addEventListener('change', updateItemWidth);
        return () => {
            subscription?.remove();
        };
    }, []);
    return (
        <View
            style={{
                overflow: 'visible',
                height: dimension.width + 20,
                justifyContent: 'center',
            }}
        >
            <ImageBackground
                source={bgImg}
                resizeMode="cover"
                style={{
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    overflow: 'hidden',
                    padding: 15,
                    width: screenWidth - dimension.height * 3,
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
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                            {t('Om Namah Shivaya')}
                        </Text>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            {t('Chat along with our endless Om Player')}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onPress}>
                        {!isPlaying ? (
                            <View style={style.iconWrapper}>
                                <MaterialIcons name="play-arrow" size={20} color={'#000'} />
                            </View>
                        ) : (
                            <View style={style.iconWrapper}>
                                <MaterialIcons name="square" size={16} color={'#000'} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Text
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setDimension({ width, height });
                }}
                style={{
                    transform: [{ translateX: dimension.height }, { rotate: '90deg' }],
                    color: '#B6B6B6',
                    position: 'absolute',
                    right: 0,
                    fontWeight: '700',
                    letterSpacing: 3,
                }}
            >
                OM CHANT
            </Text>
        </View>
    );
};

export default OmChant;

const style = StyleSheet.create({
    iconWrapper: {
        width: 34,
        height: 34,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
