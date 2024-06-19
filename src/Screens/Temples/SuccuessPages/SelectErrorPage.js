import { BlurView } from '@react-native-community/blur';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import WhiteBackButton from '../../../assets/Images/arrow (1) 1.svg';
import { ThemeContext } from '../../../Context/ThemeContext';
import { colors } from '../../../Helpers';
import ButtonComp from '../Common/ButtonComp';
import LocationLogo from '../../../components/SVGs/LocationLogo';
import PinTheLocation from '../PinTheLocationPage';
import LottieView from 'lottie-react-native';
import { getTheLocationName } from '../../../Helpers/GeolocationFunc';
import { useTempleErrorhandlerMutation } from '../../../store/features/Temple/TemplApiSlice';

const indianMobRegex = /^[6789]\d{9}$/g;

const SelectErrorPage = ({
    setShowSubmit,
    selectedError,
    navigation,
    setModalVisible,
    existingTempDetail,
}) => {
    const theme = useColorScheme(ThemeContext);
    const [desciption, setDescription] = useState(null);
    const [phoneNumber, setphoneNumber] = useState(null);
    const [disable, setDisable] = useState(true);
    const [submitted, setSubmitted] = useState(0);
    const [newLocation, setNewLocation] = useState({
        new_longitude: null,
        new_latitude: null,
    });
    const [
        templeErrorhandler,
        {
            data: templeErrorReportedData,
            error: templeErrorhandlerError,
            isError: templeErrorhandlerIsError,
            isSuccess: templeErrorhandlerIsSuccess,
        },
    ] = useTempleErrorhandlerMutation({});

    useEffect(() => {
        if (desciption !== null && indianMobRegex.test(phoneNumber)) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [desciption, phoneNumber]);
    const [pinTheLocation, setPinTheLocation] = useState(false);
    // useEffect(() => {
    //     if (desciption && !pinTheLocation) {
    //         textRef.current.setSelection({ start: 0, end: 0 });
    //     }
    // }, [desciption, pinTheLocation]);
    const textRef = useRef();
    const animationref = useRef(null);
    useEffect(() => {
        animationref.current?.play();
        // Or set a specific startFrame and endFrame with:
        animationref.current?.play(30, 120);
    }, [submitted]);

    const [existingLocName, setExistingLocName] = useState({
        name: '',
        state: 0,
        /*
        ? 1=> for success,
        ? -1 => failed
        ? 0 => loading 

        */
    });

    const fetchTheLocationName = useCallback(
        async (lat, lng) => {
            setExistingLocName((prev) => ({ ...prev, state: 0 }));
            const locationDetail = await getTheLocationName({
                latitude: lat,
                longitude: lng,
            });
            if (locationDetail?.status === 'SUCCESS') {
                setExistingLocName((prev) => {
                    return {
                        name:
                            locationDetail?.data?.address?.village ||
                            locationDetail?.data?.name ||
                            locationDetail?.data?.display_name,

                        state: 1,
                    };
                });
            } else if (locationDetail.status === 'FAILED') {
                console.log('the error has occured ===>', locationDetail?.err);
                setExistingLocName((prev) => ({ ...prev, state: -1 }));
            }
        },
        [existingTempDetail?.coords.latitude, existingTempDetail?.coords.longitude]
    );

    useEffect(() => {
        fetchTheLocationName(
            existingTempDetail?.coords.latitude,
            existingTempDetail?.coords.longitude
        );
    }, [existingTempDetail?.coords.latitude, existingTempDetail?.coords.longitude]);

    useEffect(() => {
        if (templeErrorhandlerIsError) {
            console.log('templeErrorhandlerError ===>', templeErrorhandlerError);
            setSubmitted(-1);
        }
        if (templeErrorhandlerIsSuccess) {
            setSubmitted(1);
        }
    }, [
        templeErrorhandlerError,
        templeErrorhandlerIsError,
        templeErrorhandlerIsSuccess,
        templeErrorReportedData,
    ]);

    const onSubmitHandler = () => {
        if (!disable) {
            const errorList = {
                1: 'Temp_Details',
                2: 'Temp_Location',
                3: 'Temp_Not_Empty',
            };
            const body = {
                error_type: errorList[selectedError?.id],
                temple_id: existingTempDetail?.templeId,
                phone_number: phoneNumber,
            };

            if (selectedError?.id === 2) {
                body['new_latitude'] = newLocation.new_latitude;
                body['new_longitude'] = newLocation.new_longitude;
                // delete body['user_comment'];
                body['location_name'] = desciption;
            } else {
                body['user_comment'] = desciption;
            }

            templeErrorhandler(body);
        }
    };
    return (
        <>
            {!pinTheLocation ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <BlurView
                        blurAmount={5}
                        style={{
                            position: 'absolute',
                            top: 0,
                            height: Dimensions.get('window').height,
                            width: '100%',
                        }}
                    ></BlurView>
                    {submitted === -1 && (
                        <View
                            style={[
                                styles.mainContainer,
                                {
                                    height: Dimensions.get('window').height / 2,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                    gap: 20,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <Icon name="x" color="#222222" size={22} />
                            </TouchableOpacity>
                            <View style={{ backgroundColor: 'white' }}>
                                <LottieView
                                    ref={animationref}
                                    style={{ height: 200, width: 200 }}
                                    source={require('../../../assets/JSON/ErrorGIF.json')}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'Mulish-Bold',
                                    color: '#222222',
                                }}
                            >
                                {'Error submission Failed !'}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'Mulish-Regular',
                                    color: '#222222',
                                }}
                            >
                                OOps.. something went wrong !!
                            </Text>
                        </View>
                    )}

                    {submitted === 1 && (
                        <View
                            style={[
                                styles.mainContainer,
                                {
                                    height: Dimensions.get('window').height / 2,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                    gap: 20,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <Icon name="x" color="#222222" size={22} />
                            </TouchableOpacity>
                            <View style={{ backgroundColor: 'white' }}>
                                <LottieView
                                    ref={animationref}
                                    style={{ height: 200, width: 200 }}
                                    source={require('../../../assets/JSON/SuccessGIF.json')}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'Mulish-Bold',
                                    color: '#222222',
                                }}
                            >
                                {'Error submitted!'}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'Mulish-Regular',
                                    color: '#222222',
                                }}
                            >
                                Our team will go through your submission, validate it and update it
                                on to the app.
                            </Text>
                        </View>
                    )}

                    {submitted === 0 && (
                        // <KeyboardAvoidingView behavior="position" style={styles.mainContainer}>
                        <View style={[styles.mainContainer, { backgroundColor: '#fff' }]}>
                            {/* <BackButton nandiLogo={false} navigation={navigation} /> */}
                            <TouchableOpacity
                                style={{ paddingHorizontal: 20, marginVertical: 20 }}
                                onPress={() => setShowSubmit(false)}
                            >
                                <WhiteBackButton />
                            </TouchableOpacity>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text
                                    style={{
                                        fontFamily: 'Mulish-Regular',
                                        color: '#777777',
                                        marginBottom: 15,
                                    }}
                                >
                                    {existingTempDetail?.templeName}
                                </Text>
                                <Text style={styles.submitText}>Spotted an error?</Text>
                                <Text style={styles.descriptionText}>
                                    Select one of the following options
                                </Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <View style={styles.errorContainer}>
                                    <Text
                                        style={{
                                            fontFamily: 'Mulish-Regular',
                                            color: '#222222',
                                        }}
                                    >
                                        {selectedError?.name}
                                    </Text>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            width: 20,
                                            height: 20,
                                            backgroundColor: '#C1554E',
                                        }}
                                    >
                                        <Icon name="check" size={14} color="#fff" />
                                    </View>
                                </View>
                            </View>
                            {selectedError?.id === 1 && (
                                <View style={styles.inputContainer}>
                                    <Text style={styles.descriptionText}>
                                        Tell us what is incorrect
                                    </Text>
                                    <TextInput
                                        onChangeText={(e) => setDescription(e)}
                                        placeholderTextColor={colors.grey5}
                                        placeholder="Type here"
                                        style={{
                                            color: 'black',
                                            backgroundColor: '#F3F3F3',
                                            borderRadius: 10,
                                            padding: 10,
                                            height: 100,
                                        }}
                                    />
                                </View>
                            )}

                            {selectedError?.id === 2 && (
                                <View style={styles.inputContainer}>
                                    <View
                                        style={{
                                            borderRadius: 15,
                                            borderWidth: 1,
                                            borderColor: '#F3F3F3',
                                            paddingHorizontal: 20,
                                            paddingVertical: 15,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 10,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <LocationLogo fill={'#777777'} />
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#777777',
                                                    fontFamily: 'Mulish-Regular',
                                                    fontSize: 12,
                                                }}
                                            >
                                                Existing temple location
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#777777',
                                                    fontFamily: 'Mulish-Bold',
                                                    fontSize: 14,
                                                }}
                                            >
                                                {/* {existingTempDetail?.coords.latitude}
                                                    {existingTempDetail?.coords.longitude} */}
                                                {existingLocName.state === 1 &&
                                                    existingLocName?.name}

                                                {existingLocName.state === 0 && 'Loading ...'}

                                                {existingLocName.state === -1 &&
                                                    'Some error occured while fetching !! '}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.descriptionText}>
                                        Correct temple location*
                                    </Text>
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
                                            ref={textRef}
                                            selection={{ start: 30, end: 0 }}
                                            value={desciption}
                                            placeholderTextColor={colors.grey5}
                                            // multiline
                                            placeholder="Select location"
                                            onFocus={() => {
                                                // navigation.navigate('PinTheLocation');
                                                setPinTheLocation(!pinTheLocation);
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
                            )}

                            {selectedError?.id === 3 && (
                                <View style={styles.inputContainer}>
                                    <Text style={styles.descriptionText}>
                                        Why do you say the temple doesn’t exist?
                                    </Text>
                                    <TextInput
                                        onChangeText={(e) => setDescription(e)}
                                        placeholderTextColor={colors.grey5}
                                        placeholder="Type your explaination here"
                                        style={{
                                            color: 'black',
                                            backgroundColor: '#F3F3F3',
                                            borderRadius: 10,
                                            padding: 10,
                                            height: 100,
                                        }}
                                    />
                                </View>
                            )}
                            <View style={styles.inputContainer}>
                                <Text style={styles.descriptionText}>Your Phone number*</Text>
                                <TextInput
                                    onChangeText={(e) => {
                                        setphoneNumber(e);
                                    }}
                                    maxLength={10}
                                    placeholderTextColor={colors.grey5}
                                    placeholder="Type here"
                                    keyboardType="numeric"
                                    style={{
                                        color: 'black',
                                        backgroundColor: '#F3F3F3',
                                        borderRadius: 10,
                                        padding: 10,
                                        height: 50,
                                    }}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                                <ButtonComp
                                    // navigation={() => setSubmitted(true)}
                                    navigation={() => onSubmitHandler()}
                                    text={'Submit'}
                                    color={!disable}
                                />
                            </View>
                        </View>
                        // </KeyboardAvoidingView>
                    )}
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                    }}
                >
                    <PinTheLocation
                        close={() => {
                            setPinTheLocation(false);
                        }}
                        // initialDragCoorMarker ={}
                        // setDescription={setDescription}
                        valueSetter={(value) => {
                            setNewLocation(() => ({
                                new_latitude: value?.lat,
                                new_longitude: value?.lon,
                            }));
                            return setDescription(value?.display_name);
                        }}
                    />
                </View>
            )}
        </>
    );
};
export const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 25,
    },
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        width: '100%',
        backgroundColor: '#fff',
    },
    submitText: { fontSize: 16, fontFamily: 'Lora-SemiBold', color: '#222222' },
    descriptionText: {
        fontSize: 12,
        color: '#777777',
        fontFamily: 'Mulish-Regular',
        paddingBottom: 5,
    },
    errorContainer: {
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor: '#FFF5F5',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: { marginVertical: 10, paddingHorizontal: 20 },
    // uploadContainer: { paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', marginTop: 5, borderStyle: 'dashed', height: 70, width: '98%', borderColor: '#777777', borderRadius: 10, borderWidth: 1 }
});
export default SelectErrorPage;
