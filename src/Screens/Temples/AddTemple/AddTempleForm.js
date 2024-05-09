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
    updateDescription,
    updateTempleName,
    updateimageSrc,
} from '../../../store/features/Temple/TempleSlice';

const AddTempleForm = ({ navigation, setStep }) => {
    const { theme } = useContext(ThemeContext);
    const [images, setImages] = useState([]);
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
        let arr = images.filter((item) => {
            return item.fileName !== res.fileName;
        });
        console.log('🚀 ~ arr ~ arr:', arr);
        setImages(arr);
    };
    const RenderImage = (item) => {
        // console.log('🚀 ~ RenderImage ~ item:', item);
        return (
            <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
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
                    }}
                    onPress={() => removeImage(item)}
                >
                    <Feather name="x" color="white" />
                </TouchableOpacity>
                <Image
                    source={{ uri: item?.uri }}
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                />
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular', color: '#777777' }}>
                    {item?.fileName?.slice(-10)}
                </Text>
            </View>
        );
    };

    return (
        <View>
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
                            paddingBottom: 80,
                        },
                    ]}
                >
                    <View style={[styles.topBarWrapper]}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: RFValue(18, 850),
                                    fontFamily: 'Lora-Bold',
                                }}
                            >
                                Add a temple
                            </Text>

                            <Pressable
                                style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    setStep();
                                }}
                            >
                                <CloseBtn />
                            </Pressable>
                        </View>

                        <Text
                            style={{
                                color: '#777777',
                                fontSize: RFValue(14, 850),
                                fontFamily: 'Mulish',
                                lineHeight: 18,
                            }}
                        >
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
                                    style={{
                                        color: 'black',
                                        backgroundColor: '#F3F3F3',
                                        borderRadius: 10,
                                        paddingLeft: 45,
                                        paddingRight: 10,
                                        paddingVertical: 15,
                                        height: 50,
                                        textAlign: 'left',
                                        verticalAlign: 'top',
                                        fontFamily: 'Mulish-Regular',
                                    }}
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

                            <Text style={styles.descriptionText}>Temple name**</Text>
                            <View>
                                <TextInput
                                    placeholderTextColor={colors.grey5}
                                    placeholder="Type here"
                                    value={templadata.templeName}
                                    onChangeText={(text) => dispatch(updateTempleName(text))}
                                    style={{
                                        color: 'black',
                                        backgroundColor: '#F3F3F3',
                                        borderRadius: 10,
                                        paddingLeft: 15,
                                        paddingRight: 10,
                                        paddingVertical: 15,
                                        textAlign: 'left',
                                        verticalAlign: 'top',
                                        fontFamily: 'Mulish-Regular',
                                    }}
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
                                    style={{
                                        color: 'black',
                                        backgroundColor: '#F3F3F3',
                                        borderRadius: 10,
                                        paddingLeft: 15,
                                        paddingRight: 10,
                                        paddingVertical: 15,
                                        textAlign: 'left',
                                        verticalAlign: 'top',
                                        fontFamily: 'Mulish-Regular',
                                    }}
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
                    onPress={() => setStep(3)}
                    text={'Next'}
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

export default AddTempleForm;