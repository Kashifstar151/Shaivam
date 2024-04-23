import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import Icon from "react-native-vector-icons/dist/Feather";
import ReminderSnackBar from "./ReminderSnackBar";
import { colors } from "../../Helpers";
import TextInputCom from "../Temples/Common/TextInputCom";
import LocationLogo from "../../components/SVGs/LocationLogo";
import CalendarSVG from "../../components/SVGs/CalendarSVG";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import SelectFrequency from "./SelectFrequency";
import SelectWeek from "./SelectWeek";
import { launchImageLibrary } from "react-native-image-picker";
import Feather from "react-native-vector-icons/dist/Feather";
import ButtonComp from "../Temples/Common/ButtonComp";
import { RouteTexts } from "../../navigation/RouteText";
import { useAddImageForEventMutation, useAddRegularEventMutation, useGetListQuery } from "../../store/features/Calender/CalenderApiSlice";
import { useDispatch, useSelector } from 'react-redux';
import DatePickerCalender from "./DatePickerCalender";
import DateSelection from "./DateSelection";
const CreateVirtualEvent = ({ navigation }) => {
    const [AddRegularEvent, { isSuccess, isError }] = useAddRegularEventMutation()
    const [AddImage, { isLoading }] = useAddImageForEventMutation()
    const weekDays = [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ]
    const inputValue = useSelector(state => state.form?.inputValues || '');
    const RbSheetRef = useRef(null)
    const [selectedFrequecy, setSelectedFrequecy] = useState(null)
    const [selectedWeek, setSelectedWeek] = useState(null)
    const [bottomCom, setBottomCom] = useState(null)
    const [recurringEvent, setRecurringEvent] = useState(false)
    const [virtualEvent, setVirtualEvent] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const selectionHandlerBottomShhet = (name) => {
        setBottomCom(name)
        if (bottomCom !== null) {
            RbSheetRef?.current?.open()
        }
    }
    const [images, setImage] = useState([])
    const openGallary = () => {
        const options = {
            selectionLimit: 5,
        };
        launchImageLibrary(options, (callback) => {
            console.log('🚀 ~ openGallary ~ callback:', callback);
            setImage(callback?.assets);

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
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular' }}>
                    {item?.fileName?.slice(-10)}
                </Text>
            </View>
        );
    };
    const [title, setTitle] = useState(false)
    const onSubmit = () => {
        const formData = new FormData();
        AddRegularEvent({ data: inputValue, eventType: recurringEvent }).then((res) => {
            // console.log("🚀 ~ AddRegularEvent ~ res:", JSON.stringify(res))
            // console.log("🚀 ~ AddRegularEvent ~ res:", JSON.stringify(images))

            if (isSuccess && images?.length > 0) {
                let id = res?.data?.data?.id;
                formData.append('files', {
                    name: images[0]?.fileName,
                    type: images[0]?.type,
                    uri: images[0]?.uri,
                });
                // formData.append("files", file);
                formData.append("ref", "api::recurring-event.recurring-event");
                formData.append("refId", id);
                formData.append("field", "File");
                console.log("🚀 ~ AddRegularEvent ~ formData:", JSON.stringify(formData))
                AddImage(formData).then((res) => {
                    console.log("🚀 ~ AddImage ~ res:", res)
                }).catch((error) => {
                    console.log("🚀 ~ AddImage ~ error:", error)

                })
            }

        }).catch((error) => {
            console.log("🚀 ~ AddRegularEvent ~ error:", error)

        })
        // alert('Successfull')
    }
    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }} bounces={false}>
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
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ReminderSnackBar hidebell={true} text={'Virtual Event'} description={'Turn this on if the event takes place online'} setRecurringEvent={setVirtualEvent} recurringEvent={virtualEvent} />
                {
                    virtualEvent ?
                        <View>
                            <TextInputCom insiderText={'Enter event title'} headinText={'Event title*'} width={Dimensions.get('window').width - 40} />
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#777777' }}>{'Event category'}</Text>
                                <TouchableOpacity onPress={() => selectionHandlerBottomShhet('Event category')} style={styles.dropdownContainer}>
                                    {/* <Icon name="calender" size={24} color="#777777" /> */}
                                    <Text style={[
                                        styles.descriptionText,
                                        { fontSize: 14, marginHorizontal: 10 },
                                    ]}>
                                        {selectedFrequecy == null ? 'Select Category' : selectedFrequecy?.name}
                                    </Text>
                                    {/* <CalendarSVG fill={'#777777'} /> */}
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                                </TouchableOpacity>
                            </View>
                            <TextInputCom insiderText={'Enter event title'} headinText={'Event title*'} width={Dimensions.get('window').width - 40} />
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#777777' }}>{'Brief Description of the Event'}</Text>
                                <TouchableOpacity style={{ width: Dimensions.get('window').width - 30 }}>
                                    <TextInput style={styles.inputComp} />
                                    {/* <Text>{insiderText}</Text> */}
                                </TouchableOpacity>
                            </View>
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
                                <View style={{ height: 150 }}>
                                    <FlatList
                                        contentContainerStyle={{ marginBottom: 0, }}
                                        horizontal
                                        data={images}
                                        renderItem={({ item, index }) => RenderImage(item)}
                                    />
                                </View>
                            )}
                        </View> :
                        <View>
                            <TextInputCom value={inputValue['title']} inputKey={'title'} insiderText={'Enter event title'} headinText={'Event title*'} width={Dimensions.get('window').width - 40} />
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#777777' }}>{'Event category'}</Text>
                                <TouchableOpacity onPress={() => selectionHandlerBottomShhet('Event category')} style={styles.dropdownContainer}>
                                    <Text style={[
                                        styles.descriptionText,
                                        { fontSize: 14, marginHorizontal: 10 },
                                    ]}>
                                        {selectedFrequecy == null ? 'Select Category' : selectedFrequecy?.name}
                                    </Text>
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#777777' }}>{'Brief Description of the Event'}</Text>
                                <TouchableOpacity style={{ width: Dimensions.get('window').width - 30 }}>
                                    <TextInput style={styles.inputComp} onChangeText={() => dispatch(setInputValue({ description, inputValue: e }))} />
                                </TouchableOpacity>
                            </View> */}
                            <TextInputCom value={inputValue['description']} inputKey={'description'} insiderText={''} headinText={'Brief Description of the Event'} width={Dimensions.get('window').width - 40} height={110} />
                            <TextInputCom value={inputValue['location']} inputKey={'location'} locationIcon={true} insiderText={'Search event location'} headinText={'location'} width={Dimensions.get('window').width - 40} />
                            <TextInputCom value={inputValue['url']} inputKey={'url'} insiderText={'Enter event Url'} headinText={'URL'} width={Dimensions.get('window').width - 40} />
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
                                <View style={{ height: 150 }}>
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
                                        <TouchableOpacity onPress={() => selectionHandlerBottomShhet('Frequency')} style={styles.dropdownContainer}>
                                            {/* <Icon name="calender" size={24} color="#777777" /> */}
                                            <Text style={[
                                                styles.descriptionText,
                                                { fontSize: 14, marginHorizontal: 10 },
                                            ]}>
                                                {selectedFrequecy == null ? 'Select Option' : selectedFrequecy?.name}
                                            </Text>
                                            {/* <CalendarSVG fill={'#777777'} /> */}
                                            <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={{ color: '#777777' }}>{'Week'}</Text>
                                        <TouchableOpacity onPress={() => selectionHandlerBottomShhet('Week')} style={styles.dropdownContainer}>
                                            <Text style={[
                                                styles.descriptionText,
                                                { fontSize: 14, marginHorizontal: 10 },
                                            ]}>
                                                {selectedWeek == null ? 'Select Option' : selectedWeek?.name}
                                            </Text>
                                            <MaterialIcons name="keyboard-arrow-down" size={24} color="#777777" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginVertical: 0, height: 80 }}>
                                        <Text style={{ color: '#777777' }}>{'Select day'}</Text>
                                        <FlatList contentContainerStyle={{ marginVertical: 15, height: 'auto' }} horizontal data={weekDays} renderItem={({ item, index }) => (
                                            // <TouchableOpacity onPress={() => setSelectedDay(item)} style={selectedDay == item ? [styles.weekDaysContainer, { backgroundColor: '#FCB300' }] : styles.weekDaysContainer}>
                                            //     <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12, color: '#777777' }}>{item}</Text>
                                            // </TouchableOpacity>
                                            <DateSelection item={item} inputKey={'day'} value={inputValue['day']} style={styles.weekDaysContainer} />
                                        )} />
                                    </View>
                                </>
                            }
                            <TextInputCom value={inputValue['Country']} inputKey={'Country'} insiderText={'Enter country name'} headinText='Country' width={Dimensions.get('window').width - 40} />
                            <TextInputCom value={inputValue['City']} inputKey={'City'} insiderText={'Enter city name'} headinText='City' width={Dimensions.get('window').width - 40} />
                            <TextInputCom value={inputValue['state']} inputKey={'state'} insiderText={'Enter state name'} headinText='State' width={Dimensions.get('window').width - 40} />
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
                            <TextInputCom value={inputValue['name']} inputKey={'name'} insiderText={'Enter your name'} headinText={'Name'} width={Dimensions.get('window').width - 40} />
                            <TextInputCom value={inputValue['email']} inputKey={'email'} insiderText={'Enter your email'} headinText={'Email'} width={Dimensions.get('window').width - 40} />
                        </View>
                }
                <DatePickerCalender inputKey={'start_date'} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} />
                <DatePickerCalender inputKey={'end_date'} showDatePicker={showEndDatePicker} setShowDatePicker={setShowEndDatePicker} />
                <ButtonComp text={'Submit'} navigation={() => onSubmit()} />
            </View>
            <RBSheet ref={RbSheetRef} height={Dimensions.get('window').height / 2}>
                {
                    bottomCom == 'Week' ? <SelectWeek selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} closeBottomSheet={RbSheetRef.current?.close()} /> : <SelectFrequency selectedFrequecy={selectedFrequecy} setSelectedFrequecy={setSelectedFrequecy} closeBottomSheet={RbSheetRef.current?.close()} showCategory={bottomCom == 'Event category' ? true : false} />
                }
            </RBSheet>
        </ScrollView>
    );
};
export const styles = StyleSheet.create({
    mainCom: { paddingBottom: 10, alignItems: 'center', marginTop: 40, paddingTop: 10, backgroundColor: '#fff', borderTopEndRadius: 15, borderTopLeftRadius: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', },
    mainHeading: { fontFamily: 'Lora-Bold', fontSize: 16, color: 'black' },
    subHeadingText: { fontFamily: 'Mulish-Regular', fontSize: 12, color: colors.grey7 },
    inputComp: { backgroundColor: '#F3F3F3', height: 120, width: Dimensions.get('window').width - 30, borderRadius: 10, justifyContent: 'center', paddingHorizontal: 20 },
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
