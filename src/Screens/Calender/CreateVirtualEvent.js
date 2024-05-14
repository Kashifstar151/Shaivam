import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Background from "../../components/Background";
import Icon from "react-native-vector-icons/dist/Feather";
import ReminderSnackBar from "./ReminderSnackBar";
import { colors } from "../../Helpers";
import TextInputCom from "../Temples/Common/TextInputCom";
// import LocationLogo from "../../components/SVGs/LocationLogo";
import CalendarSVG from "../../components/SVGs/CalendarSVG";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import SelectFrequency from "./SelectFrequency";
import SelectWeek from "./SelectWeek";
import { launchImageLibrary } from "react-native-image-picker";
import Feather from "react-native-vector-icons/dist/Feather";
import ButtonComp from "../Temples/Common/ButtonComp";
import { RouteTexts } from "../../navigation/RouteText";
import { useAddImageForEventMutation, useAddRecurringEventMutation, useAddRegularEventMutation, useGetListQuery } from "../../store/features/Calender/CalenderApiSlice";
import { useDispatch, useSelector } from 'react-redux';
import DatePickerCalender from "./DatePickerCalender";
import DateSelection from "./DateSelection";
import { useDebouncer } from "../../Helpers/useDebouncer";
import SimpleIcon from "react-native-vector-icons/dist/SimpleLineIcons";
import { setInputValue } from "../../store/features/Calender/FormSlice";
import { FlatList } from "react-native-gesture-handler";
const CreateVirtualEvent = ({ navigation }) => {
    const [AddRegularEvent, { isSuccess, isError }] = useAddRegularEventMutation()
    const [AddRecurringEvent, { isSuccess: RecurringSuccess, isError: recurringError }] = useAddRecurringEventMutation()
    const [AddImage, { isLoading }] = useAddImageForEventMutation()
    const dispatch = useDispatch()
    const WeekRBSheet = useRef(null)
    const categorySheet = useRef(null)
    const weekDays = [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ]
    const inputValue = useSelector(state => state.form?.inputValues || '');
    const RbSheetRef = useRef(null)
    const [selectedFrequecy, setSelectedFrequecy] = useState(null)
    const [selectedWeek, setSelectedWeek] = useState(null)
    const [bottomCom, setBottomCom] = useState('')
    const [recurringEvent, setRecurringEvent] = useState(false)
    const [virtualEvent, setVirtualEvent] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [selectWeek, setSelectWeek] = useState(null)
    const selectionHandlerBottomShhet = (name) => {
        setBottomCom(name)
        RbSheetRef?.current?.open()
    }
    const [images, setImage] = useState([])
    const openGallary = () => {
        // let image = []
        const options = {
            selectionLimit: 5,
        };
        launchImageLibrary(options, (callback) => {
            // console.log('🚀 ~ openGallary ~ callback:', callback);
            if (callback?.assets?.length > 0) {
                setImage(prev => [...prev, ...callback?.assets?.flat()])
            }

        });
    };
    const removeImage = (res) => {
        let arr = images.filter((item) => {
            return item.fileName !== res.fileName;
        });
        console.log('🚀 ~ arr ~ arr:', arr);
        setImage(arr);
    };
    const RenderImage = (item) => {
        // console.log('🚀 ~ RenderImage ~ item:', JSON.stringify(images, 0, 2));
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
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular' }}>
                    {item?.fileName?.slice(-10)}
                </Text>
            </View>
        );
    };
    const [title, setTitle] = useState(false)

    const onSubmit = () => {
        const formData = new FormData();
        if (recurringEvent) {
            console.log(inputValue, 'recurringEvent')
            AddRecurringEvent({ data: inputValue }).then((res) => {
                console.log("🚀 ~ AddRecurringEvent ~ res:", JSON.stringify(res))

            }).catch((error) => {
                console.log("🚀 ~ AddRecurringEvent ~ error:", JSON.stringify(error))
            })
        } else {
            AddRegularEvent({ data: inputValue, eventType: recurringEvent }).then((res) => {
                console.log("🚀 ~ AddRegularEvent ~ res:", JSON.stringify(res))
                console.log("🚀 ~ AddRegularEvent ~ res:", JSON.stringify(images))

                if (res && images?.length > 0) {
                    let id = res?.data?.data?.id;

                    const data = {
                        name: images?.fileName,
                        type: images?.type,
                        uri: images?.uri,
                    }
                    for (let i = 0; i < images.length; i++) {
                        formData.append("files", {
                            name: images[i]?.fileName,
                            type: images[i]?.type,
                            uri: images[i]?.uri,
                        });
                    }
                    formData.append("ref", "api::regular-event.regular-event");
                    formData.append("refId", id);
                    formData.append("field", "Files");
                    // console.log("🚀 ~ AddRegularEvent ~ formData:", JSON.stringify(formData))
                    AddImage(formData).then((res) => {
                        console.log("🚀 ~ AddImage ~ res:", JSON.stringify(res))
                    }).catch((error) => {
                        console.log("🚀 ~ AddImage ~ error:", JSON.stringify(error))
                    })
                    navigation.navigate(RouteTexts.SUCCESS)
                }
            }).catch((error) => {
                console.log("🚀 ~ AddRegularEvent ~ error:", error)
            })
        }
    }
    const [searchedText, setSearchedText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [fetchLocationName, setFetchedLocationsName] = useState(null)
    const [location, setLocation] = useState(null)
    const debounceVal = useDebouncer(searchedText, 500);
    const searchResultData = async () =>
        await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${debounceVal}&accept-language=en`,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }
        ).then((res) => res.json());
    useEffect(() => {
        searchResultData().then((response) => {
            console.log(
                'the response for the search of the place name is ========================== ==>',
                response
            );
            if (response?.length > 0) {
                setShowModal(true)
            }
            setFetchedLocationsName((prev) => response)
        });
    }, [debounceVal]);
    const selectionHandler = (item) => {
        alert(JSON.stringify(item))
        setLocation(item)
        dispatch(setInputValue({ inputKey: 'Location', inputValue: item?.name }))
        setShowModal(false)
    }
    const rednerItem = (item, index) => (
        <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center' }} activeOpacity={0.5} onPress={() => selectionHandler(item)}>
            <SimpleIcon name='location-pin' size={16} color={'rgba(34, 34, 34, 1)'} />
            <Text style={{ color: 'rgba(34, 34, 34, 1)', fontFamily: 'Mulish-Regular', marginHorizontal: 20 }}>{item?.name}</Text>
        </TouchableOpacity>
    )
    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }} bounces={false} nestedScrollEnabled>
            <Background>
                <View style={styles.mainCom}>
                    <View>
                        <Text style={styles.mainHeading}>Add events</Text>
                        <Text style={styles.subHeadingText}>You can add events items directly to the Shaivam.org News listing now. (They will be published after moderation.)</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='x' color='black' size={24} />
                    </TouchableOpacity>
                </View>
            </Background>
            {/* <View style={{ backgroundColor: '#F3F3F3', height: 2, width: Dimensions.get('window').width, marginVertical: 10 }} /> */}

            <View style={{ flex: 1, alignItems: 'center', paddingBottom: 250 }}>
                <ReminderSnackBar hidebell={true} text={'Virtual Event'} description={'Turn this on if the event takes place online'} setRecurringEvent={setVirtualEvent} recurringEvent={virtualEvent} />
                {
                    // virtualEvent ?
                    //     <View>
                    //         <TextInputCom insiderText={'Virtual event url'} headinText={'Virtual event url'} width={Dimensions.get('window').width - 40} />
                    //         <TextInputCom insiderText={'Enter event title'} headinText={'Event title*'} width={Dimensions.get('window').width - 40} />
                    //         <View style={{ marginVertical: 10 }}>
                    //             <Text style={{ color: '#777777' }}>{'Event category'}</Text>
                    //             <TouchableOpacity onPress={() => categorySheet?.current?.open()} style={styles.dropdownContainer}>
                    //                 {/* <Icon name="calender" size={24} color="#777777" /> */}
                    //                 <Text style={[
                    //                     styles.descriptionText,
                    //                     { fontSize: 14, marginHorizontal: 10 },
                    //                 ]}>
                    //                     {selectedFrequecy == null ? 'Select Category' : selectedFrequecy?.name}
                    //                 </Text>
                    //                 {/* <CalendarSVG fill={'#777777'} /> */}
                    //                 <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                    //             </TouchableOpacity>
                    //         </View>
                    //         <View style={{ marginVertical: 10 }}>
                    //             <Text style={{ color: '#777777' }}>{'Brief Description of the Event'}</Text>
                    //             <View style={{ width: Dimensions.get('window').width - 30, height: 120, backgroundColor: '#F3F3F3', }}>
                    //                 <TextInput style={styles.inputComp} placeholder={'Enter event description'} multiline />
                    //             </View>
                    //         </View>
                    //         <View style={{ marginVertical: 10, width: Dimensions.get('window').width - 30 }}>
                    //             <Text style={{ color: '#777777' }}>{'Upload Images (You can upload multiple images)'}</Text>
                    //             <TouchableOpacity onPress={openGallary} style={styles.uploadContainer}>
                    //                 <Icon name="image" size={24} color="#777777" />
                    //                 <Text
                    //                     style={[
                    //                         styles.descriptionText,
                    //                         { fontSize: 14, marginHorizontal: 10 },
                    //                     ]}
                    //                 >
                    //                     Click here to upload photo
                    //                 </Text>
                    //             </TouchableOpacity>
                    //         </View>
                    //         {images?.length > 0 && (
                    //             <View style={{ height: 150, width: Dimensions.get('window').width - 30 }}>
                    //                 <FlatList
                    //                     contentContainerStyle={{ marginBottom: 0, }}
                    //                     horizontal
                    //                     data={images}
                    //                     renderItem={({ item, index }) => RenderImage(item)}
                    //                 />
                    //             </View>
                    //         )}
                    //     </View> :
                    <View>
                        {virtualEvent &&
                            <TextInputCom insiderText={'Virtual event url'} headinText={'Virtual event url'} width={Dimensions.get('window').width - 40} />

                        }
                        <TextInputCom value={inputValue['title']} inputKey={'title'} insiderText={'Enter event title'} headinText={'Event title*'} width={Dimensions.get('window').width - 40} />
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ color: '#777777' }}>{'Event category'}</Text>
                            <TouchableOpacity onPress={() => RbSheetRef?.current?.open()} style={styles.dropdownContainer}>
                                <Text style={[
                                    styles.descriptionText,
                                    { fontSize: 14, marginHorizontal: 10 },
                                ]}>
                                    {selectedFrequecy == null ? 'Select Category' : selectedFrequecy?.name}
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
                        <TextInputCom returnType='done' value={inputValue['description']} inputKey={'description'} insiderText={'Enter the event description'} headinText={'Brief Description of the Event'} width={Dimensions.get('window').width - 40} height={110} />
                        {!virtualEvent &&
                            <TextInput style={{ backgroundColor: '#F3F3F3', width: Dimensions.get('window').width - 30, borderRadius: 10, paddingHorizontal: 20, height: 50 }} onChangeText={(e) => setSearchedText(e)} value={searchedText} placeholder={'Type Location here'} />
                        }
                        {
                            showModal &&
                            <View style={{ zIndex: 100, height: 'auto', backgroundColor: 'white', }}>
                                <FlatList contentContainerStyle={{ paddingHorizontal: 20 }} data={fetchLocationName} renderItem={({ item, index }) => (
                                    rednerItem(item, index)
                                )} />
                            </View>
                        }
                        <TextInputCom value={inputValue['url'] || inputValue['URL']} inputKey={recurringEvent ? 'URL' : 'url'} insiderText={'Enter event Url'} headinText={'URL'} width={Dimensions.get('window').width - 40} />
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ color: '#777777' }}>{'Upload Images (You can upload multiple images)'}</Text>
                            <TouchableOpacity onPress={openGallary} style={styles.uploadContainer}>
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
                        </View>
                        {images?.length > 0 && (
                            <View style={{ height: 150, width: Dimensions.get('window').width - 30 }}>
                                <FlatList
                                    contentContainerStyle={{ marginBottom: 0, }}
                                    horizontal
                                    data={images}
                                    renderItem={({ item, index }) => RenderImage(item)}
                                />
                            </View>
                        )}
                        <View style={{ marginVertical: 0 }}>
                            <ReminderSnackBar hidebell={true} text='Recurring Event' descriptionText={true} setRecurringEvent={setRecurringEvent} recurringEvent={recurringEvent} />
                        </View>
                        {
                            recurringEvent &&
                            <>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#777777' }}>{'Frequency of the event'}</Text>
                                    <TouchableOpacity onPress={() => categorySheet?.current?.open()} style={styles.dropdownContainer}>
                                        <Text style={[
                                            styles.descriptionText,
                                            { fontSize: 14, marginHorizontal: 10 },
                                        ]}>
                                            {inputValue['Frequency'] ? inputValue['Frequency'] : 'Select Frquency'}
                                        </Text>
                                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#777777' }}>{'Week'}</Text>
                                    <TouchableOpacity onPress={() => WeekRBSheet.current.open()} style={styles.dropdownContainer}>
                                        <Text style={[
                                            styles.descriptionText,
                                            { fontSize: 14, marginHorizontal: 10 },
                                        ]}>
                                            {inputValue['Days'] ? inputValue['Days'] : 'Select Option'}
                                        </Text>
                                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginVertical: 0, height: 80 }}>
                                    <Text style={{ color: '#777777' }}>{'Select day'}</Text>
                                    <FlatList contentContainerStyle={{ marginVertical: 15, height: 'auto' }} horizontal data={weekDays} renderItem={({ item, index }) => (
                                        <DateSelection item={item} inputKey={'day'} value={inputValue['day']} style={styles.weekDaysContainer} />
                                    )} />
                                </View>
                            </>
                        }
                        <TextInputCom value={inputValue['Country']} inputKey={'Country'} insiderText={'Enter country name'} headinText='Country' width={Dimensions.get('window').width - 40} />
                        <TextInputCom value={inputValue['City']} inputKey={'City'} insiderText={'Enter city name'} headinText='City' width={Dimensions.get('window').width - 40} />
                        <TextInputCom value={inputValue['state'] || inputValue['State']} inputKey={recurringEvent ? 'State' : 'state'} insiderText={'Enter state name'} headinText='State' width={Dimensions.get('window').width - 40} />
                        <TextInputCom value={inputValue['District']} inputKey={'District'} insiderText={'Enter district name'} headinText='District' width={Dimensions.get('window').width - 40} />
                        <TextInputCom value={inputValue['Pin']} inputKey={'Pin'} insiderText={'Enter Pincode name'} headinText='Pincode' width={Dimensions.get('window').width - 40} />
                        {
                            recurringEvent ? <></> :
                                <>
                                    <View style={{ marginVertical: 10 }}>
                                        <Text>{'Start date'}</Text>
                                        <TouchableOpacity style={styles.startDateContainer} onPress={() => setShowDatePicker(true)}>
                                            {/* <Icon name="calender" size={24} color="#777777" /> */}
                                            <CalendarSVG fill={'#777777'} />
                                            <Text style={[
                                                styles.descriptionText,
                                                { fontSize: 14, marginHorizontal: 10 },
                                            ]}>
                                                {inputValue['start_date'] ? inputValue['start_date'] : 'DD/MM/YY'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <Text>{'End date'}</Text>
                                        <TouchableOpacity style={styles.startDateContainer} onPress={() => setShowEndDatePicker(true)}>
                                            <CalendarSVG fill={'#777777'} />
                                            <Text style={[
                                                styles.descriptionText,
                                                { fontSize: 14, marginHorizontal: 10 },
                                            ]}>
                                                {inputValue['end_date'] ? inputValue['end_date'] : 'DD/MM/YY'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                        <TextInputCom value={inputValue['name'] || inputValue['Name']} inputKey={recurringEvent ? 'Name' : 'name'} insiderText={'Enter your name'} headinText={'Name'} width={Dimensions.get('window').width - 40} />
                        <TextInputCom value={inputValue['email'] || inputValue['Email']} inputKey={recurringEvent ? 'Email' : 'email'} insiderText={'Enter your email'} headinText={'Email'} width={Dimensions.get('window').width - 40} />
                    </View>
                }
                <DatePickerCalender inputKey={'start_date'} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} />
                <DatePickerCalender inputKey={'end_date'} showDatePicker={showEndDatePicker} setShowDatePicker={setShowEndDatePicker} />
                <ButtonComp text={'Submit'} navigation={() => onSubmit()} />
            </View>
            {/* </TouchableWithoutFeedback> */}
            <RBSheet ref={RbSheetRef} height={Dimensions.get('window').height / 2}>
                <SelectFrequency selectedFrequecy={selectedFrequecy} setSelectedFrequecy={setSelectedFrequecy} closeBottomSheet={RbSheetRef.current?.close()} showCategory={true} comp={bottomCom} />
            </RBSheet>
            <RBSheet ref={WeekRBSheet} height={Dimensions.get('window').height / 2}>
                <SelectWeek selectedWeek={selectWeek} setSelectedWeek={setSelectWeek} closeBottomSheet={WeekRBSheet.current?.close()} />
            </RBSheet>
            <RBSheet ref={categorySheet} height={Dimensions.get('window').height / 2}>
                <SelectFrequency selectedFrequecy={selectWeek} setSelectedFrequecy={setSelectWeek} closeBottomSheet={categorySheet?.current?.close()} showCategory={false} comp={bottomCom} />
            </RBSheet>

        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    mainCom: { paddingBottom: 10, alignItems: 'center', marginTop: 40, paddingTop: 10, backgroundColor: '#fff', borderTopEndRadius: 15, borderTopLeftRadius: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', },
    mainHeading: { fontFamily: 'Lora-Bold', fontSize: 16, color: 'black' },
    subHeadingText: { fontFamily: 'Mulish-Regular', fontSize: 12, color: colors.grey7 },
    inputComp: { backgroundColor: '#F3F3F3', width: Dimensions.get('window').width - 30, borderRadius: 10, paddingHorizontal: 20, paddingTop: 10 },
    descriptionText: { fontSize: 12, color: '#777777', fontFamily: 'Mulish-Regular' },
    uploadContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        borderStyle: 'dashed',
        height: 55,
        width: '98%',
        borderColor: '#777777',
        borderRadius: 10,
        borderWidth: 1,
    },
    startDateContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',


        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#F3F3F3',
        height: 55,
        width: '98%',
        // borderColor: '#777777',
        borderRadius: 10,
    },
    dropdownContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#F3F3F3',
        height: 55,
        width: Dimensions.get('window').width - 40,
        // borderColor: '#777777',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    weekDaysContainer: { alignItems: 'center', justifyContent: 'center', marginHorizontal: 5, height: 40, width: 40, borderRadius: 20, }

})
export default CreateVirtualEvent;
