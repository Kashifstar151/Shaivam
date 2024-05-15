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
import { useDispatch, useSelector } from 'react-redux';
import {
    resetTheState,
    updateDescription,
    updateTempleName,
    updateimageSrc,
} from '../../../store/features/Temple/TempleSlice';

const AddTempleForm = ({ navigation, setStep }) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const templadata = useSelector((state) => state.temple);
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
        launchImageLibrary(options, (value) => {
            dispatch(updateimageSrc(value?.assets));
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

    const removeImage = (res) => {
        let arr = templadata?.imageSrc.filter((item) => {
            return item.fileName !== res.fileName;
        });

        dispatch(updateimageSrc(arr));
    };
    const RenderImage = (item) => {
        // console.log('🚀 ~ RenderImage ~ item:', item);
        return (
            <View style={styles.renderImageMasterContainer}>
                <TouchableOpacity style={styles.removeImageBtn} onPress={() => removeImage(item)}>
                    <Feather name="x" color="white" />
                </TouchableOpacity>
                <Image source={{ uri: item?.uri }} style={styles.imageBox} />
                <Text style={styles.imageName}>{item?.fileName?.slice(-10)}</Text>
            </View>
        );
    };

    return (
        <View>
            <ScrollView>
                <ImageBackground
                    // source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
                    source={bgImg}
                    resizeMode="cover"
                    style={styles.imageDimension}
                />

                <View
                    style={[
                        styles.wholeContainerWrapper,
                        {
                            backgroundColor: 'white',
                            paddingBottom: 80,
                        },
                    ]}
                >
                    <View style={[styles.topBarWrapper]}>
                        <View style={styles.topBarContainer}>
                            <Text style={styles.mainHeader}>Add a temple</Text>

                            <Pressable
                                style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    setStep('FAILED');
                                    dispatch(resetTheState());
                                }}
                            >
                                <CloseBtn />
                            </Pressable>
                        </View>

                        <Text style={styles.subHeader}>
                            You can add Shiva temples in India, Nepal, Srilanka. Hindu temples in
                            the rest of the world.
                        </Text>
                    </View>

                    {/* form container */}

                    <View
                        style={{
                            padding: 20,
                        }}
                    >
                        <View
                            style={{
                                paddingBottom: 10,
                            }}
                        >
                            <StepTitleContainer
                                step={1}
                                title={'Enter the Temple Location'}
                                subtitle={
                                    'Map will open. In that point the marker to the location of the temple, you want to add.'
                                }
                            />

                            <Text style={styles.descriptionText}>Temple location*</Text>
                            <View>
                                <LocationLogo
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        zIndex: 100,
                                        transform: [
                                            {
                                                translateY: -10,
                                            },
                                            {
                                                translateX: 20,
                                            },
                                        ],
                                    }}
                                    fill={'#C1554E'}
                                />

                                <TextInput
                                    placeholderTextColor={colors.grey5}
                                    placeholder="Select location"
                                    onFocus={() => {
                                        setStep(2);
                                    }}
                                    value={templadata?.templeLocation?.locationName}
                                    style={[styles.textInputStyle, styles.selectLocationInput]}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                paddingBottom: 10,
                            }}
                        >
                            <StepTitleContainer
                                step={2}
                                title={'Enter the Temple name'}
                                subtitle={'Town/Village name followed by Swamy/Temple name'}
                            />

                            <Text style={styles.descriptionText}>Temple name*</Text>
                            <View>
                                <TextInput
                                    placeholderTextColor={colors.grey5}
                                    placeholder="Type here"
                                    value={templadata.templeName}
                                    onChangeText={(text) => dispatch(updateTempleName(text))}
                                    style={styles.textInputStyle}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                paddingBottom: 10,
                            }}
                        >
                            <StepTitleContainer
                                step={3}
                                title={'Description'}
                                subtitle={'A short description about the temple'}
                            />

                            <Text style={styles.descriptionText}>Temple Description</Text>
                            <View>
                                <TextInput
                                    // selection={{ start: 30, end: 0 }}
                                    // value={desciption}
                                    placeholderTextColor={colors.grey5}
                                    multiline
                                    placeholder="Type here"
                                    onFocus={() => {
                                        // navigation.navigate('PinTheLocation');
                                        // setPinTheLocation(!pinTheLocation);
                                    }}
                                    value={templadata.description}
                                    onChangeText={(text) => dispatch(updateDescription(text))}
                                    numberOfLines={4}
                                    style={{ ...styles.textInputStyle }}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                paddingBottom: 10,
                            }}
                        >
                            <StepTitleContainer
                                step={4}
                                title={'Add images'}
                                subtitle={
                                    'You can take the picture now or add a picture that is already taken'
                                }
                            />

                            <View>
                                <Text
                                    style={[styles.descriptionText, { fontFamily: 'Mulish-Bold' }]}
                                >
                                    Upload Images (You can upload multiple images)
                                </Text>
                                <TouchableOpacity
                                    onPress={openGallary}
                                    style={styles.uploadContainer}
                                >
                                    <Icon name="image" size={24} color="#777777" />
                                    <Text
                                        style={[
                                            styles.descriptionText,
                                            { fontSize: 14, marginHorizontal: 10 },
                                        ]}
                                    >
                                        Click here to upload photo
                                    </Text>
                                </TouchableOpacity>

                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    {templadata?.imageSrc?.length > 0 && (
                                        <View style={{ height: 150 }}>
                                            <FlatList
                                                contentContainerStyle={{ marginBottom: 0 }}
                                                horizontal
                                                data={templadata?.imageSrc}
                                                renderItem={({ item, index }) => RenderImage(item)}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.nextBtn}>
                <CustomLongBtn
                    onPress={() => {
                        if (templadata.templeLocation.locationName && templadata.templeName) {
                            setStep(3);
                        }
                    }}
                    text={'Next'}
                    textStyle={{
                        color:
                            templadata.templeLocation.locationName && templadata.templeName
                                ? '#4C3600'
                                : '#fff',
                        fontFamily: 'Mulish-Bold',
                    }}
                    containerStyle={{
                        backgroundColor:
                            templadata.templeLocation.locationName && templadata.templeName
                                ? '#FCB300'
                                : '#777777',
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    renderImageMasterContainer: { marginHorizontal: 10, alignItems: 'center' },
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },
    removeImageBtn: {
        zIndex: 20,
        position: 'relative',
        top: 10,
        left: 50,
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C1554E',
    },
    imageBox: { height: 100, width: 100, borderRadius: 10 },
    imageName: { fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' },
    imageDimension: { width: '100%', height: 70 },

    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    mainHeader: {
        color: 'black',
        fontSize: RFValue(18, 850),
        fontFamily: 'Lora-Bold',
    },

    subHeader: {
        color: '#777777',
        fontSize: RFValue(14, 850),
        fontFamily: 'Mulish',
        lineHeight: 18,
    },

    textInputStyle: {
        color: 'black', // color: 'black',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingLeft: 15,

        paddingRight: 10,
        paddingVertical: 15,
        textAlign: 'left',
        verticalAlign: 'top',
        fontFamily: 'Mulish-Regular',
    },

    selectLocationInput: {
        paddingLeft: 45,
        height: 50,
    },
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

    nextBtn: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        elevation: 10,
        backgroundColor: 'white',

        // backgroundColor: 'green',
    },
});

export default AddTempleForm;
