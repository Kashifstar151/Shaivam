import React, { useContext, useEffect } from 'react';
import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import bgImg from '../../../../assets/Images/Background.png';
import bgImgDark from '../../../../assets/Images/BackgroundCommon.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomLongBtn } from '../../../components/Buttons';
import KeyValueBox from './KeyValueBox';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../Context/ThemeContext';
import {
    useAddTempleImagesMutation,
    useAddTempleMutation,
} from '../../../store/features/Temple/TemplApiSlice';
import BackBtnSvg from '../../../components/SVGs/BackBtnSvg';

const PreviewPage = ({ navigation, setStep, email }) => {
    const templadata = useSelector((state) => state.temple);
    const [addTemple, { data: addTempleResponse, isSuccess, isError, error }] =
        useAddTempleMutation();

    const [
        addTempleImages,
        {
            data: addTempleImageResponse,
            isSuccess: imageUploadSuccess,
            isError: errorImageUpload,
            error: errorLogImage,
        },
    ] = useAddTempleImagesMutation();

    const { theme } = useContext(ThemeContext);
    console.log('🚀 ~ PreviewPage ~ theme:', theme.colorscheme);
    const handleOnSubmit = () => {
        addTemple({
            Name: templadata?.templeName,
            Description: templadata.description,
            Longitude: templadata.templeLocation.coordinate.longitude,
            Latitude: templadata.templeLocation.coordinate.latitude,
            email,
            location_name: templadata?.templeLocation?.locationName,
            // temple_images: templadata.templeLocation.coordinate.imageSrc,
        })
            .unwrap()
            .then((response) => {
                console.log('temple added ==>', response?.data?.id);
                if (response.status === 'SUCCESS') {
                    const id = response?.data?.id;
                    const formData = new FormData();

                    for (let i = 0; i < templadata.imageSrc.length; i++) {
                        formData.append('files', {
                            name: templadata.imageSrc[i]?.fileName,
                            type: templadata.imageSrc[i]?.type,
                            uri: templadata.imageSrc[i]?.uri,
                        });
                    }
                    formData.append('ref', 'api::map.map');
                    formData.append('refId', id);
                    formData.append('field', 'temple_images');

                    console.log('The formdata ==>', formData);
                    addTempleImages(formData)
                        .unwrap()
                        .then((response) => {
                            console.log(
                                'the images are uploaded successFully ',
                                JSON.stringify(response)
                            );
                        })
                        .catch((err) => {
                            console.log('the images are uploaded error ', JSON.stringify(err));
                        });
                    setStep('SUCCESS');
                }
            })
            .catch((err) => {
                // setStep('REQUEST_FAILED');
                console.log('the error is -=====>', err);
                Alert.alert(`Some error occured , Try again `);
            });
    };
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
                                {<BackBtnSvg fill={'#222222'} />}
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
                        value={templadata?.templeName ?? 'Values not avaible'}
                    />
                    <KeyValueBox
                        keyName={'Location'}
                        value={templadata?.templeLocation?.locationName ?? 'Values not avaible'}
                    />
                    <KeyValueBox
                        keyName={'Description'}
                        value={templadata?.description ?? 'Values not avaible'}
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
                    onPress={handleOnSubmit}
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
