import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useState } from "react";
import { Dimensions, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { RouteTexts } from "../../navigation/RouteText";

const FestivalVideo = ({ navigation, setShowFestivalVideo }) => {
    const [asset, setAsset] = useState([])
    const imageGallary = () => {
        launchImageLibrary({
            selectionLimit: 1,
            mediaType: 'mixed'
        }, callbacks => {
            setAsset(callbacks?.assets)
            if (callbacks?.assets?.length > 0) {
                setShowFestivalVideo(false)
                navigation.navigate(RouteTexts.SEND_FESTIVAL_VIDEO, {
                    image: callbacks?.assets
                })
            }
        })
    }
    const openCamera = async () => {
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        console.log("🚀 ~ openCamera ~ grantedcamera:", grantedcamera)
        const grantedstorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        console.log("🚀 ~ openCamera ~ grantedstorage:", grantedstorage, PermissionsAndroid.RESULTS.GRANTED)
        if (grantedcamera !== 'denied') {
            // console.log("Camera & storage permission given");
            var options = {
                mediaType: 'video', //to allow only photo to select ...no video
                saveToPhotos: true,  //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
                includeBase64: false,
            };
            launchCamera(options, (res) => {
                // console.log('Response = ', res);
                if (res?.assets?.length > 0) {
                    setShowFestivalVideo(false)
                    navigation.navigate(RouteTexts.SEND_FESTIVAL_VIDEO, {
                        image: res?.assets
                    })
                }

                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.error) {
                    console.log('ImagePicker Error: ', res.error);
                } else if (res.customButton) {
                    console.log('User tapped custom button: ', res.customButton);
                    alert(res.customButton);
                } else {
                    // let source = res;
                    // var resourcePath1 = source.assets[0].uri;
                    const source = { uri: res.uri };
                    console.log('response', JSON.stringify(res));

                    // setImageSource(source.uri);


                }
            });
        } else {
            console.log("Camera permission denied");
        }
    }
    return (
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
            <View style={styles.mainConatiner}>
                <TouchableOpacity touchSoundDisabled style={{ position: 'absolute', top: 20, right: 20, }} onPress={() => setShowFestivalVideo(false)}>
                    <Feather name='x' size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontFamily: 'Lora-SemiBold' }}>Submit Entries</Text>
                <Text style={{ color: '#777777', fontFamily: 'Mulish-Regular' }}>Select one of the following</Text>
                <View style={styles.childContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name='video' size={24} color='#777777' />
                        <Text style={{ color: '#777777', fontFamily: 'Mulish-Regular', marginHorizontal: 10 }}>Send a festival video</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name='done' size={14} color='white' />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Mulish-Regular' }}>Choose One</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 5, marginTop: 10 }}>
                        <TouchableOpacity style={styles.uploadBox} onPress={openCamera}>
                            <Feather name='camera' size={20} color='#C1554E' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={imageGallary} style={styles.uploadBox}>
                            <Feather name='image' size={20} color='#C1554E' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
export const styles = StyleSheet.create({
    mainConatiner: {
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 15,
        height: Dimensions.get('window').height / 2.3,
        flex: 1,
        padding: 20,
        gap: 10,
    },
    childContainer: { alignItems: 'center', height: 50, backgroundColor: '#ECECEC', borderRadius: 10, flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between' },
    iconContainer: { backgroundColor: '#008E79', height: 20, width: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    uploadBox: { marginHorizontal: 10, height: 70, width: 70, borderRadius: 12, borderColor: '#D48883', borderWidth: 2, backgroundColor: '#F9EEED', justifyContent: 'center', alignItems: 'center' }
})
export default FestivalVideo;
