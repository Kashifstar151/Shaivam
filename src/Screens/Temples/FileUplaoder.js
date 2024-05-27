import { BlurView } from '@react-native-community/blur';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/Feather';
import { useAddTempleImagesMutation } from '../../store/features/Temple/TemplApiSlice';
import ButtonComp from './Common/ButtonComp';

const FileUplaoder = ({ setModalVisible, id, dataSet }) => {
    const [images, setImages] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [addTempleImages] = useAddTempleImagesMutation();
    const animationref = useRef(null);
    useEffect(() => {
        animationref.current?.play();
        // Or set a specific startFrame and endFrame with:
        animationref.current?.play(30, 120);
    }, [submitted]);

    const handleSubmit = () => {
        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append('files', {
                name: images[i]?.fileName,
                type: images[i]?.type,
                uri: images[i]?.uri,
            });
        }
        formData.append('ref', 'api::map.map');
        formData.append('refId', id);
        formData.append('field', 'temple_images');

        addTempleImages(formData)
            .unwrap()
            .then((response) => {
                console.log('the images are uploaded successFully ', JSON.stringify(response));
                setSubmitted(true);
            })
            .catch((err) => {
                console.log('the images are uploaded error ', JSON.stringify(err));
            });

        // add on success
    };
    const openGallary = () => {
        const options = {
            selectionLimit: 5,
        };
        launchImageLibrary(options, (callback) => {
            console.log('🚀 ~ openGallary ~ callback:', callback);
            setImages(callback?.assets);
        });
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
                    <Icon name="x" color="white" />
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
            {submitted ? (
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
                            source={require('../../assets/JSON/SuccessGIF.json')}
                        />
                    </View>
                    <Text style={{ fontSize: 20, fontFamily: 'Mulish-Bold', color: '#222222' }}>
                        Images submitted!
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Mulish-Regular', color: '#222222' }}>
                        Our team will go through your submission, validate it and update it on to
                        the app.
                    </Text>
                </View>
            ) : (
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>
                            {dataSet?.templeName}
                        </Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Icon name="x" color="#222222" size={22} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.submitText}>Submit Images</Text>
                        <Text style={styles.descriptionText}>
                            You can submit images for this temple
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Text style={[styles.descriptionText, { fontFamily: 'Mulish-Bold' }]}>
                            Upload Images (You can upload multiple images)
                        </Text>
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
                    {/* <View style={{ paddingHorizontal: 10, height: 120 }}> */}
                    {images?.length > 0 ? (
                        <FlatList
                            contentContainerStyle={{ marginBottom: 20, height: 120, flex: 1 }}
                            horizontal
                            data={images}
                            renderItem={({ item, index }) => RenderImage(item)}
                        />
                    ) : (
                        <View style={{ height: 100 }}></View>
                    )}
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <ButtonComp
                            navigation={handleSubmit}
                            text={'Submit'}
                            color={images?.length > 0 ? true : false}
                        />
                    </View>

                    {/* </View> */}
                </View>
            )}
        </View>
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
        paddingVertical: 15,
    },
    submitText: { fontSize: 16, fontFamily: 'Lora-SemiBold', color: '#222222' },
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
});
export default FileUplaoder;
