import React, { useContext, useState } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
//
import bgImg from '../../../../assets/Images/Background.png';
import bgImgDark from '../../../../assets/Images/BackgroundCommon.png';
import CloseBtn from '../../../../assets/Images/CloseBtnSVG.svg';
import { ThemeContext } from '../../../Context/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import LocationLogo from '../../../components/SVGs/LocationLogo';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { colors } from '../../../Helpers';
import StepTitleContainer from './StepTitleContainer';
import Icon from 'react-native-vector-icons/dist/Feather';
import { CustomLongBtn } from '../../../components/Buttons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/dist/Feather';

import BackIcon from '../../../../src/assets/Images/BackIcon.svg';
import WhiteBackButton from '../../../../src/assets/Images/arrow (1) 1.svg';
import KeyValueBox from './KeyValueBox';
import { useSelector } from 'react-redux';

const PreviewPage = ({ navigation, setStep }) => {
    const { theme } = useContext(ThemeContext);
    const [images, setImages] = useState([]);
    const openGallary = () => {
        const options = {
            selectionLimit: 5,
            title: 'Select Image',
            customButtons: [{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (callback) => {
            setImages(callback?.assets);
        });

        // launchCamera(
        //     {
        //         saveToPhotos: true,
        //         cameraType: 'back',
        //     },
        //     (callback) => {
        //         console.log('the calllback  ==>', callback);
        //         setImages((prev) => [...prev, ...callback.assets]);
        //     }
        // );
    };

    const templadata = useSelector((state) => state.temple);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}
        >
            <ScrollView>
                <ImageBackground
                    source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
                    resizeMode="cover"
                    style={{ width: '100%', height: 70 }}
                />

                <View
                    style={[
                        styles.wholeContainerWrapper,
                        {
                            backgroundColor: 'white',
                        },
                    ]}
                >
                    <View style={[styles.topBarWrapper]}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                paddingTop: 15,
                            }}
                        >
                            <Pressable onPress={() => setStep(1)}>
                                {theme.colorscheme !== 'light' ? <WhiteBackButton /> : <BackIcon />}
                            </Pressable>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: RFValue(18, 850),
                                    fontFamily: 'Lora-Bold',
                                    lineHeight: 20,
                                }}
                            >
                                Preview temple submission
                            </Text>
                        </View>
                    </View>

                    {/* form container */}
                </View>

                {/* data section  */}
                <View
                    style={{
                        paddingTop: 20,
                        paddingBottom: 80,
                    }}
                >
                    <KeyValueBox
                        keyName={'Temple Name'}
                        value={templadata?.templeName ?? 'kuch nhi hai abhi'}
                    />
                    <KeyValueBox
                        keyName={'Location'}
                        value={templadata?.templeLocation?.locationName ?? 'kuch nhi hai abhi'}
                    />
                    <KeyValueBox
                        keyName={'Description'}
                        value={templadata?.description ?? 'abhi kuch dala nhi gya hai '}
                    />
                    <KeyValueBox keyName={'Images'} value={templadata?.imageSrc} />
                </View>
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: 20,
                    elevation: 10,
                    backgroundColor: 'white',

                    // backgroundColor: 'green',
                }}
            >
                <CustomLongBtn
                    onPress={() => setStep('SUCCESS')}
                    text={'Submit'}
                    textStyle={{
                        color: '#4C3600',
                        fontFamily: 'Mulish-Bold',
                    }}
                    containerStyle={{
                        backgroundColor: '#FCB300',
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },

    uploadContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        borderStyle: 'dashed',
        height: 70,
        width: '98%',
        borderColor: '#777777',
        borderRadius: 10,
        borderWidth: 1,
    },
    descriptionText: {
        fontSize: 12,
        color: '#777777',
        fontFamily: 'Mulish-Regular',
        paddingBottom: 5,
    },

    wholeContainerWrapper: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
        marginTop: -12,
        flex: 1,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        width: '100%',
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderColor: '#B3B3B3',
        paddingTop: 20,
        gap: 16,
        justifyContent: 'space-between',
    },
    contWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    },
    textContWrapper: {
        height: 14,
        width: 14,
        borderRadius: 2,
        justifyContent: 'center',
    },

    textStyleForCont: {
        alignSelf: 'center',
        paddingVertical: 'auto',
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 16,
    },
});

export default PreviewPage;
